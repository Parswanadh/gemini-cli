/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Simple Phase 1 Test - Direct TypeScript Execution
 * Run with: npx tsx tests/phase1-simple.ts
 */

import { ComplexityAnalyzer } from '../packages/core/src/routing/complexity-analyzer';
import { ModelTier } from '../packages/core/src/routing/types';

console.log('🧪 Simple Phase 1 Test - Complexity Analyzer\n');
console.log('='.repeat(60));

const analyzer = new ComplexityAnalyzer();

console.log('\n📊 Testing Complexity Analysis:\n');

// Test Case 1: Simple question
const test1 = analyzer.analyze('What is 2+2?');
console.log('✅ Test 1: Simple Question');
console.log(`   Prompt: "What is 2+2?"`);
console.log(`   Score: ${test1.score}/100`);
console.log(`   Tier: ${test1.tier} (Expected: ${ModelTier.MINI})`);
console.log(
  `   Tokens: ${test1.estimatedInputTokens} → ${test1.estimatedOutputTokens}\n`,
);

// Test Case 2: Code generation
const test2 = analyzer.analyze(
  'Write a function to calculate fibonacci in TypeScript',
);
console.log('✅ Test 2: Code Generation');
console.log(`   Prompt: "Write a function..."`);
console.log(`   Score: ${test2.score}/100`);
console.log(`   Tier: ${test2.tier} (Expected: ${ModelTier.STANDARD})`);
console.log(`   Requires Code: ${test2.requiresCode}`);
console.log(
  `   Tokens: ${test2.estimatedInputTokens} → ${test2.estimatedOutputTokens}\n`,
);

// Test Case 3: Complex reasoning
const test3 = analyzer.analyze(
  'Design a distributed system architecture for handling 1M requests/sec with fault tolerance',
);
console.log('✅ Test 3: Complex Architecture');
console.log(`   Prompt: "Design a distributed system..."`);
console.log(`   Score: ${test3.score}/100`);
console.log(`   Tier: ${test3.tier} (Expected: ${ModelTier.ADVANCED})`);
console.log(`   Requires Reasoning: ${test3.requiresReasoning}`);
console.log(
  `   Tokens: ${test3.estimatedInputTokens} → ${test3.estimatedOutputTokens}\n`,
);

// Test Case 4: Critical task
const test4 = analyzer.analyze(
  'Fix this critical security vulnerability in production immediately',
);
console.log('✅ Test 4: Critical Security Fix');
console.log(`   Prompt: "Fix this critical security..."`);
console.log(`   Score: ${test4.score}/100`);
console.log(`   Tier: ${test4.tier} (Expected: ${ModelTier.ADVANCED})`);
console.log(`   Is Critical: ${test4.isCritical}`);
console.log(
  `   Tokens: ${test4.estimatedInputTokens} → ${test4.estimatedOutputTokens}\n`,
);

console.log('='.repeat(60));
console.log('\n🎉 Complexity Analyzer Test Complete!');
console.log('\n📋 Results:');
console.log(
  `   Test 1: ${test1.tier === ModelTier.MINI ? '✅ PASS' : '❌ FAIL'}`,
);
console.log(
  `   Test 2: ${test2.tier === ModelTier.STANDARD ? '✅ PASS' : '❌ FAIL'}`,
);
console.log(
  `   Test 3: ${test3.tier === ModelTier.ADVANCED ? '✅ PASS' : '❌ FAIL'}`,
);
console.log(
  `   Test 4: ${test4.tier === ModelTier.ADVANCED ? '✅ PASS' : '❌ FAIL'}\n`,
);

const allPassed =
  test1.tier === ModelTier.MINI &&
  test2.tier === ModelTier.STANDARD &&
  test3.tier === ModelTier.ADVANCED &&
  test4.tier === ModelTier.ADVANCED;

if (allPassed) {
  console.log(
    '✅ All tests passed! Phase 1 Complexity Analyzer is working correctly.\n',
  );
} else {
  console.log('⚠️  Some tests failed. Review the tier assignments.\n');
}
