# Project State

## Purpose

This file represents the **single source of truth for the current state** of the project.

⚠️ **Update Rule**

* This file **will be updated continuously** as development progresses
* Agents may read it, but **must not modify it** unless instructed

---

## Backend Status

* Status: ✅ Complete & stable
* Models:
  * Page (title, slug, excerpt, content, address, phone, email)
  * ClassSection (name, slug, excerpt, description, age_group, level, schedule, is_active)
  * NewsPost (title, slug, body, image, published_at, is_published)
  * ContactMessage, SocialLink
  * MediaItem (media_type, title, image, video_url, event ForeignKey)
  * EventGallery (title, slug, excerpt, created_at, is_published) - NEW
* API endpoints:
  * pages (with exclude_slugs filter, slug endpoint)
  * class-sections (list, detail, slug endpoint) - UPDATED
  * news-posts (list, detail, slug endpoint) - UPDATED
  * event-galleries (list, detail, slug endpoint) - NEW
  * media-items, contact-messages, social-links

---

## Frontend Status

### Infrastructure

* Routing: ✅ complete (slug-based routing)
* Layout (Header - sticky, Footer - 3 columns, Layout): ✅ complete
* Common components: ✅ complete
* Error handling: ✅ complete
* Data fetching: ✅ complete (TanStack Query)

### Design System

* Tailwind configuration: ✅ complete
* Flowbite theme overrides: ✅ complete
* Design utilities: ✅ complete

### Data Fetching Architecture

* TanStack Query: ✅ implemented
* Query client setup: ✅ complete
* Query keys configuration: ✅ complete (centralized in queryKeys.js)
* API endpoint hooks: ✅ complete
* Caching and invalidation: ✅ configured

### Implemented Features

* Home page: PagesList with HeroSlider
* Pages feature: slug-based navigation to corresponding pages
* Classes feature: ClassList, ClassDetail with slug routing - NEW
* News feature: NewsList, NewsDetail with slug routing - NEW
* Gallery feature: GalleryList, GalleryDetail with slug routing - NEW
* About page: AboutPage - NEW
* Footer: 3-column layout (logo, contact info, social links)
* Header: sticky positioning with navigation links

---

## Not Implemented Yet

* None - all major features implemented

---

## Known Issues

* None

---

## Deployment

* Status: In progress
* Platforms: Vercel (frontend) + Render (backend + PostgreSQL)
* Progress: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Agent Instruction

Before starting any work, agents **must read this file** to understand the current baseline.
