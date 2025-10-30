# Architecture Modifications - Phase Extensions

> **Date**: October 31, 2025  
> **Purpose**: Comprehensive modifications to `architecture-enhanced.md` with
> critical new features  
> **Status**: TO BE INTEGRATED

## Overview

This document outlines **8 major feature additions** and **extended
implementation roadmap** changes to the Enhanced Gemini CLI Architecture. These
modifications transform the project from a multi-provider CLI into a
**production-ready AI development platform** with enterprise features.

---

## Critical New Features Summary

| Feature                    | Priority    | Impact | Effort | Weeks   |
| -------------------------- | ----------- | ------ | ------ | ------- |
| **Plan Mode System**       | 🔴 CRITICAL | 5/5    | 3/5    | 7-8     |
| **Cost Optimizer**         | 🔴 CRITICAL | 5/5    | 3/5    | 1-2, 7  |
| **Learning System**        | 🔴 CRITICAL | 5/5    | 4/5    | 8-9     |
| **Codebase Understanding** | 🔴 CRITICAL | 5/5    | 4/5    | 10-11   |
| **Security Auditor**       | 🟠 HIGH     | 4/5    | 3/5    | 11      |
| **Performance Analyzer**   | 🟠 HIGH     | 4/5    | 3/5    | 12      |
| **Time Travel/Rollback**   | 🟠 HIGH     | 4/5    | 3/5    | 5-6, 11 |
| **Analytics Dashboard**    | 🟡 MEDIUM   | 3/5    | 3/5    | 15-18   |

---

## 1. Codebase Semantic Understanding

**Location**: Add new section before "Database Architecture"

### Purpose

Enable AI to understand your entire codebase semantically - answer questions
about code, find implementations, track file histories, and understand
relationships between files.

### Key Components

```typescript
// packages/core/src/codebase/code-analyzer.ts

export class CodebaseAnalyzer {
  // AST parsing for multiple languages
  async indexCodebase(rootPath: string): Promise<CodebaseIndex>;

  // Find all files related to a specific file
  async getFileRelationships(filePath: string): Promise<FileRelationship[]>;

  // Find all implementations of an interface/class
  async findImplementations(symbol: string): Promise<Implementation[]>;

  // Get conversation history about a specific file
  async getFileHistory(filePath: string): Promise<ConversationHistory[]>;

  // Answer questions about the codebase
  async answerQuestion(question: string): Promise<Answer>;

  // Suggest related files when working on a feature
  async suggestRelatedFiles(filePath: string): Promise<string[]>;
}

// packages/core/src/codebase/ast-parser.ts

export class ASTParser {
  // Support multiple languages
  parseTypeScript(code: string): AST;
  parseJavaScript(code: string): AST;
  parsePython(code: string): AST;
  parseGo(code: string): AST;
  parseRust(code: string): AST;
  parseJava(code: string): AST;

  // Extract meaningful data
  extractFunctions(ast: AST): FunctionInfo[];
  extractClasses(ast: AST): ClassInfo[];
  extractInterfaces(ast: AST): InterfaceInfo[];
  extractImports(ast: AST): ImportInfo[];
  extractExports(ast: AST): ExportInfo[];
}

// packages/core/src/codebase/dependency-graph.ts

export class DependencyGraph {
  buildGraph(files: FileInfo[]): Graph;
  findDependents(filePath: string): string[];
  findDependencies(filePath: string): string[];
  detectCircularDependencies(): CircularDependency[];
  visualizeGraph(): string; // Mermaid diagram
}
```

### Database Schema

```sql
CREATE TABLE codebaseIndex (
  id TEXT PRIMARY KEY,
  filePath TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL,
  astData TEXT, -- JSON AST representation
  exports TEXT, -- JSON array of exports
  imports TEXT, -- JSON array of imports
  functions TEXT, -- JSON array of functions
  classes TEXT, -- JSON array of classes
  interfaces TEXT, -- JSON array of interfaces
  lastAnalyzed TEXT NOT NULL,
  fileHash TEXT NOT NULL,
  linesOfCode INTEGER,
  complexity INTEGER
);

CREATE INDEX idx_codebase_language ON codebaseIndex(language);
CREATE INDEX idx_codebase_path ON codebaseIndex(filePath);
```

### CLI Commands

```bash
# Index the entire codebase
gemini codebase analyze

# Ask questions about the code
gemini codebase ask "Where is user authentication implemented?"
gemini codebase ask "Which files use the UserService?"
gemini codebase ask "Show me all API endpoints"

# Find implementations
gemini codebase find "IUserRepository"
gemini codebase find "AuthService"

# View file history
gemini codebase history src/services/auth.ts

# See relationships
gemini codebase relations src/models/user.ts

# Visualize dependency graph
gemini codebase graph --output graph.svg
```

### Usage Example

```
$ gemini codebase ask "Where is authentication handled?"

🔍 Analyzing codebase...

Found 5 relevant locations:

1. src/middleware/auth.ts (Primary)
   - Function: authenticateToken()
   - Lines: 15-42
   - Purpose: JWT token validation middleware

2. src/services/auth-service.ts
   - Class: AuthService
   - Methods: login(), register(), refreshToken()
   - Dependencies: UserRepository, TokenService

3. src/routes/auth.routes.ts
   - Endpoints: /login, /register, /refresh
   - Uses: AuthService, authenticateToken middleware

4. src/config/passport.ts
   - Passport.js strategy configuration
   - Social OAuth: Google, GitHub

5. tests/auth.test.ts
   - Test coverage: 89%
   - 23 test cases

💡 Conversation history:
  - Oct 15: "Add rate limiting to auth endpoints"
  - Oct 20: "Implement refresh token rotation"
  - Oct 28: "Fix JWT expiration bug"
```

---

## 2. Security Audit System

**Location**: Add after "Codebase Semantic Understanding"

### Purpose

Real-time security scanning during code generation to detect vulnerabilities,
hardcoded secrets, injection risks, and dependency vulnerabilities.

