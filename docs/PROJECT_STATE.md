# Project State

## Purpose

This file represents the **single source of truth for the current state** of the project.

⚠️ **Update Rule**

* This file **will be updated continuously** as development progresses
* Agents may read it, but **must not modify it** unless instructed

---

## Backend Status

* Status: ✅ Complete & stable
* Models: Page (title, slug, excerpt, content, address, phone, email), ClassSection, NewsPost, ContactMessage, SocialLink, MediaItem
* API: pages (with exclude_slugs filter, slug endpoint), class-sections, news-posts, contact-messages, social-links, media-items

---

## Frontend Status

### Infrastructure

* Routing: ✅ complete
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
* Query keys configuration: ✅ complete
* API endpoint hooks: ✅ complete
* Caching and invalidation: ✅ configured

### Implemented Features

* Home page: PagesList with HeroSlider
* Pages feature (list only)
* Footer: 3-column layout (logo, contact info, social links)
* Header: sticky positioning

---

## Not Implemented Yet

* News feature (list & detail)
* Classes feature (list & detail)

---

## Known Issues

* None

---

## Agent Instruction

Before starting any work, agents **must read this file** to understand the current baseline.
