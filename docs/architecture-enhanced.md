# Enhanced Gemini CLI Architecture with Multi-Provider Support

> **Version**: 2.0 - Enhanced Architecture  
> **Date**: October 30, 2025  
> **Status**: Proposed Enhancement

## Table of Contents

1. [Overview](#overview)
2. [Enhanced Package Structure](#enhanced-package-structure)
3. [Current Architecture Analysis](#current-architecture-analysis)
4. [Proposed Enhancements](#proposed-enhancements)
5. [Multi-Provider LLM Integration](#multi-provider-llm-integration)
6. [Enhanced Session & Chat Management](#enhanced-session--chat-management)
7. [Autonomous Agent System](#autonomous-agent-system)
8. [Cross-Session Contextual Memory](#cross-session-contextual-memory)
9. [Cost Optimization & Routing](#cost-optimization--routing)
10. [Plan Mode System](#plan-mode-system)
11. [Learning & Pattern Recognition](#learning--pattern-recognition)
12. [Codebase Semantic Understanding](#codebase-semantic-understanding)
13. [Security Audit System](#security-audit-system)
14. [Performance Analysis](#performance-analysis)
15. [Time Travel & Rollback](#time-travel--rollback)
16. [Analytics & Tracking](#analytics--tracking)
17. [Database Architecture](#database-architecture)
18. [Implementation Roadmap](#implementation-roadmap)
19. [Feature Priority Matrix](#feature-priority-matrix)
20. [Potential Add-ons & Extensions](#potential-add-ons--extensions)

---

## Overview

This document outlines an enhanced architecture for Gemini CLI that extends the
current Google Gemini-focused implementation to support multiple LLM providers
(Ollama, OpenRouter, Claude, ChatGPT, etc.) while introducing advanced session
management with branching conversations similar to modern AI chat applications.

### Key Enhancements

1. **Multi-Provider LLM Support**: Integrate with various LLM providers through
   unified API abstraction
2. **Branching Session Management**: Enable conversation branching and session
   tree navigation
3. **Enhanced Database Layer**: Implement structured storage for conversations,
   sessions, and provider metadata
4. **Provider-Agnostic Tool System**: Extend current tool system to work across
   different LLM providers
5. **Cost Optimization Engine**: Intelligent model routing based on task
   complexity and cost
6. **Plan Mode System**: Preview and approve execution plans before running
   agent tasks
7. **Learning System**: Learn from past executions to improve future performance
8. **Codebase Understanding**: Semantic code analysis and Q&A about your
   codebase
9. **Security Auditing**: Real-time security scanning during code generation
10. **Performance Analysis**: Automated performance optimization suggestions
11. **Time Travel**: Snapshot and rollback capabilities for safe experimentation
12. **Analytics Dashboard**: Track usage, costs, and performance metrics

---

## Enhanced Package Structure

The enhanced architecture introduces 8 new packages/modules to support advanced
features:

```
packages/
├── core/
│   └── src/
│       ├── providers/           # Multi-provider abstraction [EXISTING]
│       │   ├── base-provider.ts
│       │   ├── gemini-provider.ts
│       │   ├── openrouter-provider.ts
│       │   ├── ollama-provider.ts
│       │   ├── openai-provider.ts
│       │   ├── anthropic-provider.ts
│       │   ├── litellm-provider.ts
│       │   └── provider-manager.ts
│       │
│       ├── database/            # SQLite storage layer [EXISTING]
│       │   ├── database-manager.ts
│       │   ├── schema.ts
│       │   ├── migrations.ts
│       │   └── query-builder.ts
│       │
│       ├── session/             # Session & branching management [EXISTING]
│       │   ├── conversation-tree.ts
│       │   ├── session-manager.ts
│       │   ├── timeline.ts              # [NEW] Time travel system
│       │   └── undo-manager.ts          # [NEW] Rollback capabilities
│       │
│       ├── agents/              # Autonomous agent system [EXISTING]
│       │   ├── autonomous-agent.ts
│       │   ├── agent-actions.ts
│       │   ├── agent-memory.ts
│       │   └── execution-validator.ts
│       │
│       ├── memory/              # Cross-session contextual memory [EXISTING]
│       │   ├── contextual-memory.ts
│       │   ├── vector-database.ts
│       │   ├── entity-extractor.ts
│       │   ├── topic-classifier.ts
│       │   └── knowledge-graph.ts
│       │
│       ├── routing/             # Cost optimization engine [NEW]
│       │   ├── cost-optimizer.ts        # Intelligent model selection
│       │   ├── provider-selector.ts     # Route based on complexity
│       │   ├── complexity-analyzer.ts   # Task complexity scoring
│       │   └── cost-tracker.ts          # Track spend per provider
│       │
│       ├── security/            # Security audit system [NEW]
│       │   ├── security-auditor.ts      # Vulnerability scanning
│       │   ├── secret-detector.ts       # Detect hardcoded secrets
│       │   ├── injection-checker.ts     # SQL/XSS/Command injection
│       │   └── dependency-auditor.ts    # Check for known vulns
│       │
│       ├── performance/         # Performance analyzer [NEW]
│       │   ├── performance-analyzer.ts  # Detect bottlenecks
│       │   ├── query-optimizer.ts       # Database query optimization
│       │   ├── bundle-analyzer.ts       # Code bloat detection
│       │   └── metrics-collector.ts     # Performance metrics
│       │
│       ├── learning/            # Pattern learning engine [NEW]
│       │   ├── pattern-learner.ts       # Learn from executions
│       │   ├── success-analyzer.ts      # What works well
│       │   ├── failure-analyzer.ts      # What fails and why
│       │   └── recommendation-engine.ts # Suggest approaches
│       │
│       ├── planning/            # Plan mode system [NEW]
│       │   ├── plan-mode.ts             # Planning mode manager
│       │   ├── plan-executor.ts         # Execute approved plans
│       │   ├── plan-modifier.ts         # User plan modifications
│       │   └── plan-validator.ts        # Validate plans before execution
│       │
│       ├── analytics/           # Usage tracking & stats [NEW]
│       │   ├── usage-tracker.ts         # Track API usage
│       │   ├── stats-aggregator.ts      # Aggregate statistics
│       │   ├── cost-reporter.ts         # Cost reports
│       │   └── performance-reporter.ts  # Performance reports
│       │
│       ├── codebase/            # Semantic code understanding [NEW]
│       │   ├── code-analyzer.ts         # AST parsing & analysis
│       │   ├── ast-parser.ts            # Multi-language AST
│       │   ├── dependency-graph.ts      # File relationships
│       │   ├── code-qa.ts               # Answer code questions
│       │   └── implementation-finder.ts # Find implementations
│       │
│       ├── collaboration/       # Team workspace features [NEW]
│       │   ├── team-workspace.ts        # Shared patterns/skills
│       │   ├── pattern-sharing.ts       # Share learned patterns
│       │   ├── team-analytics.ts        # Team statistics
│       │   └── collaboration-sync.ts    # Sync across team
│       │
│       ├── config/              # Configuration management [EXISTING]
│       ├── services/            # Core services [EXISTING]
│       ├── tools/               # Tool implementations [EXISTING]
│       └── types/               # TypeScript definitions [EXISTING]
│
├── cli/
│   └── src/
│       ├── commands/            # CLI commands [EXISTING + NEW]
│       │   ├── agent.ts         # Agent commands
│       │   ├── plan.ts          # [NEW] Plan mode commands
│       │   ├── cost.ts          # [NEW] Cost tracking commands
│       │   ├── security.ts      # [NEW] Security audit commands
│       │   ├── performance.ts   # [NEW] Performance commands
│       │   ├── codebase.ts      # [NEW] Codebase analysis commands
│       │   ├── timeline.ts      # [NEW] Time travel commands
│       │   ├── learning.ts      # [NEW] Learning system commands
│       │   └── analytics.ts     # [NEW] Analytics commands
│       │
│       ├── ui/                  # React Ink components [MODIFIED]
│       │   ├── plan-review.tsx          # [NEW] Interactive plan review
│       │   ├── diff-viewer.tsx          # [NEW] Visual code diff
│       │   ├── cost-display.tsx         # [NEW] Cost estimation display
│       │   ├── agent-monitor.tsx        # [NEW] Agent execution monitor
│       │   ├── security-alert.tsx       # [NEW] Security warnings
│       │   ├── performance-report.tsx   # [NEW] Performance insights
│       │   └── timeline-viewer.tsx      # [NEW] Session timeline
│       │
│       └── utils/               # CLI utilities [EXISTING]
│
├── web/                         # Analytics dashboard [NEW - Optional]
│   └── src/
│       ├── components/          # React dashboard components
│       │   ├── CostChart.tsx            # Cost visualization
│       │   ├── UsageChart.tsx           # Usage statistics
│       │   ├── PerformanceMetrics.tsx   # Performance dashboard
│       │   └── LearningInsights.tsx     # Learning patterns
│       │
│       ├── pages/               # Dashboard pages
│       │   ├── Overview.tsx             # Main dashboard
│       │   ├── Costs.tsx                # Cost analysis
│       │   ├── Security.tsx             # Security reports
│       │   └── Performance.tsx          # Performance insights
│       │
│       └── api/                 # API integration
│           └── database-client.ts       # Connect to SQLite
│
└── test-utils/
    └── src/                     # Shared testing utilities [EXISTING]
```

### New Database Tables

Enhanced schema adds 8 new tables to support advanced features:

```sql
-- Cost tracking
CREATE TABLE costTracking (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  nodeId TEXT,
  providerId TEXT NOT NULL,
  modelId TEXT NOT NULL,
  inputTokens INTEGER NOT NULL,
  outputTokens INTEGER NOT NULL,
  costUsd REAL NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions(id),
  FOREIGN KEY (providerId) REFERENCES providers(id)
);

-- Security audit findings
CREATE TABLE securityAudit (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  nodeId TEXT,
  severity TEXT NOT NULL, -- critical, high, medium, low
  category TEXT NOT NULL, -- injection, secrets, xss, etc.
  description TEXT NOT NULL,
  location TEXT, -- file:line
  suggestion TEXT,
  status TEXT DEFAULT 'open', -- open, resolved, ignored
  timestamp TEXT NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions(id)
);

-- Performance metrics
CREATE TABLE performanceMetrics (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  nodeId TEXT,
  metricType TEXT NOT NULL, -- execution_time, memory_usage, query_time
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  context TEXT, -- JSON with additional details
  timestamp TEXT NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions(id)
);

-- Learned patterns
CREATE TABLE learnedPatterns (
  id TEXT PRIMARY KEY,
  taskType TEXT NOT NULL,
  pattern TEXT NOT NULL, -- JSON describing the pattern
  successCount INTEGER DEFAULT 0,
  failureCount INTEGER DEFAULT 0,
  successRate REAL,
  avgExecutionTime REAL,
  lastUsed TEXT,
  context TEXT, -- JSON with metadata
  createdAt TEXT NOT NULL
);

-- Execution snapshots (for time travel)
CREATE TABLE executionSnapshots (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  label TEXT,
  timestamp TEXT NOT NULL,
  fileStates TEXT NOT NULL, -- JSON of file contents
  databaseState TEXT, -- JSON of relevant DB state
  metadata TEXT, -- JSON with additional info
  FOREIGN KEY (sessionId) REFERENCES sessions(id)
);

-- Usage analytics
CREATE TABLE usageAnalytics (
  id TEXT PRIMARY KEY,
  sessionId TEXT,
  eventType TEXT NOT NULL, -- session_start, command_run, agent_execute, etc.
  eventData TEXT, -- JSON with event details
  userId TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions(id)
);

-- Codebase index
CREATE TABLE codebaseIndex (
  id TEXT PRIMARY KEY,
  filePath TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL,
  astData TEXT, -- JSON AST representation
  exports TEXT, -- JSON array of exports
  imports TEXT, -- JSON array of imports
  functions TEXT, -- JSON array of functions
  classes TEXT, -- JSON array of classes
  lastAnalyzed TEXT NOT NULL,
  fileHash TEXT NOT NULL
);

-- Team workspace (optional)
CREATE TABLE teamWorkspace (
  id TEXT PRIMARY KEY,
  teamId TEXT NOT NULL,
  sharedPatterns TEXT, -- JSON array of pattern IDs
  sharedSkills TEXT, -- JSON array of skills
  statistics TEXT, -- JSON team stats
  settings TEXT, -- JSON team settings
  lastSync TEXT NOT NULL
);
```

### Key Dependencies to Add

Update `package.json` with these new dependencies:

```json
{
  "dependencies": {
    "better-sqlite3": "^11.0.0",
    "sqlite-vec": "^1.0.0",
    "@google/generative-ai": "latest",
    "openai": "latest",
    "@anthropic-ai/sdk": "latest",
    "axios": "latest",
    "commander": "latest",
    "chalk": "latest",
    "ora": "latest",
    "@typescript-eslint/parser": "latest",
    "typescript": "^5.3.0",
    "prettier": "latest",
    "tree-kill": "^1.2.0",
    "dotenv": "latest",
    "uuid": "latest",
    "ink": "latest",
    "ink-select-input": "latest",
    "espree": "^10.0.0",
    "esprima": "^4.0.1",
    "acorn": "^8.11.0",
    "ast-types": "^0.16.1"
  },
  "devDependencies": {
    "vitest": "latest",
    "c8": "latest",
    "@types/better-sqlite3": "latest",
    "@types/espree": "latest"
  }
}
```

---

## Current Architecture Analysis

### Existing Components

#### 1. **CLI Package** (`packages/cli/`)

- **Purpose**: User-facing terminal interface
- **Key Features**:
  - Input processing and command handling
  - History management via `ChatRecordingService`
  - Display rendering with React Ink
  - Theme customization

#### 2. **Core Package** (`packages/core/`)

- **Purpose**: Backend logic and API orchestration
- **Key Components**:
  - `ContentGenerator`: API abstraction layer
  - `GeminiClient`: Google Gemini-specific client
  - `GeminiChat`: Chat session management
  - `ChatRecordingService`: Conversation persistence
  - Tool registry and execution

#### 3. **Current Authentication System**

```typescript
// Current authentication methods in contentGenerator.ts
export enum AuthType {
  LOGIN_WITH_GOOGLE = 'oauth-personal',
  USE_GEMINI = 'gemini-api-key',
  USE_VERTEX_AI = 'vertex-ai',
  CLOUD_SHELL = 'cloud-shell',
}
```

#### 4. **Session Storage**

- **Location**: `~/.gemini/tmp/<project_hash>/chats/`
- **Format**: JSON files with naming pattern
  `session-<timestamp>-<sessionId>.json`
- **Structure**:
  ```typescript
  interface ConversationRecord {
    sessionId: string;
    projectHash: string;
    startTime: string;
    lastUpdated: string;
    messages: MessageRecord[];
  }
  ```

### Current Limitations

1. **Single Provider Lock-in**: Tightly coupled to Google Gemini API
2. **Linear Session History**: No conversation branching support
3. **Limited Session Metadata**: Basic timestamp-based tracking
4. **No Cross-Provider Compatibility**: Tools designed specifically for Gemini

---

## Proposed Enhancements

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CLI Interface Layer                      │
│                    (packages/cli/)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ Commands │  │  Input   │  │ Display  │                 │
│  │ Handler  │  │ Processor│  │ Renderer │                 │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                 │
└───────┼─────────────┼─────────────┼───────────────────────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
┌─────────────────────▼─────────────────────────────────────┐
│              Core Orchestration Layer                      │
│                 (packages/core/)                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │        Unified LLM Provider Manager                   │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │
│  │  │  Gemini  │  │  OpenAI  │  │  Ollama  │    ...    │ │
│  │  │ Provider │  │ Provider │  │ Provider │           │ │
│  │  └──────────┘  └──────────┘  └──────────┘           │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │        Enhanced Session Manager                       │ │
│  │  • Branching conversations                           │ │
│  │  • Session tree navigation                           │ │
│  │  • Multi-session context                             │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │        Provider-Agnostic Tool System                  │ │
│  │  • Tool capability mapping                           │ │
│  │  • Provider-specific adaptations                     │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────┬──────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────┐
│              Database & Storage Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   Sessions   │  │ Conversations│  │    Provider     │ │
│  │   Database   │  │     Tree     │  │   Credentials   │ │
│  └──────────────┘  └──────────────┘  └─────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

---

## Multi-Provider LLM Integration

### 1. Provider Abstraction Layer

Create a unified interface that all LLM providers must implement:

```typescript
// packages/core/src/providers/base-provider.ts

export interface LLMProvider {
  readonly name: string;
  readonly type: ProviderType;
  readonly capabilities: ProviderCapabilities;

  // Authentication
  authenticate(config: AuthConfig): Promise<void>;
  isAuthenticated(): boolean;

  // Chat operations
  generateContent(request: UnifiedRequest): Promise<UnifiedResponse>;
  streamContent(request: UnifiedRequest): AsyncGenerator<UnifiedStreamChunk>;
  countTokens(content: Content[]): Promise<number>;

  // Provider-specific features
  supportsFeature(feature: LLMFeature): boolean;
  getModels(): Promise<ModelInfo[]>;
}

export enum ProviderType {
  GOOGLE_GEMINI = 'google-gemini',
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  OLLAMA = 'ollama',
  OPENROUTER = 'openrouter',
  AZURE_OPENAI = 'azure-openai',
  LITELLM = 'litellm',
}

export interface ProviderCapabilities {
  streaming: boolean;
  functionCalling: boolean;
  vision: boolean;
  systemPrompts: boolean;
  thinking: boolean;
  maxContextTokens: number;
}
```

### 2. OpenRouter Integration

OpenRouter provides access to 100+ models through a single OpenAI-compatible
API:

```typescript
// packages/core/src/providers/openrouter-provider.ts

export class OpenRouterProvider implements LLMProvider {
  readonly name = 'OpenRouter';
  readonly type = ProviderType.OPENROUTER;

  private client: OpenAI;

  constructor(config: OpenRouterConfig) {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: config.apiKey,
      defaultHeaders: {
        'HTTP-Referer': config.siteUrl || 'https://gemini-cli.com',
        'X-Title': 'Gemini CLI',
      },
    });
  }

  async generateContent(request: UnifiedRequest): Promise<UnifiedResponse> {
    const response = await this.client.chat.completions.create({
      model: request.model,
      messages: this.convertToOpenAIMessages(request.messages),
      tools: request.tools ? this.convertTools(request.tools) : undefined,
      temperature: request.temperature,
      max_tokens: request.maxTokens,
    });

    return this.convertToUnifiedResponse(response);
  }

  // Model routing - let OpenRouter choose the best model
  async generateContentWithRouting(
    request: UnifiedRequest,
    models: string[],
  ): Promise<UnifiedResponse> {
    return this.generateContent({
      ...request,
      model: 'openrouter/auto', // Auto-routing feature
    });
  }
}
```

### 3. Ollama Integration (Local LLMs)

Support for locally hosted models:

```typescript
// packages/core/src/providers/ollama-provider.ts

export class OllamaProvider implements LLMProvider {
  readonly name = 'Ollama';
  readonly type = ProviderType.OLLAMA;

  private baseUrl: string;

  constructor(config: OllamaConfig) {
    this.baseUrl = config.baseUrl || 'http://localhost:11434';
  }

  async generateContent(request: UnifiedRequest): Promise<UnifiedResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        stream: false,
        options: {
          temperature: request.temperature,
          num_predict: request.maxTokens,
        },
      }),
    });

    const data = await response.json();
    return this.convertToUnifiedResponse(data);
  }

  async *streamContent(
    request: UnifiedRequest,
  ): AsyncGenerator<UnifiedStreamChunk> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        const data = JSON.parse(line);
        yield this.convertToUnifiedStreamChunk(data);
      }
    }
  }

  async getModels(): Promise<ModelInfo[]> {
    const response = await fetch(`${this.baseUrl}/api/tags`);
    const data = await response.json();

    return data.models.map((model: any) => ({
      id: model.name,
      name: model.name,
      contextWindow: model.context_length || 4096,
      provider: this.type,
    }));
  }
}
```

### 4. LiteLLM Proxy Integration

For organizations using LiteLLM as a unified gateway:

```typescript
// packages/core/src/providers/litellm-provider.ts

export class LiteLLMProvider implements LLMProvider {
  readonly name = 'LiteLLM';
  readonly type = ProviderType.LITELLM;

  private client: OpenAI;

  constructor(config: LiteLLMConfig) {
    this.client = new OpenAI({
      baseURL: config.proxyUrl, // e.g., http://localhost:4000
      apiKey: config.apiKey,
    });
  }

  async generateContent(request: UnifiedRequest): Promise<UnifiedResponse> {
    // LiteLLM accepts OpenAI-compatible requests and routes to any provider
    const response = await this.client.chat.completions.create({
      model: request.model, // Can be any model: gpt-4, claude-3, gemini-pro, etc.
      messages: this.convertToOpenAIMessages(request.messages),
      tools: request.tools ? this.convertTools(request.tools) : undefined,
    });

    return this.convertToUnifiedResponse(response);
  }
}
```

### 5. Provider Manager

Central manager to handle multiple providers:

```typescript
// packages/core/src/providers/provider-manager.ts

export class ProviderManager {
  private providers: Map<ProviderType, LLMProvider> = new Map();
  private activeProvider: ProviderType | null = null;

  registerProvider(provider: LLMProvider): void {
    this.providers.set(provider.type, provider);
  }

  setActiveProvider(type: ProviderType): void {
    if (!this.providers.has(type)) {
      throw new Error(`Provider ${type} not registered`);
    }
    this.activeProvider = type;
  }

  getActiveProvider(): LLMProvider {
    if (!this.activeProvider) {
      throw new Error('No active provider set');
    }
    return this.providers.get(this.activeProvider)!;
  }

  async initializeProviders(configs: ProviderConfig[]): Promise<void> {
    for (const config of configs) {
      const provider = this.createProvider(config);
      await provider.authenticate(config.auth);
      this.registerProvider(provider);
    }
  }

  private createProvider(config: ProviderConfig): LLMProvider {
    switch (config.type) {
      case ProviderType.GOOGLE_GEMINI:
        return new GeminiProvider(config);
      case ProviderType.OLLAMA:
        return new OllamaProvider(config);
      case ProviderType.OPENROUTER:
        return new OpenRouterProvider(config);
      case ProviderType.OPENAI:
        return new OpenAIProvider(config);
      case ProviderType.ANTHROPIC:
        return new AnthropicProvider(config);
      case ProviderType.LITELLM:
        return new LiteLLMProvider(config);
      default:
        throw new Error(`Unsupported provider type: ${config.type}`);
    }
  }

  // Multi-provider fallback
  async generateWithFallback(
    request: UnifiedRequest,
    providerOrder: ProviderType[],
  ): Promise<UnifiedResponse> {
    for (const providerType of providerOrder) {
      try {
        const provider = this.providers.get(providerType);
        if (provider) {
          return await provider.generateContent(request);
        }
      } catch (error) {
        console.warn(`Provider ${providerType} failed:`, error);
        // Continue to next provider
      }
    }
    throw new Error('All providers failed');
  }
}
```

---

## Enhanced Session & Chat Management

### 1. Branching Conversations

Implement conversation branching similar to ChatGPT/Claude:

```typescript
// packages/core/src/session/conversation-tree.ts

export interface ConversationNode {
  id: string;
  parentId: string | null;
  messageId: string;
  message: MessageRecord;
  children: string[]; // Child node IDs
  createdAt: string;
  provider: ProviderType;
  model: string;
}

export interface ConversationBranch {
  id: string;
  name?: string;
  path: string[]; // Array of node IDs from root to current
  currentNodeId: string;
  createdAt: string;
  lastActive: string;
}

export class ConversationTree {
  private nodes: Map<string, ConversationNode> = new Map();
  private branches: Map<string, ConversationBranch> = new Map();
  private rootNodeId: string | null = null;
  private activeBranchId: string | null = null;

  // Add a message to the tree
  addMessage(
    message: MessageRecord,
    parentNodeId: string | null,
    branchId?: string,
  ): ConversationNode {
    const node: ConversationNode = {
      id: randomUUID(),
      parentId: parentNodeId,
      messageId: message.id,
      message,
      children: [],
      createdAt: new Date().toISOString(),
      provider: message.provider || ProviderType.GOOGLE_GEMINI,
      model: message.model || 'unknown',
    };

    this.nodes.set(node.id, node);

    if (parentNodeId) {
      const parent = this.nodes.get(parentNodeId);
      if (parent) {
        parent.children.push(node.id);
      }
    } else {
      this.rootNodeId = node.id;
    }

    // Update or create branch
    if (branchId) {
      this.updateBranch(branchId, node.id);
    } else {
      this.createBranch(node.id);
    }

    return node;
  }

  // Create a new branch from a specific node
  createBranchFromNode(nodeId: string, name?: string): ConversationBranch {
    const path = this.getPathToNode(nodeId);

    const branch: ConversationBranch = {
      id: randomUUID(),
      name,
      path,
      currentNodeId: nodeId,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    this.branches.set(branch.id, branch);
    return branch;
  }

  // Get all messages in the current branch
  getBranchMessages(branchId: string): MessageRecord[] {
    const branch = this.branches.get(branchId);
    if (!branch) return [];

    return branch.path
      .map((nodeId) => this.nodes.get(nodeId)?.message)
      .filter((msg): msg is MessageRecord => msg !== undefined);
  }

  // Navigate to a sibling message (alternative response)
  navigateToSibling(
    nodeId: string,
    direction: 'previous' | 'next',
  ): ConversationNode | null {
    const node = this.nodes.get(nodeId);
    if (!node?.parentId) return null;

    const parent = this.nodes.get(node.parentId);
    if (!parent) return null;

    const currentIndex = parent.children.indexOf(nodeId);
    const targetIndex =
      direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex < 0 || targetIndex >= parent.children.length) {
      return null;
    }

    const targetNodeId = parent.children[targetIndex];
    return this.nodes.get(targetNodeId) || null;
  }

  private getPathToNode(nodeId: string): string[] {
    const path: string[] = [];
    let currentId: string | null = nodeId;

    while (currentId) {
      path.unshift(currentId);
      const node = this.nodes.get(currentId);
      currentId = node?.parentId || null;
    }

    return path;
  }

  // Serialize tree for storage
  toJSON(): ConversationTreeData {
    return {
      nodes: Array.from(this.nodes.entries()),
      branches: Array.from(this.branches.entries()),
      rootNodeId: this.rootNodeId,
      activeBranchId: this.activeBranchId,
    };
  }

  // Deserialize tree from storage
  static fromJSON(data: ConversationTreeData): ConversationTree {
    const tree = new ConversationTree();
    tree.nodes = new Map(data.nodes);
    tree.branches = new Map(data.branches);
    tree.rootNodeId = data.rootNodeId;
    tree.activeBranchId = data.activeBranchId;
    return tree;
  }
}
```

### 2. Enhanced Session Manager

```typescript
// packages/core/src/session/enhanced-session-manager.ts

export class EnhancedSessionManager {
  private sessions: Map<string, SessionData> = new Map();
  private conversationTrees: Map<string, ConversationTree> = new Map();

  createSession(config: SessionConfig): SessionData {
    const session: SessionData = {
      id: randomUUID(),
      name: config.name,
      provider: config.provider,
      model: config.model,
      conversationTree: new ConversationTree(),
      metadata: {
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        totalMessages: 0,
        totalBranches: 1,
        providers: [config.provider],
      },
    };

    this.sessions.set(session.id, session);
    this.conversationTrees.set(session.id, session.conversationTree);

    return session;
  }

  // Add message with automatic branching detection
  addMessage(
    sessionId: string,
    message: MessageRecord,
    options?: {
      parentNodeId?: string;
      createNewBranch?: boolean;
      branchName?: string;
    },
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    const tree = session.conversationTree;
    const parentNodeId = options?.parentNodeId || null;

    // Detect if we're creating a new branch (multiple children from same parent)
    if (parentNodeId) {
      const parentNode = tree['nodes'].get(parentNodeId);
      if (
        parentNode &&
        parentNode.children.length > 0 &&
        options?.createNewBranch
      ) {
        // Creating alternative response - new branch
        const branchId = tree.createBranchFromNode(
          parentNodeId,
          options.branchName,
        ).id;
        tree.addMessage(message, parentNodeId, branchId);
        session.metadata.totalBranches++;
      } else {
        tree.addMessage(message, parentNodeId);
      }
    } else {
      tree.addMessage(message, null);
    }

    session.metadata.totalMessages++;
    session.metadata.lastActive = new Date().toISOString();

    // Track provider usage
    if (
      message.provider &&
      !session.metadata.providers.includes(message.provider)
    ) {
      session.metadata.providers.push(message.provider);
    }
  }

  // Switch between conversation branches
  switchBranch(sessionId: string, branchId: string): MessageRecord[] {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    return session.conversationTree.getBranchMessages(branchId);
  }

  // Get all branches in a session
  getBranches(sessionId: string): ConversationBranch[] {
    const session = this.sessions.get(sessionId);
    if (!session) return [];

    const tree = session.conversationTree;
    return Array.from(tree['branches'].values());
  }

  // Compare two branches
  compareBranches(
    sessionId: string,
    branchId1: string,
    branchId2: string,
  ): BranchComparison {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    const messages1 = session.conversationTree.getBranchMessages(branchId1);
    const messages2 = session.conversationTree.getBranchMessages(branchId2);

    // Find divergence point
    let divergenceIndex = 0;
    while (
      divergenceIndex < Math.min(messages1.length, messages2.length) &&
      messages1[divergenceIndex].id === messages2[divergenceIndex].id
    ) {
      divergenceIndex++;
    }

    return {
      commonPrefix: messages1.slice(0, divergenceIndex),
      branch1Unique: messages1.slice(divergenceIndex),
      branch2Unique: messages2.slice(divergenceIndex),
      divergenceIndex,
    };
  }
}
```

---

## Autonomous Agent System

### Overview

The Autonomous Agent System enables Gemini CLI to execute complex, multi-step
tasks independently with iterative error resolution, code validation, and
self-correction capabilities. This transforms the CLI from a conversational tool
into an autonomous coding assistant.

### Core Concepts

**Agent Task Flow:**

```
User Task → Task Planning → Execution Loop → Validation → Refinement → Delivery
                ↓              ↓              ↓            ↓            ↓
         Break into steps → Execute → Check output → Fix errors → Compare with intent
```

### 1. Agent Architecture

```typescript
// packages/core/src/agents/autonomous-agent.ts

export interface AgentTask {
  id: string;
  description: string;
  intent: string;
  requirements: string[];
  constraints?: string[];
  acceptanceCriteria: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface AgentExecutionPlan {
  taskId: string;
  steps: ExecutionStep[];
  estimatedDuration: number;
  requiredTools: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ExecutionStep {
  id: string;
  order: number;
  action: AgentAction;
  description: string;
  dependencies: string[]; // IDs of steps that must complete first
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  retryCount: number;
  maxRetries: number;
  result?: StepResult;
}

export enum AgentAction {
  CREATE_FILE = 'create_file',
  EDIT_FILE = 'edit_file',
  RUN_COMMAND = 'run_command',
  TEST_CODE = 'test_code',
  DEBUG_ERROR = 'debug_error',
  VALIDATE_OUTPUT = 'validate_output',
  RESEARCH = 'research',
  INSTALL_DEPENDENCY = 'install_dependency',
  GIT_OPERATION = 'git_operation',
}

export interface StepResult {
  success: boolean;
  output?: string;
  error?: string;
  artifacts?: string[]; // Created files, etc.
  metrics?: {
    duration: number;
    tokensUsed: number;
    attempts: number;
  };
}

export class AutonomousAgent {
  private taskQueue: AgentTask[] = [];
  private currentTask: AgentTask | null = null;
  private executionPlan: AgentExecutionPlan | null = null;
  private executionHistory: ExecutionHistory[] = [];

  constructor(
    private config: Config,
    private providerManager: ProviderManager,
    private toolRegistry: ToolRegistry,
  ) {}

  async executeTask(task: AgentTask): Promise<AgentTaskResult> {
    this.currentTask = task;

    try {
      // Step 1: Analyze task and create execution plan
      console.log(`🤖 Agent: Analyzing task "${task.description}"...`);
      this.executionPlan = await this.createExecutionPlan(task);

      // Step 2: Get user confirmation for plan
      const approved = await this.presentPlanForApproval(this.executionPlan);
      if (!approved) {
        return { success: false, reason: 'User rejected execution plan' };
      }

      // Step 3: Execute plan with iterative error resolution
      const result = await this.executeIterativePlan(this.executionPlan, task);

      // Step 4: Validate against acceptance criteria
      const validation = await this.validateAgainstIntent(result, task);

      // Step 5: Final refinement if needed
      if (!validation.meetsRequirements) {
        console.log(`🔧 Agent: Refining solution based on validation...`);
        const refinedResult = await this.refineSolution(
          result,
          validation.gaps,
          task,
        );
        return refinedResult;
      }

      return result;
    } catch (error) {
      console.error(`❌ Agent: Task execution failed:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    } finally {
      this.recordExecution();
    }
  }

  private async createExecutionPlan(
    task: AgentTask,
  ): Promise<AgentExecutionPlan> {
    const provider = this.providerManager.getActiveProvider();

    const planningPrompt = `
You are an autonomous coding agent. Analyze this task and create a detailed execution plan.

Task: ${task.description}
Intent: ${task.intent}
Requirements: ${task.requirements.join(', ')}
Acceptance Criteria: ${task.acceptanceCriteria.join(', ')}

Create a step-by-step execution plan that:
1. Breaks down the task into atomic, executable steps
2. Identifies dependencies between steps
3. Specifies which tools/commands to use
4. Includes validation and testing steps
5. Plans for potential errors and retry strategies

Output format: JSON with steps array, each containing:
- action (type of operation)
- description (what this step does)
- dependencies (array of step IDs)
- maxRetries (number of retry attempts)
    `;

    const response = await provider.generateContent({
      model: this.config.getModel(),
      messages: [{ role: 'user', content: planningPrompt }],
      temperature: 0.3, // Lower temperature for planning
    });

    const planData = JSON.parse(response.content);

    return {
      taskId: task.id,
      steps: planData.steps.map((step: any, index: number) => ({
        id: `step-${index}`,
        order: index,
        action: step.action,
        description: step.description,
        dependencies: step.dependencies || [],
        status: 'pending',
        retryCount: 0,
        maxRetries: step.maxRetries || 3,
      })),
      estimatedDuration: planData.estimatedDuration || 300,
      requiredTools: planData.requiredTools || [],
      riskLevel: planData.riskLevel || 'medium',
    };
  }

  private async executeIterativePlan(
    plan: AgentExecutionPlan,
    task: AgentTask,
  ): Promise<AgentTaskResult> {
    const results: StepResult[] = [];
    const createdFiles: string[] = [];

    for (const step of plan.steps) {
      console.log(
        `\n📍 Step ${step.order + 1}/${plan.steps.length}: ${step.description}`,
      );

      // Check if dependencies are met
      const dependenciesMet = step.dependencies.every((depId) => {
        const depStep = plan.steps.find((s) => s.id === depId);
        return depStep?.status === 'completed';
      });

      if (!dependenciesMet) {
        console.log(`⏸️  Waiting for dependencies...`);
        step.status = 'skipped';
        continue;
      }

      // Execute step with retry logic
      let success = false;
      let lastError: string | undefined;

      while (step.retryCount < step.maxRetries && !success) {
        step.status = 'running';

        try {
          const result = await this.executeStep(step, task, createdFiles);

          if (result.success) {
            success = true;
            step.status = 'completed';
            step.result = result;
            results.push(result);

            if (result.artifacts) {
              createdFiles.push(...result.artifacts);
            }

            console.log(`✅ Step completed successfully`);
          } else {
            throw new Error(result.error || 'Step failed');
          }
        } catch (error) {
          step.retryCount++;
          lastError = error instanceof Error ? error.message : String(error);
          console.log(
            `⚠️  Attempt ${step.retryCount}/${step.maxRetries} failed: ${lastError}`,
          );

          if (step.retryCount < step.maxRetries) {
            // Analyze error and adjust approach
            console.log(`🔍 Agent: Analyzing error and adjusting approach...`);
            await this.debugAndAdjust(step, lastError, task);
          }
        }
      }

      if (!success) {
        step.status = 'failed';
        console.error(`❌ Step failed after ${step.maxRetries} attempts`);

        // Try to recover or find alternative approach
        const recovered = await this.attemptRecovery(step, plan, task);
        if (!recovered) {
          return {
            success: false,
            error: `Failed at step ${step.order + 1}: ${lastError}`,
            completedSteps: results,
            artifacts: createdFiles,
          };
        }
      }
    }

    return {
      success: true,
      completedSteps: results,
      artifacts: createdFiles,
      message: 'Task completed successfully',
    };
  }

  private async executeStep(
    step: ExecutionStep,
    task: AgentTask,
    context: string[],
  ): Promise<StepResult> {
    const startTime = Date.now();

    switch (step.action) {
      case AgentAction.CREATE_FILE:
        return await this.createFile(step, task);

      case AgentAction.EDIT_FILE:
        return await this.editFile(step, task, context);

      case AgentAction.RUN_COMMAND:
        return await this.runCommand(step, task);

      case AgentAction.TEST_CODE:
        return await this.testCode(step, task, context);

      case AgentAction.DEBUG_ERROR:
        return await this.debugError(step, task);

      case AgentAction.VALIDATE_OUTPUT:
        return await this.validateOutput(step, task);

      case AgentAction.INSTALL_DEPENDENCY:
        return await this.installDependency(step, task);

      default:
        throw new Error(`Unknown action: ${step.action}`);
    }
  }

  private async createFile(
    step: ExecutionStep,
    task: AgentTask,
  ): Promise<StepResult> {
    const provider = this.providerManager.getActiveProvider();

    // Generate file content based on step description
    const prompt = `
Generate the complete code for: ${step.description}

Task context: ${task.description}
Requirements: ${task.requirements.join('\n')}

Provide:
1. File path and name
2. Complete, runnable code
3. Comments explaining key sections
4. Any required imports or dependencies

Output as JSON:
{
  "filePath": "path/to/file",
  "content": "file contents",
  "language": "typescript|python|etc",
  "dependencies": ["package1", "package2"]
}
    `;

    const response = await provider.generateContent({
      model: this.config.getModel(),
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const fileData = JSON.parse(response.content);

    // Use WriteFileTool to create the file
    const writeTool = this.toolRegistry.getTool('write_file') as WriteFileTool;
    await writeTool.execute({
      path: fileData.filePath,
      content: fileData.content,
    });

    console.log(`📝 Created file: ${fileData.filePath}`);

    return {
      success: true,
      output: `File created: ${fileData.filePath}`,
      artifacts: [fileData.filePath],
      metrics: {
        duration: Date.now() - Date.now(),
        tokensUsed: 0,
        attempts: 1,
      },
    };
  }

  private async testCode(
    step: ExecutionStep,
    task: AgentTask,
    files: string[],
  ): Promise<StepResult> {
    console.log(`🧪 Testing code...`);

    // Determine test command based on project type
    const testCommand = await this.determineTestCommand(files);

    const shellTool = this.toolRegistry.getTool('shell') as ShellTool;
    const result = await shellTool.execute({ command: testCommand });

    if (result.exitCode === 0) {
      return {
        success: true,
        output: result.stdout,
      };
    } else {
      return {
        success: false,
        error: result.stderr || result.stdout,
      };
    }
  }

  private async debugAndAdjust(
    step: ExecutionStep,
    error: string,
    task: AgentTask,
  ): Promise<void> {
    console.log(`🔧 Agent: Debugging error and adjusting approach...`);

    const provider = this.providerManager.getActiveProvider();

    const debugPrompt = `
An error occurred during task execution:

Step: ${step.description}
Error: ${error}

Task context: ${task.description}
Attempt: ${step.retryCount}/${step.maxRetries}

Analyze the error and suggest:
1. Root cause of the failure
2. Corrective actions to take
3. Alternative approach if applicable
4. Modified step description if needed

Provide practical, actionable solutions.
    `;

    const response = await provider.generateContent({
      model: this.config.getModel(),
      messages: [{ role: 'user', content: debugPrompt }],
      temperature: 0.4,
    });

    console.log(`💡 Debug analysis:\n${response.content}`);

    // Update step description based on analysis
    const analysisData = this.parseDebugAnalysis(response.content);
    if (analysisData.modifiedDescription) {
      step.description = analysisData.modifiedDescription;
    }
  }

  private async validateAgainstIntent(
    result: AgentTaskResult,
    task: AgentTask,
  ): Promise<ValidationResult> {
    console.log(`\n🎯 Validating output against requirements...`);

    const provider = this.providerManager.getActiveProvider();

    const validationPrompt = `
Validate if the completed task meets the requirements:

Original Intent: ${task.intent}
Requirements: ${task.requirements.join('\n')}
Acceptance Criteria: ${task.acceptanceCriteria.join('\n')}

Completed Work:
${result.artifacts?.map((f) => `- ${f}`).join('\n')}

Result: ${result.message}

Assess:
1. Does the output match the original intent?
2. Are all requirements satisfied?
3. Are all acceptance criteria met?
4. What gaps exist, if any?
5. Overall success rating (0-100)

Output as JSON:
{
  "meetsRequirements": true/false,
  "rating": 0-100,
  "gaps": ["gap1", "gap2"],
  "recommendations": ["rec1", "rec2"]
}
    `;

    const response = await provider.generateContent({
      model: this.config.getModel(),
      messages: [{ role: 'user', content: validationPrompt }],
      temperature: 0.2,
    });

    const validation = JSON.parse(response.content);

    console.log(`📊 Validation Score: ${validation.rating}/100`);
    if (validation.gaps.length > 0) {
      console.log(`⚠️  Gaps identified:`);
      validation.gaps.forEach((gap: string) => console.log(`   - ${gap}`));
    }

    return validation;
  }

  private async refineSolution(
    result: AgentTaskResult,
    gaps: string[],
    task: AgentTask,
  ): Promise<AgentTaskResult> {
    console.log(`\n🔄 Refining solution to address gaps...`);

    // Create refinement task
    const refinementTask: AgentTask = {
      id: `${task.id}-refinement`,
      description: `Refine previous solution to address: ${gaps.join(', ')}`,
      intent: task.intent,
      requirements: gaps,
      acceptanceCriteria: task.acceptanceCriteria,
      priority: task.priority,
    };

    const refinementPlan = await this.createExecutionPlan(refinementTask);
    return await this.executeIterativePlan(refinementPlan, refinementTask);
  }
}

export interface AgentTaskResult {
  success: boolean;
  message?: string;
  error?: string;
  completedSteps?: StepResult[];
  artifacts?: string[];
  reason?: string;
}

export interface ValidationResult {
  meetsRequirements: boolean;
  rating: number;
  gaps: string[];
  recommendations: string[];
}
```

### 2. Agent CLI Interface

```typescript
// packages/cli/src/commands/agent.ts

export class AgentCommand {
  async execute(taskDescription: string, options: AgentOptions): Promise<void> {
    console.log(`\n🤖 Autonomous Agent Mode Activated\n`);
    console.log(`Task: ${taskDescription}\n`);

    // Parse task description into structured task
    const task = await this.parseTask(taskDescription, options);

    // Display task breakdown
    this.displayTaskBreakdown(task);

    // Create agent instance
    const agent = new AutonomousAgent(
      this.config,
      this.providerManager,
      this.toolRegistry,
    );

    // Execute task
    const result = await agent.executeTask(task);

    // Display results
    this.displayResults(result);

    // Save agent execution to session
    await this.saveAgentExecution(task, result);
  }

  private async parseTask(
    description: string,
    options: AgentOptions,
  ): Promise<AgentTask> {
    // Use LLM to parse natural language task into structured format
    const provider = this.providerManager.getActiveProvider();

    const parsePrompt = `
Parse this task description into a structured format:

"${description}"

Extract:
1. Core intent (what user wants to achieve)
2. Specific requirements (features, technologies, constraints)
3. Acceptance criteria (how to know it's done correctly)

Output as JSON:
{
  "intent": "clear statement of goal",
  "requirements": ["req1", "req2", ...],
  "acceptanceCriteria": ["criteria1", "criteria2", ...]
}
    `;

    const response = await provider.generateContent({
      model: this.config.getModel(),
      messages: [{ role: 'user', content: parsePrompt }],
      temperature: 0.2,
    });

    const parsed = JSON.parse(response.content);

    return {
      id: randomUUID(),
      description,
      intent: parsed.intent,
      requirements: parsed.requirements,
      acceptanceCriteria: parsed.acceptanceCriteria,
      priority: options.priority || 'medium',
      constraints: options.constraints,
    };
  }
}

// Usage examples:
// gemini agent "Build a system to track my laptop logs and enhance productivity"
// gemini agent "Create a REST API for user authentication with JWT" --test
// gemini agent "Refactor the database module to use TypeScript" --validate
```

### 3. Agent Execution Monitor

```typescript
// packages/cli/src/ui/agent-monitor.tsx

export const AgentMonitor: React.FC<{ executionPlan: AgentExecutionPlan }> = ({
  executionPlan,
}) => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        🤖 Agent Execution Monitor
      </Text>

      <Box flexDirection="column" marginTop={1}>
        {executionPlan.steps.map((step, index) => (
          <Box key={step.id} marginBottom={1}>
            <Text>
              {getStatusIcon(step.status)} Step {index + 1}/{executionPlan.steps.length}:{' '}
              <Text color={getStatusColor(step.status)}>
                {step.description}
              </Text>
            </Text>

            {step.status === 'running' && (
              <Box marginLeft={2}>
                <Spinner type="dots" />
                <Text color="yellow"> Executing...</Text>
              </Box>
            )}

            {step.status === 'failed' && step.result?.error && (
              <Box marginLeft={2}>
                <Text color="red">Error: {step.result.error}</Text>
                <Text color="yellow">
                  Retry {step.retryCount}/{step.maxRetries}
                </Text>
              </Box>
            )}

            {step.status === 'completed' && step.result?.artifacts && (
              <Box marginLeft={2}>
                <Text color="green">
                  Created: {step.result.artifacts.join(', ')}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box marginTop={1} borderStyle="single" borderColor="gray" padding={1}>
        <Text>
          Progress:{' '}
          {executionPlan.steps.filter(s => s.status === 'completed').length}/
          {executionPlan.steps.length}
        </Text>
      </Box>
    </Box>
  );
};
```

### 4. Agent Memory & Learning

```typescript
// packages/core/src/agents/agent-memory.ts

export class AgentMemory {
  private successfulPatterns: Map<string, ExecutionPattern> = new Map();
  private failurePatterns: Map<string, FailurePattern> = new Map();

  // Learn from successful executions
  recordSuccess(task: AgentTask, result: AgentTaskResult): void {
    const pattern: ExecutionPattern = {
      taskType: this.classifyTask(task),
      steps: result.completedSteps || [],
      duration: this.calculateDuration(result),
      successRate: 1.0,
      timesUsed: 1,
    };

    const existingPattern = this.successfulPatterns.get(pattern.taskType);
    if (existingPattern) {
      existingPattern.timesUsed++;
      existingPattern.successRate =
        (existingPattern.successRate * (existingPattern.timesUsed - 1) + 1.0) /
        existingPattern.timesUsed;
    } else {
      this.successfulPatterns.set(pattern.taskType, pattern);
    }
  }

  // Learn from failures
  recordFailure(task: AgentTask, error: string, step: ExecutionStep): void {
    const failureKey = `${this.classifyTask(task)}-${step.action}`;
    const existing = this.failurePatterns.get(failureKey);

    if (existing) {
      existing.occurrences++;
      existing.errorMessages.push(error);
    } else {
      this.failurePatterns.set(failureKey, {
        taskType: this.classifyTask(task),
        action: step.action,
        occurrences: 1,
        errorMessages: [error],
        lastOccurred: new Date().toISOString(),
      });
    }
  }

  // Suggest approach based on learned patterns
  suggestApproach(task: AgentTask): ExecutionPattern | null {
    const taskType = this.classifyTask(task);
    return this.successfulPatterns.get(taskType) || null;
  }

  // Check if similar failures occurred before
  checkForKnownIssues(
    task: AgentTask,
    step: ExecutionStep,
  ): FailurePattern | null {
    const failureKey = `${this.classifyTask(task)}-${step.action}`;
    return this.failurePatterns.get(failureKey) || null;
  }

  private classifyTask(task: AgentTask): string {
    // Use simple heuristics or LLM to classify task type
    const keywords = task.description.toLowerCase();

    if (keywords.includes('api') || keywords.includes('rest'))
      return 'api-development';
    if (keywords.includes('database') || keywords.includes('sql'))
      return 'database-work';
    if (keywords.includes('ui') || keywords.includes('frontend'))
      return 'frontend-development';
    if (keywords.includes('test') || keywords.includes('testing'))
      return 'testing';
    if (keywords.includes('refactor')) return 'refactoring';

    return 'general-development';
  }
}
```

---

## Cross-Session Contextual Memory

### Overview

The Cross-Session Contextual Memory system enables the CLI to remember and
reference previous conversations, providing continuity and context-awareness
across sessions. This creates a more intelligent assistant that "remembers" past
discussions about specific codebases, concepts, or problems.

### Core Concepts

**Memory Layers:**

```
1. Working Memory (Current Session)
2. Short-term Memory (Recent Sessions - Last 7 days)
3. Long-term Memory (All Historical Sessions)
4. Semantic Memory (Indexed by topics/concepts)
```

### 1. Memory Architecture

```typescript
// packages/core/src/memory/contextual-memory.ts

export interface MemoryIndex {
  id: string;
  sessionId: string;
  nodeId: string;
  content: string;
  embedding: number[]; // Vector embedding for semantic search
  metadata: {
    timestamp: string;
    topics: string[];
    entities: string[]; // Code files, databases, APIs mentioned
    provider: ProviderType;
    model: string;
    importance: number; // 0-1 score
  };
}

export interface MemoryQuery {
  query: string;
  filters?: {
    topics?: string[];
    entities?: string[];
    dateRange?: [string, string];
    minImportance?: number;
  };
  maxResults?: number;
}

export interface MemoryContext {
  relevantMemories: MemoryIndex[];
  summary: string;
  confidence: number;
  sources: { sessionId: string; nodeId: string }[];
}

export class ContextualMemorySystem {
  private vectorStore: VectorDatabase;
  private entityExtractor: EntityExtractor;
  private topicClassifier: TopicClassifier;

  constructor(
    private dbManager: DatabaseManager,
    private embeddingProvider: LLMProvider,
  ) {
    this.vectorStore = new VectorDatabase(dbManager);
    this.entityExtractor = new EntityExtractor();
    this.topicClassifier = new TopicClassifier();
  }

  /**
   * Index a message for future retrieval
   */
  async indexMessage(
    sessionId: string,
    nodeId: string,
    message: MessageRecord,
  ): Promise<void> {
    // Extract content
    const content = this.extractTextContent(message);
    if (!content || content.length < 10) return; // Skip trivial messages

    // Generate embedding for semantic search
    const embedding = await this.generateEmbedding(content);

    // Extract entities (files, databases, APIs, classes, etc.)
    const entities = await this.entityExtractor.extract(content);

    // Classify topics
    const topics = await this.topicClassifier.classify(content);

    // Calculate importance score
    const importance = this.calculateImportance(message, entities, topics);

    // Create memory index
    const memoryIndex: MemoryIndex = {
      id: randomUUID(),
      sessionId,
      nodeId,
      content,
      embedding,
      metadata: {
        timestamp: message.timestamp,
        topics,
        entities,
        provider: message.provider || ProviderType.GOOGLE_GEMINI,
        model: message.model || 'unknown',
        importance,
      },
    };

    // Store in vector database
    await this.vectorStore.insert(memoryIndex);

    // Also store in SQL database for structured queries
    await this.dbManager.insertMemoryIndex(memoryIndex);
  }

  /**
   * Retrieve relevant context for current query
   */
  async retrieveContext(query: MemoryQuery): Promise<MemoryContext> {
    // Generate query embedding
    const queryEmbedding = await this.generateEmbedding(query.query);

    // Vector similarity search
    const vectorResults = await this.vectorStore.search(
      queryEmbedding,
      query.maxResults || 10,
    );

    // Apply filters
    let filteredResults = vectorResults;
    if (query.filters) {
      filteredResults = this.applyFilters(vectorResults, query.filters);
    }

    // Rank by relevance and importance
    const rankedResults = this.rankResults(filteredResults, query);

    // Generate summary of retrieved context
    const summary = await this.generateContextSummary(
      rankedResults,
      query.query,
    );

    return {
      relevantMemories: rankedResults,
      summary,
      confidence: this.calculateConfidence(rankedResults),
      sources: rankedResults.map((m) => ({
        sessionId: m.sessionId,
        nodeId: m.nodeId,
      })),
    };
  }

  /**
   * Find sessions related to specific entity (file, database, etc.)
   */
  async findRelatedSessions(entity: string): Promise<SessionReference[]> {
    const query = `
      SELECT DISTINCT s.id, s.name, s.lastActive, COUNT(m.id) as relevance
      FROM sessions s
      JOIN memory_index m ON s.id = m.sessionId
      WHERE m.entities LIKE ?
      GROUP BY s.id
      ORDER BY relevance DESC, s.lastActive DESC
      LIMIT 10
    `;

    const results = await this.dbManager.query(query, [`%${entity}%`]);

    return results.map((row: any) => ({
      sessionId: row.id,
      name: row.name,
      lastActive: row.lastActive,
      relevance: row.relevance,
    }));
  }

  /**
   * Get conversation context for a specific code file
   */
  async getFileHistory(filePath: string): Promise<FileMemoryContext> {
    const relatedMemories = await this.dbManager.query(
      `
      SELECT m.*, s.name as sessionName
      FROM memory_index m
      JOIN sessions s ON m.sessionId = s.id
      WHERE m.entities LIKE ?
      ORDER BY m.timestamp DESC
    `,
      [`%${filePath}%`],
    );

    return {
      filePath,
      totalMentions: relatedMemories.length,
      sessions: this.groupBySession(relatedMemories),
      summary: await this.summarizeFileHistory(relatedMemories, filePath),
    };
  }

  /**
   * Smart context injection for new queries
   */
  async enrichQueryWithContext(
    query: string,
    currentSessionId: string,
  ): Promise<EnrichedQuery> {
    // Detect entities in query
    const entities = await this.entityExtractor.extract(query);

    // Find relevant past context
    const relevantContext = await this.retrieveContext({
      query,
      filters: {
        entities,
        minImportance: 0.3,
      },
      maxResults: 5,
    });

    // Don't include context from current session (already in conversation)
    const externalContext = relevantContext.relevantMemories.filter(
      (m) => m.sessionId !== currentSessionId,
    );

    if (externalContext.length === 0) {
      return { originalQuery: query, enrichedQuery: query, hasContext: false };
    }

    // Build context prefix
    const contextPrefix = this.buildContextPrefix(externalContext, entities);

    // Create enriched query
    const enrichedQuery = `${contextPrefix}\n\nCurrent query: ${query}`;

    return {
      originalQuery: query,
      enrichedQuery,
      hasContext: true,
      contextSummary: relevantContext.summary,
      sources: relevantContext.sources,
    };
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    // Use embedding model (Gemini, OpenAI, or local model)
    const response = await this.embeddingProvider.embedContent({
      content: text,
      model: 'text-embedding-004', // or 'text-embedding-ada-002'
    });

    return response.embedding;
  }

  private calculateImportance(
    message: MessageRecord,
    entities: string[],
    topics: string[],
  ): number {
    let score = 0.5; // Base score

    // Boost for code-related content
    if (entities.length > 0) score += 0.2;

    // Boost for technical topics
    if (
      topics.some((t) =>
        ['database', 'api', 'algorithm', 'architecture'].includes(t),
      )
    ) {
      score += 0.15;
    }

    // Boost for longer, detailed messages
    if (message.content.length > 500) score += 0.1;

    // Boost for messages with tool calls (indicates action taken)
    if (
      message.type === 'gemini' &&
      message.toolCalls &&
      message.toolCalls.length > 0
    ) {
      score += 0.15;
    }

    return Math.min(score, 1.0);
  }

  private buildContextPrefix(
    memories: MemoryIndex[],
    relevantEntities: string[],
  ): string {
    const prefix = ['📚 Context from previous conversations:', ''];

    if (relevantEntities.length > 0) {
      prefix.push(`Related to: ${relevantEntities.join(', ')}`);
      prefix.push('');
    }

    memories.forEach((memory, index) => {
      const sessionRef = `[Session ${memory.sessionId.slice(0, 8)}]`;
      const timestamp = new Date(
        memory.metadata.timestamp,
      ).toLocaleDateString();

      prefix.push(`${index + 1}. ${sessionRef} (${timestamp})`);
      prefix.push(`   ${this.summarize(memory.content, 150)}`);
      prefix.push('');
    });

    prefix.push('---');

    return prefix.join('\n');
  }

  private summarize(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}
```

### 2. Entity Extraction

```typescript
// packages/core/src/memory/entity-extractor.ts

export class EntityExtractor {
  private patterns = {
    filePaths:
      /(?:\.\/|\/|\w+\/)?[\w\-\.]+\.(ts|js|py|java|cpp|h|go|rs|md|json|yaml|yml|sql|css|html)/g,
    databases:
      /(?:mongodb|postgresql|mysql|sqlite|redis|dynamodb|firestore)[\w]*|database|db/gi,
    apis: /api|endpoint|rest|graphql|grpc|webhook/gi,
    classes: /class\s+(\w+)|interface\s+(\w+)|type\s+(\w+)/g,
    functions: /function\s+(\w+)|const\s+(\w+)\s*=|def\s+(\w+)/g,
    packages: /@[\w\-]+\/[\w\-]+|npm|pip|cargo|go\s+get/gi,
  };

  async extract(text: string): Promise<string[]> {
    const entities = new Set<string>();

    // Extract file paths
    const filePaths = text.match(this.patterns.filePaths);
    if (filePaths) {
      filePaths.forEach((f) => entities.add(f));
    }

    // Extract database references
    const databases = text.match(this.patterns.databases);
    if (databases) {
      databases.forEach((db) => entities.add(db.toLowerCase()));
    }

    // Extract API references
    const apis = text.match(this.patterns.apis);
    if (apis) {
      apis.forEach((api) => entities.add(api.toLowerCase()));
    }

    // Extract code identifiers
    this.extractCodeIdentifiers(text, entities);

    // Use LLM for complex entity extraction
    const llmEntities = await this.extractWithLLM(text);
    llmEntities.forEach((e) => entities.add(e));

    return Array.from(entities);
  }

  private extractCodeIdentifiers(text: string, entities: Set<string>): void {
    // Extract class names
    const classes = [...text.matchAll(this.patterns.classes)];
    classes.forEach((match) => {
      const className = match[1] || match[2] || match[3];
      if (className) entities.add(className);
    });

    // Extract function names
    const functions = [...text.matchAll(this.patterns.functions)];
    functions.forEach((match) => {
      const funcName = match[1] || match[2] || match[3];
      if (funcName && funcName.length > 3) entities.add(funcName);
    });
  }

  private async extractWithLLM(text: string): Promise<string[]> {
    // Use LLM to extract domain-specific entities
    // (database names, custom classes, business concepts, etc.)

    if (text.length > 2000) {
      text = text.substring(0, 2000); // Limit for efficiency
    }

    const prompt = `
Extract key technical entities from this text:

"${text}"

Return ONLY a JSON array of strings, no explanation:
["entity1", "entity2", ...]

Include: file names, database names, API names, class names, important functions.
    `;

    try {
      // This would use the active provider
      const response = await this.provider.generateContent({
        model: 'gemini-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
      });

      const entities = JSON.parse(response.content);
      return Array.isArray(entities) ? entities : [];
    } catch {
      return [];
    }
  }
}
```

### 3. Vector Database Implementation

```typescript
// packages/core/src/memory/vector-database.ts

export class VectorDatabase {
  private dimensions = 768; // Standard embedding dimension

  constructor(private dbManager: DatabaseManager) {
    this.initializeVectorTables();
  }

  private initializeVectorTables(): void {
    this.dbManager.exec(`
      CREATE TABLE IF NOT EXISTS memory_index (
        id TEXT PRIMARY KEY,
        sessionId TEXT NOT NULL,
        nodeId TEXT NOT NULL,
        content TEXT NOT NULL,
        embedding BLOB NOT NULL,
        topics TEXT, -- JSON array
        entities TEXT, -- JSON array
        timestamp TEXT NOT NULL,
        importance REAL,
        provider TEXT,
        model TEXT,
        FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
      );
      
      CREATE INDEX IF NOT EXISTS idx_memory_sessionId ON memory_index(sessionId);
      CREATE INDEX IF NOT EXISTS idx_memory_timestamp ON memory_index(timestamp);
      CREATE INDEX IF NOT EXISTS idx_memory_importance ON memory_index(importance);
      
      -- FTS5 for full-text search
      CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
        id UNINDEXED,
        content,
        entities,
        topics
      );
    `);
  }

  async insert(memory: MemoryIndex): Promise<void> {
    // Store in vector table
    const embeddingBlob = this.serializeEmbedding(memory.embedding);

    this.dbManager.run(
      `
      INSERT INTO memory_index (
        id, sessionId, nodeId, content, embedding, topics, entities,
        timestamp, importance, provider, model
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        memory.id,
        memory.sessionId,
        memory.nodeId,
        memory.content,
        embeddingBlob,
        JSON.stringify(memory.metadata.topics),
        JSON.stringify(memory.metadata.entities),
        memory.metadata.timestamp,
        memory.metadata.importance,
        memory.metadata.provider,
        memory.metadata.model,
      ],
    );

    // Store in FTS for text search
    this.dbManager.run(
      `
      INSERT INTO memory_fts (id, content, entities, topics)
      VALUES (?, ?, ?, ?)
    `,
      [
        memory.id,
        memory.content,
        JSON.stringify(memory.metadata.entities),
        JSON.stringify(memory.metadata.topics),
      ],
    );
  }

  async search(
    queryEmbedding: number[],
    maxResults: number = 10,
    minSimilarity: number = 0.5,
  ): Promise<MemoryIndex[]> {
    // Get all embeddings (for small datasets, this is fine)
    // For large datasets, use approximate nearest neighbors (ANN)
    const allMemories = this.dbManager.all(`
      SELECT * FROM memory_index
      ORDER BY importance DESC, timestamp DESC
      LIMIT 1000
    `);

    // Calculate cosine similarity
    const withScores = allMemories.map((row: any) => {
      const embedding = this.deserializeEmbedding(row.embedding);
      const similarity = this.cosineSimilarity(queryEmbedding, embedding);

      return {
        memory: this.rowToMemoryIndex(row),
        similarity,
      };
    });

    // Filter and sort by similarity
    const filtered = withScores
      .filter((item) => item.similarity >= minSimilarity)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults);

    return filtered.map((item) => item.memory);
  }

  async fullTextSearch(
    query: string,
    maxResults: number = 20,
  ): Promise<MemoryIndex[]> {
    const results = this.dbManager.all(
      `
      SELECT m.* FROM memory_index m
      JOIN memory_fts f ON m.id = f.id
      WHERE memory_fts MATCH ?
      ORDER BY rank, m.importance DESC
      LIMIT ?
    `,
      [query, maxResults],
    );

    return results.map((row: any) => this.rowToMemoryIndex(row));
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  private serializeEmbedding(embedding: number[]): Buffer {
    const buffer = Buffer.allocUnsafe(embedding.length * 4);
    embedding.forEach((val, idx) => {
      buffer.writeFloatLE(val, idx * 4);
    });
    return buffer;
  }

  private deserializeEmbedding(buffer: Buffer): number[] {
    const embedding: number[] = [];
    for (let i = 0; i < buffer.length; i += 4) {
      embedding.push(buffer.readFloatLE(i));
    }
    return embedding;
  }

  private rowToMemoryIndex(row: any): MemoryIndex {
    return {
      id: row.id,
      sessionId: row.sessionId,
      nodeId: row.nodeId,
      content: row.content,
      embedding: this.deserializeEmbedding(row.embedding),
      metadata: {
        timestamp: row.timestamp,
        topics: JSON.parse(row.topics || '[]'),
        entities: JSON.parse(row.entities || '[]'),
        provider: row.provider,
        model: row.model,
        importance: row.importance,
      },
    };
  }
}
```

### 4. Context-Aware CLI Integration

```typescript
// packages/cli/src/ui/context-aware-input.tsx

export const ContextAwareInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [contextPreview, setContextPreview] = useState<MemoryContext | null>(null);
  const [showContext, setShowContext] = useState(false);

  useEffect(() => {
    const checkContext = async () => {
      if (input.length < 10) return;

      // Debounced context check
      const context = await memorySystem.retrieveContext({
        query: input,
        maxResults: 3,
      });

      if (context.relevantMemories.length > 0) {
        setContextPreview(context);
        setShowContext(true);
      }
    };

    const timeoutId = setTimeout(checkContext, 500);
    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <Box flexDirection="column">
      {showContext && contextPreview && (
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor="yellow"
          padding={1}
          marginBottom={1}
        >
          <Text color="yellow" bold>
            💡 Found relevant context from past conversations
          </Text>
          <Text dimColor>{contextPreview.summary}</Text>
          <Text dimColor>
            Sources: {contextPreview.sources.length} previous session(s)
          </Text>
          <Text dimColor fontSize={10}>
            Press Tab to include this context
          </Text>
        </Box>
      )}

      <TextInput
        value={input}
        onChange={setInput}
        placeholder="What would you like me to help with?"
      />
    </Box>
  );
};
```

### 5. Usage Examples

```bash
# Automatic context detection
$ gemini "How did I implement the authentication in the API?"
💡 Found relevant context from 2 previous sessions about "authentication" and "API"
📚 Including context from:
  - Session abc12345 (Oct 15, 2025): Discussed JWT implementation
  - Session def67890 (Oct 18, 2025): Added OAuth2 support

[Agent provides answer with full context]

# Explicit entity search
$ gemini context --entity "user-service.ts"
📁 Found 5 conversations about user-service.ts:

1. Session abc12345 (Oct 10, 2025) - "Initial implementation"
2. Session def67890 (Oct 12, 2025) - "Added validation middleware"
3. Session ghi11121 (Oct 20, 2025) - "Refactored to TypeScript"
...

# View file history
$ gemini history --file "database/schema.sql"
📊 Conversation history for database/schema.sql:

Total mentions: 8 across 4 sessions
Last discussed: Oct 28, 2025

Summary:
- Added initial schema with users and posts tables
- Modified to include foreign key constraints
- Added indexes for performance
- Recent migration to add comments table

# Smart session search
$ gemini search "how to handle rate limiting"
🔍 Semantic search results:

1. [85% match] Session abc12345 (Oct 15)
   "Implementing rate limiting with Redis..."

2. [72% match] Session ghi11121 (Oct 22)
   "Adding rate limit middleware to Express..."

3. [68% match] Session jkl13141 (Oct 25)
   "Discussing rate limit strategies..."
```

---

## Cost Optimization & Routing

### Overview

The Cost Optimization Engine intelligently routes tasks to the most
cost-effective LLM provider based on task complexity, quality requirements, and
budget constraints. This can reduce API costs by 30-40% while maintaining
quality.

### Architecture

```typescript
// packages/core/src/routing/cost-optimizer.ts

export interface ModelTier {
  tier: 'fast' | 'cheap' | 'quality' | 'balanced';
  providers: {
    providerId: string;
    modelId: string;
    costPer1kInput: number;
    costPer1kOutput: number;
    avgLatency: number;
    qualityScore: number; // 0-100
  }[];
}

export interface TaskComplexity {
  score: number; // 0-100
  factors: {
    inputLength: number;
    requiresReasoning: boolean;
    requiresCode: boolean;
    requiresCreativity: boolean;
    criticalTask: boolean;
  };
}

export interface RoutingStrategy {
  name: 'cost-optimized' | 'speed-optimized' | 'quality-optimized' | 'balanced';
  tierPreferences: ('fast' | 'cheap' | 'quality')[];
  costLimit?: number; // Max cost per request in USD
}

export class CostOptimizer {
  private modelTiers: Map<string, ModelTier>;
  private costTracker: CostTracker;
  private complexityAnalyzer: ComplexityAnalyzer;

  constructor(
    providers: LLMProvider[],
    strategy: RoutingStrategy = {
      name: 'balanced',
      tierPreferences: ['cheap', 'fast'],
    },
  ) {
    this.modelTiers = this.buildModelTiers(providers);
    this.costTracker = new CostTracker();
    this.complexityAnalyzer = new ComplexityAnalyzer();
  }

  async selectOptimalProvider(
    request: UnifiedRequest,
    strategy?: RoutingStrategy,
  ): Promise<{ providerId: string; modelId: string; estimatedCost: number }> {
    // 1. Analyze task complexity
    const complexity = await this.complexityAnalyzer.analyze(request);

    // 2. Determine required tier
    const requiredTier = this.determineRequiredTier(complexity);

    // 3. Get candidate models from tier
    const candidates = this.modelTiers.get(requiredTier)?.providers || [];

    // 4. Apply strategy to select best candidate
    const selected = this.applyStrategy(
      candidates,
      strategy || this.strategy,
      complexity,
    );

    // 5. Estimate cost
    const estimatedCost = this.estimateCost(request, selected);

    // 6. Record selection
    await this.costTracker.recordSelection({
      providerId: selected.providerId,
      modelId: selected.modelId,
      complexity: complexity.score,
      estimatedCost,
      timestamp: new Date().toISOString(),
    });

    return {
      providerId: selected.providerId,
      modelId: selected.modelId,
      estimatedCost,
    };
  }

  private determineRequiredTier(complexity: TaskComplexity): string {
    if (complexity.factors.criticalTask || complexity.score > 80) {
      return 'quality';
    } else if (complexity.score > 50) {
      return 'balanced';
    } else if (complexity.factors.requiresReasoning) {
      return 'fast';
    } else {
      return 'cheap';
    }
  }

  private applyStrategy(
    candidates: ModelTier['providers'],
    strategy: RoutingStrategy,
    complexity: TaskComplexity,
  ): ModelTier['providers'][0] {
    switch (strategy.name) {
      case 'cost-optimized':
        // Sort by cost per token
        return candidates.sort(
          (a, b) => a.costPer1kInput - b.costPer1kInput,
        )[0];

      case 'speed-optimized':
        // Sort by latency
        return candidates.sort((a, b) => a.avgLatency - b.avgLatency)[0];

      case 'quality-optimized':
        // Sort by quality score
        return candidates.sort((a, b) => b.qualityScore - a.qualityScore)[0];

      case 'balanced':
      default:
        // Balanced scoring: cost, speed, quality
        const scored = candidates.map((c) => ({
          ...c,
          // Quality weight: 30%
          score:
            (1 - c.costPer1kInput / 0.01) * 0.4 + // Cost weight: 40%
            (1 - c.avgLatency / 2000) * 0.3 + // Speed weight: 30%
            (c.qualityScore / 100) * 0.3,
        }));

        return scored.sort((a, b) => b.score - a.score)[0];
    }
  }

  private estimateCost(
    request: UnifiedRequest,
    model: ModelTier['providers'][0],
  ): number {
    // Rough token count estimation
    const inputTokens = request.contents.reduce(
      (sum, c) => sum + (c.text?.length || 0) / 4, // ~4 chars per token
      0,
    );

    const estimatedOutputTokens =
      request.generationConfig?.maxOutputTokens || 2048;

    return (
      (inputTokens / 1000) * model.costPer1kInput +
      (estimatedOutputTokens / 1000) * model.costPer1kOutput
    );
  }

  async getCostReport(sessionId?: string): Promise<CostReport> {
    return this.costTracker.generateReport(sessionId);
  }

  async getMonthlyCostSummary(): Promise<MonthlyCostSummary> {
    return this.costTracker.getMonthlySummary();
  }
}

export class ComplexityAnalyzer {
  async analyze(request: UnifiedRequest): Promise<TaskComplexity> {
    const text = request.contents.map((c) => c.text || '').join(' ');

    const factors = {
      inputLength: text.length,
      requiresReasoning: this.requiresReasoning(text),
      requiresCode: this.requiresCode(text, request),
      requiresCreativity: this.requiresCreativity(text),
      criticalTask: this.isCriticalTask(text),
    };

    // Calculate complexity score
    let score = 0;

    if (factors.inputLength > 5000) score += 20;
    else if (factors.inputLength > 2000) score += 10;

    if (factors.requiresReasoning) score += 30;
    if (factors.requiresCode) score += 25;
    if (factors.requiresCreativity) score += 15;
    if (factors.criticalTask) score += 20;

    return {
      score: Math.min(score, 100),
      factors,
    };
  }

  private requiresReasoning(text: string): boolean {
    const reasoningKeywords = [
      'analyze',
      'compare',
      'evaluate',
      'explain why',
      'what is the difference',
      'trade-offs',
      'best approach',
      'design',
      'architecture',
      'algorithm',
    ];

    return reasoningKeywords.some((kw) => text.toLowerCase().includes(kw));
  }

  private requiresCode(text: string, request: UnifiedRequest): boolean {
    const codeKeywords = [
      'write code',
      'implement',
      'function',
      'class',
      'api',
      'endpoint',
      'database',
      'query',
    ];

    return (
      codeKeywords.some((kw) => text.toLowerCase().includes(kw)) ||
      (request.tools && request.tools.length > 0)
    );
  }

  private requiresCreativity(text: string): boolean {
    const creativeKeywords = [
      'creative',
      'brainstorm',
      'generate ideas',
      'story',
      'marketing',
      'content',
      'blog post',
    ];

    return creativeKeywords.some((kw) => text.toLowerCase().includes(kw));
  }

  private isCriticalTask(text: string): boolean {
    const criticalKeywords = [
      'production',
      'deploy',
      'security',
      'critical',
      'important',
      'urgent',
      'fix bug',
    ];

    return criticalKeywords.some((kw) => text.toLowerCase().includes(kw));
  }
}

export class CostTracker {
  constructor(private db: DatabaseManager) {}

  async recordSelection(selection: {
    providerId: string;
    modelId: string;
    complexity: number;
    estimatedCost: number;
    timestamp: string;
  }): Promise<void> {
    await this.db.query(
      `
      INSERT INTO costTracking (
        id, sessionId, providerId, modelId, 
        inputTokens, outputTokens, costUsd, timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        generateId(),
        getCurrentSessionId(),
        selection.providerId,
        selection.modelId,
        0, // Will be updated after actual call
        0,
        selection.estimatedCost,
        selection.timestamp,
      ],
    );
  }

  async recordActualCost(
    nodeId: string,
    inputTokens: number,
    outputTokens: number,
    actualCost: number,
  ): Promise<void> {
    await this.db.query(
      `
      UPDATE costTracking
      SET inputTokens = ?, outputTokens = ?, costUsd = ?
      WHERE nodeId = ?
    `,
      [inputTokens, outputTokens, actualCost, nodeId],
    );
  }

  async generateReport(sessionId?: string): Promise<CostReport> {
    const query = sessionId
      ? `SELECT * FROM costTracking WHERE sessionId = ? ORDER BY timestamp DESC`
      : `SELECT * FROM costTracking ORDER BY timestamp DESC LIMIT 100`;

    const rows = await this.db.query(query, sessionId ? [sessionId] : []);

    const totalCost = rows.reduce((sum, r) => sum + r.costUsd, 0);
    const byProvider = this.groupBy(rows, 'providerId');
    const byModel = this.groupBy(rows, 'modelId');

    return {
      totalCost,
      totalRequests: rows.length,
      costByProvider: Object.entries(byProvider).map(([id, reqs]) => ({
        providerId: id,
        cost: reqs.reduce((sum, r) => sum + r.costUsd, 0),
        requests: reqs.length,
      })),
      costByModel: Object.entries(byModel).map(([id, reqs]) => ({
        modelId: id,
        cost: reqs.reduce((sum, r) => sum + r.costUsd, 0),
        requests: reqs.length,
      })),
    };
  }

  async getMonthlySummary(): Promise<MonthlyCostSummary> {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ).toISOString();

    const rows = await this.db.query(
      `
      SELECT * FROM costTracking
      WHERE timestamp >= ?
      ORDER BY timestamp ASC
    `,
      [startOfMonth],
    );

    return {
      month: now.toISOString().slice(0, 7), // YYYY-MM
      totalCost: rows.reduce((sum, r) => sum + r.costUsd, 0),
      totalTokens: rows.reduce(
        (sum, r) => sum + r.inputTokens + r.outputTokens,
        0,
      ),
      requests: rows.length,
      dailyBreakdown: this.groupByDay(rows),
      projectedMonthlyCost: this.projectMonthlyCost(rows, now),
    };
  }

  private groupBy(rows: any[], key: string): Record<string, any[]> {
    return rows.reduce((acc, row) => {
      const val = row[key];
      if (!acc[val]) acc[val] = [];
      acc[val].push(row);
      return acc;
    }, {});
  }

  private groupByDay(rows: any[]): { date: string; cost: number }[] {
    const byDay = this.groupBy(
      rows.map((r) => ({ ...r, day: r.timestamp.slice(0, 10) })),
      'day',
    );

    return Object.entries(byDay).map(([date, reqs]) => ({
      date,
      cost: reqs.reduce((sum, r) => sum + r.costUsd, 0),
    }));
  }

  private projectMonthlyCost(rows: any[], now: Date): number {
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    const currentDay = now.getDate();
    const spentSoFar = rows.reduce((sum, r) => sum + r.costUsd, 0);

    return (spentSoFar / currentDay) * daysInMonth;
  }
}
```

### CLI Commands

```bash
# View cost report for current session
gemini cost report

# View monthly cost summary
gemini cost monthly

# Set cost limits
gemini config set cost-limit 10.00  # $10/month

# Change routing strategy
gemini config set routing-strategy cost-optimized
gemini config set routing-strategy speed-optimized
gemini config set routing-strategy quality-optimized
gemini config set routing-strategy balanced

# Run agent with cost optimization
gemini agent "Build authentication system" --cost-optimized
```

---

## Plan Mode System

### Overview

**Plan Mode** is a critical feature that allows users to preview and approve
execution plans before the agent makes any changes. This prevents unwanted
modifications and gives users full control over what gets executed.

### Key Benefits

1. **Preview Before Execution**: See exactly what will happen before any files
   are modified
2. **Interactive Editing**: Modify, reorder, or skip steps in the plan
3. **Cost Transparency**: See estimated cost for each step
4. **Safety**: Approve dangerous operations explicitly
5. **Learning**: Understand the agent's reasoning process

### Architecture

```typescript
// packages/core/src/planning/plan-mode.ts

export interface ExecutionStep {
  id: string;
  action: AgentAction;
  description: string;
  reasoning: string;
  estimatedCost?: number;
  estimatedDuration?: number;
  dependencies: string[]; // IDs of steps that must complete first
  risk: 'low' | 'medium' | 'high';
  status: 'pending' | 'skipped' | 'approved' | 'completed' | 'failed';
}

export interface ExecutionPlan {
  id: string;
  taskDescription: string;
  steps: ExecutionStep[];
  totalEstimatedCost: number;
  totalEstimatedDuration: number;
  createdAt: string;
  approvedAt?: string;
  status: 'draft' | 'approved' | 'rejected' | 'executing' | 'completed';
}

export class PlanModeManager {
  private isEnabled: boolean = false;
  private currentPlan?: ExecutionPlan;
  private originalToolRegistry: Map<string, Tool>;

  constructor(
    private agent: AutonomousAgent,
    private costOptimizer: CostOptimizer,
  ) {
    this.originalToolRegistry = new Map();
  }

  async enable(): Promise<void> {
    this.isEnabled = true;

    // Block all write tools during planning
    this.blockWriteTools();

    // Inject planning-specific system prompt
    this.injectPlanningPrompt();
  }

  disable(): void {
    this.isEnabled = false;
    this.restoreTools();
    this.currentPlan = undefined;
  }

  async generatePlan(taskDescription: string): Promise<ExecutionPlan> {
    // Use LLM to break down task into steps
    const response = await this.agent.llm.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are in PLANNING MODE. Do not execute any actions.
          
Task: ${taskDescription}

Please create a detailed execution plan with these steps:
1. Analyze what needs to be done
2. Break down into concrete steps
3. For each step, specify:
   - Action type (create_file, edit_file, run_command, etc.)
   - Description of what it does
   - Reasoning for why it's needed
   - Dependencies on other steps
   - Risk level (low/medium/high)

Return the plan as JSON with this structure:
{
  "steps": [
    {
      "action": "create_file",
      "description": "Create user model",
      "reasoning": "Need database schema for users",
      "dependencies": [],
      "risk": "low"
    },
    ...
  ]
}`,
            },
          ],
        },
      ],
      systemInstruction:
        'You are a planning assistant. Generate detailed execution plans without executing any actions.',
    });

    const planData = this.parsePlanFromResponse(response);

    // Estimate cost for each step
    for (const step of planData.steps) {
      step.estimatedCost = await this.estimateStepCost(step);
      step.estimatedDuration = this.estimateStepDuration(step);
    }

    const plan: ExecutionPlan = {
      id: generateId(),
      taskDescription,
      steps: planData.steps,
      totalEstimatedCost: planData.steps.reduce(
        (sum, s) => sum + (s.estimatedCost || 0),
        0,
      ),
      totalEstimatedDuration: this.calculateCriticalPath(planData.steps),
      createdAt: new Date().toISOString(),
      status: 'draft',
    };

    this.currentPlan = plan;
    return plan;
  }

  async refineWithFeedback(
    planId: string,
    modifications: PlanModification[],
  ): Promise<ExecutionPlan> {
    if (!this.currentPlan || this.currentPlan.id !== planId) {
      throw new Error('Plan not found');
    }

    // Apply modifications
    for (const mod of modifications) {
      switch (mod.type) {
        case 'skip':
          this.currentPlan.steps.find((s) => s.id === mod.stepId)!.status =
            'skipped';
          break;

        case 'reorder':
          const step = this.currentPlan.steps.find((s) => s.id === mod.stepId)!;
          const currentIndex = this.currentPlan.steps.indexOf(step);
          this.currentPlan.steps.splice(currentIndex, 1);
          this.currentPlan.steps.splice(mod.newPosition!, 0, step);
          break;

        case 'modify':
          Object.assign(
            this.currentPlan.steps.find((s) => s.id === mod.stepId)!,
            mod.changes,
          );
          break;

        case 'add':
          this.currentPlan.steps.push(mod.newStep!);
          break;

        case 'remove':
          this.currentPlan.steps = this.currentPlan.steps.filter(
            (s) => s.id !== mod.stepId,
          );
          break;
      }
    }

    // Recalculate estimates
    this.recalculateEstimates(this.currentPlan);

    return this.currentPlan;
  }

  async approvePlan(planId: string): Promise<void> {
    if (!this.currentPlan || this.currentPlan.id !== planId) {
      throw new Error('Plan not found');
    }

    this.currentPlan.status = 'approved';
    this.currentPlan.approvedAt = new Date().toISOString();
  }

  async switchToImplementation(): Promise<ExecutionPlan> {
    if (!this.currentPlan || this.currentPlan.status !== 'approved') {
      throw new Error('No approved plan to execute');
    }

    // Restore write tools
    this.disable();

    // Mark as executing
    this.currentPlan.status = 'executing';

    return this.currentPlan;
  }

  private blockWriteTools(): void {
    const writeTools = [
      'WriteFileTool',
      'EditTool',
      'SmartEditTool',
      'ShellTool',
    ];

    for (const toolName of writeTools) {
      const tool = this.agent.toolRegistry.get(toolName);
      if (tool) {
        this.originalToolRegistry.set(toolName, tool);
        this.agent.toolRegistry.delete(toolName);
      }
    }
  }

  private restoreTools(): void {
    for (const [name, tool] of this.originalToolRegistry.entries()) {
      this.agent.toolRegistry.set(name, tool);
    }
    this.originalToolRegistry.clear();
  }

  private injectPlanningPrompt(): void {
    this.agent.systemPrompt += `\n\n⚠️ PLANNING MODE ACTIVE ⚠️
You are currently in planning mode. Do NOT execute any file modifications or commands.
Instead, describe what you WOULD do in a structured plan format.`;
  }

  private async estimateStepCost(step: ExecutionStep): Promise<number> {
    // Estimate based on action type and complexity
    const baseCosts = {
      create_file: 0.002,
      edit_file: 0.003,
      run_command: 0.001,
      test_code: 0.004,
      debug_error: 0.005,
    };

    return baseCosts[step.action as keyof typeof baseCosts] || 0.002;
  }

  private estimateStepDuration(step: ExecutionStep): number {
    // Estimate in seconds
    const baseDurations = {
      create_file: 5,
      edit_file: 8,
      run_command: 10,
      test_code: 15,
      debug_error: 20,
    };

    return baseDurations[step.action as keyof typeof baseDurations] || 10;
  }

  private calculateCriticalPath(steps: ExecutionStep[]): number {
    // Simple critical path calculation
    // In reality, would build dependency graph and find longest path
    return steps.reduce((sum, s) => sum + (s.estimatedDuration || 0), 0);
  }

  private recalculateEstimates(plan: ExecutionPlan): void {
    plan.totalEstimatedCost = plan.steps
      .filter((s) => s.status !== 'skipped')
      .reduce((sum, s) => sum + (s.estimatedCost || 0), 0);

    plan.totalEstimatedDuration = this.calculateCriticalPath(
      plan.steps.filter((s) => s.status !== 'skipped'),
    );
  }

  private parsePlanFromResponse(response: any): { steps: ExecutionStep[] } {
    // Parse JSON from LLM response
    // Handle potential formatting issues
    const text = response.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Could not parse plan from response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      steps: parsed.steps.map((s: any, i: number) => ({
        id: `step-${i + 1}`,
        ...s,
        status: 'pending',
      })),
    };
  }
}

export class PlanExecutor {
  constructor(
    private agent: AutonomousAgent,
    private plan: ExecutionPlan,
  ) {}

  async execute(): Promise<ExecutionResult> {
    const results: StepResult[] = [];

    for (const step of this.plan.steps) {
      if (step.status === 'skipped') {
        results.push({
          stepId: step.id,
          status: 'skipped',
          output: 'Skipped by user',
        });
        continue;
      }

      try {
        // Execute step
        step.status = 'executing';
        const result = await this.executeStep(step);

        step.status = 'completed';
        results.push({
          stepId: step.id,
          status: 'completed',
          output: result,
        });
      } catch (error) {
        step.status = 'failed';

        // Ask user for direction
        const direction = await this.promptUserOnError(step, error);

        if (direction === 'abort') {
          break;
        } else if (direction === 'retry') {
          // Retry the step
          // ... retry logic
        } else if (direction === 'skip') {
          step.status = 'skipped';
          continue;
        }
      }
    }

    this.plan.status = 'completed';

    return {
      planId: this.plan.id,
      steps: results,
      overallStatus: results.every((r) => r.status === 'completed')
        ? 'success'
        : 'partial',
    };
  }

  private async executeStep(step: ExecutionStep): Promise<string> {
    return await this.agent.executeAction({
      action: step.action,
      parameters: this.extractParameters(step),
    });
  }

  private async promptUserOnError(
    step: ExecutionStep,
    error: Error,
  ): Promise<'abort' | 'retry' | 'skip'> {
    // Show error to user and get input
    console.error(`\n❌ Step failed: ${step.description}`);
    console.error(`Error: ${error.message}\n`);
    console.log('What would you like to do?');
    console.log('  [a] Abort execution');
    console.log('  [r] Retry this step');
    console.log('  [s] Skip this step');

    // Get user input
    // ... input handling

    return 'abort'; // placeholder
  }

  private extractParameters(step: ExecutionStep): Record<string, any> {
    // Extract parameters from step description
    // This would be more sophisticated in reality
    return {};
  }
}
```

### Interactive Plan Review UI

```typescript
// packages/cli/src/ui/plan-review.tsx

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';

interface PlanReviewProps {
  plan: ExecutionPlan;
  onApprove: () => void;
  onReject: () => void;
  onModify: (modifications: PlanModification[]) => void;
}

export const PlanReview: React.FC<PlanReviewProps> = ({
  plan,
  onApprove,
  onReject,
  onModify,
}) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  useInput((input, key) => {
    if (key.return) {
      if (mode === 'view') {
        onApprove();
      }
    } else if (input === 'e') {
      setMode('edit');
    } else if (input === 'c') {
      onReject();
    } else if (key.upArrow) {
      setSelectedStep(Math.max(0, selectedStep - 1));
    } else if (key.downArrow) {
      setSelectedStep(Math.min(plan.steps.length - 1, selectedStep + 1));
    } else if (input === 's') {
      // Skip step
      onModify([{
        type: 'skip',
        stepId: plan.steps[selectedStep].id,
      }]);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="round" borderColor="cyan" padding={1} marginBottom={1}>
        <Box flexDirection="column">
          <Text bold color="cyan">📋 Execution Plan</Text>
          <Text>{plan.taskDescription}</Text>
          <Text dimColor>
            {plan.steps.length} steps •
            Estimated cost: ${plan.totalEstimatedCost.toFixed(4)} •
            Duration: ~{Math.ceil(plan.totalEstimatedDuration / 60)}min
          </Text>
        </Box>
      </Box>

      <Box flexDirection="column">
        {plan.steps.map((step, i) => (
          <Box
            key={step.id}
            borderStyle={i === selectedStep ? 'bold' : 'single'}
            borderColor={i === selectedStep ? 'yellow' : 'gray'}
            padding={1}
            marginBottom={1}
          >
            <Box flexDirection="column">
              <Text bold>
                {i + 1}. {step.description}
                {step.status === 'skipped' && <Text color="yellow"> [SKIPPED]</Text>}
              </Text>
              <Text dimColor>Action: {step.action}</Text>
              <Text dimColor>Reasoning: {step.reasoning}</Text>
              <Text dimColor>
                Cost: ${(step.estimatedCost || 0).toFixed(4)} •
                Duration: ~{step.estimatedDuration}s •
                Risk: <Text color={
                  step.risk === 'high' ? 'red' :
                  step.risk === 'medium' ? 'yellow' : 'green'
                }>{step.risk}</Text>
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Box borderStyle="round" padding={1} marginTop={1}>
        <Text>
          {mode === 'view' ? (
            <>
              <Text color="green">[Enter]</Text> Approve & Execute
              <Text color="yellow"> [e]</Text> Edit Plan
              <Text color="red"> [c]</Text> Cancel
              <Text color="cyan"> [s]</Text> Skip Selected Step
              <Text color="gray"> [↑↓]</Text> Navigate
            </>
          ) : (
            <>
              <Text color="yellow">EDIT MODE</Text> - Modify the plan
            </>
          )}
        </Text>
      </Box>
    </Box>
  );
};
```

### CLI Usage

```bash
# Generate and review plan before execution
gemini plan "Build a REST API for user management"

# The UI will show:
# 1. Complete execution plan with all steps
# 2. Cost and time estimates
# 3. Risk levels for each step
# 4. Interactive controls to modify the plan

# After approval, execution begins
# User can still stop at any step if needed

# Skip to implementation without planning (direct mode)
gemini agent "Build REST API" --no-plan

# Enable step-by-step approval during execution
gemini agent "Refactor codebase" --step-by-step
```

### Keyboard Shortcuts

- **Shift+Tab Shift+Tab**: Toggle plan mode globally
- **Enter**: Approve plan and begin execution
- **e**: Enter edit mode
- **s**: Skip selected step
- **r**: Reorder steps
- **m**: Modify step details
- **c**: Cancel and exit
- **↑/↓**: Navigate between steps

---

## Learning & Pattern Recognition

### Overview

The Learning System enables the agent to improve over time by recording
successful patterns and avoiding past mistakes. This creates a continuously
improving AI assistant that gets smarter with each use.

### Architecture

```typescript
// packages/core/src/learning/pattern-learner.ts

export interface ExecutionPattern {
  id: string;
  taskType: string; // 'api_development', 'database_setup', 'testing', etc.
  pattern: {
    approach: string;
    steps: string[];
    toolsUsed: string[];
    codePatterns: string[];
  };
  successCount: number;
  failureCount: number;
  successRate: number;
  avgExecutionTime: number;
  context: {
    languages: string[];
    frameworks: string[];
    complexity: 'low' | 'medium' | 'high';
  };
  examples: {
    taskDescription: string;
    outcome: 'success' | 'failure';
    timestamp: string;
  }[];
  lastUsed: string;
  createdAt: string;
}

export interface FailurePattern {
  id: string;
  errorType: string;
  errorMessage: string;
  context: string;
  resolution: string;
  occurrences: number;
  lastSeen: string;
}

export class AgentLearner {
  constructor(private db: DatabaseManager) {}

  async recordSuccess(execution: AgentExecution): Promise<void> {
    // Extract pattern from successful execution
    const pattern = await this.extractPattern(execution);

    // Find existing similar pattern
    const existing = await this.findSimilarPattern(pattern);

    if (existing) {
      // Update existing pattern
      await this.updatePattern(existing.id, {
        successCount: existing.successCount + 1,
        successRate:
          (existing.successCount + 1) /
          (existing.successCount + existing.failureCount + 1),
        avgExecutionTime:
          (existing.avgExecutionTime * existing.successCount +
            execution.duration) /
          (existing.successCount + 1),
        lastUsed: new Date().toISOString(),
        examples: [
          ...existing.examples.slice(-4), // Keep last 4 examples
          {
            taskDescription: execution.task.description,
            outcome: 'success',
            timestamp: new Date().toISOString(),
          },
        ],
      });
    } else {
      // Create new pattern
      await this.createPattern({
        ...pattern,
        successCount: 1,
        failureCount: 0,
        successRate: 1.0,
        avgExecutionTime: execution.duration,
        examples: [
          {
            taskDescription: execution.task.description,
            outcome: 'success',
            timestamp: new Date().toISOString(),
          },
        ],
        lastUsed: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    }
  }

  async recordFailure(execution: AgentExecution, error: Error): Promise<void> {
    // Record failure pattern
    const failurePattern: FailurePattern = {
      id: generateId(),
      errorType: error.name,
      errorMessage: error.message,
      context: JSON.stringify({
        taskType: execution.task.type,
        step: execution.currentStep,
        tools: execution.toolsUsed,
      }),
      resolution: '', // Will be filled when resolved
      occurrences: 1,
      lastSeen: new Date().toISOString(),
    };

    await this.db.query(
      `
      INSERT INTO failurePatterns (id, errorType, errorMessage, context, resolution, occurrences, lastSeen)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        failurePattern.id,
        failurePattern.errorType,
        failurePattern.errorMessage,
        failurePattern.context,
        failurePattern.resolution,
        failurePattern.occurrences,
        failurePattern.lastSeen,
      ],
    );

    // Update pattern failure count
    const pattern = await this.extractPattern(execution);
    const existing = await this.findSimilarPattern(pattern);

    if (existing) {
      await this.updatePattern(existing.id, {
        failureCount: existing.failureCount + 1,
        successRate:
          existing.successCount /
          (existing.successCount + existing.failureCount + 1),
      });
    }
  }

  async suggestApproach(task: AgentTask): Promise<ExecutionPattern | null> {
    // Find most successful pattern for this task type
    const patterns = await this.db.query(
      `
      SELECT * FROM learnedPatterns
      WHERE taskType = ?
      ORDER BY successRate DESC, successCount DESC
      LIMIT 1
    `,
      [task.type],
    );

    if (patterns.length === 0) return null;

    return this.deserializePattern(patterns[0]);
  }

  async checkForKnownIssues(
    task: AgentTask,
    plannedSteps: ExecutionStep[],
  ): Promise<FailurePattern[]> {
    // Check if any of the planned steps match known failure patterns
    const knownIssues: FailurePattern[] = [];

    for (const step of plannedSteps) {
      const failures = await this.db.query(
        `
        SELECT * FROM failurePatterns
        WHERE context LIKE ?
        AND occurrences > 2
        ORDER BY lastSeen DESC
        LIMIT 5
      `,
        [`%${step.action}%`],
      );

      knownIssues.push(...failures.map((f) => this.deserializeFailure(f)));
    }

    return knownIssues;
  }

  async getLearnedPatterns(limit: number = 10): Promise<ExecutionPattern[]> {
    const patterns = await this.db.query(
      `
      SELECT * FROM learnedPatterns
      ORDER BY successRate DESC, successCount DESC
      LIMIT ?
    `,
      [limit],
    );

    return patterns.map((p) => this.deserializePattern(p));
  }

  async classifyTask(taskDescription: string): Promise<string> {
    // Use LLM to classify task type
    // This helps match with learned patterns
    const classifications = [
      'api_development',
      'database_setup',
      'testing',
      'frontend_development',
      'bug_fix',
      'refactoring',
      'documentation',
      'deployment',
      'authentication',
      'data_processing',
    ];

    // Simple keyword matching (could be enhanced with LLM)
    const lower = taskDescription.toLowerCase();

    if (lower.includes('api') || lower.includes('endpoint'))
      return 'api_development';
    if (lower.includes('database') || lower.includes('schema'))
      return 'database_setup';
    if (lower.includes('test')) return 'testing';
    if (lower.includes('ui') || lower.includes('frontend'))
      return 'frontend_development';
    if (lower.includes('bug') || lower.includes('fix')) return 'bug_fix';
    if (lower.includes('refactor')) return 'refactoring';
    if (lower.includes('auth')) return 'authentication';

    return 'general';
  }

  private async extractPattern(
    execution: AgentExecution,
  ): Promise<Partial<ExecutionPattern>> {
    return {
      id: generateId(),
      taskType: await this.classifyTask(execution.task.description),
      pattern: {
        approach: execution.plan.strategy,
        steps: execution.plan.steps.map((s) => s.action),
        toolsUsed: [...new Set(execution.toolsUsed)],
        codePatterns: this.extractCodePatterns(execution),
      },
      context: {
        languages: this.detectLanguages(execution),
        frameworks: this.detectFrameworks(execution),
        complexity: this.assessComplexity(execution),
      },
    };
  }

  private async findSimilarPattern(
    pattern: Partial<ExecutionPattern>,
  ): Promise<ExecutionPattern | null> {
    // Find patterns with same task type and similar approach
    const candidates = await this.db.query(
      `
      SELECT * FROM learnedPatterns
      WHERE taskType = ?
    `,
      [pattern.taskType],
    );

    // Calculate similarity score
    for (const candidate of candidates) {
      const deserialized = this.deserializePattern(candidate);
      const similarity = this.calculateSimilarity(pattern, deserialized);

      if (similarity > 0.7) {
        return deserialized;
      }
    }

    return null;
  }

  private calculateSimilarity(
    p1: Partial<ExecutionPattern>,
    p2: ExecutionPattern,
  ): number {
    // Simple Jaccard similarity on tools used
    const tools1 = new Set(p1.pattern?.toolsUsed || []);
    const tools2 = new Set(p2.pattern.toolsUsed);

    const intersection = new Set([...tools1].filter((t) => tools2.has(t)));
    const union = new Set([...tools1, ...tools2]);

    return intersection.size / union.size;
  }

  private extractCodePatterns(execution: AgentExecution): string[] {
    // Extract common code patterns from generated code
    // E.g., "express_router", "mongoose_schema", "jest_test", etc.
    return [];
  }

  private detectLanguages(execution: AgentExecution): string[] {
    // Detect languages used in execution
    return [];
  }

  private detectFrameworks(execution: AgentExecution): string[] {
    // Detect frameworks used
    return [];
  }

  private assessComplexity(
    execution: AgentExecution,
  ): 'low' | 'medium' | 'high' {
    if (execution.plan.steps.length > 10) return 'high';
    if (execution.plan.steps.length > 5) return 'medium';
    return 'low';
  }

  private deserializePattern(row: any): ExecutionPattern {
    return {
      ...row,
      pattern: JSON.parse(row.pattern),
      context: JSON.parse(row.context),
      examples: JSON.parse(row.examples),
    };
  }

  private deserializeFailure(row: any): FailurePattern {
    return {
      ...row,
      context: JSON.parse(row.context),
    };
  }

  private async createPattern(pattern: ExecutionPattern): Promise<void> {
    await this.db.query(
      `
      INSERT INTO learnedPatterns (
        id, taskType, pattern, successCount, failureCount,
        successRate, avgExecutionTime, context, examples,
        lastUsed, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        pattern.id,
        pattern.taskType,
        JSON.stringify(pattern.pattern),
        pattern.successCount,
        pattern.failureCount,
        pattern.successRate,
        pattern.avgExecutionTime,
        JSON.stringify(pattern.context),
        JSON.stringify(pattern.examples),
        pattern.lastUsed,
        pattern.createdAt,
      ],
    );
  }

  private async updatePattern(
    id: string,
    updates: Partial<ExecutionPattern>,
  ): Promise<void> {
    const fields = Object.keys(updates)
      .map((k) => `${k} = ?`)
      .join(', ');

    const values = Object.values(updates).map((v) =>
      typeof v === 'object' ? JSON.stringify(v) : v,
    );

    await this.db.query(
      `
      UPDATE learnedPatterns
      SET ${fields}
      WHERE id = ?
    `,
      [...values, id],
    );
  }
}
```

### CLI Commands

```bash
# View learned patterns
gemini learning patterns

# View learning statistics
gemini learning stats

# View known issues/failures
gemini learning failures

# Export learned patterns (for sharing with team)
gemini learning export --output patterns.json

# Import learned patterns
gemini learning import --input patterns.json
```

### Learning Dashboard Output

```
📚 Learning System Statistics

Total Patterns Learned: 47
Success Rate: 89.3%
Avg Execution Time: 2.4 min

Top Performing Patterns:
1. API Development (Express + MongoDB) - 95% success, 23 uses
2. React Component Creation - 92% success, 18 uses
3. Database Migration - 88% success, 12 uses

Recent Improvements:
  • Reduced bug fix time by 34% (last 30 days)
  • Avoided 12 known failure patterns
  • Suggested optimal approach 89% of the time

Common Mistakes Avoided:
  ⚠️ Missing dependency installation (15 times)
  ⚠️ Incorrect file paths (8 times)
  ⚠️ Missing error handling (12 times)
```

---

## Database Architecture

Implement a structured database using SQLite for better performance and
querying:

```typescript
// packages/core/src/database/schema.ts

export interface DatabaseSchema {
  // Sessions table
  sessions: {
    id: string; // Primary key
    name: string;
    provider: ProviderType;
    model: string;
    projectHash: string;
    createdAt: string;
    lastActive: string;
    totalMessages: number;
    totalBranches: number;
    metadata: string; // JSON serialized
  };

  // Conversation nodes table
  conversationNodes: {
    id: string; // Primary key
    sessionId: string; // Foreign key to sessions
    parentId: string | null;
    messageId: string;
    role: 'user' | 'assistant' | 'system';
    content: string; // JSON serialized parts
    provider: ProviderType;
    model: string;
    createdAt: string;
    tokensUsed: number;
    metadata: string; // JSON serialized (tool calls, thoughts, etc.)
  };

  // Branches table
  branches: {
    id: string; // Primary key
    sessionId: string; // Foreign key to sessions
    name: string | null;
    path: string; // JSON array of node IDs
    currentNodeId: string;
    createdAt: string;
    lastActive: string;
  };

  // Providers configuration
  providers: {
    id: string; // Primary key
    type: ProviderType;
    name: string;
    config: string; // JSON serialized
    isActive: boolean;
    createdAt: string;
    lastUsed: string;
  };

  // Models cache
  models: {
    id: string; // Primary key
    providerId: string; // Foreign key to providers
    modelId: string;
    displayName: string;
    contextWindow: number;
    capabilities: string; // JSON serialized
    pricing: string; // JSON serialized (if available)
    lastUpdated: string;
  };

  // Session statistics
  statistics: {
    sessionId: string; // Foreign key to sessions
    date: string; // YYYY-MM-DD
    messagesCount: number;
    tokensUsed: number;
    providersUsed: string; // JSON array
    modelsUsed: string; // JSON array
    estimatedCost: number;
  };

  // Agent executions
  agentExecutions: {
    id: string; // Primary key
    taskId: string;
    sessionId: string; // Foreign key to sessions
    description: string;
    intent: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    startTime: string;
    endTime: string | null;
    planSteps: string; // JSON serialized execution plan
    results: string; // JSON serialized results
    artifactsCreated: string; // JSON array of file paths
    errorsEncountered: string; // JSON array
    validationScore: number; // 0-100
  };

  // Agent learning patterns
  agentPatterns: {
    id: string; // Primary key
    taskType: string;
    action: string;
    isSuccess: boolean;
    occurrences: number;
    successRate: number;
    averageDuration: number;
    pattern: string; // JSON serialized pattern data
    lastUsed: string;
  };

  // Memory index for cross-session context
  memoryIndex: {
    id: string; // Primary key
    sessionId: string; // Foreign key to sessions
    nodeId: string;
    content: string;
    embedding: Buffer; // Binary vector embedding
    topics: string; // JSON array
    entities: string; // JSON array (files, databases, APIs)
    timestamp: string;
    importance: number; // 0-1 score
    provider: ProviderType;
    model: string;
  };
}
```

### 2. Database Manager

```typescript
// packages/core/src/database/database-manager.ts

import Database from 'better-sqlite3';

export class DatabaseManager {
  private db: Database.Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.initialize();
  }

  private initialize(): void {
    // Create tables
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        provider TEXT NOT NULL,
        model TEXT NOT NULL,
        projectHash TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        lastActive TEXT NOT NULL,
        totalMessages INTEGER DEFAULT 0,
        totalBranches INTEGER DEFAULT 1,
        metadata TEXT
      );
      
      CREATE TABLE IF NOT EXISTS conversationNodes (
        id TEXT PRIMARY KEY,
        sessionId TEXT NOT NULL,
        parentId TEXT,
        messageId TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        provider TEXT NOT NULL,
        model TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        tokensUsed INTEGER DEFAULT 0,
        metadata TEXT,
        FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS branches (
        id TEXT PRIMARY KEY,
        sessionId TEXT NOT NULL,
        name TEXT,
        path TEXT NOT NULL,
        currentNodeId TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        lastActive TEXT NOT NULL,
        FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS providers (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        config TEXT NOT NULL,
        isActive BOOLEAN DEFAULT 1,
        createdAt TEXT NOT NULL,
        lastUsed TEXT
      );
      
      CREATE TABLE IF NOT EXISTS models (
        id TEXT PRIMARY KEY,
        providerId TEXT NOT NULL,
        modelId TEXT NOT NULL,
        displayName TEXT NOT NULL,
        contextWindow INTEGER,
        capabilities TEXT,
        pricing TEXT,
        lastUpdated TEXT NOT NULL,
        FOREIGN KEY (providerId) REFERENCES providers(id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS statistics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sessionId TEXT NOT NULL,
        date TEXT NOT NULL,
        messagesCount INTEGER DEFAULT 0,
        tokensUsed INTEGER DEFAULT 0,
        providersUsed TEXT,
        modelsUsed TEXT,
        estimatedCost REAL DEFAULT 0,
        FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS agentExecutions (
        id TEXT PRIMARY KEY,
        taskId TEXT NOT NULL,
        sessionId TEXT NOT NULL,
        description TEXT NOT NULL,
        intent TEXT NOT NULL,
        status TEXT NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT,
        planSteps TEXT,
        results TEXT,
        artifactsCreated TEXT,
        errorsEncountered TEXT,
        validationScore REAL,
        FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS agentPatterns (
        id TEXT PRIMARY KEY,
        taskType TEXT NOT NULL,
        action TEXT NOT NULL,
        isSuccess BOOLEAN NOT NULL,
        occurrences INTEGER DEFAULT 1,
        successRate REAL DEFAULT 0,
        averageDuration REAL DEFAULT 0,
        pattern TEXT,
        lastUsed TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS memoryIndex (
        id TEXT PRIMARY KEY,
        sessionId TEXT NOT NULL,
        nodeId TEXT NOT NULL,
        content TEXT NOT NULL,
        embedding BLOB NOT NULL,
        topics TEXT,
        entities TEXT,
        timestamp TEXT NOT NULL,
        importance REAL DEFAULT 0.5,
        provider TEXT,
        model TEXT,
        FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
      );
      
      -- Full-text search for memory
      CREATE VIRTUAL TABLE IF NOT EXISTS memoryFts USING fts5(
        id UNINDEXED,
        content,
        entities,
        topics
      );
      
      -- Indexes for performance
      CREATE INDEX IF NOT EXISTS idx_sessions_projectHash ON sessions(projectHash);
      CREATE INDEX IF NOT EXISTS idx_sessions_lastActive ON sessions(lastActive DESC);
      CREATE INDEX IF NOT EXISTS idx_nodes_sessionId ON conversationNodes(sessionId);
      CREATE INDEX IF NOT EXISTS idx_nodes_parentId ON conversationNodes(parentId);
      CREATE INDEX IF NOT EXISTS idx_branches_sessionId ON branches(sessionId);
      CREATE INDEX IF NOT EXISTS idx_statistics_sessionId ON statistics(sessionId);
      CREATE INDEX IF NOT EXISTS idx_statistics_date ON statistics(date);
      CREATE INDEX IF NOT EXISTS idx_agent_sessionId ON agentExecutions(sessionId);
      CREATE INDEX IF NOT EXISTS idx_agent_status ON agentExecutions(status);
      CREATE INDEX IF NOT EXISTS idx_agent_patterns_taskType ON agentPatterns(taskType);
      CREATE INDEX IF NOT EXISTS idx_memory_sessionId ON memoryIndex(sessionId);
      CREATE INDEX IF NOT EXISTS idx_memory_timestamp ON memoryIndex(timestamp);
      CREATE INDEX IF NOT EXISTS idx_memory_importance ON memoryIndex(importance);
    `);
  }

  // Session operations
  createSession(
    session: Omit<DatabaseSchema['sessions'], 'metadata'> & {
      metadata: object;
    },
  ): void {
    const stmt = this.db.prepare(`
      INSERT INTO sessions (id, name, provider, model, projectHash, createdAt, lastActive, totalMessages, totalBranches, metadata)
      VALUES (@id, @name, @provider, @model, @projectHash, @createdAt, @lastActive, @totalMessages, @totalBranches, @metadata)
    `);

    stmt.run({
      ...session,
      metadata: JSON.stringify(session.metadata),
    });
  }

  getSession(sessionId: string): DatabaseSchema['sessions'] | null {
    const stmt = this.db.prepare('SELECT * FROM sessions WHERE id = ?');
    return stmt.get(sessionId) as DatabaseSchema['sessions'] | null;
  }

  listSessions(projectHash?: string, limit = 50): DatabaseSchema['sessions'][] {
    let query = 'SELECT * FROM sessions';
    const params: any[] = [];

    if (projectHash) {
      query += ' WHERE projectHash = ?';
      params.push(projectHash);
    }

    query += ' ORDER BY lastActive DESC LIMIT ?';
    params.push(limit);

    const stmt = this.db.prepare(query);
    return stmt.all(...params) as DatabaseSchema['sessions'][];
  }

  // Conversation node operations
  addNode(
    node: Omit<DatabaseSchema['conversationNodes'], 'metadata'> & {
      metadata: object;
    },
  ): void {
    const stmt = this.db.prepare(`
      INSERT INTO conversationNodes (id, sessionId, parentId, messageId, role, content, provider, model, createdAt, tokensUsed, metadata)
      VALUES (@id, @sessionId, @parentId, @messageId, @role, @content, @provider, @model, @createdAt, @tokensUsed, @metadata)
    `);

    stmt.run({
      ...node,
      metadata: JSON.stringify(node.metadata),
    });
  }

  getConversationTree(
    sessionId: string,
  ): DatabaseSchema['conversationNodes'][] {
    const stmt = this.db.prepare(
      'SELECT * FROM conversationNodes WHERE sessionId = ? ORDER BY createdAt ASC',
    );
    return stmt.all(sessionId) as DatabaseSchema['conversationNodes'][];
  }

  // Branch operations
  createBranch(branch: DatabaseSchema['branches']): void {
    const stmt = this.db.prepare(`
      INSERT INTO branches (id, sessionId, name, path, currentNodeId, createdAt, lastActive)
      VALUES (@id, @sessionId, @name, @path, @currentNodeId, @createdAt, @lastActive)
    `);

    stmt.run(branch);
  }

  getBranches(sessionId: string): DatabaseSchema['branches'][] {
    const stmt = this.db.prepare(
      'SELECT * FROM branches WHERE sessionId = ? ORDER BY createdAt ASC',
    );
    return stmt.all(sessionId) as DatabaseSchema['branches'][];
  }

  // Provider operations
  saveProvider(
    provider: Omit<DatabaseSchema['providers'], 'config'> & { config: object },
  ): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO providers (id, type, name, config, isActive, createdAt, lastUsed)
      VALUES (@id, @type, @name, @config, @isActive, @createdAt, @lastUsed)
    `);

    stmt.run({
      ...provider,
      config: JSON.stringify(provider.config),
    });
  }

  getProviders(): DatabaseSchema['providers'][] {
    const stmt = this.db.prepare('SELECT * FROM providers WHERE isActive = 1');
    return stmt.all() as DatabaseSchema['providers'][];
  }

  // Statistics operations
  recordStatistics(stats: Omit<DatabaseSchema['statistics'], 'id'>): void {
    const stmt = this.db.prepare(`
      INSERT INTO statistics (sessionId, date, messagesCount, tokensUsed, providersUsed, modelsUsed, estimatedCost)
      VALUES (@sessionId, @date, @messagesCount, @tokensUsed, @providersUsed, @modelsUsed, @estimatedCost)
    `);

    stmt.run(stats);
  }

  getStatistics(
    sessionId: string,
    startDate?: string,
    endDate?: string,
  ): DatabaseSchema['statistics'][] {
    let query = 'SELECT * FROM statistics WHERE sessionId = ?';
    const params: any[] = [sessionId];

    if (startDate) {
      query += ' AND date >= ?';
      params.push(startDate);
    }
    if (endDate) {
      query += ' AND date <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY date ASC';

    const stmt = this.db.prepare(query);
    return stmt.all(...params) as DatabaseSchema['statistics'][];
  }

  // Search operations
  searchMessages(
    query: string,
    sessionId?: string,
  ): DatabaseSchema['conversationNodes'][] {
    let sql = 'SELECT * FROM conversationNodes WHERE content LIKE ?';
    const params: any[] = [`%${query}%`];

    if (sessionId) {
      sql += ' AND sessionId = ?';
      params.push(sessionId);
    }

    sql += ' ORDER BY createdAt DESC LIMIT 100';

    const stmt = this.db.prepare(sql);
    return stmt.all(...params) as DatabaseSchema['conversationNodes'][];
  }

  close(): void {
    this.db.close();
  }
}
```

### 3. Migration from JSON to Database

```typescript
// packages/core/src/database/migration.ts

export class SessionMigration {
  async migrateFromJSON(
    jsonDir: string,
    dbManager: DatabaseManager,
  ): Promise<MigrationResult> {
    const files = await fs.readdir(jsonDir);
    const sessionFiles = files.filter(
      (f) => f.startsWith('session-') && f.endsWith('.json'),
    );

    const result: MigrationResult = {
      total: sessionFiles.length,
      migrated: 0,
      failed: 0,
      errors: [],
    };

    for (const file of sessionFiles) {
      try {
        const content = await fs.readFile(path.join(jsonDir, file), 'utf8');
        const sessionData: ConversationRecord = JSON.parse(content);

        // Create session
        dbManager.createSession({
          id: sessionData.sessionId,
          name: `Session ${sessionData.startTime}`,
          provider: ProviderType.GOOGLE_GEMINI, // Default for old sessions
          model: 'gemini-1.5-pro', // Default
          projectHash: sessionData.projectHash,
          createdAt: sessionData.startTime,
          lastActive: sessionData.lastUpdated,
          totalMessages: sessionData.messages.length,
          totalBranches: 1,
          metadata: {},
        });

        // Create conversation nodes (linear for old sessions)
        let parentId: string | null = null;
        for (const message of sessionData.messages) {
          const nodeId = randomUUID();

          dbManager.addNode({
            id: nodeId,
            sessionId: sessionData.sessionId,
            parentId,
            messageId: message.id,
            role: message.type === 'user' ? 'user' : 'assistant',
            content: JSON.stringify(message.content),
            provider: ProviderType.GOOGLE_GEMINI,
            model:
              message.type === 'gemini' ? message.model || 'unknown' : 'user',
            createdAt: message.timestamp,
            tokensUsed:
              message.type === 'gemini' ? message.tokens?.total || 0 : 0,
            metadata: {
              toolCalls:
                message.type === 'gemini' ? message.toolCalls : undefined,
              thoughts:
                message.type === 'gemini' ? message.thoughts : undefined,
            },
          });

          parentId = nodeId;
        }

        result.migrated++;
      } catch (error) {
        result.failed++;
        result.errors.push({
          file,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return result;
  }
}
```

---

## Implementation Roadmap

### Phase 1: Foundation & Provider Abstraction (Weeks 1-2)

1. **Provider Abstraction Layer**
   - Define `LLMProvider` interface
   - Implement unified request/response types
   - Create base provider class with common functionality

2. **Initial Provider Implementations**
   - Refactor existing Gemini integration to new interface
   - Implement OpenRouter provider
   - Implement Ollama provider (for local models)

3. **Configuration Updates**
   - Extend `AuthType` enum for new providers
   - Update configuration files to support multiple providers
   - Add provider selection UI

### Phase 2: Database Layer & Memory Foundation (Weeks 3-4)

1. **Database Schema & Manager**
   - Implement SQLite database manager
   - Create schema migration system
   - Build CRUD operations for sessions/nodes/branches
   - Add memory index and agent execution tables

2. **Migration Tools**
   - Create JSON to database migration script
   - Test with existing session files
   - Backup and rollback mechanisms

3. **Backward Compatibility**
   - Maintain JSON file format support as fallback
   - Implement automatic migration on first run
   - Configuration option to choose storage backend

### Phase 3: Session Branching (Weeks 5-6)

1. **Conversation Tree**
   - Implement `ConversationTree` class
   - Add node navigation methods
   - Create branch management APIs

2. **Enhanced Session Manager**
   - Extend current session manager with branching
   - Implement branch comparison
   - Add branch naming and metadata

3. **UI for Branching**
   - CLI commands for branch navigation
   - Display branch indicators
   - Interactive branch selection

### Phase 4: Autonomous Agent System (Weeks 7-9)

1. **Core Agent Architecture**
   - Implement `AutonomousAgent` class
   - Build task planning system
   - Create execution loop with error handling
   - Implement iterative refinement

2. **Agent Tools & Actions**
   - Extend tool system for agent operations
   - Create file creation/editing workflows
   - Implement code testing and validation
   - Add error debugging capabilities

3. **Agent Learning & Memory**
   - Implement `AgentMemory` class
   - Track successful/failed patterns
   - Build pattern matching system
   - Create recovery strategies

4. **Agent CLI Interface**
   - Add `gemini agent` command
   - Build execution monitor UI
   - Implement approval workflows
   - Create progress visualization

### Phase 5: Cross-Session Contextual Memory (Weeks 10-12)

1. **Memory Indexing System**
   - Implement `ContextualMemorySystem` class
   - Build vector database for embeddings
   - Create entity extraction pipeline
   - Implement topic classification

2. **Semantic Search**
   - Integrate embedding generation (Gemini/OpenAI)
   - Implement cosine similarity search
   - Build full-text search with FTS5
   - Create hybrid search (vector + keyword)

3. **Context Injection**
   - Automatic context detection
   - Smart context enrichment
   - Entity-based session linking
   - File history tracking

4. **Memory UI & Commands**
   - Context preview in CLI
   - `gemini context` command
   - `gemini history --file` command
   - `gemini search` semantic search

### Phase 6: Additional Providers (Weeks 13-14)

1. **OpenAI Provider**
   - Implement ChatGPT integration
   - Support GPT-4, GPT-3.5-turbo, etc.
   - Function calling translation

2. **Anthropic Provider**
   - Implement Claude integration
   - Support Claude 3 models
   - Tool use translation

3. **LiteLLM Integration**
   - Support organizations using LiteLLM proxy
   - Centralized cost tracking
   - Multi-provider routing

### Phase 7: Integration & Testing (Weeks 15-16)

1. **Comprehensive Testing**
   - Test each provider individually
   - Test provider switching
   - Test session branching
   - Test agent execution flows
   - Test memory retrieval accuracy

2. **Performance Optimization**
   - Database query optimization
   - Vector search optimization
   - Caching strategies (embeddings, results)
   - Memory management
   - Agent execution efficiency

3. **Error Handling & Recovery**
   - Provider fallback mechanisms
   - Agent error recovery
   - Memory index corruption handling
   - Session recovery

### Phase 8: Documentation & Polish (Weeks 17-18)

1. **User Documentation**
   - Update user guides
   - Provider setup instructions
   - Agent usage examples
   - Memory system explanation
   - Migration guides

2. **Developer Documentation**
   - Architecture documentation
   - API references
   - Custom provider guide
   - Custom tool development
   - Extension points

3. **Examples & Templates**
   - Agent task templates
   - Session templates
   - Provider configurations
   - Common workflows

### Key Milestones

- **Week 6**: Multi-provider support with session branching ✅
- **Week 9**: Autonomous agent system functional ✅
- **Week 12**: Cross-session memory operational ✅
- **Week 14**: All major providers integrated ✅
- **Week 18**: Production-ready release 🚀

---

## Potential Add-ons & Extensions

### 1. **Advanced Agent Features**

#### Multi-Agent Collaboration

```typescript
interface AgentTeam {
  name: string;
  agents: {
    planner: AutonomousAgent; // Creates execution plans
    coder: AutonomousAgent; // Writes code
    tester: AutonomousAgent; // Tests and validates
    reviewer: AutonomousAgent; // Reviews and suggests improvements
  };
  workflow: AgentWorkflow;
}

// Usage:
// gemini team create "fullstack-dev" --agents planner,coder,tester,reviewer
// gemini team run "Build a user authentication system" --team fullstack-dev
```

#### Agent Specialization

```typescript
interface SpecializedAgent extends AutonomousAgent {
  specialty:
    | 'frontend'
    | 'backend'
    | 'database'
    | 'testing'
    | 'devops'
    | 'documentation';
  knowledgeBase: string[]; // Specific technologies/frameworks
  preferredTools: string[];
  experienceLevel: 'junior' | 'mid' | 'senior';
}

// Train agents for specific domains
// gemini agent train --specialty backend --tech "node.js,postgresql,redis"
```

#### Agent Workflows

```typescript
interface AgentWorkflow {
  name: string;
  stages: WorkflowStage[];
  parallelizable: boolean;
  checkpoints: string[]; // Points where user approval is needed
}

interface WorkflowStage {
  name: string;
  agent: string; // Agent ID
  input: string; // Output from previous stage
  successCriteria: string[];
  maxDuration: number;
}

// Define reusable workflows
// gemini workflow create "tdd-cycle" --stages "write-test,implement,refactor"
```

#### Agent Collaboration Protocol

```typescript
// Agents can request help from each other
interface AgentCollaboration {
  requestingAgent: string;
  assistingAgent: string;
  task: string;
  sharedContext: Record<string, any>;
  collaborationType: 'review' | 'assist' | 'validate' | 'optimize';
}

// Example: Coder agent asks Tester agent to validate
// "Please review this authentication function and suggest test cases"
```

### 2. **Advanced Memory Features**

#### Semantic Memory Clusters

```typescript
interface MemoryCluster {
  id: string;
  topic: string;
  relatedSessions: string[];
  conceptMap: Map<string, string[]>; // Concept -> Related concepts
  confidence: number;
}

// Automatically cluster related memories by topic
// gemini memory cluster --topic "authentication"
// gemini memory explore --cluster <cluster-id>
```

#### Personal Knowledge Graph

```typescript
interface KnowledgeGraph {
  entities: Map<string, Entity>;
  relationships: Relationship[];

  // Query the graph
  query(pattern: string): Entity[];
  traverse(startEntity: string, maxDepth: number): Entity[];
}

interface Entity {
  id: string;
  type: 'file' | 'concept' | 'api' | 'database' | 'person' | 'project';
  name: string;
  attributes: Record<string, any>;
  firstMentioned: string;
  lastMentioned: string;
  mentionCount: number;
}

interface Relationship {
  from: string;
  to: string;
  type: 'depends_on' | 'implements' | 'uses' | 'related_to' | 'discussed_with';
  strength: number; // Based on co-occurrence frequency
}

// Build knowledge graph from all conversations
// gemini knowledge build
// gemini knowledge query "What APIs does user-service depend on?"
// gemini knowledge visualize --export graph.html
```

#### Smart Context Suggestions

```typescript
// AI suggests when to include context
interface ContextSuggestion {
  relevantSessions: string[];
  reason: string;
  confidence: number;
  suggestedAction: 'include' | 'reference' | 'ignore';
}

// Before you type, the system suggests:
// "💡 I notice you're asking about rate limiting.
//  Would you like me to include context from our
//  conversation about Redis-based rate limiting on Oct 15?"
```

#### Memory Decay & Reinforcement

```typescript
// Implement memory importance decay over time
interface MemoryDecay {
  baseImportance: number;
  currentImportance: number;
  decayRate: number;
  lastAccessed: string;
  accessCount: number;
}

// Memories accessed frequently maintain importance
// Rarely accessed memories decay and may be archived
```

### 3. **Advanced Session Features**

#### Session Templates

```typescript
interface SessionTemplate {
  name: string;
  description: string;
  provider: ProviderType;
  model: string;
  systemPrompt: string;
  tools: string[];
  config: {
    temperature: number;
    maxTokens: number;
  };
}

// Usage:
// gemini template create --name "code-review" --model "gpt-4" --system-prompt "You are a code reviewer..."
// gemini start --template "code-review"
```

#### Session Snapshots

```typescript
interface SessionSnapshot {
  id: string;
  sessionId: string;
  name: string;
  timestamp: string;
  nodeId: string; // Point in conversation
  description?: string;
}

// Save current state
// gemini snapshot create "Before refactoring"
// gemini snapshot restore <snapshot-id>
```

#### Session Merge

```typescript
// Merge insights from multiple branches
interface BranchMerge {
  sourceBranches: string[];
  targetBranch: string;
  mergeStrategy: 'concat' | 'interleave' | 'summarize';
}

// gemini branch merge branch-1 branch-2 --strategy summarize
```

### 2. **Multi-Provider Features**

#### Cost Tracking Dashboard

```typescript
interface CostTracker {
  providers: Map<ProviderType, ProviderCost>;
  totalSpent: number;
  budget?: number;
  alerts: CostAlert[];
}

interface ProviderCost {
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
  estimatedCost: number;
}

// gemini costs --period "last-week"
// gemini costs --provider openai --detailed
```

#### Provider Benchmarking

```typescript
interface ProviderBenchmark {
  prompt: string;
  providers: ProviderType[];
  results: Map<ProviderType, BenchmarkResult>;
}

interface BenchmarkResult {
  response: string;
  latency: number;
  tokens: number;
  cost: number;
  quality: number; // User rating
}

// gemini benchmark "Explain quantum computing" --providers gemini,gpt-4,claude-3
```

#### Smart Model Routing

```typescript
interface ModelRouter {
  routeRequest(request: UnifiedRequest): ProviderType;

  strategies: {
    costOptimized: () => ProviderType; // Choose cheapest
    speedOptimized: () => ProviderType; // Choose fastest
    qualityOptimized: () => ProviderType; // Choose best quality
    balanced: () => ProviderType; // Balance all factors
  };
}

// gemini config set routing.strategy "cost-optimized"
// gemini config set routing.fallback "gpt-4,claude-3,gemini"
```

### 4. **Agent-Memory Integration**

#### Context-Aware Agent Execution

```typescript
// Agent automatically pulls relevant context before execution
class ContextAwareAgent extends AutonomousAgent {
  async executeTask(task: AgentTask): Promise<AgentTaskResult> {
    // Step 0: Retrieve relevant context from memory
    const context = await this.memorySystem.retrieveContext({
      query: task.description,
      filters: {
        entities: task.entities,
        minImportance: 0.5,
      },
    });

    if (context.relevantMemories.length > 0) {
      console.log(
        `📚 Found ${context.relevantMemories.length} relevant past conversations`,
      );
      task.additionalContext = context.summary;
    }

    return super.executeTask(task);
  }
}

// Example: "Build a user authentication API"
// Agent checks: "Did we discuss authentication before?"
// Finds: "Yes, on Oct 15 we discussed JWT vs OAuth2"
// Applies: Uses JWT as decided in previous conversation
```

#### Agent Learning from Memory

```typescript
// Agents learn from past successes and failures stored in memory
interface AgentLearning {
  analyzeHistoricalPerformance(taskType: string): Promise<Insights>;
  identifyCommonPitfalls(action: AgentAction): Promise<Pitfall[]>;
  suggestOptimizations(plan: ExecutionPlan): Promise<Optimization[]>;
}

// Agent before executing: "Last time we tried this approach, it failed due to X"
// Agent: "Based on past success, I'll use approach Y instead"
```

#### Proactive Agent Suggestions

```typescript
// Agent monitors codebase changes and suggests improvements
interface ProactiveAgent {
  watchFiles: string[];
  checkInterval: number;

  analyze(): Promise<Suggestion[]>;
}

interface Suggestion {
  type: 'refactor' | 'test' | 'documentation' | 'security' | 'performance';
  file: string;
  description: string;
  autoFixAvailable: boolean;
  estimatedEffort: 'low' | 'medium' | 'high';
}

// Agent: "I noticed user-service.ts grew to 500 lines. Should I refactor it?"
// Agent: "No tests found for the new authentication code. Shall I create them?"
```

### 5. **Collaboration Features**

#### Session Sharing

```typescript
interface SharedSession {
  sessionId: string;
  shareId: string;
  expiresAt: string;
  permissions: {
    view: boolean;
    comment: boolean;
    branch: boolean;
  };
  sharedBy: string;
  viewers: string[];
}

// gemini share <session-id> --expires "7d" --read-only
// gemini import <share-url>
```

#### Session Comments

```typescript
interface SessionComment {
  id: string;
  nodeId: string; // Attach to specific message
  author: string;
  text: string;
  timestamp: string;
  reactions: Map<string, string[]>; // emoji -> user[]
}

// gemini comment add "This response could be more detailed"
// gemini comment list --node <node-id>
```

### 6. **Advanced Tools & Integrations**

#### Agent IDE Integration

```typescript
// Deep integration with VS Code
interface IDEIntegration {
  openFileInEditor(filePath: string, line?: number): Promise<void>;
  getActiveFile(): Promise<string>;
  getSelection(): Promise<string>;
  replaceSelection(newContent: string): Promise<void>;
  runDebugger(config: DebugConfig): Promise<DebugResult>;
  getBreakpoints(): Promise<Breakpoint[]>;
}

// gemini agent "Fix the bug on line 42" --current-file
// gemini agent "Add error handling to selected function" --selection
```

#### Context-Aware Search

```typescript
// Search across all sessions with semantic understanding
interface SemanticSearch {
  query: string;
  filters: {
    provider?: ProviderType;
    dateRange?: [string, string];
    sessionTags?: string[];
  };
  results: SearchResult[];
}

// gemini search "how did I implement authentication?" --semantic
```

#### Session Analytics

```typescript
interface SessionAnalytics {
  topicsDiscussed: string[];
  codeSnippetsGenerated: number;
  toolsUsed: Map<string, number>;
  providerDistribution: Map<ProviderType, number>;
  averageResponseTime: number;
  successRate: number;
}

// gemini analytics --session <id>
// gemini analytics --all --period "last-month"
```

#### Export & Integration

```typescript
// Export to various formats
interface Exporter {
  exportToMarkdown(sessionId: string): string;
  exportToHTML(sessionId: string, options: HTMLExportOptions): string;
  exportToNotebook(sessionId: string): JupyterNotebook;
  exportToAnthropicFormat(sessionId: string): AnthropicExport;
  exportToChatGPTFormat(sessionId: string): ChatGPTExport;
}

// gemini export <session-id> --format markdown --output conversation.md
// gemini export <session-id> --format chatgpt --share
```

### 5. **Developer Productivity**

#### Session Playback

```typescript
// Replay a conversation with different providers or settings
interface SessionPlayback {
  originalSessionId: string;
  newConfig: {
    provider?: ProviderType;
    model?: string;
    temperature?: number;
  };
  compareWithOriginal: boolean;
}

// gemini replay <session-id> --provider claude-3 --compare
```

#### Quick Prompts Library

```typescript
interface PromptLibrary {
  categories: Map<string, Prompt[]>;
  recentPrompts: Prompt[];
  favorites: Prompt[];
}

interface Prompt {
  id: string;
  title: string;
  template: string;
  variables: string[];
  tags: string[];
  usageCount: number;
}

// gemini prompt save "Code review for {{language}}" --tags review,code
// gemini prompt use <prompt-id> --var language=typescript
```

#### Multi-Session Context

```typescript
// Reference and pull context from other sessions
interface CrossSessionContext {
  referencedSessions: string[];
  contextNodes: string[]; // Specific messages to include
  maxTokens: number;
}

// gemini context add --session <other-session-id> --nodes <node-ids>
// gemini context clear
```

### 6. **Advanced Configuration**

#### Provider Profiles

```typescript
interface ProviderProfile {
  name: string;
  provider: ProviderType;
  model: string;
  temperature: number;
  maxTokens: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  systemPrompt?: string;
  tools?: string[];
}

// gemini profile create "creative-writing" --provider openai --model gpt-4 --temp 0.9
// gemini start --profile "creative-writing"
```

#### Conditional Tool Access

```typescript
interface ToolPolicy {
  toolName: string;
  providers: ProviderType[];
  allowedPaths: string[];
  requireConfirmation: boolean;
  rateLimits?: {
    maxCallsPerSession: number;
    cooldown: number;
  };
}

// Configure which tools are available for which providers
// and under what conditions
```

### 7. **Enterprise Features**

#### Audit Logging

```typescript
interface AuditLog {
  timestamp: string;
  sessionId: string;
  userId: string;
  action: string;
  provider: ProviderType;
  model: string;
  tokensUsed: number;
  cost: number;
  metadata: Record<string, any>;
}

// Complete audit trail for compliance
```

#### Team Workspaces

```typescript
interface Workspace {
  id: string;
  name: string;
  members: WorkspaceMember[];
  sharedSessions: string[];
  providerConfigs: Map<ProviderType, ProviderConfig>;
  budgetLimits: BudgetConfig;
}

// gemini workspace create "engineering-team"
// gemini workspace invite user@example.com
```

#### Custom Tool Development SDK

```typescript
// SDK for building custom tools that work across providers
interface CustomTool extends Tool {
  providerAdapters: Map<ProviderType, ToolAdapter>;

  canExecuteOnProvider(provider: ProviderType): boolean;
  adaptForProvider(provider: ProviderType): ToolDefinition;
}

// Allow teams to build organization-specific tools
```

---

## Configuration Example

### Updated `settings.json`

```json
{
  "security": {
    "auth": {
      "selectedType": "multi-provider",
      "providers": [
        {
          "type": "google-gemini",
          "enabled": true,
          "authMethod": "oauth-personal",
          "default": false
        },
        {
          "type": "openrouter",
          "enabled": true,
          "apiKey": "${OPENROUTER_API_KEY}",
          "default": true,
          "models": ["openai/gpt-4", "anthropic/claude-3-opus"]
        },
        {
          "type": "ollama",
          "enabled": true,
          "baseUrl": "http://localhost:11434",
          "models": ["llama3", "codellama"]
        },
        {
          "type": "litellm",
          "enabled": false,
          "proxyUrl": "http://localhost:4000",
          "apiKey": "${LITELLM_API_KEY}"
        }
      ]
    }
  },
  "session": {
    "storage": {
      "backend": "database",
      "databasePath": "~/.gemini/sessions.db",
      "enableJsonBackup": true
    },
    "branching": {
      "enabled": true,
      "autoCreateBranches": true,
      "maxBranchesPerSession": 50
    },
    "retention": {
      "maxAge": "90d",
      "maxCount": 1000
    }
  },
  "providers": {
    "routing": {
      "strategy": "balanced",
      "fallbackOrder": ["google-gemini", "openrouter", "ollama"]
    },
    "costTracking": {
      "enabled": true,
      "monthlyBudget": 100.0,
      "alertThreshold": 0.8
    }
  }
}
```

---

## Conclusion

This enhanced architecture transforms Gemini CLI from a Google Gemini-specific
tool into an intelligent, autonomous AI development assistant with unprecedented
capabilities. The architecture encompasses three revolutionary enhancements:

### 1. Multi-Provider LLM Support

**From:** Single provider (Google Gemini)  
**To:** Universal LLM interface supporting 100+ models

**Key Benefits:**

- **Flexibility**: Switch between Gemini, GPT-4, Claude, Ollama, or any LLM
- **Cost Optimization**: Route to most cost-effective provider per task
- **Resilience**: Automatic fallback when providers are unavailable
- **Local Models**: Run Ollama models entirely offline
- **Future-Proof**: Easy to add new providers as they emerge

### 2. Autonomous Agent System

**From:** Conversational assistant  
**To:** Self-directed coding agent

**Revolutionary Capabilities:**

- **Complex Task Execution**: "Build a productivity tracking system" → Complete
  working code
- **Iterative Refinement**: Automatically debug and fix errors without user
  intervention
- **Self-Validation**: Compare output against intent, refine until requirements
  met
- **Learning & Adaptation**: Remember successful patterns, avoid past mistakes
- **Multi-Step Workflows**: Plan, execute, test, validate, deploy

**Real-World Impact:**

```
User: "Build a system to track my laptop logs and enhance productivity"

Agent:
1. ✅ Analyzed task → Created 12-step execution plan
2. ✅ Created logger.py with system monitoring
3. ✅ Created database schema (SQLite)
4. ✅ Implemented data collection service
5. ❌ Test failed: Module 'psutil' not found
6. ✅ Installed psutil dependency
7. ✅ Tests passed (3/3)
8. ✅ Created dashboard.html for visualization
9. ✅ Validated: All acceptance criteria met (Score: 95/100)
10. ✅ Output matches intent: System ready to use

Artifacts created:
- src/logger.py (230 lines)
- src/database.py (145 lines)
- src/collector.py (180 lines)
- web/dashboard.html (320 lines)
- tests/test_logger.py (95 lines)
- requirements.txt
- README.md

Task completed in 4 minutes 23 seconds.
```

### 3. Cross-Session Contextual Memory

**From:** Each session starts fresh  
**To:** Continuous, context-aware intelligence

**Transformative Features:**

- **Never Forget**: Every conversation indexed and searchable
- **Semantic Understanding**: "How did I implement auth?" → Finds relevant past
  conversations
- **Entity Tracking**: Tracks every file, database, API discussed
- **Knowledge Graph**: Builds relationship map of your codebase
- **Smart Context Injection**: Automatically includes relevant past context

**Real-World Impact:**

```
Week 1:
User: "Let's implement JWT authentication"
Assistant: [Implements JWT, discusses security best practices]

Week 3:
User: "Add OAuth2 support"
Assistant: "📚 I remember our JWT implementation from Oct 15.
           I'll integrate OAuth2 alongside the existing JWT system,
           keeping the same user model and token validation middleware."
[Seamlessly extends existing code with full context]

Week 5:
User: "Someone reported authentication not working"
Assistant: "🔍 Checking our authentication history...

           We have:
           - JWT implementation (Oct 15)
           - OAuth2 integration (Oct 17)
           - Rate limiting added (Oct 22)

           Common issues based on past debugging:
           1. Token expiration (we set 24h on Oct 15)
           2. CORS configuration (fixed on Oct 18)

           Let me check the logs..."
[Debugs with full knowledge of system evolution]
```

### Architecture Highlights

#### Database-Driven Intelligence

```
┌─────────────────────────────────────────────┐
│         SQLite Database (Local)             │
├─────────────────────────────────────────────┤
│  • 10,000+ conversations indexed            │
│  • Vector embeddings for semantic search   │
│  • Agent execution history                  │
│  • Knowledge graph of codebase              │
│  • Learning patterns from successes/failures│
└─────────────────────────────────────────────┘
         ↓                      ↓
    Instant                 Semantic
    Retrieval               Search
    (<10ms)                 (~100ms)
```

#### Intelligent Context Flow

```
User Query
    ↓
Semantic Analysis
    ↓
Memory Retrieval ← [Past 10,000 conversations]
    ↓
Context Enrichment ← [File history, related sessions]
    ↓
Agent Planning ← [Learned patterns]
    ↓
Multi-Provider Execution ← [Best model for task]
    ↓
Iterative Refinement ← [Self-validation]
    ↓
Result + Memory Update
```

### Key Innovation: The "Memory Loop"

Traditional AI: Each conversation is isolated  
Enhanced Gemini CLI: Every conversation builds on all previous ones

```typescript
// Traditional approach
user_query → LLM → response

// Enhanced approach
user_query
  → semantic_search(past_10k_conversations)
  → entity_extraction(codebases, files, APIs)
  → knowledge_graph_traversal(related_concepts)
  → context_enriched_query
  → multi_provider_routing(best_model_for_task)
  → agent_planning(with_learned_patterns)
  → iterative_execution(self_correcting)
  → validation(against_intent)
  → memory_update(index_new_knowledge)
  → contextual_response
```

### Comparison with Other AI Assistants

| Feature                | ChatGPT | Claude  | GitHub Copilot | Enhanced Gemini CLI        |
| ---------------------- | ------- | ------- | -------------- | -------------------------- |
| Multi-Provider         | ❌      | ❌      | ❌             | ✅ 100+ models             |
| Autonomous Execution   | ❌      | ❌      | ❌             | ✅ Full task automation    |
| Cross-Session Memory   | ❌      | ❌      | ❌             | ✅ Unlimited history       |
| Self-Correction        | Limited | Limited | ❌             | ✅ Iterative refinement    |
| Conversation Branching | ✅      | ✅      | ❌             | ✅ Advanced tree structure |
| Code Validation        | ❌      | ❌      | ❌             | ✅ Run + test + fix        |
| Knowledge Graph        | ❌      | ❌      | ❌             | ✅ Full codebase mapping   |
| Local Models           | ❌      | ❌      | ❌             | ✅ Ollama integration      |
| Learning from Mistakes | ❌      | ❌      | ❌             | ✅ Pattern recognition     |

### Real-World Use Cases

#### 1. Solo Developer

```bash
# Monday: Start new project
$ gemini agent "Create a task management API with user auth"
[Agent builds complete API in 10 minutes]

# Tuesday: Add features
$ gemini "Add email notifications when tasks are due"
# Agent remembers Monday's architecture, extends seamlessly

# Friday: Bug fix
$ gemini "Users can't login after password reset"
# Agent checks authentication history, finds root cause in 30 seconds
```

#### 2. Team Development

```bash
# Developer A (Oct 10)
$ gemini "Design the user service database schema"

# Developer B (Oct 15) - Different machine
$ gemini "I need to query users by email"
# Agent: "I see we designed the schema on Oct 10. Email field is indexed."

# Developer C (Oct 20) - New team member
$ gemini "What's our authentication strategy?"
# Agent: "Based on discussions with Developer A on Oct 10-12,
#         we use JWT with refresh tokens, stored in Redis..."
```

#### 3. Code Migration

```bash
$ gemini agent "Migrate our authentication from JWT to OAuth2 + JWT"
# Agent:
# - Reviews all authentication-related conversations
# - Identifies all files using JWT
# - Creates migration plan
# - Implements OAuth2 alongside JWT
# - Updates all endpoints
# - Writes migration guide
# - Tests both methods work
# Result: Zero-downtime migration completed
```

### Performance Characteristics

**Memory System:**

- Vector search: ~50-100ms for 10,000 memories
- Full-text search: ~10-20ms
- Context enrichment: ~200-300ms
- Database size: ~50MB per 10,000 conversations

**Agent System:**

- Simple tasks (1-2 files): 1-3 minutes
- Medium tasks (5-10 files): 5-15 minutes
- Complex tasks (full systems): 15-45 minutes
- Self-correction: Usually 1-2 iterations

**Multi-Provider:**

- Provider switching: <100ms
- Fallback on failure: <5 seconds
- Cost optimization: 30-70% savings

### Security & Privacy

**Local-First Architecture:**

- All conversations stored locally (SQLite)
- No data sent to third parties
- Vector embeddings generated locally (optional)
- Full control over data retention

**Enterprise Options:**

- Self-hosted deployment
- Custom embedding models
- Air-gapped operation (Ollama)
- Compliance-ready audit logs

### Extensibility

**Easy to Extend:**

```typescript
// Add new provider in ~100 lines
class CustomProvider implements LLMProvider {
  async generateContent(request: UnifiedRequest): Promise<UnifiedResponse> {
    // Your implementation
  }
}

// Register and use
providerManager.registerProvider(new CustomProvider(config));
```

**Plugin System:**

- Custom tools
- Custom agents
- Custom memory analyzers
- Custom export formats

### Future Possibilities

**With This Architecture, We Can Build:**

1. **Code Review Agent**: Automatically reviews PRs with context
2. **Documentation Agent**: Keeps docs synchronized with code
3. **Migration Agent**: Handles framework/language migrations
4. **Performance Agent**: Monitors and optimizes code performance
5. **Security Agent**: Scans for vulnerabilities, suggests fixes
6. **Onboarding Agent**: Helps new developers understand codebase

---

## Summary: The Future of AI-Assisted Development

This enhanced architecture represents a paradigm shift from **conversational
AI** to **autonomous development partner**:

✅ **Multi-Provider**: Use any LLM, anywhere, anytime  
✅ **Autonomous**: Complex tasks executed with minimal supervision  
✅ **Intelligent**: Learns from every interaction, never forgets  
✅ **Context-Aware**: Full knowledge of project history  
✅ **Self-Improving**: Recognizes patterns, optimizes approaches  
✅ **Enterprise-Ready**: Secure, scalable, compliant

**The Result**: An AI assistant that truly understands your codebase, learns
your preferences, and works autonomously to bring your ideas to life — while
remembering every conversation you've ever had with it.

---

## Next Steps

### Immediate Actions

1. **Review & Approve Architecture**
   - Stakeholder review of proposed changes
   - Technical feasibility assessment
   - Resource allocation planning

2. **Set Up Development Environment**
   - Create development branches
   - Set up testing infrastructure
   - Configure CI/CD pipelines

3. **Phase 1 Kickoff (Weeks 1-2)**
   - Begin provider abstraction layer
   - Implement OpenRouter integration
   - Start Ollama support

### Success Metrics

**Phase 1-3 (Multi-Provider + Branching):**

- [ ] 5+ providers integrated
- [ ] <100ms provider switching
- [ ] Session branching functional
- [ ] 100% backward compatibility

**Phase 4 (Autonomous Agents):**

- [ ] 90%+ task completion rate
- [ ] <3 average iterations per task
- [ ] Self-validation accuracy >85%
- [ ] Learning from past executions

**Phase 5 (Contextual Memory):**

- [ ] <100ms semantic search
- [ ] > 80% context relevance
- [ ] Full knowledge graph coverage
- [ ] Entity extraction accuracy >90%

### Long-Term Vision

**6 Months:** Production-ready multi-provider CLI with agents  
**12 Months:** Industry-leading AI development assistant  
**18 Months:** Platform for autonomous software development

---

**Ready to build the future of AI-assisted development? Let's begin.** 🚀
