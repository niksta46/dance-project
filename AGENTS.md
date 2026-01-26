# AGENTS.md

This file provides guidelines for agentic coding agents working in this repository. It includes build, lint, test commands, and code style guidelines to ensure consistency across the codebase. 

## Repository Structure

- `dance_backend/`: Django backend with REST API using Django REST Framework
- `dance_frontend/`: React frontend built with Vite
- `venv/`: Python virtual environment (in dance_backend/)
- `db.sqlite3`: SQLite database

## Build, Lint, and Test Commands

### Backend (Django)

**Run Development Server:**
```bash
cd dance_backend
source venv/bin/activate
python manage.py runserver
```

**Create Migrations:**
```bash
cd dance_backend
source venv/bin/activate
python manage.py makemigrations
```

**Apply Migrations:**
```bash
cd dance_backend
source venv/bin/activate
python manage.py migrate
```

**Run All Tests:**
```bash
cd dance_backend
source venv/bin/activate
python manage.py test
```

**Run Single Test:**
```bash
cd dance_backend
source venv/bin/activate
python manage.py test my_app.tests.TestClass.test_method
```
Replace `my_app`, `TestClass`, and `test_method` with the actual app name, test class, and test method.

**Linting (Recommended Tools):**
Install Black, isort, and flake8:
```bash
cd dance_backend
source venv/bin/activate
pip install black isort flake8
```

**Format Code with Black:**
```bash
cd dance_backend
source venv/bin/activate
black .
```

**Sort Imports with isort:**
```bash
cd dance_backend
source venv/bin/activate
isort .
```

**Lint with flake8:**
```bash
cd dance_backend
source venv/bin/activate
flake8 .
```

### Frontend (React/Vite)

**Run Development Server:**
```bash
cd dance_frontend
npm run dev
```

**Build for Production:**
```bash
cd dance_frontend
npm run build
```

**Lint Code:**
```bash
cd dance_frontend
npm run lint
```

**Test (if configured):**
```bash
cd dance_frontend
npm test
```

**Run Single Test (Jest):**
```bash
cd dance_frontend
npm test -- --testNamePattern="test name"
```
Or use:
```bash
cd dance_frontend
npm test path/to/test/file.test.js
```

**Install Dependencies:**
```bash
cd dance_frontend
npm install
```

## Code Style Guidelines

### General Principles

- Follow consistent naming conventions.
- Use descriptive names for variables, functions, classes, and files.
- Write self-documenting code with clear comments where necessary.
- Avoid magic numbers; use constants.
- Handle errors gracefully with appropriate logging or user feedback.
- Keep functions and methods short and focused on a single responsibility.
- Use version control best practices: commit often, write meaningful commit messages.

### Backend (Django/Python)

**Formatting:**
- Use Black for code formatting with default settings.
- Line length: 88 characters (Black default).
- Indentation: 4 spaces.

**Imports:**
- Use isort for import sorting.
- Standard library imports first, then third-party, then local imports.
- One import per line.
- Avoid wildcard imports (`from module import *`).

**Naming Conventions:**
- Classes: PascalCase (e.g., `MyModel`)
- Functions/Methods: snake_case (e.g., `my_function`)
- Variables: snake_case (e.g., `my_variable`)
- Constants: UPPER_SNAKE_CASE (e.g., `MY_CONSTANT`)
- Files: snake_case (e.g., `my_module.py`)
- URLs: kebab-case in URL patterns (e.g., `my-page/`)

**Type Hints:**
- Use type hints for function parameters and return types where possible.
- Example: `def my_function(param: int) -> str:`

**Error Handling:**
- Use try-except blocks for potential exceptions.
- Log errors using Django's logging framework.
- Raise appropriate exceptions (e.g., `ValidationError` for invalid data).

**Models:**
- Use verbose names and help texts.
- Define `__str__` methods.
- Use Meta classes for ordering, verbose names, etc.
- Follow Django's model field best practices.

**Views and Serializers:**
- Use DRF's class-based views and serializers.
- Validate input data.
- Return appropriate HTTP status codes.
- Use pagination for list views.

