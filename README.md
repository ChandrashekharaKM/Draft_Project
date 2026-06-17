# 🚀 Prep4Interview - AI Interview Portal

Welcome to the **Prep4Interview** AI Interview Portal! This advanced Next.js application allows candidates to upload their resume, paste a target job description, and instantly receive dynamic, AI-tailored mock interview questions and evaluations.

![Prep4Interview Mock Interview UI](https://via.placeholder.com/1000x500.png?text=Prep4Interview+Dashboard)

---

## ✨ Core Features
* 📄 **Contextual AI Generation**: Upload a Resume (PDF/DOCX) and paste a Job Description to generate highly specific interview questions.
* 🎯 **Dynamic Difficulty**: Choose between Easy (Junior), Medium (Mid-Level), or Hard (Senior) difficulty levels across multiple domains (Frontend, Backend, DevOps, Data Science, etc.).
* 💬 **Immersive Question Engine**: Proceed through a focused, distraction-free interview card interface.
* 🤖 **AI Evaluation Module**: Get real-time scoring on technical accuracy and communication skills using Google's Gemini API.
* 📊 **Progress Tracking**: Monitor session history and track your improvement graph over time.

---

## 🛠️ Tech Stack
* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism & Dark Mode)
* **Icons**: Inline SVGs

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Create a `.env` file in the root directory (you can copy `.env.example`):
```bash
cp .env.example .env
```
Open the `.env` file and add your Google Gemini API Key:
```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 3. Start the Development Server
```bash
npm run dev
# If you are on Windows and get a script execution policy error, run:
npm.cmd run dev
```

### 3. Open in Browser
Visit [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── page.tsx          # Main Dashboard
│   ├── layout.tsx        # Global Layout (Navbar)
│   └── interview/        # Interview Flow & Setup
│       └── page.tsx      
├── components/           # Reusable UI Components
│   ├── layout/
│   │   └── Navbar.tsx    # Global Navigation
│   └── interview/        # Mock Interview Components
│       ├── InterviewSetupForm.tsx
│       ├── QuestionCard.tsx
│       └── NextQuestionButton.tsx
└── services/             # Mock/AI Logic APIs
    ├── evaluation.ts     # (Candidate 2 logic)
    ├── feedback.ts       # (Candidate 3 logic)
    ├── interview.ts      # (Candidate 1 logic)
    └── progress.ts       # (Candidate 4 logic)
```

---

## 👥 Team Collaboration Workflow

### The "Golden Rule"
Whenever you or your teammates create a Custom Skill or behavior tweak for the Antigravity agent, those files will live inside the `.agents/skills/` directory.

**To share a custom skill:**
```bash
git add .agents/skills/
git commit -m "feat: added custom code-refactoring skill for Antigravity agent"
git push origin main
```

**To get updates:**
Before starting a session, always pull the latest updates so your local Antigravity agent learns the skills your team members just pushed:
```bash
git pull origin main
```

### Daily Git Workflow
1. **Always start by pulling the latest changes:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Checkout your feature branch and merge main into it:**
   ```bash
   git checkout feature/<your-feature>
   git merge main
   ```
3. **Commit your work and push your branch:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/<your-feature>
   ```
4. **Create a Pull Request** on GitHub for the Project Lead to review and merge.

---
_Built with ❤️ for AI-assisted interview preparation._
