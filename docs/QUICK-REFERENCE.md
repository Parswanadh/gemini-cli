# Quick Reference Guide - New Features

> **Use this as your quick lookup when implementing features**

---

## 🎯 Priority Order

### Immediate (Weeks 1-2)

1. **Cost Optimizer** - `packages/core/src/routing/`
2. Provider Abstraction (as planned)

### Critical Path (Weeks 7-12)

3. **Plan Mode** (Week 7-8) 🔴 - `packages/core/src/planning/`
4. **Learning System** (Week 8-9) 🔴 - `packages/core/src/learning/`
5. **Codebase Understanding** (Week 10-11) 🔴 - `packages/core/src/codebase/`
6. **Security Auditor** (Week 11) 🟠 - `packages/core/src/security/`

### Important (Weeks 5-6, 12)

7. **Time Travel** (Week 5-6) - `packages/core/src/session/timeline.ts`
8. **Performance Analyzer** (Week 12) - `packages/core/src/performance/`

### Nice to Have (Weeks 15-18)

9. **Analytics Dashboard** - `packages/core/src/analytics/`

---

## 📁 File Locations Quick Map

```
packages/core/src/
├── routing/
│   ├── cost-optimizer.ts          # Main cost optimization logic
│   ├── complexity-analyzer.ts     # Analyze task complexity
│   ├── provider-selector.ts       # Select best provider
│   └── cost-tracker.ts            # Track and report costs
│
├── planning/
│   ├── plan-mode.ts               # Plan mode manager
│   ├── plan-executor.ts           # Execute approved plans
│   ├── plan-modifier.ts           # User plan modifications
│   └── plan-validator.ts          # Validate plans
│
├── learning/
│   ├── pattern-learner.ts         # Main learning logic
│   ├── success-analyzer.ts        # Analyze successful patterns
│   ├── failure-analyzer.ts        # Learn from failures
│   └── recommendation-engine.ts   # Suggest approaches
│
├── codebase/
│   ├── code-analyzer.ts           # Main codebase analysis
│   ├── ast-parser.ts              # Multi-language AST parsing
│   ├── dependency-graph.ts        # File relationships
│   ├── code-qa.ts                 # Q&A system
│   └── implementation-finder.ts   # Find implementations
│
├── security/
│   ├── security-auditor.ts        # Main security scanning
│   ├── secret-detector.ts         # Detect hardcoded secrets
│   ├── injection-checker.ts       # SQL/XSS/Command injection
│   └── dependency-auditor.ts      # Vulnerable dependencies
│
├── performance/
│   ├── performance-analyzer.ts    # Main performance analysis
│   ├── query-optimizer.ts         # Database query optimization
│   ├── bundle-analyzer.ts         # Bundle size analysis
│   └── metrics-collector.ts       # Collect metrics
│
├── session/
│   ├── timeline.ts                # Session timeline
│   └── undo-manager.ts            # Undo/redo system
│
└── analytics/
    ├── usage-tracker.ts           # Track events
    ├── stats-aggregator.ts        # Aggregate statistics
    ├── cost-reporter.ts           # Cost reports
    └── performance-reporter.ts    # Performance reports
```

---

## 🗄️ Database Tables

### Quick Schema Reference

