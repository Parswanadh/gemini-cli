# Architecture Visual Diagrams

> **Visual representations of the enhanced architecture**

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLI Interface Layer                        │
│                        (packages/cli/src/)                          │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Commands   │  │  UI Components│  │  Input Handler│            │
│  │              │  │               │  │               │            │
│  │ • agent      │  │ • plan-review │  │ • History     │            │
│  │ • plan       │  │ • diff-viewer │  │ • Autocomplete│            │
│  │ • cost       │  │ • cost-display│  │ • Validation  │            │
│  │ • security   │  │ • agent-monitor│  │              │            │
│  │ • performance│  │ • security-alert│ │              │            │
│  │ • codebase   │  │ • perf-report │  │               │            │
│  │ • timeline   │  │ • timeline-view│  │              │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Core Engine Layer                           │
│                        (packages/core/src/)                         │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                  Feature Modules                              │ │
│  │                                                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │  Routing    │  │  Planning   │  │  Learning   │          │ │
│  │  │             │  │             │  │             │          │ │
│  │  │ • Cost      │  │ • Plan Mode │  │ • Patterns  │          │ │
│  │  │   Optimizer │  │ • Executor  │  │ • Success   │          │ │
│  │  │ • Complexity│  │ • Validator │  │ • Failures  │          │ │
│  │  │   Analyzer  │  │ • Modifier  │  │ • Recomm.   │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │                                                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │  Codebase   │  │  Security   │  │ Performance │          │ │
│  │  │             │  │             │  │             │          │ │
│  │  │ • AST Parse │  │ • Auditor   │  │ • Analyzer  │          │ │
│  │  │ • Code Q&A  │  │ • Secret    │  │ • Query Opt │          │ │
│  │  │ • Dep Graph │  │   Detector  │  │ • Bundle    │          │ │
│  │  │ • Relations │  │ • Injection │  │   Analyzer  │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │                                                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │  Session    │  │  Analytics  │  │  Agents     │          │ │
│  │  │             │  │             │  │             │          │ │
│  │  │ • Timeline  │  │ • Usage     │  │ • Autonomous│          │ │
│  │  │ • Undo Mgr  │  │ • Cost Rpt  │  │ • Actions   │          │ │
│  │  │ • Snapshots │  │ • Perf Rpt  │  │ • Memory    │          │ │
│  │  │ • Branches  │  │ • Aggregator│  │ • Validator │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                  Cross-Cutting Concerns                       │ │
│  │                                                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │  Providers  │  │   Memory    │  │   Database  │          │ │
│  │  │             │  │             │  │             │          │ │
│  │  │ • Gemini    │  │ • Vector DB │  │ • Manager   │          │ │
│  │  │ • OpenRouter│  │ • Entity    │  │ • Schema    │          │ │
│  │  │ • Ollama    │  │   Extractor │  │ • Migrations│          │ │
│  │  │ • OpenAI    │  │ • Topic     │  │ • Queries   │          │ │
│  │  │ • Anthropic │  │   Classifier│  │             │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Storage Layer                                │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                      SQLite Database                          │ │
│  │                                                                │ │
│  │  • sessions              • conversationNodes                  │ │
│  │  • branches              • providers                          │ │
│  │  • costTracking  [NEW]   • securityAudit     [NEW]           │ │
│  │  • performanceMetrics [NEW] • learnedPatterns [NEW]           │ │
│  │  • executionSnapshots [NEW] • usageAnalytics  [NEW]           │ │
│  │  • codebaseIndex     [NEW] • teamWorkspace    [NEW]           │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         External Services                            │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │   Google    │  │  OpenRouter │  │   Ollama    │               │
│  │   Gemini    │  │  (100+ LLMs)│  │   (Local)   │               │
│  └─────────────┘  └─────────────┘  └─────────────┘               │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │   OpenAI    │  │  Anthropic  │  │  LiteLLM    │               │
│  │  (ChatGPT)  │  │   (Claude)  │  │   (Proxy)   │               │
│  └─────────────┘  └─────────────┘  └─────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Agent Execution Flow with Plan Mode