### Key Components

```typescript
// packages/core/src/security/security-auditor.ts

export class SecurityAuditor {
  // Scan code for security issues
  async auditCode(code: string, language: string): Promise<SecurityFinding[]>;

  // Detect hardcoded secrets
  async checkForSecrets(code: string): Promise<SecretFinding[]>;

  // Identify injection vulnerabilities
  async identifyInjectionPoints(code: string): Promise<InjectionRisk[]>;

  // Validate dependencies for known vulnerabilities
  async validateDependencies(packageFile: string): Promise<DependencyVuln[]>;

  // Generate security report
  async generateSecurityReport(sessionId: string): Promise<SecurityReport>;

  // Auto-suggest fixes
  async suggestFixes(finding: SecurityFinding): Promise<SecurityFix[]>;
}

// packages/core/src/security/secret-detector.ts

export class SecretDetector {
  // Patterns for common secrets
  private patterns = {
    apiKey: /[a-zA-Z0-9]{32,}/,
    awsKey: /AKIA[0-9A-Z]{16}/,
    privateKey: /-----BEGIN (RSA|EC) PRIVATE KEY-----/,
    jwt: /eyJ[A-Za-z0-9-_=]+\.eyJ[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/,
    password: /password\s*=\s*["'][^"']+["']/i,
  };

  detect(code: string): SecretFinding[];
  classify(secret: string): SecretType;
  estimateSeverity(secret: SecretFinding): 'critical' | 'high' | 'medium';
}

// packages/core/src/security/injection-checker.ts

export class InjectionChecker {
  // Check for SQL injection
  checkSQLInjection(code: string): InjectionRisk[];

  // Check for XSS
  checkXSS(code: string): InjectionRisk[];

  // Check for command injection
  checkCommandInjection(code: string): InjectionRisk[];

  // Check for path traversal
  checkPathTraversal(code: string): InjectionRisk[];
}

// packages/core/src/security/dependency-auditor.ts

export class DependencyAuditor {
  // Check npm/pip/etc for vulnerabilities
  async checkNPMVulnerabilities(packageJson: string): Promise<Vulnerability[]>;
  async checkPIPVulnerabilities(requirements: string): Promise<Vulnerability[]>;

  // Suggest safe versions
  async suggestSafeVersions(pkg: string, version: string): Promise<string[]>;
}
```

### Database Schema

```sql
CREATE TABLE securityAudit (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  nodeId TEXT,
  severity TEXT NOT NULL, -- critical, high, medium, low
  category TEXT NOT NULL, -- injection, secrets, xss, command_injection, etc.
  description TEXT NOT NULL,
  location TEXT, -- file:line
  codeSnippet TEXT,
  suggestion TEXT,
  cwe TEXT, -- CWE identifier
  status TEXT DEFAULT 'open', -- open, resolved, ignored, false_positive
  resolvedAt TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions(id)
);

CREATE INDEX idx_security_severity ON securityAudit(severity);
CREATE INDEX idx_security_status ON securityAudit(status);
CREATE INDEX idx_security_session ON securityAudit(sessionId);
```

### Real-Time Integration

```typescript
// Integrate with agent execution
class AutonomousAgent {
  async executeStep(step: ExecutionStep): Promise<StepResult> {
    const result = await super.executeStep(step);

    // Scan generated code
    if (step.action === 'create_file' || step.action === 'edit_file') {
      const findings = await this.securityAuditor.auditCode(
        result.content,
        this.detectLanguage(result.filePath),
      );

      if (findings.some((f) => f.severity === 'critical')) {
        // Block execution and alert user
        throw new SecurityError('Critical security issue detected', findings);
      }

      if (findings.some((f) => f.severity === 'high')) {
        // Warn user and request approval
        await this.promptSecurityApproval(findings);
      }

      // Store findings
      await this.securityAuditor.recordFindings(findings);
    }

    return result;
  }
}
```

### CLI Commands

```bash
# Run security audit on codebase
gemini security audit

# View security report
gemini security report

# Check specific file
gemini security check src/api/user-controller.ts

# Export security report
gemini security export --format pdf

# Configure security rules
gemini security config --severity critical --block true
```

### Alert Examples

```
⚠️ SECURITY ALERT: Critical Issue Detected

File: src/api/auth.ts:45
Severity: CRITICAL
Category: Hardcoded Secret

Found: AWS Access Key (AKIA...)
Location: const AWS_KEY = "AKIAIOSFODNN7EXAMPLE"

Recommendation:
  ❌ Never hardcode credentials in source code
  ✅ Use environment variables: process.env.AWS_ACCESS_KEY_ID
  ✅ Use secret management: AWS Secrets Manager, HashiCorp Vault
  ✅ Add to .gitignore and .env.example

CWE-798: Use of Hard-coded Credentials
Risk: Credential exposure, unauthorized access

[b]lock execution [i]gnore this time [a]pply fix [l]earn more
```

---

## 3. Performance Analysis

**Location**: Add after "Security Audit System"

### Purpose

Automated performance analysis with concrete optimization recommendations for
database queries, bundle size, memory usage, and algorithm complexity.

### Key Components