**Security:**
- Never commit secrets; use environment variables.
- Validate and sanitize user input.
- Use Django's built-in authentication and permissions.

**Testing:**
- Write unit tests for models, views, and serializers.
- Use Django's TestCase.
- Mock external dependencies.
- Aim for high test coverage.

### Frontend (React/JavaScript)

**Formatting:**
- Use Prettier for consistent formatting.
- Configure Prettier in `.prettierrc` if needed.
- Line length: 80-100 characters.

**Imports:**
- Use ES6 imports.
- Group imports: React, third-party libraries, then local components/utilities.
- Use absolute imports with aliases (e.g., `@/components`).

**Naming Conventions:**
- Components: PascalCase (e.g., `MyComponent`)
- Functions: camelCase (e.g., `myFunction`)
- Variables: camelCase (e.g., `myVariable`)
- Constants: UPPER_SNAKE_CASE or camelCase
- Files: PascalCase for components (e.g., `MyComponent.jsx`), camelCase for utilities.

**JSX:**
- Use self-closing tags for components without children.
- Use descriptive prop names.
- Avoid inline styles; use CSS modules or styled-components.

**State Management:**
- Use React hooks (useState, useEffect, etc.) for local state.
- For global state, consider Context API or Redux if needed.
- Avoid prop drilling; use composition.

**Error Handling:**
- Use try-catch in async functions.
- Display user-friendly error messages.
- Use React Error Boundaries for component errors.

**Performance:**
- Memoize expensive computations with useMemo.
- Use useCallback for event handlers.
- Optimize renders with React.memo.
- Lazy load components and images.

**Testing:**
- Use Jest and React Testing Library.
- Write unit tests for components and hooks.
- Mock API calls.
- Test user interactions.

**Accessibility:**
- Use semantic HTML.
- Add alt text to images.
- Ensure keyboard navigation.
- Use ARIA attributes where needed.

### Version Control

- Use Git for version control.
- Branch naming: feature/feature-name, bugfix/bug-name, etc.
- Commit messages: "Add feature X" or "Fix bug Y".
- Pull requests: Provide descriptions, link to issues.

### Documentation

- Use docstrings for Python functions and classes.
- Comment complex logic.
- Maintain a README.md with setup and usage instructions.
- Use JSDoc for JavaScript functions.

### Tools and Dependencies

- Backend: Django 6.0.1, DRF, Pillow
- Frontend: React 19, Vite, ESLint
- Python: 3.12
- Node.js: As per package.json

Always check package.json and requirements.txt for exact versions.

## Cursor Rules

No Cursor rules found in .cursor/rules/ or .cursorrules.

## Copilot Rules

No Copilot instructions found in .github/copilot-instructions.md.

## Project Status

### Backend (Django REST API)

**Models (Completed):**
- `Page`: Basic page content with auto-order functionality
- `ClassSection`: Dance class information (name, description, age group, level, schedule)
- `NewsPost`: News/blog posts with image support
- `ContactMessage`: Contact form submissions
- `SocialLink`: Social media links
- `MediaItem`: Photo/video gallery with type validation

**Serializers (Completed):**
- All models have ModelSerializers with field-level validation
- Validation strategy: Minimal essential validation (normalize data, enforce business rules)
- PageSerializer: Slug normalization
- ClassSectionSerializer: Basic field stripping
- NewsPostSerializer: Field stripping and slug normalization  
- ContactMessageSerializer: Email normalization
- SocialLinkSerializer: URL format validation
- MediaItemSerializer: Object-level validation for media type consistency

**Views (Completed):**
- APIView pattern (not ViewSets) - logic-free views
- Complete CRUD operations for all models
- Separate list and detail view classes
- Proper HTTP status codes and error handling