```
┌─────────────────────────────────────────────────────────────┐
│                  User Initiates Task                         │
│              gemini plan "Build auth system"                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               PLAN MODE ENABLED                              │
│         (Write tools blocked, read tools active)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            1. Task Analysis & Planning                       │
│                                                              │
│  Agent analyzes task → Breaks into steps → LLM generates    │
│  detailed execution plan with:                               │
│  • Step descriptions                                         │
│  • Actions (create_file, edit_file, run_command)           │
│  • Reasoning for each step                                   │
│  • Dependencies between steps                                │
│  • Risk levels (low/medium/high)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            2. Cost Estimation                                │
│                                                              │
│  Cost Optimizer:                                             │
│  • Analyzes task complexity                                  │
│  • Estimates tokens per step                                 │
│  • Calculates cost with selected provider                    │
│  • Shows total estimated cost                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            3. Learning System Check                          │
│                                                              │
│  • Check for similar past tasks                              │
│  • Suggest proven approaches                                 │
│  • Warn about known issues                                   │
│  • Provide success rate data                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            4. Interactive Plan Review UI                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐│
│  │ 📋 Execution Plan: "Build auth system"                ││
│  │                                                         ││
│  │ Step 1: Create User model                   [Low Risk] ││
│  │   Action: create_file                                  ││
│  │   Cost: $0.002 • Duration: ~5s                        ││
│  │                                                         ││
│  │ Step 2: Create Auth service                [Low Risk] ││
│  │   Action: create_file                                  ││
│  │   Cost: $0.003 • Duration: ~8s                        ││
│  │                                                         ││
│  │ Step 3: Setup JWT middleware             [Medium Risk] ││
│  │   Action: create_file                                  ││
│  │   Cost: $0.003 • Duration: ~10s                       ││
│  │                                                         ││
│  │ Total: 5 steps • $0.015 • ~3min                       ││
│  │                                                         ││
│  │ [Enter] Approve  [e]dit  [s]kip step  [c]ancel       ││
│  └────────────────────────────────────────────────────────┘│
└──────────────────────┬──────────────────────────────────────┘
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
    ┌─────────────┐      ┌─────────────┐
    │  Edit Plan  │      │   Approve   │
    │             │      │             │
    │ • Reorder   │      │ • Create    │
    │ • Skip      │      │   Snapshot  │
    │ • Modify    │      │ • Switch to │
    │             │      │   Implement │
    └──────┬──────┘      └──────┬──────┘
           │                    │
           └──────────┬─────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│            5. Pre-Execution Snapshot                         │
│                                                              │
│  • Auto-create snapshot "before-agent-execution"            │
│  • Store current file states                                │
│  • Enable rollback if needed                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         PLAN MODE DISABLED - EXECUTION BEGINS                │
│           (Write tools restored)                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            6. Step-by-Step Execution                         │
│                                                              │
│  For each step:                                              │
│  ┌────────────────────────────────────────────────────────┐│
│  │ ▶ Executing Step 1: Create User model                 ││
│  │                                                         ││
│  │ ┌─ Security Scan ─────────────────────┐               ││
│  │ │ ✓ No secrets detected                │               ││
│  │ │ ✓ No injection risks                 │               ││
│  │ └──────────────────────────────────────┘               ││
│  │                                                         ││
│  │ ┌─ Performance Check ─────────────────┐               ││
│  │ │ ℹ Consider adding indexes            │               ││
│  │ │ ℹ Query complexity: Low              │               ││
│  │ └──────────────────────────────────────┘               ││
│  │                                                         ││
│  │ ✓ Step completed successfully                          ││
│  │ Created: src/models/user.ts                           ││
│  └────────────────────────────────────────────────────────┘│
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            7. Real-Time Monitoring                           │
│                                                              │
│  • Cost tracking (actual vs estimated)                       │
│  • Security alerts (if issues found)                         │
│  • Performance warnings                                      │
│  • Step completion status                                    │
│  • Error detection & handling                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            8. Error Handling (if error occurs)               │
│                                                              │
│  ❌ Step 3 failed: Module 'jwt' not found                   │
│                                                              │
│  Agent analyzes error →  Suggests fix → Retry               │
│                                                              │
│  Options:                                                    │
│  [r]etry after installing dependency                         │
│  [s]kip this step                                            │
│  [a]bort execution                                           │
│  [m]odify approach                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            9. Completion & Learning                          │
│                                                              │
│  • Create snapshot "after-agent-success"                     │
│  • Record execution pattern                                  │
│  • Update learning database                                  │
│  • Generate summary report                                   │
│  • Track cost vs estimate                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            10. Summary Report                                │
│                                                              │
│  ✅ Task completed successfully!                            │
│                                                              │
│  📁 Files created: 5                                        │
│  • src/models/user.ts                                       │
│  • src/services/auth.ts                                     │
│  • src/middleware/jwt.ts                                    │
│  • src/routes/auth.routes.ts                               │
│  • tests/auth.test.ts                                       │
│                                                              │
│  💰 Cost: $0.014 (estimated: $0.015)                       │
│  ⏱️  Duration: 2m 47s (estimated: 3m)                       │
│  🔒 Security: No issues                                     │
│  ⚡ Performance: 2 suggestions                              │
│                                                              │
│  📚 Learning: Pattern recorded for "authentication setup"   │
│                                                              │
│  [v]iew files  [u]ndo changes  [n]ew task                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Cost Optimization Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   User Request                               │
│          "Explain this complex algorithm"                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          1. Complexity Analysis                              │
│                                                              │
│  Complexity Analyzer checks:                                 │
│  • Input length: 800 chars → +10 points                     │
│  • Requires reasoning: YES → +30 points                      │
│  • Requires code: NO → +0 points                            │
│  • Requires creativity: NO → +0 points                       │
│  • Critical task: NO → +0 points                            │
│                                                              │
│  COMPLEXITY SCORE: 40/100 (MEDIUM)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          2. Determine Required Tier                          │
│                                                              │
│  Complexity: 40 → Tier: FAST                                │
│                                                              │
│  Tier Options:                                               │
│  • CHEAP (0-30): Simple queries, quick answers              │
│  • FAST (31-50): Medium complexity, reasoning               │
│  • BALANCED (51-70): Complex tasks                          │
│  • QUALITY (71-100): Critical, creative, expert tasks       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          3. Get Candidate Models                             │
│                                                              │
│  FAST Tier Models:                                           │
│                                                              │
│  Model A: Gemini 1.5 Flash                                  │
│    Cost: $0.00015/1k in, $0.0006/1k out                    │
│    Latency: 450ms avg                                        │
│    Quality: 85/100                                           │
│                                                              │
│  Model B: GPT-3.5 Turbo                                     │
│    Cost: $0.0005/1k in, $0.0015/1k out                     │
│    Latency: 600ms avg                                        │
│    Quality: 82/100                                           │
│                                                              │
│  Model C: Claude Haiku                                       │
│    Cost: $0.00025/1k in, $0.00125/1k out                   │
│    Latency: 500ms avg                                        │
│    Quality: 88/100                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          4. Apply Routing Strategy                           │
│                                                              │
│  User's Strategy: COST-OPTIMIZED                            │
│                                                              │
│  Sort by: Cost per token (ascending)                         │
│                                                              │
│  Winner: Model A (Gemini 1.5 Flash)                         │
│    • Lowest cost                                             │
│    • Good quality (85/100)                                   │
│    • Fast enough (450ms)                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          5. Estimate Cost                                    │
│                                                              │
│  Input: 800 chars ≈ 200 tokens                             │
│  Est. Output: 500 tokens                                     │
│                                                              │
│  Cost Calculation:                                           │
│  • Input: (200/1000) × $0.00015 = $0.00003                 │
│  • Output: (500/1000) × $0.0006 = $0.0003                  │
│  • Total: $0.00033                                          │
│                                                              │
│  vs GPT-3.5 Turbo: $0.00085 (2.6x more expensive)          │
│  vs Claude Haiku: $0.00068 (2.1x more expensive)           │
│                                                              │
│  💰 SAVINGS: $0.00052 (61% cheaper than GPT-3.5)           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          6. Execute Request                                  │
│                                                              │
│  Provider: Google Gemini                                     │
│  Model: gemini-1.5-flash                                    │
│  Estimated Cost: $0.00033                                   │
│                                                              │
│  [Executing...]                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          7. Track Actual Cost                                │
│                                                              │
│  Actual Usage:                                               │
│  • Input tokens: 198                                         │
│  • Output tokens: 523                                        │
│  • Actual cost: $0.00034                                    │
│                                                              │
│  Accuracy: 97% (estimate was $0.00033)                      │
│                                                              │
│  Record in costTracking table                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          8. Monthly Aggregation                              │
│                                                              │
│  Month-to-Date:                                              │
│  • Total requests: 847                                       │
│  • Total cost: $2.34                                        │
│  • Avg cost per request: $0.00276                           │
│  • Most used: Gemini Flash (68%)                            │
│  • Most expensive: Claude Opus (12% of requests, 45% cost) │
│                                                              │
│  Projected monthly: $8.67                                    │
│                                                              │
│  vs All GPT-4: $42.80 (80% savings!)                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ Command Input
     ▼
┌─────────────────────────────────────────┐
│         CLI Input Handler                │
│                                          │
│  • Parse command                         │
│  • Validate arguments                    │
│  • Load history                          │
└────┬─────────────────────────────────────┘
     │
     │ Parsed Request
     ▼
┌─────────────────────────────────────────┐
│       Cost Optimizer (if enabled)        │
│                                          │
│  • Analyze complexity                    │
│  • Select optimal provider               │
│  • Estimate cost                         │
└────┬─────────────────────────────────────┘
     │
     │ Provider + Model Selection
     ▼
┌─────────────────────────────────────────┐
│         Provider Manager                 │
│                                          │
│  • Get selected provider                 │
│  • Initialize if needed                  │
│  • Handle failover                       │
└────┬─────────────────────────────────────┘
     │
     │ Provider Instance
     ▼
┌─────────────────────────────────────────┐
│          Memory System                   │
│                                          │
│  • Extract entities                      │
│  • Search past conversations             │
│  • Build context prefix                  │
└────┬─────────────────────────────────────┘
     │
     │ Enhanced Request with Context
     ▼
┌─────────────────────────────────────────┐
│         Agent (if agent mode)            │
│                                          │
│  • Plan mode: Generate plan              │
│  • Execute mode: Run actions             │
│  • Monitor execution                     │
└────┬─────────────────────────────────────┘
     │
     │ Agent Actions / Direct Request
     ▼
┌─────────────────────────────────────────┐
│         LLM Provider                     │
│                                          │
│  • Format request for provider           │
│  • Call API                              │
│  • Stream/batch response                 │
└────┬─────────────────────────────────────┘
     │
     │ LLM Response
     ▼
┌─────────────────────────────────────────┐
│      Real-Time Analysis                  │
│                                          │
│  ┌─────────────────────────────────────┐│
│  │ Security Auditor (if code generated)││
│  │  • Scan for vulnerabilities          ││
│  │  • Detect secrets                    ││
│  │  • Check injections                  ││
│  └─────────────────────────────────────┘│
│                                          │
│  ┌─────────────────────────────────────┐│
│  │ Performance Analyzer                 ││
│  │  • Check queries                     ││
│  │  • Detect N+1                        ││
│  │  • Suggest optimizations             ││
│  └─────────────────────────────────────┘│
└────┬─────────────────────────────────────┘
     │
     │ Response + Analysis
     ▼
┌─────────────────────────────────────────┐
│         Database Storage                 │
│                                          │
│  • Save conversation                     │
│  • Record cost                           │
│  • Store security findings               │
│  • Save performance metrics              │
│  • Index for memory                      │
│  • Update learning patterns              │
└────┬─────────────────────────────────────┘
     │
     │ Stored Data
     ▼
┌─────────────────────────────────────────┐
│         Learning System                  │
│                                          │
│  • Extract execution pattern             │
│  • Update success/failure counts         │
│  • Calculate success rate                │
│  • Store for future recommendations      │
└────┬─────────────────────────────────────┘
     │
     │ Learning Updated
     ▼
┌─────────────────────────────────────────┐
│         Display to User                  │
│                                          │
│  • Render response                       │
│  • Show cost                             │
│  • Display alerts (if any)               │
│  • Show suggestions                      │
└─────────────────────────────────────────┘
```

