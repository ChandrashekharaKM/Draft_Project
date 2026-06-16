# Team Setup & Antigravity Workflow

## What We've Done So Far (Steps 1-4)
The initial setup for this repository is complete! Here is a summary of what was done to get us here:
1. **Initialized Git and Configured `.gitignore`**: We created a local Git repository and set up a `.gitignore` to prevent agent log files (`.antigravity/`, `.agents/cache/`) and standard dependencies from bloating the repository.
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
* Wait for all team members to accept their repository invites and clone the project locally.
* Decide on the core project requirements and technology stack.
* Assign initial tasks and components for each team member to work on in parallel.
* Spin up parallel Antigravity sessions to build the components, making sure to pull the latest updates frequently.
