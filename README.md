# Team Setup & Antigravity Workflow

## Step 1: Initialize Git and Configure .gitignore
Before running your first Antigravity agent or committing code, you must protect your repository from getting bloated by agent log files.

1. Open your terminal or command prompt and navigate to your project folder:
```bash
cd path/to/your/project
```

2. Initialize your local Git repository:
```bash
git init
```

3. Create a file named `.gitignore` in the root of your project folder and paste the exact rules we discussed (already created in this template).

---

## Step 2: Create the Repository on GitHub
1. Go to [GitHub](https://github.com) and log in.
2. Click the **New** button (or the **+** icon in the top right) to create a new repository.
3. Name your repository and give it a description.
4. **Important:** Leave "Add a README file", "Add .gitignore", and "Choose a license" **unchecked** (since you already created your project files locally).
5. Click **Create repository**.

---

## Step 3: Link Your Project and Push to GitHub
GitHub will show you a page with a few commands. Run these exact commands in your terminal to link your local project to GitHub and push your initial setup:

```bash
# Add all your project files (including the .gitignore)
git add .

# Create your first commit
git commit -m "Initial commit: Project setup with Antigravity gitignore rules"

# Rename your default branch to main
git branch -M main

# Link your local repo to GitHub (Replace with your actual GitHub URL from the webpage)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code to GitHub
git push -u origin main
```

---

## Step 4: Add Your Team Members
Because this is a shared single project, your teammates need permission to push changes to the repository.

1. On your GitHub repository page, click the **Settings** tab at the top.
2. On the left sidebar, click **Collaborators**.
3. Click the **Add people** button.
4. Type your teammates' GitHub usernames or email addresses and invite them.
5. Once they accept the invite via email or their GitHub notification dashboard, they can clone the project!

---

## Step 5: How Your Team Should Work (The Team Workflow)
When a teammate wants to start working on the project, they just need to clone it:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
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
