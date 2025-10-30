/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Interactive Complexity Analyzer Test
 * Run with: npx tsx tests/interactive-test.ts
 */

import { ComplexityAnalyzer } from '../packages/core/src/routing/complexity-analyzer.js';
import { ModelTier } from '../packages/core/src/routing/types.js';
import * as readline from 'node:readline';

const analyzer = new ComplexityAnalyzer();

console.log('🧪 Interactive Complexity Analyzer Test\n');
console.log('='.repeat(60));
console.log("Type prompts to see how they're analyzed.");
console.log('Type "exit" or "quit" to stop.\n');
console.log('='.repeat(60));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getTierEmoji(tier: ModelTier): string {
  switch (tier) {
    case ModelTier.MINI:
      return '💚 MINI';
    case ModelTier.STANDARD:
      return '💛 STANDARD';
    case ModelTier.ADVANCED:
      return '❤️  ADVANCED';
    default:
      return tier;
  }
}

function askForPrompt() {
  rl.question('\n> Enter prompt: ', (prompt) => {
    if (
      !prompt ||
      prompt.toLowerCase() === 'exit' ||
      prompt.toLowerCase() === 'quit'
    ) {
      console.log('\n👋 Goodbye!\n');
      rl.close();
      return;
    }

    // Analyze the prompt
    const result = analyzer.analyze(prompt);
    const description = analyzer.getComplexityDescription(result);

    // Display results
    console.log('\n📊 Analysis Results:');
    console.log('-'.repeat(60));
    console.log(`Tier: ${getTierEmoji(result.tier)}`);
    console.log(`Complexity Score: ${result.score}/100`);
    console.log(`Description: ${description}`);
    console.log('\n🔍 Details:');
    console.log(
      `  - Requires Reasoning: ${result.requiresReasoning ? '✅' : '❌'}`,
    );
    console.log(`  - Requires Code: ${result.requiresCode ? '✅' : '❌'}`);
    console.log(
      `  - Requires Creativity: ${result.requiresCreativity ? '✅' : '❌'}`,
    );
    console.log(`  - Is Critical: ${result.isCritical ? '✅' : '❌'}`);
    console.log(`\n💰 Token Estimates:`);
    console.log(`  - Input Tokens: ~${result.estimatedInputTokens}`);
    console.log(`  - Output Tokens: ~${result.estimatedOutputTokens}`);
    console.log('-'.repeat(60));

    // Ask for next prompt
    askForPrompt();
  });
}

// Start the interactive loop
askForPrompt();
