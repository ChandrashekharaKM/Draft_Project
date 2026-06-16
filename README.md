# Team Setup & Antigravity Workflow

## What We've Done So Far (Steps 1-4)
The initial setup for this repository is complete! Here is a summary of what was done to get us here:
1. **Initialized Git and Configured `.gitignore`**: We created a local Git repository and set up a `.gitignore` to prevent agent log files (`.antigravity/`, `.agents/cache/`) and standard dependencies.
2. **Created the Repository on GitHub**: The remote repository was created on GitHub.
3. **Linked and Pushed to GitHub**: The initial setup, including the `.gitignore` and this README, was pushed to the `main` branch.
4. **Added Team Members**: Team members have been invited as collaborators to the repository.

---

## Step 5: How Your Team Should Work (The Team Workflow)
When a teammate wants to start working on the project, they just need to clone it:

```bash
git clone https://github.com/ChandrashekharaKM/Draft_Project.git
cd Draft_Project
```

### The "Golden Rule" for Antigravity Teamwork:
Whenever you or your teammates create a Custom Skill or behavior tweak for the Antigravity agent, those files will live inside the `.agents/skills/` directory.

**To share a custom skill:**
Whenever someone builds a useful skill for the agent, they should stage and commit it just like regular code:

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

Your local session history and massive log files (`.antigravity/` and `.agents/cache/`) will remain hidden on your respective machines, ensuring a perfectly clean, collaborative workspace!

---

## What To Do Next
### Timeline & Responsibilities

| Task | Owner | Target Date | Status |
|------|-------|-------------|--------|
| All team members accept invites and clone repo locally | All Team Members | Day 1 | ⏳ |
| Define core project requirements and technology stack | _TBD_ | Day 2-3 | ⏳ |
| Assign initial tasks and components for parallel work | Project Lead | Day 3 | ⏳ |
| Begin parallel Antigravity sessions | All Team Members | Day 4+ | ⏳ |

**Remember:** Pull frequently before starting each session to stay in sync with your team's latest skill updates!

---

## Troubleshooting Common Git Issues

### Merge Conflicts
If you encounter merge conflicts when pulling updates:
```bash
git status                    # See which files have conflicts
git diff                      # Review the conflicting changes
# Edit files to resolve conflicts manually
git add .
git commit -m "resolve: merge conflicts from team updates"
git push origin main
```

### Accidentally Committed Local Files
If you committed `.antigravity/` or `.agents/cache/` files by mistake:
```bash
git rm --cached .antigravity/ .agents/cache/ -r
git commit -m "remove: local cache files from git tracking"
git push origin main
```

### Sync with Latest Main Branch
If your branch is behind main:
```bash
git fetch origin
git rebase origin/main
# or merge if you prefer:
git merge origin/main
```

---

## Communication & Project Management
- **Primary Channel:** _[Add your team communication channel - Slack, Discord, etc.]_
- **Project Board:** _[Link to GitHub Projects board or external tool]_
- **Decision Log:** _[Where major decisions are recorded]_

_Note: Update these links as your team establishes them._