```typescript
// packages/core/src/performance/performance-analyzer.ts

export class PerformanceAnalyzer {
  // Analyze database query performance
  async analyzeQueryPerformance(query: string): Promise<QueryAnalysis>;

  // Suggest optimizations (indexes, caching, etc.)
  async suggestOptimizations(code: string): Promise<Optimization[]>;

  // Calculate bundle size and detect bloat
  async calculateBundleSize(project: string): Promise<BundleAnalysis>;

  // Find performance bottlenecks
  async findBottlenecks(code: string): Promise<Bottleneck[]>;

  // Generate optimization plan
  async generateOptimizationPlan(
    findings: PerformanceIssue[],
  ): Promise<OptimizationPlan>;

  // Benchmark code
  async benchmarkCode(code: string): Promise<BenchmarkResult>;
}

// packages/core/src/performance/query-optimizer.ts

export class QueryOptimizer {
  // Analyze SQL/NoSQL queries
  analyzeQuery(
    query: string,
    dialect: 'postgres' | 'mysql' | 'mongodb',
  ): QueryAnalysis;

  // Detect N+1 queries
  detectNPlusOne(code: string): NPlusOneIssue[];

  // Suggest indexes
  suggestIndexes(query: string, schema: Schema): IndexSuggestion[];

  // Detect missing foreign keys
  detectMissingKeys(schema: Schema): MissingKey[];

  // Calculate query complexity
  calculateComplexity(query: string): number;
}

// packages/core/src/performance/bundle-analyzer.ts

export class BundleAnalyzer {
  // Analyze JavaScript bundle
  async analyzeBundleSize(projectPath: string): Promise<BundleAnalysis>;

  // Find large dependencies
  findLargeDependencies(bundle: Bundle): LargeDependency[];

  // Suggest tree shaking opportunities
  suggestTreeShaking(bundle: Bundle): TreeShakingOpportunity[];

  // Detect duplicate dependencies
  detectDuplicates(bundle: Bundle): DuplicateDependency[];

  // Calculate load time impact
  calculateLoadTimeImpact(size: number): LoadTimeEstimate;
}

// packages/core/src/performance/metrics-collector.ts

export class MetricsCollector {
  // Track execution times
  async trackExecutionTime(fn: Function, label: string): Promise<number>;

  // Monitor memory usage
  async monitorMemory(): Promise<MemoryMetrics>;

  // Collect performance metrics
  async collectMetrics(sessionId: string): Promise<PerformanceMetrics>;

  // Generate performance report
  async generateReport(sessionId: string): Promise<PerformanceReport>;
}
```

### Database Schema

```sql
CREATE TABLE performanceMetrics (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  nodeId TEXT,
  metricType TEXT NOT NULL, -- execution_time, memory_usage, query_time, bundle_size
  value REAL NOT NULL,
  unit TEXT NOT NULL, -- ms, mb, kb, etc.
  context TEXT, -- JSON with additional details
  baseline REAL, -- Baseline for comparison
  improvement REAL, -- % improvement
  timestamp TEXT NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions(id)
);

CREATE INDEX idx_performance_type ON performanceMetrics(metricType);
CREATE INDEX idx_performance_session ON performanceMetrics(sessionId);
```

### CLI Commands

```bash
# Analyze performance
gemini performance analyze

# Check specific file
gemini performance check src/services/data-processor.ts

# Benchmark code
gemini performance benchmark src/algorithms/sort.ts

# View performance report
gemini performance report

# Compare before/after
gemini performance compare <before-snapshot> <after-snapshot>

# Generate optimization plan
gemini performance optimize
```

### Output Example

```
⚡ Performance Analysis Report

Project: my-api-server
Analyzed: 1,247 files

🐌 Bottlenecks Detected: 8

1. CRITICAL: N+1 Query in UserController.getUsers()
   Location: src/controllers/user.ts:45-52
   Issue: Fetching posts for each user in loop (N+1 pattern)
   Impact: 450ms avg latency, scales with user count

   Current Code:
     const users = await User.findAll();
     for (const user of users) {
       user.posts = await Post.findAll({ where: { userId: user.id } });
     }

   Suggested Fix:
     const users = await User.findAll({ include: [Post] });

   Expected Improvement: 92% faster (450ms → 35ms)

2. HIGH: Missing Index on queries table
   Location: Database schema
   Query: SELECT * FROM queries WHERE userId = ? ORDER BY createdAt DESC
   Missing Index: (userId, createdAt)

   Impact: 1.2s query time on 50k rows
   Expected Improvement: 98% faster (1200ms → 24ms)

   Migration:
     CREATE INDEX idx_queries_user_created ON queries(userId, createdAt);

3. MEDIUM: Large Bundle Size
   Location: frontend build
   Size: 2.4 MB (gzipped: 847 KB)

   Issues:
     • lodash: 72 KB (use lodash-es for tree shaking)
     • moment.js: 68 KB (use date-fns or day.js)
     • Duplicate React: 2 versions bundled

   Potential Savings: 35% reduction → 1.5 MB

📊 Performance Metrics:
  • Avg API Response Time: 245ms
  • 95th Percentile: 890ms
  • Memory Usage: 156 MB
  • Bundle Size: 2.4 MB
  • Database Query Time (avg): 85ms

💡 Optimization Plan (Estimated):
  1. Fix N+1 queries → 40% faster API responses
  2. Add missing indexes → 60% faster searches
  3. Optimize bundle → 35% faster page loads
  4. Implement caching → 70% reduction in DB calls

Total Expected Improvement: 3.2x faster overall
```

---

## 4. Time Travel & Rollback System

**Location**: Add after "Performance Analysis"

### Purpose

Create snapshots during development, roll back to any point in time, and safely
experiment with changes knowing you can always revert.

### Key Components

```typescript
// packages/core/src/session/timeline.ts

export interface Snapshot {
  id: string;
  sessionId: string;
  label?: string;
  timestamp: string;
  fileStates: Record<string, string>; // filePath → content
  databaseState?: any; // Relevant DB state
  metadata: {
    description?: string;
    tags: string[];
    autoGenerated: boolean;
  };
}

export class SessionTimeline {
  constructor(
    private sessionId: string,
    private db: DatabaseManager,
  ) {}

  // Get snapshot at specific timestamp
  async getSnapshotAt(timestamp: string): Promise<Snapshot>;

  // Create branch from historical snapshot
  async branchFromSnapshot(
    snapshotId: string,
    branchName: string,
  ): Promise<ConversationBranch>;

  // Get timeline visualization
  async getTimelineVisualization(): Promise<TimelineView>;

  // Query by keyword in snapshot descriptions
  async queryByKeyword(keyword: string): Promise<Snapshot[]>;

  // List all snapshots
  async listSnapshots(limit?: number): Promise<Snapshot[]>;

  // Compare two snapshots
  async compareSnapshots(id1: string, id2: string): Promise<SnapshotDiff>;
}

// packages/core/src/session/undo-manager.ts

export class UndoManager {
  private snapshotStack: string[] = [];
  private currentPosition: number = 0;

  // Create manual checkpoint
  async createSnapshot(label?: string): Promise<Snapshot>;

  // Undo last action
  async undo(): Promise<UndoResult>;

  // Redo
  async redo(): Promise<RedoResult>;

  // Restore to specific snapshot
  async restore(snapshotId: string): Promise<RestoreResult>;

  // List available snapshots
  async listSnapshots(): Promise<Snapshot[]>;

  // Label a snapshot
  async labelSnapshot(snapshotId: string, label: string): Promise<void>;

  // Auto-create snapshots
  private async autoSnapshot(
    trigger: 'before_agent' | 'after_agent' | 'manual',
  ): Promise<void>;
}
```

