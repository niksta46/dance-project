# Architecture

## Purpose

This document describes the **technical structure and design decisions** of the project.

⚠️ **Stability Rule**

* This file is considered **frozen**
* It must be changed **only when explicitly instructed by the project owner**

---

## High-Level Architecture

```
Frontend (React + Vite)
        ↓ HTTP (JSON)
Backend (Django REST API)
```

The frontend treats the backend as an external service.

---

## Frontend Structure

```
src/
├── api/                # API service layer
├── features/           # Feature-based UI modules
├── components/         # Reusable UI components
│   ├── layout/
│   └── common/
├── hooks/              # Custom hooks
├── routes/             # Router configuration
└── styles/             # Global styles
```

---

## Data Flow Pattern

```
API Client → useFetch Hook → Feature Component → UI Component
```

* All network logic lives in `api/`
* UI components never call fetch directly

---

## API Layer Conventions

* One module per resource

* Consistent method naming:

  * getAll
  * getById
  * create
  * update
  * patch
  * delete

* Base URL provided via `VITE_API_URL`

---

## Error Handling Strategy

* Network & server errors handled in `client.js`
* Errors propagated as `Error` objects
* Displayed using `ErrorMessage` component

---

## Loading & Empty States

* Full-page loading: `Loading` component
* Component-level loading: inline indicators
* Empty data: `EmptyState` component

---

## Routing

* Uses `createBrowserRouter`
* Layout rendered via `<Outlet />`
* No `{children}` pattern for routes

---

## Design System

* Tailwind CSS for styling
* Flowbite React for UI primitives
* Custom color palette configured in Tailwind

---

## Backend Interaction Rules

* No assumptions about pagination or filtering
* Use backend responses exactly as provided
* No client-side schema duplication

This document exists to prevent architectural drift.
