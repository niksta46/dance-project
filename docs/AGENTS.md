# AGENTS.md

## Purpose

This file defines **how AI coding agents must behave** in this repository.

It is **not** a progress log and **not** a roadmap.

⚠️ **Important Rule**

* This file is considered **stable**
* It must be changed **only if the project owner explicitly instructs so**
* Agents must never modify this file on their own

For project progress and goals, refer to:

* PROJECT_STATE.md (current status)
* ROADMAP.md (future work)
* DEPLOYMENT.md (deployment progress)

---

## Agent Role

* You are a **full-stack agent**
* Treat the backend as a **stable external API**
* Your responsibility is to **consume existing endpoints** and build UI features

---

## Repository Overview

```
dance_backend/    # Django REST API (DO NOT MODIFY)
dance_frontend/   # React + Vite frontend (ALL WORK HERE)
docs/             # Project documentation
```

---

## Scope Rules (Strict)

### Backend

* ❌ Do NOT modify Django code
* ❌ Do NOT change serializers, views, models, or URLs
* ❌ Do NOT add authentication or permissions unless explicitly instructed

### Frontend

* ✅ All new work must be inside `dance_frontend/`
* ✅ Use existing architecture and patterns
* ✅ Consume backend data as-is

---

## Tech Stack

### Backend (Read-only)

* Django 6.0.1
* Django REST Framework
* SQLite

### Frontend

* React 19
* Vite
* Tailwind CSS v3
* Flowbite React
* React Router v6 (createBrowserRouter)

---

## Backend API Contract

* Base URL: `http://localhost:8000/api/`
* Resources:

  * pages
  * class-sections
  * news-posts
  * contact-messages
  * social-links
  * media-items

Pattern:

```
GET /api/resource/
GET /api/resource/{id}/
```

---

## Frontend Architecture Rules

* API access via `src/api/*.js`
* Central fetch logic in `api/client.js`
* Data fetching via `useFetch` hook
* Feature-based organization (`features/*`)
* Shared UI components in `components/common`

Do not introduce new architectural patterns unless instructed.

---

## Development Rules

* Prefer existing components over creating new ones
* Handle all states: loading, error, empty, success
* Follow established design system
* Keep components focused and readable

---

## Documentation Authority

| File              | Who Updates It | Purpose                     |
| ----------------- | -------------- | --------------------------- |
| AGENTS.md         | ❌ Agent        | Agent behavior & rules      |
| ARCHITECTURE.md   | ❌ Agent        | Technical structure         |
| PROJECT_STATE.md  | ✅ Owner        | Current project status      |
| ROADMAP.md        | ✅ Owner        | Goals & next steps          |
| DEPLOYMENT.md     | ✅ Owner        | Deployment progress tracking |

Agents must respect this separation at all times.