### Database Schema

```sql
CREATE TABLE executionSnapshots (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  label TEXT,
  timestamp TEXT NOT NULL,
  fileStates TEXT NOT NULL, -- JSON: { "path": "content", ... }
  databaseState TEXT, -- JSON of relevant DB state
  metadata TEXT, -- JSON: { description, tags, autoGenerated }
  parentSnapshotId TEXT,
  FOREIGN KEY (sessionId) REFERENCES sessions(id),
  FOREIGN KEY (parentSnapshotId) REFERENCES executionSnapshots(id)
);

CREATE INDEX idx_snapshot_session ON executionSnapshots(sessionId);
CREATE INDEX idx_snapshot_timestamp ON executionSnapshots(timestamp);
CREATE INDEX idx_snapshot_label ON executionSnapshots(label);
```

### Auto-Snapshot Triggers

```typescript
// Automatically create snapshots at key points
class SnapshotTriggers {
  // Before agent execution
  beforeAgent(): void {
    this.undoManager.createSnapshot('before-agent-execution');
  }

  // After successful agent execution
  afterAgentSuccess(): void {
    this.undoManager.createSnapshot('after-agent-success');
  }

  // Before dangerous operations
  beforeDangerousOperation(operation: string): void {
    this.undoManager.createSnapshot(`before-${operation}`);
  }

  // User-triggered via Ctrl+S equivalent
  manual(label?: string): void {
    this.undoManager.createSnapshot(label || 'manual-checkpoint');
  }

  // Periodic (every 15 minutes during active session)
  periodic(): void {
    this.undoManager.createSnapshot('auto-periodic');
  }
}
```

### CLI Commands

```bash
# Create manual snapshot
gemini snapshot create --label "before-refactor"

# List snapshots
gemini snapshot list

# Restore to snapshot
gemini snapshot restore <id>

# Undo last action
gemini undo

# Redo
gemini redo

# View timeline
gemini timeline

# Compare snapshots
gemini snapshot diff <id1> <id2>

# Label a snapshot
gemini snapshot label <id> "working-authentication"

# Search snapshots
gemini snapshot search "authentication"

# View snapshot details
gemini snapshot show <id>
```

### Timeline Visualization

```
📅 Session Timeline

[1] Oct 31, 10:15 AM - "Initial setup"
    Created project structure

[2] Oct 31, 10:32 AM - "before-agent-execution"
    Auto-snapshot before agent task

[3] Oct 31, 10:45 AM - "after-agent-success" ← YOU ARE HERE
    Completed: "Build user authentication system"
    Files changed: 8 files

[4] Oct 31, 11:02 AM - "Added rate limiting"
    Manual snapshot

[5] Oct 31, 11:20 AM - "before-refactor"
    Manual snapshot

Commands:
  gemini snapshot restore <number> - Restore to that point
  gemini undo - Go back one step
  gemini timeline --detailed - Show file changes
```

---

## 5. Analytics & Tracking

**Location**: Add after "Time Travel & Rollback"

### Purpose

Comprehensive usage analytics, cost tracking, performance metrics, and team
statistics for data-driven insights.

### Key Components

```typescript
// packages/core/src/analytics/usage-tracker.ts

export class UsageTracker {
  // Track events
  async trackEvent(event: AnalyticsEvent): Promise<void>;

  // Get usage statistics
  async getUsageStats(timeRange: TimeRange): Promise<UsageStats>;

  // Track feature usage
  async trackFeatureUsage(feature: string): Promise<void>;

  // Get popular features
  async getPopularFeatures(limit: number): Promise<FeatureUsage[]>;
}

// packages/core/src/analytics/stats-aggregator.ts

export class StatsAggregator {
  // Aggregate session statistics
  async aggregateSessionStats(sessionId: string): Promise<SessionStats>;

  // Aggregate daily statistics
  async aggregateDailyStats(date: string): Promise<DailyStats>;

  // Aggregate monthly statistics
  async aggregateMonthlyStats(month: string): Promise<MonthlyStats>;

  // Compare time periods
  async compareTimePeriods(
    period1: TimeRange,
    period2: TimeRange,
  ): Promise<PeriodComparison>;
}

// packages/core/src/analytics/cost-reporter.ts

export class CostReporter {
  // Generate cost report
  async generateCostReport(timeRange: TimeRange): Promise<CostReport>;

  // Get cost trends
  async getCostTrends(months: number): Promise<CostTrend[]>;

  // Get cost breakdown by provider
  async getCostByProvider(
    timeRange: TimeRange,
  ): Promise<ProviderCostBreakdown[]>;

  // Predict future costs
  async predictFutureCosts(months: number): Promise<CostPrediction>;
}

// packages/core/src/analytics/performance-reporter.ts

export class PerformanceReporter {
  // Generate performance report
  async generatePerformanceReport(
    sessionId?: string,
  ): Promise<PerformanceReport>;

  // Get performance trends
  async getPerformanceTrends(timeRange: TimeRange): Promise<PerformanceTrend[]>;

  // Compare performance
  async comparePerformance(
    session1: string,
    session2: string,
  ): Promise<PerformanceComparison>;
}
```