```sql
-- Cost tracking
CREATE TABLE costTracking (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  providerId TEXT NOT NULL,
  modelId TEXT NOT NULL,
  inputTokens INTEGER,
  outputTokens INTEGER,
  costUsd REAL NOT NULL,
  timestamp TEXT NOT NULL
);

-- Security findings
CREATE TABLE securityAudit (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  severity TEXT NOT NULL,        -- critical, high, medium, low
  category TEXT NOT NULL,         -- injection, secrets, xss, etc.
  description TEXT NOT NULL,
  location TEXT,                  -- file:line
  suggestion TEXT,
  status TEXT DEFAULT 'open',
  timestamp TEXT NOT NULL
);

-- Performance metrics
CREATE TABLE performanceMetrics (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  metricType TEXT NOT NULL,       -- execution_time, memory_usage, etc.
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  context TEXT,                   -- JSON
  timestamp TEXT NOT NULL
);

-- Learned patterns
CREATE TABLE learnedPatterns (
  id TEXT PRIMARY KEY,
  taskType TEXT NOT NULL,
  pattern TEXT NOT NULL,          -- JSON
  successCount INTEGER DEFAULT 0,
  failureCount INTEGER DEFAULT 0,
  successRate REAL,
  avgExecutionTime REAL,
  context TEXT,                   -- JSON
  lastUsed TEXT,
  createdAt TEXT NOT NULL
);

-- Time travel snapshots
CREATE TABLE executionSnapshots (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  label TEXT,
  timestamp TEXT NOT NULL,
  fileStates TEXT NOT NULL,       -- JSON
  databaseState TEXT,             -- JSON
  metadata TEXT                   -- JSON
);

-- Usage analytics
CREATE TABLE usageAnalytics (
  id TEXT PRIMARY KEY,
  sessionId TEXT,
  eventType TEXT NOT NULL,
  eventData TEXT,                 -- JSON
  userId TEXT,
  timestamp TEXT NOT NULL
);

-- Codebase index
CREATE TABLE codebaseIndex (
  id TEXT PRIMARY KEY,
  filePath TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL,
  astData TEXT,                   -- JSON
  exports TEXT,                   -- JSON
  imports TEXT,                   -- JSON
  functions TEXT,                 -- JSON
  classes TEXT,                   -- JSON
  lastAnalyzed TEXT NOT NULL,
  fileHash TEXT NOT NULL
);

-- Team workspace (optional)
CREATE TABLE teamWorkspace (
  id TEXT PRIMARY KEY,
  teamId TEXT NOT NULL,
  sharedPatterns TEXT,            -- JSON
  sharedSkills TEXT,              -- JSON
  statistics TEXT,                -- JSON
  settings TEXT,                  -- JSON
  lastSync TEXT NOT NULL
);
```

---

## 🎨 UI Components

### React Ink Components to Create

```typescript
// packages/cli/src/ui/plan-review.tsx
export const PlanReview: React.FC<{
  plan: ExecutionPlan;
  onApprove: () => void;
  onReject: () => void;
  onModify: (mods: PlanModification[]) => void;
}>;

// packages/cli/src/ui/diff-viewer.tsx
export const DiffViewer: React.FC<{
  oldCode: string;
  newCode: string;
  explanation: string;
}>;

// packages/cli/src/ui/cost-display.tsx
export const CostDisplay: React.FC<{
  estimatedCost: number;
  breakdown: CostBreakdown;
}>;

// packages/cli/src/ui/agent-monitor.tsx
export const AgentMonitor: React.FC<{
  plan: ExecutionPlan;
  currentStep: number;
  status: ExecutionStatus;
}>;

// packages/cli/src/ui/security-alert.tsx
export const SecurityAlert: React.FC<{
  findings: SecurityFinding[];
  onBlock: () => void;
  onApprove: () => void;
}>;

// packages/cli/src/ui/performance-report.tsx
export const PerformanceReport: React.FC<{
  metrics: PerformanceMetrics;
  suggestions: Optimization[];
}>;

// packages/cli/src/ui/timeline-viewer.tsx
export const TimelineViewer: React.FC<{
  snapshots: Snapshot[];
  currentPosition: number;
  onRestore: (id: string) => void;
}>;
```

---

## 🔧 Key Interfaces

### TypeScript Interfaces You'll Use

```typescript
// Cost Optimizer
interface TaskComplexity {
  score: number; // 0-100
  factors: {
    inputLength: number;
    requiresReasoning: boolean;
    requiresCode: boolean;
    requiresCreativity: boolean;
    criticalTask: boolean;
  };
}

interface RoutingStrategy {
  name: 'cost-optimized' | 'speed-optimized' | 'quality-optimized' | 'balanced';
  tierPreferences: ('fast' | 'cheap' | 'quality')[];
  costLimit?: number;
}

// Plan Mode
interface ExecutionPlan {
  id: string;
  taskDescription: string;
  steps: ExecutionStep[];
  totalEstimatedCost: number;
  totalEstimatedDuration: number;
  status: 'draft' | 'approved' | 'rejected' | 'executing' | 'completed';
}

interface ExecutionStep {
  id: string;
  action: AgentAction;
  description: string;
  reasoning: string;
  estimatedCost?: number;
  estimatedDuration?: number;
  dependencies: string[];
  risk: 'low' | 'medium' | 'high';
  status: 'pending' | 'skipped' | 'approved' | 'completed' | 'failed';
}

// Learning System
interface ExecutionPattern {
  id: string;
  taskType: string;
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
}

// Security Audit
interface SecurityFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'injection' | 'secrets' | 'xss' | 'command_injection';
  description: string;
  location: string; // file:line
  codeSnippet: string;
  suggestion: string;
  cwe?: string; // CWE identifier
}

// Performance Analysis
interface PerformanceIssue {
  type: 'n_plus_one' | 'missing_index' | 'slow_query' | 'large_bundle';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  description: string;
  impact: string;
  suggestion: string;
  expectedImprovement: string;
}

// Time Travel
interface Snapshot {
  id: string;
  sessionId: string;
  label?: string;
  timestamp: string;
  fileStates: Record<string, string>; // filePath → content
  databaseState?: any;
  metadata: {
    description?: string;
    tags: string[];
    autoGenerated: boolean;
  };
}

// Codebase Understanding
interface FileRelationship {
  filePath: string;
  relationshipType: 'imports' | 'exports' | 'calls' | 'extends';
  relatedFiles: string[];
}

interface CodebaseIndex {
  filePath: string;
  language: string;
  functions: FunctionInfo[];
  classes: ClassInfo[];
  imports: ImportInfo[];
  exports: ExportInfo[];
}
```

