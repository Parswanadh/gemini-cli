/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { TaskComplexity, ModelTier } from './types.js';
import { ModelTier as Tier } from './types.js';

/**
 * Analyzes task complexity to determine optimal model tier
 */
export class ComplexityAnalyzer {
  /**
   * Analyze task complexity from user prompt and context
   */
  analyze(
    prompt: string,
    context?: {
      conversationLength?: number;
      hasCode?: boolean;
      fileCount?: number;
      isFollowUp?: boolean;
    },
  ): TaskComplexity {
    let score = 0;
    const analysis = {
      requiresReasoning: false,
      requiresCode: false,
      requiresCreativity: false,
      isCritical: false,
    };

    // Analyze prompt content
    const promptLower = prompt.toLowerCase();

    // Check for reasoning indicators
    if (this.requiresReasoning(promptLower)) {
      score += 30;
      analysis.requiresReasoning = true;
    }

    // Check for code-related tasks
    if (this.requiresCode(promptLower, context)) {
      score += 25;
      analysis.requiresCode = true;
    }

    // Check for creative tasks
    if (this.requiresCreativity(promptLower)) {
      score += 20;
      analysis.requiresCreativity = true;
    }

    // Check if task is critical
    if (this.isCriticalTask(promptLower, context)) {
      score += 25;
      analysis.isCritical = true;
    }

    // Adjust for context
    if (context?.conversationLength && context.conversationLength > 10) {
      score += 10; // Long conversations may need better context understanding
    }

    if (context?.fileCount && context.fileCount > 5) {
      score += 15; // Many files require better comprehension
    }

    // Estimate tokens
    const estimatedInputTokens = this.estimateInputTokens(prompt, context);
    const estimatedOutputTokens = this.estimateOutputTokens(prompt, context);

    // Determine tier based on score
    let tier: ModelTier;
    if (score >= 70 || analysis.isCritical) {
      tier = Tier.ADVANCED;
    } else if (score >= 40) {
      tier = Tier.STANDARD;
    } else {
      tier = Tier.MINI;
    }

    return {
      score: Math.min(score, 100),
      tier,
      ...analysis,
      estimatedInputTokens,
      estimatedOutputTokens,
    };
  }

  /**
   * Check if task requires advanced reasoning
   */
  private requiresReasoning(prompt: string): boolean {
    const reasoningKeywords = [
      'analyze',
      'explain why',
      'design',
      'architect',
      'optimize',
      'debug',
      'troubleshoot',
      'investigate',
      'compare',
      'evaluate',
      'recommend',
      'strategy',
      'plan',
      'figure out',
      'understand',
      'complex',
    ];

    return reasoningKeywords.some((keyword) => prompt.includes(keyword));
  }

  /**
   * Check if task requires code generation/understanding
   */
  private requiresCode(
    prompt: string,
    context?: { hasCode?: boolean },
  ): boolean {
    const codeKeywords = [
      'function',
      'class',
      'implement',
      'code',
      'refactor',
      'bug',
      'error',
      'import',
      'package',
      'api',
      'algorithm',
      'data structure',
      'typescript',
      'javascript',
      'python',
      'java',
      'rust',
      'go',
    ];

    return (
      codeKeywords.some((keyword) => prompt.includes(keyword)) ||
      context?.hasCode === true
    );
  }

  /**
   * Check if task requires creativity
   */
  private requiresCreativity(prompt: string): boolean {
    const creativeKeywords = [
      'create',
      'generate',
      'write',
      'compose',
      'design',
      'brainstorm',
      'ideas',
      'creative',
      'innovative',
      'story',
      'documentation',
      'article',
      'blog',
    ];

    return creativeKeywords.some((keyword) => prompt.includes(keyword));
  }

  /**
   * Check if task is critical (requires high accuracy)
   */
  private isCriticalTask(prompt: string, _context?: unknown): boolean {
    const criticalKeywords = [
      'production',
      'deploy',
      'security',
      'critical',
      'important',
      'urgent',
      'fix',
      'broken',
      'vulnerability',
      'attack',
      'exploit',
    ];

    return criticalKeywords.some((keyword) => prompt.includes(keyword));
  }

  /**
   * Estimate input tokens
   */
  private estimateInputTokens(
    prompt: string,
    context?: {
      conversationLength?: number;
      fileCount?: number;
    },
  ): number {
    // Rough estimate: ~4 characters per token
    let tokens = Math.ceil(prompt.length / 4);

    // Add context tokens
    if (context?.conversationLength) {
      tokens += context.conversationLength * 200; // ~200 tokens per message
    }

    if (context?.fileCount) {
      tokens += context.fileCount * 500; // ~500 tokens per file
    }

    return tokens;
  }

  /**
   * Estimate output tokens
   */
  private estimateOutputTokens(
    prompt: string,
    _context?: {
      conversationLength?: number;
      fileCount?: number;
    },
  ): number {
    // Simple heuristic: output is typically 2-5x input for code tasks
    // and 1-3x for other tasks
    const baseEstimate = Math.ceil(prompt.length / 4);

    if (this.requiresCode(prompt)) {
      return baseEstimate * 4;
    }

    return baseEstimate * 2;
  }

  /**
   * Get human-readable complexity description
   */
  getComplexityDescription(complexity: TaskComplexity): string {
    if (complexity.score >= 70) {
      return 'High complexity - requires advanced model';
    } else if (complexity.score >= 40) {
      return 'Medium complexity - standard model recommended';
    } else {
      return 'Low complexity - mini model sufficient';
    }
  }
}
