# How to Test Phase 1 - Complexity Analyzer

## 🚀 Quick Start

### **Test 1: Basic Automated Test**

Run 4 predefined tests to verify the analyzer works:

```powershell
cd c:\VS_CODE\CLI\procode
npx tsx tests/phase1-simple.ts
```

**What it tests:**

- Simple questions → MINI tier
- Code generation → STANDARD tier
- Complex architecture → ADVANCED tier
- Critical tasks → ADVANCED tier

---

### **Test 2: Interactive Testing** ⭐ RECOMMENDED

Type your own prompts and see real-time analysis:

```powershell
cd c:\VS_CODE\CLI\procode
npx tsx tests/interactive-test.ts
```

**Example session:**

```
> Enter prompt: How do I fix this bug?
📊 Analysis Results:
Tier: 💛 STANDARD
Complexity Score: 25/100
  - Requires Code: ✅
  - Tokens: ~7 → ~14

> Enter prompt: exit
```

---

### **Test 3: Comprehensive Test Suite**

Run 20+ examples across different categories:

```powershell
cd c:\VS_CODE\CLI\procode
npx tsx tests/test-examples.ts
```

**What it tests:**

- Simple queries (4 tests)
- Code generation (4 tests)
- Analysis tasks (3 tests)
- Architecture design (3 tests)
- Critical/security (3 tests)
- Creative tasks (3 tests)

---

## 📊 Understanding the Results

### **Tier Explanations:**

**💚 MINI Tier** (Score: 0-39)

- Simple questions
- Quick lookups
- No reasoning needed
- **Models**: gemini-flash, gpt-4o-mini
- **Cost**: $0.00 - $0.60 per 1M tokens

**💛 STANDARD Tier** (Score: 40-69)

- Code generation
- Analysis tasks
- Moderate complexity
- **Models**: gemini-pro, gpt-4o, claude-sonnet
- **Cost**: $1.25 - $15.00 per 1M tokens

**❤️ ADVANCED Tier** (Score: 70-100 or Critical)

- Complex architecture
- Critical security
- Production deployments
- **Models**: claude-opus, o1-preview
- **Cost**: $15.00 - $75.00 per 1M tokens

---

## 🔍 What Gets Analyzed

The analyzer checks for these indicators:

### **+30 points: Reasoning**

Keywords: analyze, explain why, design, architect, optimize, debug, investigate,
compare, evaluate, recommend, strategy, plan

### **+25 points: Code**

Keywords: function, class, implement, code, refactor, bug, error, import, api,
algorithm, typescript, python, etc.

### **+20 points: Creativity**

Keywords: create, generate, write, compose, brainstorm, ideas, innovative,
documentation

### **+25 points: Critical**

Keywords: production, deploy, security, critical, urgent, fix, vulnerability,
attack

### **+10 points: Long conversation** (>10 messages)

### **+15 points: Many files** (>5 files)

---

## 💡 Test Your Own Prompts

### Try these examples:

```powershell
# Run interactive test
npx tsx tests/interactive-test.ts
```

**Good MINI prompts:**

- "What is React?"
- "Hello"
- "Translate this to Spanish"

**Good STANDARD prompts:**

- "Write a function to sort an array"
- "Explain how promises work"
- "Review this code for bugs"

**Good ADVANCED prompts:**

- "Design a scalable microservices architecture"
- "Fix this critical security vulnerability"
- "Optimize this for 1 million users"

---

## 🎯 Expected Cost Savings

Based on the tier distribution:

- **40% MINI** → Use free/cheap models → **Save 90%**
- **40% STANDARD** → Use mid-tier models → **Save 50%**
- **20% ADVANCED** → Use premium models → **No savings, but necessary**

**Overall savings: ~30-40%** on your AI API costs! 💰

---

## 🐛 Troubleshooting

### "Cannot find module" error:

Make sure you're in the procode directory:

```powershell
cd c:\VS_CODE\CLI\procode
```

### Want to modify the scoring?

Edit: `packages/core/src/routing/complexity-analyzer.ts`

- Line 22-55: Adjust point values
- Line 69-75: Change tier thresholds

---

## 📝 Next Steps

After testing the Complexity Analyzer:

1. ✅ Test passed? Move to Phase 1B: Cost Optimizer
2. ✅ Want to tune scoring? Edit complexity-analyzer.ts
3. ✅ Ready for integration? Connect to ModelRouterService

---

**Questions? Just ask!** 🚀
