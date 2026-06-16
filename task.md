# AI Interview Portal - Team Tasks

Welcome to the project! The base Next.js application has been set up, and Candidate 1 has already built the `mock-interview` features. 

Here are the specific workflows and components you need to build. Please read your section carefully.

---

## 📅 Daily Sync Workflow (For Everyone)

**Before starting work every day:**
```bash
git checkout main
git pull origin main

# Switch to your branch and merge latest main
git checkout <your-branch>
git merge main 
# OR git rebase main
```

**After completing your feature:**
```bash
git add .
git commit -m "feat: [describe your feature]"
git push origin <your-branch>
```
Then, go to GitHub and create a Pull Request from your branch to `main`. **Only the Project Lead will merge PRs after review.**

---

## 👨‍💻 Candidate 2 — AI Evaluation Module

### 1. Setup Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/ai-evaluation
```

### 2. Build Your Tasks
* **Service:** Complete the logic inside `/src/services/evaluation.ts`
* **Components:** Build `AnswerInput` and `EvaluationPanel` inside `/src/components/evaluation/`
* **Features:** 
  - Accept answer from candidate (text or audio transcription simulation)
  - Send answer to AI
  - Evaluate based on: Relevance, Communication, and Technical Accuracy
  - Return JSON format: `{ "score": 85, "strengths": [], "improvements": [] }`
* **Integration:** Wire this up in the `src/app/interview/page.tsx` (you will see a placeholder block waiting for your component).

---

## 👨‍💻 Candidate 3 — Score & Feedback

### 1. Setup Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/score-feedback
```

### 2. Build Your Tasks
* **Service:** Complete the logic inside `/src/services/feedback.ts`
* **Components:** Build `ScoreCard`, `FeedbackCard`, and `PerformanceMeter` inside `/src/components/feedback/`
* **Features:** 
  - Display the overall score
  - List strengths (e.g., "✓ Clear communication")
  - List areas to improve (e.g., "✓ More technical depth")
  - Provide improvement suggestions based on the evaluation data.

---

## 👨‍💻 Candidate 4 — Progress Tracking

### 1. Setup Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/progress-tracking
```

### 2. Build Your Tasks
* **Service:** Complete the logic inside `/src/services/progress.ts`
* **Components:** Build `ProgressChart`, `HistoryTable`, and `StatisticsCard` inside `/src/components/progress/`
* **Features:** 
  - Show a table/list of session history
  - Display previous scores and an improvement graph
  - Show total interviews completed

---

Happy Coding! 🚀
