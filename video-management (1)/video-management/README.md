# Video Management Module

URL-based admin video management module.

## Features
- One active main landing-page video.
- Multiple carousel videos.
- Admin can add, edit, delete, hide/show, and reorder carousel videos.
- Stores video URLs and optional thumbnail URLs in MongoDB.
- No video files are uploaded to the backend.
- Public API for landing-page content.
- Admin API protected by `x-admin-key` in this standalone demo.

## Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set `MONGO_URI`, `PORT`, and `ADMIN_API_KEY` in `.env`.

## Frontend
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Set `VITE_API_URL=http://localhost:5000/api` and `VITE_ADMIN_API_KEY` to the same key as the backend.

## API
### Public
- `GET /api/videos/main`
- `GET /api/videos/carousel`

### Admin
- `PUT /api/admin/videos/main`
- `GET /api/admin/videos/carousel?admin=true`
- `POST /api/admin/videos/carousel`
- `PUT /api/admin/videos/carousel/:id`
- `DELETE /api/admin/videos/carousel/:id`
- `PATCH /api/admin/videos/carousel/:id/status`
- `PATCH /api/admin/videos/carousel/reorder`

Example main video body:
```json
{
  "videoUrl": "https://cdn.example.com/main.mp4",
  "thumbnailUrl": "https://cdn.example.com/main.jpg"
}
```

Example carousel body:
```json
{
  "title": "Product Demo",
  "description": "See how the product works.",
  "videoUrl": "https://cdn.example.com/demo.mp4",
  "thumbnailUrl": "https://cdn.example.com/demo.jpg",
  "isActive": true
}
```
