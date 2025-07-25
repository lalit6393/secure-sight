# SecureSight – Fullstack Developer Intern Assessment (July '25)

This project is a technical assessment for a Fullstack Developer Intern role. The goal was to build a CCTV dashboard application for SecureSight, focusing on the core functionality of incident monitoring.

---

## 🔧 Tech Stack

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/), TypeScript, TailwindCSS
- **Backend**: Prisma ORM
- **Database**: SQLite (local file)
- **Other**: Optimistic UI for incident resolution

---

## 📦 Features

### ✅ Mandatory Scope

#### 🔹 API Endpoints

- `GET /api/incidents?resolved=false`: Returns unresolved incidents in newest-first order
- `PATCH /api/incidents/:id/resolve`: Toggles `resolved` status of a specific incident

#### 🔹 UI

- **Navbar**: Simple top navigation
- **Incident Player (Left Panel)**:
  - Large static video frame (GIF/MP4/image)
  - Mini-strip showing thumbnails of two other cameras
- **Incident List (Right Panel)**:
  - Thumbnail preview
  - Threat type icon
  - Camera location
  - Start–end time
  - "Resolve" button with fade-out (optimistic UI)

---

## 🧪 Data Model

### 📷 Camera

```ts
{
  id: string;
  name: string;
  location: string;
}
