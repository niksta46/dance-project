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
│   ├── client.js       # Base API client
│   ├── queryKeys.js    # TanStack Query keys
│   └── endpoints/      # Resource-specific API hooks
├── features/           # Feature-based UI modules
├── components/         # Reusable UI components
│   ├── layout/
│   └── common/
├── routes/             # Router configuration
└── styles/             # Global styles
```

---

## Data Flow Pattern

```
API Client → TanStack Query Hooks → Feature Component → UI Component
```

* All network logic lives in `api/`
* UI components never call fetch directly
* Automatic caching and invalidation handled by TanStack Query

---

## API Layer Conventions

* One module per resource

* Consistent method naming:
  * getAll, getById, getBySlug, create, update, patch, delete
  * TanStack Query hooks: useXList, useX, useXBySlug, useCreateX, useUpdateX, etc.

* Query keys centralized in `queryKeys.js`

* Base URL provided via `VITE_API_URL`

* Automatic cache invalidation on mutations

---

## Error Handling Strategy

* Network & server errors handled in `client.js`
* Errors propagated as `Error` objects
* Displayed using `ErrorMessage` component

---

## Loading & Empty States

* Full-page loading: `Loading` component
* Component-level loading: TanStack Query `isLoading` state
* Empty data: `EmptyState` component
* Background refetching handled automatically

---

## Routing

* Uses `createBrowserRouter`
* Layout rendered via `<Outlet />`
* No `{children}` pattern for routes
* **Slug-based routing**: Detail pages use `:slug` param (e.g., `/classes/:slug`, `/news/:slug`, `/gallery/:slug`)
* Static pages mapped via Page slugs (e.g., `/aboutus` → AboutPage)

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
