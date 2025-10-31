/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Test file for CostTracker
 */

import { CostTracker } from '../packages/core/src/routing/cost-tracker.js';
import { ModelTier } from '../packages/core/src/routing/types.js';
import type {
  TaskComplexity,
  CostEstimate,
} from '../packages/core/src/routing/types.js';

console.log('🧪 Testing CostTracker\n');
console.log('='.repeat(70));

const tracker = new CostTracker();

// Create mock data
const mockComplexity: TaskComplexity = {
  score: 45,
  tier: ModelTier.STANDARD,
  requiresReasoning: false,
  requiresCode: true,
  requiresCreativity: true,
  isCritical: false,
  estimatedInputTokens: 100,
  estimatedOutputTokens: 200,
};

const mockCostEstimate: CostEstimate = {
  providerId: 'google',
  modelId: 'gemini-1.5-flash',
  estimatedCostUsd: 0.00001,
  inputCostPer1M: 0.075,
  outputCostPer1M: 0.3,
  estimatedInputTokens: 100,
  estimatedOutputTokens: 200,
  tier: ModelTier.STANDARD,
  qualityScore: 80,
};

// Test 1: Record selection
console.log('\n📝 Test 1: Record Selection');
console.log('-'.repeat(70));
const recordId1 = tracker.recordSelection(
  'session-1',
  'google',
  'gemini-1.5-flash',
  mockComplexity,
  mockCostEstimate,
  true,
);
console.log(`✅ Recorded selection with ID: ${recordId1}`);
console.log(`   Record count: ${tracker.getRecordCount()}`);

// Test 2: Record actual cost
console.log('\n📝 Test 2: Update with Actual Cost');
console.log('-'.repeat(70));
tracker.recordActualCost(recordId1, 120, 250);
console.log('✅ Updated with actual tokens (120 input, 250 output)');

// Test 3: Multiple records
console.log('\n📝 Test 3: Multiple Records');
console.log('-'.repeat(70));
for (let i = 0; i < 5; i++) {
  tracker.recordSelection(
    'session-1',
    'google',
    i % 2 === 0 ? 'gemini-1.5-flash' : 'gemini-1.5-pro',
    mockComplexity,
    { ...mockCostEstimate, estimatedCostUsd: 0.00001 * (i + 1) },
    i % 3 === 0,
  );
}
console.log(`✅ Added 5 more records. Total: ${tracker.getRecordCount()}`);

// Test 4: Session summary
console.log('\n📝 Test 4: Session Summary');
console.log('-'.repeat(70));
const sessionSummary = tracker.getSessionSummary('session-1');
if (sessionSummary) {
  console.log('✅ Session Summary:');
  console.log(`   Total Cost: $${sessionSummary.totalCost.toFixed(6)}`);
  console.log(`   Total Requests: ${sessionSummary.totalRequests}`);
  console.log(`   Average Cost: $${sessionSummary.averageCost.toFixed(6)}`);
  console.log(`   Total Tokens: ${sessionSummary.totalTokens}`);
  console.log(
    `   Estimated Savings: $${sessionSummary.estimatedSavings?.toFixed(6)}`,
  );
  console.log('\n   By Provider:');
  for (const [provider, cost] of Object.entries(sessionSummary.byProvider)) {
    console.log(`     ${provider}: $${cost.toFixed(6)}`);
  }
  console.log('\n   By Model:');
  for (const [model, cost] of Object.entries(sessionSummary.byModel)) {
    console.log(`     ${model}: $${cost.toFixed(6)}`);
  }
} else {
  console.log('❌ Failed to get session summary');
}

// Test 5: Optimization stats
console.log('\n📝 Test 5: Optimization Statistics');
console.log('-'.repeat(70));
const stats = tracker.getOptimizationStats();
console.log('✅ Optimization Stats:');
console.log(`   Total Requests: ${stats.totalRequests}`);
console.log(`   Optimized Requests: ${stats.optimizedRequests}`);
console.log(
  `   Optimization Rate: ${(stats.optimizationRate * 100).toFixed(1)}%`,
);
console.log(`   Estimated Savings: $${stats.estimatedSavings.toFixed(6)}`);

// Test 6: Top expensive requests
console.log('\n📝 Test 6: Top Expensive Requests');
console.log('-'.repeat(70));
const topExpensive = tracker.getTopExpensiveRequests(3);
console.log(`✅ Top 3 most expensive requests:`);
for (let i = 0; i < topExpensive.length; i++) {
  const record = topExpensive[i];
  console.log(`   ${i + 1}. $${record.costUsd.toFixed(6)} - ${record.modelId}`);
}

// Test 7: Date range summary
console.log('\n📝 Test 7: Date Range Summary');
console.log('-'.repeat(70));
const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const rangeSummary = tracker.getDateRangeSummary(yesterday, tomorrow);
console.log('✅ Date Range Summary (Last 24 hours + next 24 hours):');
console.log(`   Total Cost: $${rangeSummary.totalCost.toFixed(6)}`);
console.log(`   Total Requests: ${rangeSummary.totalRequests}`);

// Test 8: Export/Import
console.log('\n📝 Test 8: Export and Import');
console.log('-'.repeat(70));
const exported = tracker.exportRecords();
console.log(`✅ Exported ${exported.length} records`);

const newTracker = new CostTracker();
newTracker.importRecords(exported);
console.log(
  `✅ Imported into new tracker. Record count: ${newTracker.getRecordCount()}`,
);

// Test 9: Clear old records
console.log('\n📝 Test 9: Clear Old Records');
console.log('-'.repeat(70));
const beforeCount = tracker.getRecordCount();
const removed = tracker.clearOldRecords(0); // Remove all records
console.log(
  `✅ Removed ${removed} old records (cleared all with daysToKeep=0)`,
);
console.log(`   Before: ${beforeCount}, After: ${tracker.getRecordCount()}`);

// Test 10: Monthly summary (empty now)
console.log('\n📝 Test 10: Monthly Summary');
console.log('-'.repeat(70));
const now2 = new Date();
const monthlySummary = tracker.getMonthlySummary(
  now2.getFullYear(),
  now2.getMonth() + 1,
);
console.log('✅ Monthly Summary (current month):');
console.log(`   Total Cost: $${monthlySummary.totalCost.toFixed(6)}`);
console.log(`   Total Requests: ${monthlySummary.totalRequests}`);

console.log('\n' + '='.repeat(70));
console.log('🎉 All CostTracker tests completed!\n');