---

## Feature Interaction Map

```
                    ┌──────────────────┐
                    │   Cost Optimizer │
                    └────────┬─────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐
         │ Provider │  │   Agent  │  │Analytics │
         │ Manager  │  │  System  │  │          │
         └────┬─────┘  └────┬─────┘  └────┬─────┘
              │             │             │
              │      ┌──────┴──────┐      │
              │      │             │      │
              ▼      ▼             ▼      ▼
         ┌─────────────────────────────────────┐
         │          Plan Mode System            │
         │                                      │
         │  ┌─────────────────────────────────┐│
         │  │   1. Generate Plan               ││
         │  │   2. Show Cost Estimate ←────────┘│
         │  │   3. Check Learning System       ││
         │  │   4. User Approval               ││
         │  │   5. Execute with Monitoring     ││
         │  └─────────────────────────────────┘│
         └──────────┬──────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Security │ │Performance│ │ Learning │
│ Auditor  │ │ Analyzer │ │  System  │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
     │    ┌───────┴───────┐    │
     │    │               │    │
     ▼    ▼               ▼    ▼
┌─────────────────────────────────────┐
│         Database Storage             │
│                                      │
│  All features write to database      │
│  • costTracking                      │
│  • securityAudit                     │
│  • performanceMetrics                │
│  • learnedPatterns                   │
│  • executionSnapshots                │
│  • usageAnalytics                    │
│  • codebaseIndex                     │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      Time Travel System              │
│                                      │
│  Can restore any snapshot            │
│  • Before plan execution             │
│  • After each step                   │
│  • Manual checkpoints                │
│  • Periodic auto-saves               │
└─────────────────────────────────────┘
```

