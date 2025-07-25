# SecureSight – Fullstack Developer Intern Assessment (July 2025)

This project is a technical assessment for a Fullstack Developer Intern role. The goal was to build a CCTV dashboard application for SecureSight, focusing on the core functionality of incident monitoring.

---

## 📁 .env.local

Use the following environment variables:

```env
DATABASE_URL="file:./dev.db" or your database url
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🔧 Tech Stack

* **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/), TypeScript, TailwindCSS
* **Backend**: Prisma ORM
* **Database**: SQLite (local file)
* **Other**: Optimistic UI for incident resolution

---

## 📦 Features

### ✅ Mandatory Scope

#### 🔹 API Endpoints

* `GET /api/incidents?resolved=false`: Returns unresolved incidents in newest-first order
* `PATCH /api/incidents/:id/resolve`: Toggles `resolved` status of a specific incident

#### 🔹 UI

* **Navbar**: Simple top navigation
* **Incident Player (Left Panel)**:

  * Large static video frame (GIF/MP4/image)
  * Mini-strip showing thumbnails of two other cameras
* **Incident List (Right Panel)**:

  * Thumbnail preview
  * Threat type icon
  * Camera location
  * Start–end time
  * "Resolve" button with fade-out (optimistic UI)

---

## 🧪 Data Model

### 📷 Camera

```ts
{
  id: string;
  name: string;
  location: string;
}
```

### ⚠️ Incident

```ts
{
  id: string;
  cameraId: string;
  type: string;
  tsStart: Date;
  tsEnd: Date;
  thumbnailUrl: string;
  resolved: boolean;
}
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/secure-sight.git
cd secure-sight
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment

Create a `.env.local` file in the root directory and add:

```env
DATABASE_URL="file:./dev.db" or your database url
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Set Up Database

```bash
npx prisma db push --force-reset
npx tsx prisma/seed.ts
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to view the application.

---

## 📦 Deployment

You can deploy this project using platforms like Vercel or Netlify. Make sure to set the same environment variables in the deployment environment.

---