### Database Schema

```sql
CREATE TABLE usageAnalytics (
  id TEXT PRIMARY KEY,
  sessionId TEXT,
  eventType TEXT NOT NULL, -- session_start, command_run, agent_execute, etc.
  eventData TEXT, -- JSON with event details
  userId TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions(id)
);

CREATE INDEX idx_analytics_type ON usageAnalytics(eventType);
CREATE INDEX idx_analytics_timestamp ON usageAnalytics(timestamp);
CREATE INDEX idx_analytics_user ON usageAnalytics(userId);
```

### CLI Commands

```bash
# View usage statistics
gemini stats usage

# View cost statistics
gemini stats costs

# View performance statistics
gemini stats performance

# View weekly summary
gemini stats weekly

# Export analytics
gemini stats export --format csv --output analytics.csv

# View specific feature usage
gemini stats feature agent

# Compare time periods
gemini stats compare --from "2025-10" --to "2025-11"
```

### Analytics Dashboard (Web)

```typescript
// packages/web/src/pages/Overview.tsx

export const AnalyticsDashboard = () => {
  return (
    <Dashboard>
      <MetricCard title="Total Sessions" value={147} trend="+12%" />
      <MetricCard title="Total Cost" value="$23.45" trend="-8%" />
      <MetricCard title="Avg Response Time" value="1.2s" trend="-15%" />
      <MetricCard title="Success Rate" value="94%" trend="+3%" />

      <CostChart data={costData} />
      <UsageChart data={usageData} />
      <PerformanceChart data={performanceData} />
      <FeatureUsageChart data={featureData} />
    </Dashboard>
  );
};
```

---

## 6. Updated Implementation Roadmap

### Extended Timeline: 18 Weeks

#### Phase 1: Foundation & Provider Abstraction (Weeks 1-2) ✓ AS PLANNED

**NEW ADDITIONS:**

##### 1.8 Cost Optimizer Foundation

- [ ] Create `packages/core/src/routing/cost-optimizer.ts`
- [ ] Define `ModelComplexityAnalyzer` interface
- [ ] Implement cost matrix for all providers
- [ ] Create model selection strategies (fast, cheap, quality, balanced)
- [ ] Add `packages/core/src/routing/provider-selector.ts`
- [ ] Implement model tier classification system
- [ ] Add cost tracking database table
- [ ] Implement basic cost estimation

**Deliverables:**

- ✅ Multi-provider architecture working
- ✅ Gemini, OpenRouter, and Ollama providers functional
- ✅ Cost optimizer framework operational
- ✅ Model routing based on complexity

---

#### Phase 2: Database Layer & Memory Foundation (Weeks 3-4) ✓ AS PLANNED

**NEW ADDITIONS:**

##### 2.7 Analytics & Tracking Tables

- [ ] Create `costTracking` table
- [ ] Create `usageAnalytics` table
- [ ] Create `performanceMetrics` table
- [ ] Create `securityAudit` table
- [ ] Create `executionSnapshots` table
- [ ] Create `learnedPatterns` table
- [ ] Create `codebaseIndex` table
- [ ] Add appropriate indexes for all new tables

##### 2.8 Migration Scripts

- [ ] Create migration for new tables
- [ ] Add backward compatibility
- [ ] Test migration with existing data

**Deliverables:**

- ✅ SQLite database operational with all tables
- ✅ Analytics tables created
- ✅ All sessions migrated successfully
- ✅ Performance improved over JSON

---

#### Phase 3: Session Branching (Weeks 5-6) ✓ AS PLANNED

**NEW ADDITIONS:**

##### 3.7 Session Replay & Time Travel System

- [ ] Create `packages/core/src/session/timeline.ts`
- [ ] Implement `SessionTimeline` class
  - [ ] `getSnapshotAt(timestamp)` method
  - [ ] `branchFromSnapshot(timestamp, name)` method
  - [ ] `getTimelineVisualization()` method
  - [ ] `queryByKeyword(keyword)` method
- [ ] Create `packages/core/src/session/undo-manager.ts`
- [ ] Implement `UndoManager` class
  - [ ] `createSnapshot(label)` method
  - [ ] `undo()` method
  - [ ] `redo()` method
  - [ ] `restore(snapshotId)` method
  - [ ] `listSnapshots()` method
- [ ] Store snapshots in `executionSnapshots` table
- [ ] Create CLI commands:
  - [ ] `gemini timeline`
  - [ ] `gemini snapshot create`
  - [ ] `gemini snapshot restore <id>`
  - [ ] `gemini snapshot list`
  - [ ] `gemini undo`
  - [ ] `gemini redo`
- [ ] Implement auto-snapshot triggers
- [ ] Add snapshot comparison functionality

##### 3.8 Interactive Plan Review UI

- [ ] Create `packages/cli/src/ui/plan-review.tsx`
- [ ] Interactive component showing:
  - [ ] Step-by-step plan display
  - [ ] Edit capability (reorder, skip, modify steps)
  - [ ] Cost estimation per step
  - [ ] Risk indicators
  - [ ] Approve/reject/modify interface
- [ ] Keyboard controls:
  - [ ] [e]dit mode
  - [ ] [r]eorder steps
  - [ ] [s]kip step
  - [ ] [a]pprove plan
  - [ ] [c]ancel
  - [ ] [↑↓] navigate

##### 3.9 Visual Code Diff Component

- [ ] Create `packages/cli/src/ui/diff-viewer.tsx`
- [ ] 3-way diff display (OLD | NEW | EXPLANATION)
- [ ] Color coding (red=removed, green=added, yellow=modified)
- [ ] Line number tracking
- [ ] Show reasoning for each change

**Deliverables:**

- ✅ Conversation branching functional
- ✅ Tree navigation working
- ✅ Time travel system operational
- ✅ Snapshot/restore working
- ✅ Plan review UI complete
- ✅ Visual diff viewer working

---

