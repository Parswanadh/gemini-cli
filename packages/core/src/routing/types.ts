/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Model tier classification for cost optimization
 */
export enum ModelTier {
  MINI = 'mini', // Ultra-cheap models (Gemini Flash, GPT-4o-mini)
  STANDARD = 'standard', // Standard models (Claude Sonnet, GPT-4o)
  ADVANCED = 'advanced', // Premium models (Claude Opus, o1-preview)
}

/**
 * Task complexity analysis result
 */
export interface TaskComplexity {
  /** Overall complexity score (0-100) */
  score: number;
  /** Recommended model tier */
  tier: ModelTier;
  /** Requires advanced reasoning */
  requiresReasoning: boolean;
  /** Requires code generation/understanding */
  requiresCode: boolean;
  /** Requires creative output */
  requiresCreativity: boolean;
  /** Task is critical and requires high accuracy */
  isCritical: boolean;
  /** Estimated input tokens */
  estimatedInputTokens: number;
  /** Estimated output tokens */
  estimatedOutputTokens: number;
}

/**
 * Routing strategy for model selection
 */
export enum RoutingStrategy {
  /** Always use cheapest model */
  COST_OPTIMIZED = 'cost-optimized',
  /** Balance cost and quality */
  BALANCED = 'balanced',
  /** Always use best model */
  QUALITY_FIRST = 'quality-first',
  /** User manually selects model */
  MANUAL = 'manual',
}

/**
 * Cost estimate for a model/task combination
 */
export interface CostEstimate {
  /** Provider ID */
  providerId: string;
  /** Model ID */
  modelId: string;
  /** Estimated cost in USD */
  estimatedCostUsd: number;
  /** Cost per 1M input tokens */
  inputCostPer1M: number;
  /** Cost per 1M output tokens */
  outputCostPer1M: number;
  /** Estimated input tokens */
  estimatedInputTokens: number;
  /** Estimated output tokens */
  estimatedOutputTokens: number;
  /** Model tier */
  tier: ModelTier;
  /** Model quality score (0-100) */
  qualityScore: number;
}

/**
 * Cost tracking record
 */
export interface CostRecord {
  /** Unique ID */
  id: string;
  /** Session ID */
  sessionId: string;
  /** Provider ID */
  providerId: string;
  /** Model ID */
  modelId: string;
  /** Actual input tokens used */
  inputTokens: number;
  /** Actual output tokens used */
  outputTokens: number;
  /** Actual cost in USD */
  costUsd: number;
  /** Timestamp */
  timestamp: string;
  /** Task complexity that was analyzed */
  complexity?: TaskComplexity;
  /** Whether this was an optimized route */
  wasOptimized: boolean;
}

/**
 * Cost summary statistics
 */
export interface CostSummary {
  /** Total cost in USD */
  totalCost: number;
  /** Total requests */
  totalRequests: number;
  /** Average cost per request */
  averageCost: number;
  /** Cost by provider */
  byProvider: Record<string, number>;
  /** Cost by model */
  byModel: Record<string, number>;
  /** Cost by tier */
  byTier: Record<ModelTier, number>;
  /** Total tokens used */
  totalTokens: number;
  /** Date range */
  startDate: string;
  endDate: string;
  /** Estimated savings from optimization */
  estimatedSavings?: number;
}

/**
 * Model pricing information
 */
export interface ModelPricing {
  /** Provider ID */
  providerId: string;
  /** Model ID */
  modelId: string;
  /** Cost per 1M input tokens in USD */
  inputCostPer1M: number;
  /** Cost per 1M output tokens in USD */
  outputCostPer1M: number;
  /** Model tier */
  tier: ModelTier;
  /** Model capabilities/features */
  capabilities: {
    maxTokens: number;
    supportsVision: boolean;
    supportsFunctions: boolean;
    supportsStreaming: boolean;
  };
}