**API Endpoints (Completed):**
```
/api/pages/ (GET, POST) & /api/pages/<id>/ (GET, PUT, PATCH, DELETE)
/api/class-sections/ (GET, POST) & /api/class-sections/<id>/ (GET, PUT, PATCH, DELETE)
/api/news-posts/ (GET, POST) & /api/news-posts/<id>/ (GET, PUT, PATCH, DELETE)
/api/contact-messages/ (GET, POST) & /api/contact-messages/<id>/ (GET, PUT, PATCH, DELETE)
/api/social-links/ (GET, POST) & /api/social-links/<id>/ (GET, PUT, PATCH, DELETE)
/api/media-items/ (GET, POST) & /api/media-items/<id>/ (GET, PUT, PATCH, DELETE)
```

**Tests (Completed):**
- Comprehensive test files using DRF APITestCase
- One test file per model in `my_app/tests/`
- Coverage: CRUD operations, validation, error handling, business logic
- Test files: `test_page_api.py`, `test_class_section_api.py`, `test_news_post_api.py`, `test_contact_message_api.py`, `test_social_link_api.py`, `test_media_item_api.py`

**Database (Completed):**
- Migrations created and applied
- SQLite database with all tables
- Auto-order functionality implemented in Page model

**File Structure (Completed):**
- Media folders: `media/`, `media/news/`, `media/media/photos/`
- Static folders: `static/`, `static/css/`, `static/js/`, `static/images/`
- Templates folder: `templates/`
- All directories tracked with `.gitkeep` files

**Not Yet Implemented:**
- Pagination: Not implemented (simple list returns)
- Filtering: Not implemented (basic queryset only)
- Search: Not implemented 
- Permissions: Not implemented (no authentication/authorization)
- File upload handling: Basic DRF setup, needs frontend integration

## Additional Notes

- For database changes, always create and apply migrations.
- Test changes locally before committing.
- Use the virtual environment for Python dependencies.
- Keep dependencies up to date and audit for security vulnerabilities.
- Follow the principle of least privilege in API designs.

## Project Status (High Level)
- Backend API completed (models, serializers, views, urls, tests)
- Backend is considered stable unless frontend requires changes
- Frontend development starting now

## Backend Rules
- Do NOT modify backend files unless explicitly instructed
- Treat backend as an external API
- Backend endpoints are documented and tested

## Frontend Scope
- Stack: React + Vite (example)
- All new work should be inside /dance_frontend
- Focus on consuming existing API endpoints
- Do not generate Django or Python code

## Frontend Architecture and Data Flow

### Backend API Contract
- **Endpoints**: 6 resources (pages, class-sections, news-posts, contact-messages, social-links, media-items)
- **Pattern**: `/api/{resource}/` (GET/POST) and `/api/{resource}/{id}/` (GET/PUT/PATCH/DELETE)
- **Response**: JSON data with Django REST Framework structure
- **Models**: Page, ClassSection, NewsPost, ContactMessage, SocialLink, MediaItem
- **Base URL**: `http://localhost:8000/api/`

### Frontend Structure
```
src/
├── api/                    # API client layer
│   ├── client.js          # Fetch wrapper with error handling
│   ├── pages.js           # Pages endpoints
│   ├── classSections.js   # Class sections endpoints
│   ├── newsPosts.js       # News posts endpoints
│   ├── contactMessages.js # Contact messages endpoints
│   ├── socialLinks.js     # Social links endpoints
│   └── mediaItems.js      # Media items endpoints
├── features/              # Feature-based organization
│   ├── pages/            # Pages feature
│   ├── news/             # News feature
│   └── classes/          # Classes feature
├── components/           # Reusable UI components
│   ├── layout/          # Layout components
│   └── common/          # Common components
├── hooks/               # Custom React hooks
│   └── useFetch.js     # Generic fetch hook
├── routes/             # Router configuration
│   └── AppRouter.jsx   # Main router
└── styles/            # Global styles
    └── global.css     # Base styles
```

### Data Flow Pattern
```
API Client (api/*.js) 
  → Custom Hook (hooks/useFetch.js) 
  → Feature Component (features/*/*.jsx) 
  → UI Component (components/*/*.jsx)
```

### API Service Layer Conventions
- Each resource = separate module (pages.js, classSections.js, etc.)
- Consistent method names: `getAll`, `getById`, `create`, `update`, `patch`, `delete`
- Centralized error handling in client.js
- Environment-based base URL via VITE_API_URL

