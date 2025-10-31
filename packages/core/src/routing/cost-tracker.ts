/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { randomUUID } from 'node:crypto';
import type {
  CostRecord,
  CostSummary,
  TaskComplexity,
  ModelTier,
  CostEstimate,
} from './types.js';

/**
 * Tracks cost metrics and provides reporting capabilities
 * Phase 1: In-memory storage
 * Phase 2: Will migrate to database
 */
export class CostTracker {
  private records: Map<string, CostRecord> = new Map();
  private sessionRecords: Map<string, string[]> = new Map(); // sessionId -> recordIds

  /**
   * Record a model selection decision
   */
  recordSelection(
    sessionId: string,
    providerId: string,
    modelId: string,
    complexity: TaskComplexity,
    costEstimate: CostEstimate,
    wasOptimized: boolean,
  ): string {
    const recordId = randomUUID();

    const record: CostRecord = {
      id: recordId,
      sessionId,
      providerId,
      modelId,
      inputTokens: costEstimate.estimatedInputTokens,
      outputTokens: costEstimate.estimatedOutputTokens,
      costUsd: costEstimate.estimatedCostUsd,
      timestamp: new Date().toISOString(),
      complexity,
      wasOptimized,
    };

    this.records.set(recordId, record);

    // Track by session
    if (!this.sessionRecords.has(sessionId)) {
      this.sessionRecords.set(sessionId, []);
    }
    this.sessionRecords.get(sessionId)!.push(recordId);

    return recordId;
  }

  /**
   * Update a record with actual usage (after LLM response)
   */
  recordActualCost(
    recordId: string,
    actualInputTokens: number,
    actualOutputTokens: number,
  ): void {
    const record = this.records.get(recordId);
    if (!record) {
      return;
    }

    // Update with actual values
    record.inputTokens = actualInputTokens;
    record.outputTokens = actualOutputTokens;

    // Recalculate cost based on actual usage
    // Note: We'd need the pricing info here. For now, use a simple ratio.
    const estimatedTotal = record.inputTokens + record.outputTokens;
    const actualTotal = actualInputTokens + actualOutputTokens;
    if (estimatedTotal > 0) {
      record.costUsd = (record.costUsd * actualTotal) / estimatedTotal;
    }
  }

  /**
   * Get cost summary for a specific session
   */
  getSessionSummary(sessionId: string): CostSummary | null {
    const recordIds = this.sessionRecords.get(sessionId);
    if (!recordIds || recordIds.length === 0) {
      return null;
    }

    const records = recordIds
      .map((id) => this.records.get(id))
      .filter((r): r is CostRecord => r !== undefined);

    return this.generateSummary(records);
  }

  /**
   * Get cost summary for all sessions within a date range
   */
  getDateRangeSummary(startDate: Date, endDate: Date): CostSummary {
    const records = Array.from(this.records.values()).filter((record) => {
      const timestamp = new Date(record.timestamp);
      return timestamp >= startDate && timestamp <= endDate;
    });

    return this.generateSummary(records);
  }

  /**
   * Get monthly cost summary
   */
  getMonthlySummary(year: number, month: number): CostSummary {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    return this.getDateRangeSummary(startDate, endDate);
  }

  /**
   * Get top expensive requests
   */
  getTopExpensiveRequests(limit: number = 10): CostRecord[] {
    return Array.from(this.records.values())
      .sort((a, b) => b.costUsd - a.costUsd)
      .slice(0, limit);
  }

