# VolunteerHub
 
> A Website to manage CSUS volunteer events.

---
 
## 🚨 Important: How We Work Together (Please Read!)
 
To avoid overwriting each other's work and prevent messy merge conflicts, we follow a simple Git workflow. **Never commit directly to `main`.** Instead, follow the steps below every time you work on something.
 
---
 
## Git Workflow Guide
 
### Key Terms
 
- **Repository (repo):** The project folder that Git tracks. Our shared one lives on GitHub.
- **Branch:** A separate copy of the code where you can work freely without affecting anyone else. Think of it like your own personal draft.
- **Commit:** A saved snapshot of your changes with a short description of what you did.
- **Push:** Uploading your commits from your computer to GitHub so others can see them.
- **Pull Request (PR):** A request on GitHub to merge your branch into `main`. It lets teammates review your code before it's added.
- **Code Review:** When a teammate looks over your PR and approves (or requests changes) before it gets merged.
---
 
### Step 1 — Create Your Own Branch
 
Before writing any code, create a branch named after yourself or the feature you're working on:
 
```bash
git checkout -b your-name/feature-name
# Example: git checkout -b lucas/login-page
```
 
This creates a new branch and switches you to it. You're now working on your own copy — safe from everyone else's changes.
 
---
 
### Step 2 — Make Your Changes & Commit
 
After editing files, save your progress with a commit:
 
```bash
git add .
git commit -m "Short description of what you did"
# Example: git commit -m "Add volunteer signup form"
```
 
- `git add .` stages all your changed files (tells Git what to include).
- `git commit -m "..."` saves a snapshot with a message explaining your changes.
Commit often — small, frequent commits are easier to review and undo if something goes wrong.
 
---
 
### Step 3 — Push Your Branch to GitHub
 
Upload your branch so it appears on GitHub:
 
```bash
git push origin your-name/feature-name
# Example: git push origin lucas/login-page
```
 
If it's your first push on this branch, Git may ask you to run a slightly longer version — just copy and run what it suggests.
 
---
 
### Step 4 — Open a Pull Request (PR)
 
1. Go to the repo on [GitHub](https://github.com/pollyology/VolunteerHubProject).
2. You should see a yellow banner saying **"Compare & pull request"** — click it.
3. Give your PR a clear title and a short description of what you changed and why.
4. Make sure the base branch is set to `main` and your branch is the compare branch.
5. Click **"Create pull request"**.
---
 
### Step 5 — Request a Review
 
Before merging, ask a teammate to review your code:
 
1. On the right side of your open PR, find **"Reviewers"**.
2. Click the gear icon and select a teammate to review.
3. Wait for their approval — they may leave comments or request changes.
4. Once approved, click **"Merge pull request"** and then **"Confirm merge"**.
> ⚠️ **Do not merge your own PR without at least one approval.**
 
---
 
### Quick Reference
 
```bash
git checkout -b your-name/feature   # 1. Create & switch to your branch
git add .                           # 2. Stage your changes
git commit -m "Your message"        # 2. Commit your changes
git push origin your-name/feature  # 3. Push to GitHub
                                    # 4. Open PR on GitHub
                                    # 5. Request a review, then merge
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
Test

Vincent test