#### Phase 4: Autonomous Agent System (Weeks 7-9) ⭐ KEY PHASE

**CRITICAL ADDITIONS:**

##### 4.12 Plan Mode System (HIGHEST PRIORITY)

- [ ] Create `packages/core/src/planning/plan-mode.ts`
- [ ] Implement `PlanModeManager` class
  - [ ] `enable()` - block write tools, inject planning prompt
  - [ ] `disable()` - restore all tools
  - [ ] `generatePlan(task)` - create detailed execution plan
  - [ ] `refineWithFeedback(modifications)` - re-plan based on user input
  - [ ] `approvePlan(planId)` - mark plan as approved
  - [ ] `switchToImplementation()` - execute approved plan
  - [ ] `getPlanApprovalStatus()` - check if user approved
- [ ] Create `packages/core/src/planning/plan-executor.ts`
- [ ] Implement `PlanExecutor` class
  - [ ] Execute steps in planned order
  - [ ] Stop on error, ask for direction
  - [ ] Skip steps user marked to skip
  - [ ] Track step completion status
- [ ] Add keyboard shortcut: `Shift+Tab` twice = toggle plan mode
- [ ] Update agent CLI: `gemini plan <task>`
- [ ] Integrate with Plan Review UI

##### 4.13 Cost Optimizer Integration with Agent

- [ ] Integrate `CostOptimizer` into agent execution
- [ ] Show cost estimate before each step
- [ ] Display total estimated cost in plan review
- [ ] Add flag: `gemini agent --cost-optimized`
- [ ] Store cost data in `costTracking` table
- [ ] Generate cost reports: `gemini stats costs`
- [ ] Add cost limits and warnings

##### 4.14 Continuous Learning System

- [ ] Create `packages/core/src/learning/pattern-learner.ts`
- [ ] Implement `AgentLearner` class
  - [ ] `recordSuccess(pattern, context)` method
  - [ ] `recordFailure(error, context)` method
  - [ ] `extractPattern(execution)` method
  - [ ] `suggestApproach(task)` method
  - [ ] `getLearnedPatterns()` method
  - [ ] `classifyTask(description)` method
- [ ] Create `LearnedPatternsTable` in database
- [ ] Implement pattern matching algorithm
- [ ] Add learning dashboard: `gemini learning stats`
- [ ] Display:
  - [ ] Common mistakes avoided
  - [ ] Success improvements over time
  - [ ] Pattern suggestions for current task
- [ ] Implement pattern export/import for team sharing

##### 4.15 Interactive Approval Workflow (ENHANCED)

- [ ] Step-by-step approval mode: `gemini agent --step-by-step`
- [ ] Review each step before execution
- [ ] Option to modify, skip, or reorder during execution
- [ ] Warning system for dangerous operations
  - [ ] File deletion warnings
  - [ ] Database drop warnings
  - [ ] System command warnings
- [ ] Create dangerous operations blocklist
- [ ] Add approval timeout mechanism

##### 4.16 Agent Action Enhancements

- [ ] Enhance `validateOutput()` action with cost calculation
- [ ] Add `estimateComplexity()` action
- [ ] Add `getRecommendations()` action post-execution
- [ ] Add `generateReport()` for execution summary
- [ ] Improve error messages with actionable suggestions

**Deliverables:**

- ✅ Autonomous agent executes complex tasks
- ✅ Plan Mode fully functional
- ✅ Cost optimization integrated
- ✅ Learning system recording patterns
- ✅ Iterative error resolution working
- ✅ Self-validation functional

---

#### Phase 5: Cross-Session Contextual Memory (Weeks 10-12) ⭐ KEY PHASE

**CRITICAL ADDITIONS:**

##### 5.14 Codebase Semantic Understanding

- [ ] Create `packages/core/src/codebase/code-analyzer.ts`
- [ ] Implement `CodebaseAnalyzer` class
  - [ ] `indexCodebase()` - AST parsing for all supported languages
  - [ ] `getFileRelationships()` - dependency graph
  - [ ] `findImplementations(interface)` - locate all implementations
  - [ ] `getFileHistory(filePath)` - conversation history for file
  - [ ] `answerQuestion(question)` - semantic Q&A about codebase
  - [ ] `suggestRelatedFiles(filePath)` - find connected code
- [ ] Create `packages/core/src/codebase/ast-parser.ts`
- [ ] Support languages:
  - [ ] TypeScript
  - [ ] JavaScript
  - [ ] Python
  - [ ] Go
  - [ ] Rust
  - [ ] Java
- [ ] Extract from AST:
  - [ ] Functions
  - [ ] Classes
  - [ ] Interfaces
  - [ ] Dependencies
  - [ ] Exports/Imports
- [ ] Store AST in `codebaseIndex` table
- [ ] Add CLI commands:
  - [ ] `gemini codebase analyze`
  - [ ] `gemini codebase find <pattern>`
  - [ ] `gemini codebase history <file>`
  - [ ] `gemini codebase ask <question>`
  - [ ] `gemini codebase relations <file>`
  - [ ] `gemini codebase graph`

##### 5.15 Security Audit System

- [ ] Create `packages/core/src/security/security-auditor.ts`
- [ ] Implement `SecurityAuditor` class
  - [ ] `auditCode(code)` - scan for vulnerabilities
  - [ ] `checkForSecrets()` - detect API keys, credentials
  - [ ] `identifyInjectionPoints()` - SQL, XSS, command injection
  - [ ] `validateDependencies()` - check for known vulns
  - [ ] `generateSecurityReport()` - comprehensive report
- [ ] Create `packages/core/src/security/secret-detector.ts`
- [ ] Create `packages/core/src/security/injection-checker.ts`
- [ ] Create `packages/core/src/security/dependency-auditor.ts`
- [ ] Real-time scanning during agent execution
- [ ] Store findings in `securityAudit` table
- [ ] Alert on:
  - [ ] Hardcoded secrets
  - [ ] SQL injection risks
  - [ ] Unvalidated input
  - [ ] Command injection
