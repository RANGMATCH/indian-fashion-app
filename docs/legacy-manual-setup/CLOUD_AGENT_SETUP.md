# Cursor Cloud Agent – Setup (same code & settings)

This guide helps you create a Cursor Cloud Agent that uses **this repo** and the **same env/settings** as your local `.env.local`.

---

## Do this now (you have full permission)

1. **Push this repo to GitHub** (if not already): create repo on GitHub → `git remote add origin <url>` → `git push -u origin main`.
2. **In Cursor:** Press `Ctrl+Shift+P` (or `Cmd+Shift+P`) → type **`Cursor: Start Cloud Agent Setup`** → Enter.
3. **In the setup UI:** Connect this GitHub repo → add **Secrets** (copy names/values from your `.env.local`; list in `.cursor/environment.example.json`) → set install: `npm install` → finish.
4. **Start the agent** from the Cloud dropdown or cursor.com/agents when you want it to run.

Repo-side setup (`.cursor/`, `.cursorrules`, this doc) is already done. The agent will use the same code and settings once you complete the steps above.

---

## 1. Push this repo to GitHub or GitLab

Cloud Agent works with a **remote repo**. If this project is not on GitHub/GitLab yet:

- Create a new repo on GitHub (or GitLab).
- Push your code:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/indian-fashion-app.git
  git push -u origin main
  ```
- Ensure the Cloud Agent will have **read–write** access (you’ll connect with your account).

---

## 2. Start Cloud Agent setup in Cursor

1. Open **Cursor**.
2. Open **Command Palette**: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac).
3. Run: **`Cursor: Start Cloud Agent Setup`**.
4. Or open: **cursor.com/agents** in the browser and follow the flow there.
5. Or use deeplink: `cursor://anysphere.cursor-deeplink/background-agent/setup` (if Cursor supports it).

---

## 3. Connect this repository

- When asked for **repository**, choose your **GitHub** (or GitLab) account and select **this project** (`indian-fashion-app` or whatever you named it).
- The agent will clone this repo and work on a **separate branch**; it can push changes back for you to review/merge.
- Same code = this repo; no need to copy code elsewhere.

---

## 4. Use the same settings (Secrets / env)

So the Cloud Agent has the **same config** as your machine:

1. In the Cloud Agent setup UI, find **Secrets** or **Environment variables**.
2. Add the same variables you have in **`.env.local`** (copy names and values from your local file):

   | Name | Where you get it |
   |------|-------------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` |
   | `OPENAI_API_KEY` | `.env.local` (optional) |
   | `NEXT_PUBLIC_APP_URL` | `.env.local` (optional) |
   | `SUPABASE_DB_URL` | `.env.local` (optional, only if agent runs DB scripts) |

3. Reference: **`.cursor/environment.example.json`** lists these names (values stay in the UI only; don’t commit real secrets).

Result: **same settings** as local, so the agent’s behavior matches your app.

---

## 5. Install and startup commands

- **Install command:** `npm install`
- **Startup command (optional):** `npm run dev` if you want the agent to run the app in the cloud.

The UI may generate a **`.cursor/environment.json`** after setup; you can keep it private or commit a version without secrets (see Cursor docs).

---

## 6. Give the agent context (optional)

- In this repo we added **`.cursor/cloud-agent-context.md`** with:
  - Project name, stack, main commands
  - Env var names and where they’re used
  - Important paths (app, lib, components, schema)
  - Data overview (tables, rows)
  - Short rules (no committing secrets, use existing patterns)

You can point the agent at this file or paste relevant parts into the agent’s instructions so it follows the **same code and conventions**.

---

## 7. Finish and run the agent

- Complete the setup in the UI (name the agent, confirm repo and secrets).
- After that you can:
  - Start the agent from **cursor.com/agents** or from Cursor under the **Cloud** agent option.
  - Assign tasks; it will use this repo and the env you set, so behavior stays aligned with local.

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Push this project to GitHub (or GitLab). |
| 2 | In Cursor: **Cursor: Start Cloud Agent Setup** (or cursor.com/agents). |
| 3 | Connect the **same repo** (this codebase). |
| 4 | Add **Secrets** = same vars as `.env.local` (see list above). |
| 5 | Set **install** = `npm install`, **startup** = `npm run dev` (optional). |
| 6 | Use **`.cursor/cloud-agent-context.md`** so the agent knows the project and settings. |

After this, your Cloud Agent runs with the **same code and settings** as your local setup.
