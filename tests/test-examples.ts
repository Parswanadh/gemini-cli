/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Comprehensive Test Suite - Multiple Examples
 * Run with: npx tsx tests/test-examples.ts
 */

import { ComplexityAnalyzer } from '../packages/core/src/routing/complexity-analyzer.js';
import { ModelTier } from '../packages/core/src/routing/types.js';

const analyzer = new ComplexityAnalyzer();

console.log('🧪 Comprehensive Complexity Analyzer Test Suite\n');
console.log('='.repeat(70));

interface TestCase {
  category: string;
  prompt: string;
  expectedTier?: ModelTier;
}

const testCases: TestCase[] = [
  // MINI tier - Simple queries
  {
    category: 'Simple Queries',
    prompt: 'What is 2+2?',
    expectedTier: ModelTier.MINI,
  },
  {
    category: 'Simple Queries',
    prompt: 'Hello, how are you?',
    expectedTier: ModelTier.MINI,
  },
  {
    category: 'Simple Queries',
    prompt: 'What time is it?',
    expectedTier: ModelTier.MINI,
  },
  {
    category: 'Simple Queries',
    prompt: 'Tell me a joke',
    expectedTier: ModelTier.MINI,
  },

  // STANDARD tier - Code tasks
  {
    category: 'Code Generation',
    prompt: 'Write a function to reverse a string',
    expectedTier: ModelTier.STANDARD,
  },
  {
    category: 'Code Generation',
    prompt: 'Implement a binary search algorithm',
    expectedTier: ModelTier.STANDARD,
  },
  {
    category: 'Code Generation',
    prompt: 'Create a TypeScript interface for a user',
    expectedTier: ModelTier.STANDARD,
  },
  {
    category: 'Code Generation',
    prompt: 'Fix this bug in my JavaScript code',
    expectedTier: ModelTier.STANDARD,
  },

  // STANDARD tier - Analysis
  {
    category: 'Analysis',
    prompt: 'Analyze this code for performance issues',
    expectedTier: ModelTier.STANDARD,
  },
  {
    category: 'Analysis',
    prompt: 'Explain how async/await works',
    expectedTier: ModelTier.STANDARD,
  },
  {
    category: 'Analysis',
    prompt: 'Compare React vs Vue',
    expectedTier: ModelTier.STANDARD,
  },

  // ADVANCED tier - Complex reasoning
  {
    category: 'Architecture',
    prompt: 'Design a microservices architecture for an e-commerce platform',
    expectedTier: ModelTier.ADVANCED,
  },
  {
    category: 'Architecture',
    prompt: 'Optimize this database schema for millions of users',
    expectedTier: ModelTier.ADVANCED,
  },
  {
    category: 'Architecture',
    prompt: 'Design a distributed system for real-time analytics',
    expectedTier: ModelTier.ADVANCED,
  },

  // ADVANCED tier - Critical tasks
  {
    category: 'Critical/Security',
    prompt: 'Fix this critical security vulnerability now',
    expectedTier: ModelTier.ADVANCED,
  },
  {
    category: 'Critical/Security',
    prompt: 'Deploy to production immediately',
    expectedTier: ModelTier.ADVANCED,
  },
  {
    category: 'Critical/Security',
    prompt: 'Check for SQL injection vulnerabilities',
    expectedTier: ModelTier.ADVANCED,
  },

  // Creative tasks
  {
    category: 'Creative',
    prompt: 'Write documentation for this API',
    expectedTier: ModelTier.STANDARD,
  },
  {
    category: 'Creative',
    prompt: 'Create a blog post about AI',
    expectedTier: ModelTier.STANDARD,
  },
  {
    category: 'Creative',
    prompt: 'Generate ideas for a startup',
    expectedTier: ModelTier.STANDARD,
  },
];

// Group by category
const categories = [...new Set(testCases.map((t) => t.category))];

for (const category of categories) {
  console.log(`\n📁 ${category}`);
  console.log('-'.repeat(70));

  const categoryTests = testCases.filter((t) => t.category === category);

  for (const test of categoryTests) {
    const result = analyzer.analyze(test.prompt);
    const match = test.expectedTier === result.tier;
    const icon = match ? '✅' : '⚠️';

    // Format tier with colors
    let tierDisplay: string = result.tier;
    if (result.tier === ModelTier.MINI) tierDisplay = '💚 MINI';
    else if (result.tier === ModelTier.STANDARD) tierDisplay = '💛 STANDARD';
    else if (result.tier === ModelTier.ADVANCED) tierDisplay = '❤️  ADVANCED';

    console.log(`${icon} ${tierDisplay} (${result.score}/100)`);
    console.log(`   "${test.prompt}"`);

    if (test.expectedTier && !match) {
      console.log(`   ⚠️  Expected: ${test.expectedTier}`);
    }

    // Show key flags
    const flags = [];
    if (result.requiresReasoning) flags.push('reasoning');
    if (result.requiresCode) flags.push('code');
    if (result.requiresCreativity) flags.push('creative');
    if (result.isCritical) flags.push('critical');
    if (flags.length > 0) {
      console.log(`   Flags: ${flags.join(', ')}`);
    }
    console.log();
  }
}

// Statistics
console.log('='.repeat(70));
console.log('\n📊 Statistics\n');

const miniCount = testCases.filter((t) => {
  const result = analyzer.analyze(t.prompt);
  return result.tier === ModelTier.MINI;
}).length;

const standardCount = testCases.filter((t) => {
  const result = analyzer.analyze(t.prompt);
  return result.tier === ModelTier.STANDARD;
}).length;

const advancedCount = testCases.filter((t) => {
  const result = analyzer.analyze(t.prompt);
  return result.tier === ModelTier.ADVANCED;
}).length;

console.log(`Total Tests: ${testCases.length}`);
console.log(
  `💚 MINI: ${miniCount} (${((miniCount / testCases.length) * 100).toFixed(0)}%)`,
);
console.log(
  `💛 STANDARD: ${standardCount} (${((standardCount / testCases.length) * 100).toFixed(0)}%)`,
);
console.log(
  `❤️  ADVANCED: ${advancedCount} (${((advancedCount / testCases.length) * 100).toFixed(0)}%)`,
);

// Match rate
const matchCount = testCases.filter((t) => {
  if (!t.expectedTier) return true;
  const result = analyzer.analyze(t.prompt);
  return result.tier === t.expectedTier;
}).length;

console.log(
  `\n✅ Match Rate: ${matchCount}/${testCases.length} (${((matchCount / testCases.length) * 100).toFixed(0)}%)`,
);

console.log('\n🎉 Test suite complete!\n');