- [ ] Auto-suggest fixes with explanations
- [ ] Add CLI: `gemini security audit`
- [ ] Add blocking for critical issues

##### 5.16 Performance Analyzer

- [ ] Create `packages/core/src/performance/performance-analyzer.ts`
- [ ] Implement `PerformanceAnalyzer` class
  - [ ] `analyzeQueryPerformance()` - detect slow queries
  - [ ] `suggestOptimizations()` - indexing, caching, queries
  - [ ] `calculateBundleSize()` - detect bloat
  - [ ] `findBottlenecks()` - slow functions, N+1 queries
  - [ ] `generateOptimizationPlan()` - concrete steps to optimize
- [ ] Create `packages/core/src/performance/query-optimizer.ts`
- [ ] Create `packages/core/src/performance/bundle-analyzer.ts`
- [ ] Create `packages/core/src/performance/metrics-collector.ts`
- [ ] Store metrics in `performanceMetrics` table
- [ ] Real-time alerts during development
- [ ] Add CLI: `gemini performance analyze`
- [ ] Show before/after metrics
- [ ] Generate optimization reports

##### 5.17 Rollback & Undo System Enhancement

- [ ] Integrate with Time Travel system
- [ ] Auto-create snapshots before risky operations
- [ ] Implement fine-grained undo (per-file, per-action)
- [ ] Add snapshot comparison
- [ ] Implement snapshot branching

**Deliverables:**

- ✅ Semantic search operational
- ✅ Cross-session context retrieval working
- ✅ Codebase understanding functional
- ✅ Security audits during execution
- ✅ Performance analysis working
- ✅ Rollback system fully integrated
- ✅ Entity tracking functional
- ✅ Context enrichment automatic

---

#### Phase 6: Additional Providers (Weeks 13-14) ✓ AS PLANNED

(No changes to Phase 6)

**Deliverables:**

- ✅ OpenAI provider working
- ✅ Anthropic provider working
- ✅ LiteLLM provider working
- ✅ Smart routing operational

---

#### Phase 7: Integration & Testing (Weeks 15-16) + NEW TESTS

**NEW ADDITIONS:**

##### 7.10 Feature Integration Tests

- [ ] Test Plan Mode → Agent Execution → Learning cycle
- [ ] Test Cost Optimizer across all providers
- [ ] Test Security Auditor during agent execution
- [ ] Test Performance Analyzer output accuracy
- [ ] Test Rollback + Time Travel integration
- [ ] Test Codebase Understanding Q&A accuracy
- [ ] Test multi-feature workflows

##### 7.11 Performance Benchmarks

- [ ] Benchmark Plan Mode generation speed (<2s)
- [ ] Benchmark Cost calculation (<100ms)
- [ ] Benchmark Codebase indexing (100k LOC in <30s)
- [ ] Benchmark Security scan (1000 lines in <5s)
- [ ] Benchmark Performance analysis (<3s)
- [ ] Benchmark Vector search (<50ms for 10k embeddings)

##### 7.12 Security Testing

- [ ] Test secret detection accuracy (>95%)
- [ ] Test injection detection (SQL, XSS, Command)
- [ ] Test false positive rate
- [ ] Test with known vulnerable code samples

##### 7.13 Learning System Testing

- [ ] Test pattern extraction accuracy
- [ ] Test pattern matching relevance
- [ ] Test success rate improvements over time
- [ ] Test with 100+ agent executions

**Deliverables:**

- ✅ All features thoroughly tested
- ✅ Performance optimized
- ✅ New features integrated seamlessly
- ✅ Benchmark targets met
- ✅ Ready for production use

---

#### Phase 8: Documentation & Polish (Weeks 17-18) + NEW DOCS

**NEW ADDITIONS:**

##### 8.10 Plan Mode Guide

- [ ] How to enable/disable Plan Mode
- [ ] Examples: simple task, complex system, refactoring
- [ ] Best practices for plan modification
- [ ] Keyboard shortcuts reference
- [ ] Cost estimation interpretation

##### 8.11 Cost Optimization Guide

- [ ] Understanding cost routing strategies
- [ ] Cost tracking and reporting
- [ ] Setting cost limits and warnings
- [ ] Comparing costs across providers
- [ ] Monthly budgeting tips

##### 8.12 Learning System Guide

- [ ] How agent learns from mistakes
- [ ] Viewing learned patterns
- [ ] Improving learning accuracy
- [ ] Privacy considerations
- [ ] Exporting/importing patterns

##### 8.13 Codebase Understanding Guide

- [ ] Asking questions about code
- [ ] File relationship analysis
- [ ] Viewing implementation history
- [ ] Semantic search examples
- [ ] Language support matrix

##### 8.14 Security & Performance Guides

- [ ] Security audit interpretation
- [ ] Understanding severity levels
- [ ] Performance optimization recommendations
- [ ] Before/after comparisons
- [ ] Best practices for each category

##### 8.15 Time Travel Guide

- [ ] Creating and managing snapshots
- [ ] Undo/redo workflows
- [ ] Branching from historical points
- [ ] Snapshot comparison
- [ ] Best practices for safe experimentation

##### 8.16 Analytics Guide

- [ ] Understanding usage metrics
- [ ] Cost analysis and trends
- [ ] Performance insights
- [ ] Team statistics (if applicable)
- [ ] Exporting data for reporting

**Deliverables:**

- ✅ Complete documentation for all features
- ✅ Examples and templates
- ✅ Migration guide
- ✅ User guides for each major feature
- ✅ Ready for public release

---

## 7. Updated Milestones

### Milestone 1: Enhanced Foundation (End of Week 6) ⭐

- [x] Multi-provider architecture
- [x] Database migration complete
- [x] Session branching working
- [ ] Plan Mode UI components ← NEW
- [ ] Cost Optimizer framework ← NEW
- [ ] Time Travel system ← NEW

**Success Criteria**: Can switch between 3+ providers, create branches, preview
plans, restore snapshots