---

## 🎯 CLI Commands Reference

### Cost Optimizer

```bash
gemini cost report
gemini cost monthly
gemini config set cost-limit 10.00
gemini config set routing-strategy [cost-optimized|speed-optimized|quality-optimized|balanced]
gemini agent "task" --cost-optimized
```

### Plan Mode

```bash
gemini plan "Build authentication system"
gemini agent "task" --no-plan          # Skip planning
gemini agent "task" --step-by-step     # Approve each step
```

### Learning System

```bash
gemini learning patterns
gemini learning stats
gemini learning failures
gemini learning export --output patterns.json
gemini learning import --input patterns.json
```

### Codebase Understanding

```bash
gemini codebase analyze
gemini codebase ask "Where is auth implemented?"
gemini codebase find IUserRepository
gemini codebase history src/auth.ts
gemini codebase relations src/models/user.ts
gemini codebase graph --output graph.svg
```

### Security Auditor

```bash
gemini security audit
gemini security report
gemini security check src/api/user.ts
gemini security export --format pdf
gemini security config --severity critical --block true
```

### Performance Analyzer

```bash
gemini performance analyze
gemini performance check src/data-processor.ts
gemini performance benchmark src/sort.ts
gemini performance report
gemini performance compare <snapshot1> <snapshot2>
gemini performance optimize
```

### Time Travel

```bash
gemini snapshot create --label "before-refactor"
gemini snapshot list
gemini snapshot restore <id>
gemini snapshot show <id>
gemini snapshot diff <id1> <id2>
gemini snapshot label <id> "working-auth"
gemini snapshot search "authentication"
gemini undo
gemini redo
gemini timeline
```

### Analytics

```bash
gemini stats usage
gemini stats costs
gemini stats performance
gemini stats weekly
gemini stats compare --from "2025-10" --to "2025-11"
gemini stats export --format csv --output analytics.csv
gemini stats feature agent
```

---

## 🔑 Key Algorithms

### Cost Calculation

```typescript
function estimateCost(request: UnifiedRequest, model: ModelInfo): number {
  const inputTokens = request.contents.reduce(
    (sum, c) => sum + (c.text?.length || 0) / 4,
    0,
  );
  const estimatedOutputTokens =
    request.generationConfig?.maxOutputTokens || 2048;

  return (
    (inputTokens / 1000) * model.costPer1kInput +
    (estimatedOutputTokens / 1000) * model.costPer1kOutput
  );
}
```

### Complexity Scoring

```typescript
function calculateComplexity(text: string): number {
  let score = 0;

  if (text.length > 5000) score += 20;
  if (requiresReasoning(text)) score += 30;
  if (requiresCode(text)) score += 25;
  if (requiresCreativity(text)) score += 15;
  if (isCriticalTask(text)) score += 20;

  return Math.min(score, 100);
}
```

### Pattern Similarity (Jaccard)

```typescript
function calculateSimilarity(p1: Pattern, p2: Pattern): number {
  const tools1 = new Set(p1.toolsUsed);
  const tools2 = new Set(p2.toolsUsed);

  const intersection = new Set([...tools1].filter((t) => tools2.has(t)));
  const union = new Set([...tools1, ...tools2]);

  return intersection.size / union.size;
}
```

### Cosine Similarity (for vector search)

```typescript
function cosineSimilarity(a: number[], b: number[]): number {
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
```

---

## 🧪 Testing Checklist

### For Each Feature

- [ ] **Unit Tests** (>80% coverage)
  - [ ] Test main class methods
  - [ ] Test edge cases
  - [ ] Test error handling
- [ ] **Integration Tests**
  - [ ] Test with database
  - [ ] Test with other features
  - [ ] Test CLI commands
- [ ] **Performance Tests**
  - [ ] Benchmark critical operations
  - [ ] Test with large datasets
  - [ ] Memory profiling
