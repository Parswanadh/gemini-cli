/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Config } from '../config/config.js';
import type {
  TaskComplexity,
  CostEstimate,
  RoutingStrategy,
  ModelTier,
  ModelPricing,
} from './types.js';
import { ModelTier as Tier, RoutingStrategy as Strategy } from './types.js';
import { ComplexityAnalyzer } from './complexity-analyzer.js';

/**
 * Pricing database for common models
 * Prices are per 1M tokens in USD
 */
const MODEL_PRICING: ModelPricing[] = [
  // Gemini Models (FREE to cheap!)
  {
    providerId: 'google',
    modelId: 'gemini-2.0-flash-exp',
    inputCostPer1M: 0.0,
    outputCostPer1M: 0.0,
    tier: Tier.MINI,
    capabilities: {
      maxTokens: 8192,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  {
    providerId: 'google',
    modelId: 'gemini-1.5-flash',
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.3,
    tier: Tier.MINI,
    capabilities: {
      maxTokens: 8192,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  {
    providerId: 'google',
    modelId: 'gemini-1.5-pro',
    inputCostPer1M: 1.25,
    outputCostPer1M: 5.0,
    tier: Tier.STANDARD,
    capabilities: {
      maxTokens: 8192,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  {
    providerId: 'google',
    modelId: 'gemini-1.5-pro-002',
    inputCostPer1M: 1.25,
    outputCostPer1M: 5.0,
    tier: Tier.ADVANCED,
    capabilities: {
      maxTokens: 8192,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  // OpenAI Models
  {
    providerId: 'openai',
    modelId: 'gpt-4o-mini',
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.6,
    tier: Tier.MINI,
    capabilities: {
      maxTokens: 16384,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  {
    providerId: 'openai',
    modelId: 'gpt-4o',
    inputCostPer1M: 2.5,
    outputCostPer1M: 10.0,
    tier: Tier.STANDARD,
    capabilities: {
      maxTokens: 4096,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  {
    providerId: 'openai',
    modelId: 'o1-preview',
    inputCostPer1M: 15.0,
    outputCostPer1M: 60.0,
    tier: Tier.ADVANCED,
    capabilities: {
      maxTokens: 32768,
      supportsVision: false,
      supportsFunctions: false,
      supportsStreaming: false,
    },
  },
  // Anthropic Models
  {
    providerId: 'anthropic',
    modelId: 'claude-3-5-haiku-20241022',
    inputCostPer1M: 1.0,
    outputCostPer1M: 5.0,
    tier: Tier.MINI,
    capabilities: {
      maxTokens: 8192,
      supportsVision: false,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  {
    providerId: 'anthropic',
    modelId: 'claude-3-5-sonnet-20241022',
    inputCostPer1M: 3.0,
    outputCostPer1M: 15.0,
    tier: Tier.STANDARD,
    capabilities: {
      maxTokens: 8192,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
  {
    providerId: 'anthropic',
    modelId: 'claude-3-opus-20240229',
    inputCostPer1M: 15.0,
    outputCostPer1M: 75.0,
    tier: Tier.ADVANCED,
    capabilities: {
      maxTokens: 4096,
      supportsVision: true,
      supportsFunctions: true,
      supportsStreaming: true,
    },
  },
];

/**
 * Cost-aware model optimizer and router
 *
 * KEY FEATURE: Intelligent fallback when limited providers available
 * - If only Gemini available → Routes between Flash/Pro tiers
 * - If only one model available → Uses that model but tracks would-be savings
 * - Multi-provider → Full optimization across all options
 */
export class CostOptimizer {
  private complexityAnalyzer: ComplexityAnalyzer;
  private strategy: RoutingStrategy;
  private enableOptimization: boolean;

  constructor(
    strategy: RoutingStrategy = Strategy.BALANCED,
    enableOptimization: boolean = true,
  ) {
    this.complexityAnalyzer = new ComplexityAnalyzer();
    this.strategy = strategy;
    this.enableOptimization = enableOptimization;
  }

  /**
   * Select optimal model/provider based on task complexity and cost
   *
   * SMART FALLBACK LOGIC:
   * 1. Check what providers are actually available
   * 2. If only Gemini → Use Gemini tiers (Flash vs Pro)
   * 3. If only one model → Use it, but report potential savings
   * 4. If multi-provider → Full cost optimization
   */
  async selectOptimalProvider(
    prompt: string,
    config: Config,
    context?: {
      conversationLength?: number;
      hasCode?: boolean;
      fileCount?: number;
      isFollowUp?: boolean;
      availableProviders?: string[];
    },
  ): Promise<{
    providerId: string;
    modelId: string;
    complexity: TaskComplexity;
    costEstimate: CostEstimate;
    reasoning: string;
  }> {
    // If optimization is disabled, return current config
    if (!this.enableOptimization) {
      const currentModel = config.getModel();
      const [providerId, modelId] = this.parseModelString(currentModel);
      const pricing = this.getModelPricing(providerId, modelId);
      const complexity = this.complexityAnalyzer.analyze(prompt, context);

      return {
        providerId,
        modelId,
        complexity,
        costEstimate: this.estimateCost(pricing, complexity),
        reasoning: 'Cost optimization disabled, using configured model',
      };
    }

    // Analyze task complexity
    const complexity = this.complexityAnalyzer.analyze(prompt, context);

    // Get available models for the required tier
    const availableModels = this.getAvailableModels(
      complexity.tier,
      context?.availableProviders,
    );

    // FALLBACK: If no models available at this tier, get ANY available model
    if (availableModels.length === 0) {
      const fallbackModels = this.getAvailableModels(
        Tier.MINI, // Try MINI tier
        context?.availableProviders,
      );

      if (fallbackModels.length === 0) {
        // ULTIMATE FALLBACK: Use current configured model
        const currentModel = config.getModel();
        const [providerId, modelId] = this.parseModelString(currentModel);
        const pricing = this.getModelPricing(providerId, modelId);

        return {
          providerId,
          modelId,
          complexity,
          costEstimate: this.estimateCost(pricing, complexity),
          reasoning: `No alternative models available, using configured model ${providerId}/${modelId}`,
        };
      }

      // Use cheapest available model with warning
      const selected = this.selectByStrategy(
        fallbackModels.map((p) => this.estimateCost(p, complexity)),
        complexity,
      );

      return {
        providerId: selected.providerId,
        modelId: selected.modelId,
        complexity,
        costEstimate: selected,
        reasoning: `Task requires ${complexity.tier} tier but not available. Using ${selected.providerId}/${selected.modelId} (best available)`,
      };
    }

    // Estimate costs for all available models
    const estimates = availableModels.map((pricing) =>
      this.estimateCost(pricing, complexity),
    );

    // Select best model based on strategy
    const selected = this.selectByStrategy(estimates, complexity);

    const reasoning = this.generateReasoning(selected, complexity, estimates);

    return {
      providerId: selected.providerId,
      modelId: selected.modelId,
      complexity,
      costEstimate: selected,
      reasoning,
    };
  }

  /**
   * Parse model string into provider and model ID
   * Handles formats like "google/gemini-1.5-pro" or just "gemini-1.5-pro"
   */
  private parseModelString(modelString: string): [string, string] {
    if (modelString.includes('/')) {
      const parts = modelString.split('/');
      return [parts[0], parts.slice(1).join('/')];
    }
    // Default to google if no provider specified
    return ['google', modelString];
  }

  /**
   * Get model pricing information
   */
  private getModelPricing(providerId: string, modelId: string): ModelPricing {
    const pricing = MODEL_PRICING.find(
      (p) => p.providerId === providerId && p.modelId === modelId,
    );

    // If not found, return default pricing
    if (!pricing) {
      return {
        providerId,
        modelId,
        inputCostPer1M: 1.0,
        outputCostPer1M: 3.0,
        tier: Tier.STANDARD,
        capabilities: {
          maxTokens: 8192,
          supportsVision: false,
          supportsFunctions: true,
          supportsStreaming: true,
        },
      };
    }

    return pricing;
  }

  /**
   * Get available models for a given tier
   *
   * SMART FILTERING:
   * - If availableProviders specified → Only use those
   * - If empty/undefined → Use ALL providers (multi-provider optimization)
   * - Includes lower tiers to maximize cost savings
   */
  private getAvailableModels(
    tier: ModelTier,
    availableProviders?: string[],
  ): ModelPricing[] {
    let models = MODEL_PRICING.filter((p) => {
      // For MINI tier, include MINI models
      if (tier === Tier.MINI) {
        return p.tier === Tier.MINI;
      }
      // For STANDARD tier, include MINI and STANDARD
      if (tier === Tier.STANDARD) {
        return p.tier === Tier.MINI || p.tier === Tier.STANDARD;
      }
      // For ADVANCED tier, include all tiers
      return true;
    });

    // Filter by available providers if specified
    if (availableProviders && availableProviders.length > 0) {
      models = models.filter((p) => availableProviders.includes(p.providerId));
    }

    return models;
  }

  /**
   * Estimate cost for a model/task combination
   */
  private estimateCost(
    pricing: ModelPricing,
    complexity: TaskComplexity,
  ): CostEstimate {
    const inputCost =
      (complexity.estimatedInputTokens / 1_000_000) * pricing.inputCostPer1M;
    const outputCost =
      (complexity.estimatedOutputTokens / 1_000_000) * pricing.outputCostPer1M;
    const estimatedCostUsd = inputCost + outputCost;

    // Quality score based on tier
    const qualityScore =
      pricing.tier === Tier.ADVANCED
        ? 90
        : pricing.tier === Tier.STANDARD
          ? 75
          : 60;

    return {
      providerId: pricing.providerId,
      modelId: pricing.modelId,
      estimatedCostUsd,
      inputCostPer1M: pricing.inputCostPer1M,
      outputCostPer1M: pricing.outputCostPer1M,
      estimatedInputTokens: complexity.estimatedInputTokens,
      estimatedOutputTokens: complexity.estimatedOutputTokens,
      tier: pricing.tier,
      qualityScore,
    };
  }

  /**
   * Select best model based on routing strategy
   */
  private selectByStrategy(
    estimates: CostEstimate[],
    _complexity: TaskComplexity,
  ): CostEstimate {
    if (estimates.length === 0) {
      throw new Error('No available models for cost optimization');
    }

    switch (this.strategy) {
      case Strategy.COST_OPTIMIZED:
        // Always choose cheapest
        return estimates.sort(
          (a, b) => a.estimatedCostUsd - b.estimatedCostUsd,
        )[0];

      case Strategy.QUALITY_FIRST:
        // Always choose highest quality
        return estimates.sort((a, b) => b.qualityScore - a.qualityScore)[0];

      case Strategy.BALANCED:
        // Balance cost and quality
        // Score = quality / (cost * 1000)
        return estimates.sort((a, b) => {
          const scoreA =
            a.qualityScore / Math.max(a.estimatedCostUsd * 1000, 0.001);
          const scoreB =
            b.qualityScore / Math.max(b.estimatedCostUsd * 1000, 0.001);
          return scoreB - scoreA;
        })[0];

      default:
        return estimates[0];
    }
  }

  /**
   * Generate reasoning explanation
   */
  private generateReasoning(
    selected: CostEstimate,
    complexity: TaskComplexity,
    allEstimates: CostEstimate[],
  ): string {
    const parts: string[] = [];

    // Complexity reasoning
    parts.push(
      `Task complexity: ${complexity.score}/100 (${complexity.tier} tier)`,
    );

    if (complexity.requiresReasoning) {
      parts.push('requires advanced reasoning');
    }
    if (complexity.requiresCode) {
      parts.push('involves code generation');
    }
    if (complexity.isCritical) {
      parts.push('is critical and requires high accuracy');
    }

    // Model selection reasoning
    parts.push(
      `Selected ${selected.providerId}/${selected.modelId} ` +
        `(est. $${selected.estimatedCostUsd.toFixed(4)})`,
    );

    // Cost savings if applicable
    if (allEstimates.length > 1) {
      const mostExpensive = allEstimates.sort(
        (a, b) => b.estimatedCostUsd - a.estimatedCostUsd,
      )[0];

      if (selected.modelId !== mostExpensive.modelId) {
        const savings =
          mostExpensive.estimatedCostUsd - selected.estimatedCostUsd;
        const savingsPercent = (savings / mostExpensive.estimatedCostUsd) * 100;
        parts.push(
          `saving ~${savingsPercent.toFixed(0)}% vs most expensive option`,
        );
      }
    }

    return parts.join(', ');
  }

  /**
   * Set routing strategy
   */
  setStrategy(strategy: RoutingStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Enable/disable cost optimization
   */
  setOptimization(enabled: boolean): void {
    this.enableOptimization = enabled;
  }

  /**
   * Get current strategy
   */
  getStrategy(): RoutingStrategy {
    return this.strategy;
  }

  /**
   * Check if optimization is enabled
   */
  isOptimizationEnabled(): boolean {
    return this.enableOptimization;
  }

  /**
   * Get available providers from pricing database
   */
  getAvailableProviders(): string[] {
    return [...new Set(MODEL_PRICING.map((p) => p.providerId))];
  }

  /**
   * Check if a specific provider is available
   */
  hasProvider(providerId: string): boolean {
    return MODEL_PRICING.some((p) => p.providerId === providerId);
  }
}