---

## Database Entity Relationships

```
┌─────────────────┐
│    sessions     │
│─────────────────│
│ PK id           │────────┐
│    projectHash  │        │
│    startTime    │        │
│    lastUpdated  │        │
│    title        │        │
│    providerId   │        │
│    modelId      │        │
└─────────────────┘        │
                           │ 1:N
                           ▼
                ┌─────────────────┐
                │conversationNodes│
                │─────────────────│
                │ PK id           │
                │ FK sessionId    │
                │    parentNodeId │
                │    message      │
                │    timestamp    │
                └─────────────────┘
                           │
                           │ 1:N
                           ▼
                ┌─────────────────┐
                │   costTracking  │
                │─────────────────│
                │ PK id           │
                │ FK sessionId    │
                │ FK nodeId       │
                │    providerId   │
                │    modelId      │
                │    costUsd      │
                │    timestamp    │
                └─────────────────┘

┌─────────────────┐
│   sessions      │────────┐
│─────────────────│        │ 1:N
│ PK id           │        │
└─────────────────┘        ▼
                ┌─────────────────┐
                │ securityAudit   │
                │─────────────────│
                │ PK id           │
                │ FK sessionId    │
                │    severity     │
                │    category     │
                │    description  │
                │    location     │
                │    status       │
                └─────────────────┘

┌─────────────────┐
│   sessions      │────────┐
│─────────────────│        │ 1:N
│ PK id           │        │
└─────────────────┘        ▼
                ┌─────────────────┐
                │performanceMetrics│
                │─────────────────│
                │ PK id           │
                │ FK sessionId    │
                │    metricType   │
                │    value        │
                │    unit         │
                │    context      │
                └─────────────────┘

┌─────────────────┐
│learnedPatterns  │
│─────────────────│
│ PK id           │
│    taskType     │
│    pattern      │
│    successCount │
│    failureCount │
│    successRate  │
│    context      │
└─────────────────┘
     (No FK - standalone)

┌─────────────────┐
│   sessions      │────────┐
│─────────────────│        │ 1:N
│ PK id           │        │
└─────────────────┘        ▼
                ┌─────────────────┐
                │executionSnapshots│
                │─────────────────│
                │ PK id           │
                │ FK sessionId    │
                │    label        │
                │    timestamp    │
                │    fileStates   │
                │    metadata     │
                └─────────────────┘

┌─────────────────┐
│codebaseIndex    │
│─────────────────│
│ PK id           │
│    filePath     │
│    language     │
│    astData      │
│    exports      │
│    imports      │
│    functions    │
│    classes      │
└─────────────────┘
     (No FK - standalone)

┌─────────────────┐
│   sessions      │────────┐
│─────────────────│        │ 1:N
│ PK id           │        │
└─────────────────┘        ▼
                ┌─────────────────┐
                │usageAnalytics   │
                │─────────────────│
                │ PK id           │
                │ FK sessionId    │
                │    eventType    │
                │    eventData    │
                │    timestamp    │
                └─────────────────┘
```

---

**Last Updated**: October 31, 2025  
**These diagrams complement**: `architecture-enhanced.md`,
`ARCHITECTURE-MODIFICATIONS.md`

---

Use these diagrams to understand:

- How components interact
- Data flow through the system
- Database relationships
- Feature dependencies
- Execution sequences

🎨 Visual learning for visual thinkers!