### Error Handling Strategy
- **Network errors**: Caught in client.js, thrown as `Error` objects
- **Server errors (4xx/5xx)**: Extract `detail` field from DRF response
- **Validation errors**: DRF returns structured validation errors
- **Display**: Dedicated ErrorMessage component with contextual messaging

### Loading State Strategy
- **Global**: Loading component for full-page operations
- **Local**: Component-level loading indicators (buttons, cards)
- **States**: `loading`, `error`, `success`, `empty`
- **Hook pattern**: `useFetch` returns `{ data, loading, error }`

### Frontend Development Plan

#### Phase 1: Core Infrastructure
1. **Setup Dependencies** ✅
   - Install `react-router-dom` ✅
   - Configure VITE_API_URL environment variable ✅

2. **Core Infrastructure** ✅
   - Update main.jsx to use router ✅
   - Update App.jsx to use RouterView ✅
   - Replace index.css with styles/global.css ✅

3. **Data Layer** ✅
   - Test API client with real backend ✅
   - Add useFetch hook integration test ✅
   - Add error boundary component ⏳

#### Phase 2: Layout Foundation
1. **Layout Components** ✅
   - Create Layout.jsx with basic structure ✅
   - Create Header.jsx with navigation ✅
   - Create Footer.jsx placeholder ✅

2. **Common Components**
   - Create Loading.jsx component ⏳
   - Create ErrorMessage.jsx component ⏳
   - Create EmptyState.jsx component ⏳

#### Phase 3: Feature Implementation
1. **Pages Feature**
   - Create PagesList.jsx component
   - Create PageDetail.jsx component
   - Connect to pages API endpoint
   - Test list and detail views

2. **Additional Features**
   - Implement News feature (list/detail)
   - Implement Classes feature (list/detail)
   - Add routing between features

## Frontend Implementation Progress

### Completed Tasks (Phase 1: Core Infrastructure)

**✅ Dependencies & Configuration**
- Installed `react-router-dom` package
- Created `.env` file with `VITE_API_URL=http://localhost:8000/api`

**✅ Core Infrastructure Setup**
- Updated `main.jsx` to use `RouterProvider` from react-router-dom
- Updated `App.jsx` to use `Layout` component with `Outlet` for routing
- Replaced default `index.css` with custom `styles/global.css`
- Added ErrorBoundary component wrapped around RouterProvider for global error handling

**✅ API Layer Testing**
- Confirmed Django backend API endpoints are accessible
- Tested API client fetch logic with real backend
- Verified error handling for 404 responses
- Confirmed empty data responses work correctly

**✅ useFetch Hook Integration Testing**
- Tested hook state management pattern (`data`, `loading`, `error`)
- Verified API call logic works with Django backend
- Confirmed error handling for network/server errors
- Tested loading state transitions

### Remaining Tasks (Phase 1)
- ✅ Add error boundary component

**Phase 1 Status: COMPLETED** ✅
- All 9 tasks in Phase 1 (Core Infrastructure) are complete
- Frontend foundation is ready for Phase 2 (Layout Foundation)

### Completed Tasks (Phase 2: Layout Foundation)

**✅ Layout Components**
- Created `Layout.jsx` with basic structure and semantic HTML
- Created `Header.jsx` with navigation links (Home, Pages, Classes, News)
- Created `Footer.jsx` placeholder with copyright and legal links
- Updated `AppRouter.jsx` to wrap all routes with Layout component
- Simplified `App.jsx` since Layout is handled at router level

### Remaining Tasks (Phase 2)
- ⏳ Create Loading.jsx component
- ⏳ Create ErrorMessage.jsx component
- ⏳ Create EmptyState.jsx component

## Current Frontend Goals
- ✅ Implement core infrastructure and data flow
- 🚧 Create layout and common components (3/6 complete) 
- ⏳ Implement Pages feature as proof of concept
- ✅ Establish error handling and loading patterns

This document should be updated as the codebase evolves.
