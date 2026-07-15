# dance-project

Static website for a folk dance group. Built with Django REST backend and React frontend, deployed on Vercel.

🔗 **Live demo:** [dance-project-phi.vercel.app](https://dance-project-phi.vercel.app/)

---

## Architecture

```
dance-project/
├── dance_backend/      # Django REST Framework API
└── dance_frontend/     # React + Vite SPA
```

### Backend

- **Django 6.0** + **Django REST Framework**
- Models: Pages, Class Sections, News Posts, Contact Messages, Social Links, Event Galleries, Media Items
- Full REST API with CRUD endpoints
- CORS configured for localhost and Vercel
- SQLite3 (dev) / PostgreSQL (prod)

### Frontend

- **React 19** + **Vite** + **Tailwind CSS**
- **TanStack Query** for data fetching with 5-minute cache
- **Flowbite React** components with custom theme
- **React Router** with nested layouts
- Pages: Home, Classes, News, Gallery, About, Contact

---

## Features

- 🏛️ **CMS pages** — about, contact, and info pages managed via Django admin
- 💃 **Class sections** — dance class listings with age groups, levels, and schedules
- 📰 **News & announcements** — published posts with detail views
- 🖼️ **Event galleries** — photo and video galleries
- 📬 **Contact form** — submission stored in database
- 🔗 **Social links** — configurable social media links
- 📱 **Responsive** — Tailwind CSS throughout

---

## How to Run Locally

### Backend

```bash
cd dance_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd dance_frontend
npm install
npm run dev
```

---

## License

[MIT](LICENSE)