- [ ] **Security Tests** (for security features)
  - [ ] Test vulnerability detection
  - [ ] Test false positives/negatives
  - [ ] Test with known vulnerable code

---

## 📊 Success Metrics

### Measure These After Implementation

| Feature                | Metric             | How to Measure                          |
| ---------------------- | ------------------ | --------------------------------------- |
| Cost Optimizer         | % cost reduction   | Compare before/after monthly costs      |
| Plan Mode              | Approval rate      | (approved plans / total plans) \* 100   |
| Learning System        | Mistake recurrence | Track same error patterns over time     |
| Codebase Understanding | Q&A accuracy       | Manual evaluation on 100 test questions |
| Security Auditor       | Detection rate     | Test with known vulnerable code samples |
| Performance Analyzer   | Adoption rate      | % of suggestions implemented by users   |
| Time Travel            | Usage rate         | % of sessions with 3+ snapshots         |
| Analytics              | Engagement rate    | % of users viewing stats weekly         |

---

## 🐛 Common Pitfalls to Avoid

1. **Cost Optimizer**
   - ❌ Don't: Use simple heuristics only
   - ✅ Do: Actually analyze task complexity with LLM

2. **Plan Mode**
   - ❌ Don't: Block all tools globally
   - ✅ Do: Selectively block write tools, keep read tools

3. **Learning System**
   - ❌ Don't: Store raw execution data indefinitely
   - ✅ Do: Extract patterns, discard old raw data

4. **Codebase Understanding**
   - ❌ Don't: Parse entire codebase on every query
   - ✅ Do: Index once, update incrementally

5. **Security Auditor**
   - ❌ Don't: Block execution for all findings
   - ✅ Do: Block only critical, warn for high, log medium/low

6. **Performance Analyzer**
   - ❌ Don't: Run expensive analysis synchronously
   - ✅ Do: Run in background, cache results

7. **Time Travel**
   - ❌ Don't: Store full file snapshots for every change
   - ✅ Do: Store diffs or snapshots at key points only

8. **Analytics**
   - ❌ Don't: Track everything, everywhere
   - ✅ Do: Track meaningful events with proper privacy

---

## 🚀 Quick Start Commands

### Setup Development Environment

```bash
# Clone and install
git clone <repo>
cd gemini-cli
npm install

# Create feature branch
git checkout -b phase-1/cost-optimizer

# Run in development
npm run dev

# Run tests
npm test

# Build
npm run build
```

### Database Setup

```bash
# Initialize database
npm run db:init

# Run migrations
npm run db:migrate

# Seed test data
npm run db:seed
```

### Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- cost-optimizer.test.ts

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

---

## 📖 Documentation Structure

### Where to Find Things

1. **Full Architecture**: `docs/architecture-enhanced.md`
2. **Feature Specs**: `docs/ARCHITECTURE-MODIFICATIONS.md`
3. **Task List**: `docs/TASKS.md`
4. **Implementation Summary**: `docs/IMPLEMENTATION-SUMMARY.md`
5. **This Reference**: `docs/QUICK-REFERENCE.md`

### When Working on a Feature

1. Read feature spec in `ARCHITECTURE-MODIFICATIONS.md`
2. Check tasks in `TASKS.md`
3. Reference this guide for quick lookups
4. Write code following examples in architecture docs
5. Write tests following test checklist
6. Update documentation

---

## 💬 Getting Help

### Questions About Implementation?

1. Check `ARCHITECTURE-MODIFICATIONS.md` first
2. Check code examples in architecture docs
3. Check this quick reference
4. Create GitHub issue with `question` label

### Found a Bug?

1. Create GitHub issue with `bug` label
2. Include: steps to reproduce, expected vs actual behavior
3. Include: relevant code snippets, error messages

### Want to Suggest Changes?

1. Create GitHub issue with `enhancement` label
2. Explain: what, why, and how
3. Reference: related features/sections

---

## 🎓 Learning Resources

### TypeScript

- Official Docs: https://www.typescriptlang.org/docs/
- Advanced Types: Focus on generics, utility types

### React Ink (for UI)

- GitHub: https://github.com/vadimdemedes/ink
- Examples: In their examples folder

### SQLite

- Official Docs: https://www.sqlite.org/docs.html
- better-sqlite3: https://github.com/WiseLibs/better-sqlite3

### AST Parsing

- espree: https://github.com/eslint/espree
- ast-types: https://github.com/benjamn/ast-types

---

**Last Updated**: October 31, 2025  
**Keep This Handy**: Bookmark this file for quick reference during
implementation!

---

Ready to code! 🚀