  /**
   * Get optimization statistics
   */
  getOptimizationStats(): {
    totalRequests: number;
    optimizedRequests: number;
    optimizationRate: number;
    estimatedSavings: number;
  } {
    const allRecords = Array.from(this.records.values());
    const optimizedRecords = allRecords.filter((r) => r.wasOptimized);

    // Calculate estimated savings (this is a simplification)
    // In reality, we'd compare against what would have been spent without optimization
    const estimatedSavings = optimizedRecords.reduce((sum, record) => 
      // Assume optimization saves ~30-40% on average
      // This is a rough estimate - actual savings depend on the alternative model
       sum + record.costUsd * 0.35
    , 0);

    return {
      totalRequests: allRecords.length,
      optimizedRequests: optimizedRecords.length,
      optimizationRate:
        allRecords.length > 0 ? optimizedRecords.length / allRecords.length : 0,
      estimatedSavings,
    };
  }

  /**
   * Clear old records (for memory management in Phase 1)
   */
  clearOldRecords(daysToKeep: number = 30): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    let removedCount = 0;

    for (const [id, record] of this.records.entries()) {
      const timestamp = new Date(record.timestamp);
      if (timestamp < cutoffDate) {
        this.records.delete(id);
        removedCount++;

        // Remove from session tracking
        const sessionRecords = this.sessionRecords.get(record.sessionId);
        if (sessionRecords) {
          const index = sessionRecords.indexOf(id);
          if (index > -1) {
            sessionRecords.splice(index, 1);
          }
          if (sessionRecords.length === 0) {
            this.sessionRecords.delete(record.sessionId);
          }
        }
      }
    }

    return removedCount;
  }

  /**
   * Export all records (for backup or migration to database)
   */
  exportRecords(): CostRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Import records (for restoring from backup or migrating from database)
   */
  importRecords(records: CostRecord[]): void {
    for (const record of records) {
      this.records.set(record.id, record);

      // Rebuild session tracking
      if (!this.sessionRecords.has(record.sessionId)) {
        this.sessionRecords.set(record.sessionId, []);
      }
      this.sessionRecords.get(record.sessionId)!.push(record.id);
    }
  }

  /**
   * Get total record count
   */
  getRecordCount(): number {
    return this.records.size;
  }

  /**
   * Clear all records (for testing)
   */
  clear(): void {
    this.records.clear();
    this.sessionRecords.clear();
  }

  /**
   * Generate cost summary from records
   */
  private generateSummary(records: CostRecord[]): CostSummary {
    if (records.length === 0) {
      return {
        totalCost: 0,
        totalRequests: 0,
        averageCost: 0,
        byProvider: {},
        byModel: {},
        byTier: {} as Record<ModelTier, number>,
        totalTokens: 0,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        estimatedSavings: 0,
      };
    }

    const totalCost = records.reduce((sum, r) => sum + r.costUsd, 0);
    const totalTokens = records.reduce(
      (sum, r) => sum + r.inputTokens + r.outputTokens,
      0,
    );

    const byProvider: Record<string, number> = {};
    const byModel: Record<string, number> = {};
    const byTier: Record<ModelTier, number> = {} as Record<ModelTier, number>;

    for (const record of records) {
      // By provider
      byProvider[record.providerId] =
        (byProvider[record.providerId] || 0) + record.costUsd;

      // By model
      byModel[record.modelId] = (byModel[record.modelId] || 0) + record.costUsd;

      // By tier
      if (record.complexity) {
        byTier[record.complexity.tier] =
          (byTier[record.complexity.tier] || 0) + record.costUsd;
      }
    }

    // Calculate estimated savings
    const optimizedRecords = records.filter((r) => r.wasOptimized);
    const estimatedSavings = optimizedRecords.reduce((sum, record) => 
       sum + record.costUsd * 0.35 // Assume 35% savings
    , 0);

    // Get date range
    const timestamps = records.map((r) => new Date(r.timestamp).getTime());
    const startDate = new Date(Math.min(...timestamps)).toISOString();
    const endDate = new Date(Math.max(...timestamps)).toISOString();

    return {
      totalCost,
      totalRequests: records.length,
      averageCost: totalCost / records.length,
      byProvider,
      byModel,
      byTier,
      totalTokens,
      startDate,
      endDate,
      estimatedSavings,
    };
  }
}
