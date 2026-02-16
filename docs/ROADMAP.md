# Frontend Roadmap

## Purpose

This file defines **where the project is going next**.

⚠️ **Update Rule**

* This file **will be updated continuously** by the project owner
* Agents must follow this file as the authoritative plan

---

## Phase 4: Feature Implementation (CURRENT)

### Goal

Expose backend content through the frontend using existing architecture and design system.

---

### Step 1: Pages Feature

* [x] Create `PagesList.jsx`
* [x] Connect to pages API
* [x] Handle loading / error / empty states
* [x] Add routes

---

### Step 2: News Feature

* [x] News list page
* [x] News detail page
* [x] Image rendering

---

### Step 3: Classes Feature

* [x] Classes list page
* [x] Classes detail page
* [x] Schedule & metadata display

---

## Definition of Done

* All features reachable from navigation
* No backend changes required
* Consistent UI and error handling

---

## Phase 5: Mobile Responsiveness

### Goal

Ensure the website is fully functional and visually appealing on mobile devices.

### Tasks

* [x] Analyze existing components for responsiveness issues
* [x] Check navigation / header behavior on mobile
* [x] Verify cards, images, and layouts adapt to different screen sizes
* [x] Test specific breakpoints (mobile < 640px, tablet 640-1024px, desktop > 1024px)

### Identified Issues & Fixes Required

**PagesList.jsx** (Priority: High)
- [ ] Change `flex h-[500px]` to stack vertically on mobile
- [ ] Add `flex-col` on mobile, `md:flex-row` on desktop
- [ ] Change fixed height to `h-auto` or responsive `h-64 md:h-96`

**Footer text alignment** (Priority: Low)
- [ ] Center align text on mobile for better appearance

**Text sizes** (Priority: Low)
- [ ] Check if headings are too large on small screens

---

## Agent Instruction

Agents must:

* Start work from the **first unchecked step**
* Not skip roadmap steps
* Ask for clarification if roadmap and code conflict
