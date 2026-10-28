# Student Records - React CRUD Operation

A clean, responsive React CRUD application styled with **Tailwind CSS**, based directly on the tutorial **"CRUD Operation using React - Create | Read | Update | Delete"** by **Step by Step (Khaiser Khanam)**.

## Features
- **Student Records Dashboard**: Table with columns `SL NO`, `NAME`, `PLACE`, `PHONE`, and `ACTIONS`.
- **Create**: Add a new student record via form (`/student/create`).
- **Read / View**: Inspect single student details (`/student/view/:id`).
- **Update / Edit**: Edit existing student records (`/student/edit/:id`).
- **Delete**: Remove student records with confirmation dialog.
- **Tailwind CSS**: Matching color scheme, typography, and layout from the tutorial screenshot.
- **Out-of-the-box Ready**: Works immediately using browser storage fallback with the initial 4 student records, and seamlessly connects to `json-server` when running.

## Getting Started

### 1. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 2. (Optional) Run JSON Server
To use the mock REST API backend:
```bash
npm run server
```
This runs `json-server` on `http://localhost:8000/students` with `db.json`.