### Milestone 2: Intelligent Agent (End of Week 12) ⭐ CRITICAL

- [ ] Autonomous agent operational
- [ ] Plan Mode fully functional ← NEW
- [ ] Cost optimization working ← NEW
- [ ] Learning system recording patterns ← NEW
- [ ] Security audits during execution ← NEW
- [ ] Cross-session memory working ← NEW
- [ ] Codebase understanding implemented ← NEW
- [ ] Performance analysis functional ← NEW
- [ ] Learning system functional

**Success Criteria**: Agent executes 5-file projects with self-correction,
learns from mistakes, shows cost savings, detects security issues, suggests
optimizations

### Milestone 3: Advanced Features (End of Week 14)

- [ ] All providers integrated (6+)
- [ ] Performance analyzer working ← NEW
- [ ] Time travel/rollback functional ← NEW
- [ ] Smart routing operational ← NEW
- [ ] All 8 new features operational ← NEW

**Success Criteria**: 10+ differentiating features implemented and tested

### Milestone 4: Market Ready (End of Week 18)

- [ ] All features tested
- [ ] Analytics dashboard implemented ← NEW
- [ ] Complete documentation
- [ ] Performance optimized
- [ ] Production-ready security

**Success Criteria**: Ready for public launch and investor pitch

---

## 8. Success Metrics for New Features

Track these KPIs after implementation:

| Feature                | Success Metric                          | Target |
| ---------------------- | --------------------------------------- | ------ |
| Plan Mode              | User approval rate before execution     | >85%   |
| Cost Optimizer         | Reduction in API costs vs baseline      | 30-40% |
| Learning System        | Mistake recurrence after week 2         | <20%   |
| Codebase Understanding | Q&A accuracy on test questions          | >90%   |
| Security Auditor       | Detection rate on known vulnerabilities | >95%   |
| Performance Analyzer   | Optimization suggestions adopted        | 70%+   |
| Time Travel            | Users creating 3+ snapshots per session | 60%+   |
| Analytics              | Users viewing weekly stats report       | 80%+   |

---

## 9. Git Branch Structure

```bash
# Main branches
main/                          # Production-ready
dev/                           # Development integration

# Phase 1 branches
phase-1/foundation             # Weeks 1-2
phase-1/cost-optimizer         # Weeks 1-2 (NEW)

# Phase 2 branches
phase-2/database               # Weeks 3-4
phase-2/analytics-tables       # Weeks 3-4 (NEW)

# Phase 3 branches
phase-3/branching              # Weeks 5-6
phase-3/timeline               # Weeks 5-6 (NEW)
phase-3/plan-review-ui         # Weeks 5-6 (NEW)

# Phase 4 branches (CRITICAL)
phase-4/agent                  # Weeks 7-9
phase-4/plan-mode              # Weeks 7-8 (NEW - CRITICAL)
phase-4/learning-system        # Weeks 8-9 (NEW - CRITICAL)

# Phase 5 branches (CRITICAL)
phase-5/memory                 # Weeks 10-12
phase-5/security-audit         # Weeks 11 (NEW - CRITICAL)
phase-5/codebase-understanding # Weeks 10-11 (NEW - CRITICAL)
phase-5/performance-analyzer   # Weeks 12 (NEW)
phase-5/rollback-system        # Weeks 11-12 (NEW)

# Phase 6-8 branches
phase-6/providers              # Weeks 13-14
phase-7/testing                # Weeks 15-16
phase-8/documentation          # Weeks 17-18
```

---

## 10. GitHub Issue Template for New Features

```markdown
## Feature: [Feature Name]

**Tier**: Tier 1 Critical / Tier 2 High / Tier 3 Nice-to-Have **Phase**: Phase X
**Weeks**: X-Y **Status**: Planning / In Progress / Complete

### Description

[What does this feature do?]

### Why It Matters

[Why is this important for our users?]

### Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Tests written and passing
- [ ] Documentation updated

### Implementation Notes

[Any special considerations or dependencies]

### Related Issues

#123, #456
```

---

## Integration Instructions

### Step 1: Update architecture-enhanced.md

1. Add all new sections from this document
2. Update Table of Contents
3. Add new package structure diagram
4. Insert new database tables
5. Update implementation roadmap

### Step 2: Update TASKS.md

1. Add new tasks for each phase
2. Update milestone definitions
3. Add new testing requirements
4. Update completion criteria

### Step 3: Create Feature Branches

```bash
# Create branches for each major feature
git checkout -b phase-1/cost-optimizer
git checkout -b phase-3/timeline
git checkout -b phase-4/plan-mode
git checkout -b phase-4/learning-system
git checkout -b phase-5/security-audit
git checkout -b phase-5/codebase-understanding
git checkout -b phase-5/performance-analyzer
```

### Step 4: Update package.json

Add new dependencies listed in Enhanced Package Structure section

### Step 5: Database Migration

Create migration script for new tables:

```bash
npm run db:migrate -- --add-analytics-tables
```

---

## Questions for Implementation

1. **Plan Mode Priority**: Should Plan Mode be mandatory or optional by default?
2. **Cost Limits**: Should we enforce hard cost limits or just warnings?
3. **Security Blocking**: Should critical security issues block execution
   automatically?
4. **Learning Privacy**: How much execution data should we store for learning?
   Privacy considerations?
5. **Snapshot Storage**: How many auto-snapshots to keep? Retention policy?
6. **Analytics**: Should analytics be opt-in or opt-out?
7. **Team Features**: Priority on collaboration features vs solo developer
   features?

---

## Next Steps

1. ✅ Review and approve this architecture modification
2. ✅ Update main architecture-enhanced.md with new sections
3. ✅ Update TASKS.md with new tasks
4. ✅ Create feature branches
5. ✅ Begin Phase 1 with cost optimizer foundation
6. ✅ Set up development environment for new features
7. ✅ Create GitHub issues for each new feature

---

**Last Updated**: October 31, 2025  
**Next Review**: Before Phase 4 implementation (Week 7)
