
# Vue Blog Manager + NestJS Backend

A **full-stack blog management application** built with **Vue 3 (Composition API)** on the frontend and **NestJS** on the backend.  
It allows users to **create, read, update, delete (CRUD) blogs**, search blogs, and navigate with pagination—all in a **clean, minimal, and responsive UI**.

---

## 🛠 Features

### Frontend (Vue 3)
- Add, Edit, Delete Blogs with modal forms.
- Search blogs dynamically by title or content.
- Pagination for large blog lists.
- Clean, responsive UI using Tailwind CSS.
- Reusable components (`BlogCard`) and composables (`useSearch.ts`).

### Backend (NestJS)
- RESTful API for managing blogs.
- CRUD endpoints:
  - `GET /blogs` – Get all blogs
  - `POST /blogs` – Create a new blog
  - `PATCH /blogs/:id` – Update blog
  - `DELETE /blogs/:id` – Delete blog
- Validation using DTOs.
- Ready for integration with any database (currently using in-memory or mock data).

---

## 📂 Project Structure

```

frontend/
├─ src/
│   ├─ assets/
│   ├─ components/
│   ├─ composables/
│   ├─ services/
│   ├─ views/
│   └─ App.vue

backend/
├─ src/
│   ├─ blog/
│   │   ├─ blog.controller.ts
│   │   ├─ blog.service.ts
│   │   └─ dto/
│   ├─ db/
│   │   ├─ prisma.module.ts
│   │   ├─ prisma.service.ts
│   │   └─ dto/
│   ├─ main.ts
│   └─ app.module.ts

````

---

## 💻 Technologies Used

### Frontend
- Vue 3 (Composition API)
- Vue Router
- Tailwind CSS
- TypeScript

### Backend
- NestJS (TypeScript)
- PostgreSQL (Neon)
- Prisma ORM
- class-validator for DTO validation

---

## 🚀 Installation & Setup

### 1. Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
````

The backend runs at `http://localhost:4000`.

### 2. Frontend (Vue 3)

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

> Make sure the frontend service URLs in `services/blogService.ts` point to your NestJS backend (`http://localhost:4000/blogs`).

---

## 🔧 Usage

* Open the frontend in your browser.
* Click **Add Blog** to create a blog.
* Use **Edit** or **Delete** on blog cards.
* Search blogs using the search bar.
* Navigate pages using **Previous / Next** buttons.
* Backend API can also be tested via Postman or any API client.

---

## 📌 Notes

* `composables/useSearch.ts` contains reusable search and pagination logic.
* `components/BlogCard.vue` is responsive and minimal.
* NestJS backend uses DTOs for validation and can be connected to a database.
* Can be deployed separately or together as a full-stack app.

---

## 🎨 UI Highlights

* Modal-based forms for adding/editing blogs.
* Clean card layout with subtle shadows.
* Fully responsive design for mobile and desktop.
* Minimal color palette and readable typography.

---

## 📦 License

MIT License – free to use and modify.

---

## 🙌 Author

**Haris Khan** – [GitHub Profile](https://github.com/developebyharis) | [Portfolio](https://hariskhan.vercel.app)

```