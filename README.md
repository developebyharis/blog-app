# Vue Blog Manager + NestJS Backend

A **full-stack blog management application** built with **Vue 3 (Composition API)** on the frontend and **NestJS** on the backend.  
It allows users to **register, login, and manage blogs (CRUD)** with authentication, search blogs, and navigate with pagination—all in a **clean, minimal, and responsive UI**.

---

## 🛠 Features

### Frontend (Vue 3)
- **Authentication**
  - Register new users.
  - Login existing users with JWT.
  - Logout functionality.
  - Protect routes based on authentication state.
- **Blog Management**
  - Add, Edit, Delete Blogs with modal forms (protected routes).
  - Search blogs dynamically by title or content.
  - Pagination for large blog lists.
- Clean, responsive UI using Tailwind CSS.
- Create personalized blogpost by each user.
- Reusable components (`BlogCard`) and composables (`useSearch.ts`).

### Backend (NestJS)
- **Authentication**
  - `POST /auth/register` – Create a new user.
  - `POST /auth/login` – Login user and return JWT token.
  - Passwords hashed using bcrypt.
  - JWT guards to protect routes (e.g., creating/updating/deleting blogs).
- **Blog Management**
  - RESTful CRUD endpoints:
    - `GET /blogs` – Get all blogs
    - `GET /blogs/me` – Get user blogs
    - `POST /blogs` – Create a new blog (authenticated)
    - `PATCH /blogs/:id` – Update blog (authenticated)
    - `DELETE /blogs/:id` – Delete blog (authenticated)
- Validation using DTOs.
- JWT-based authentication and route guards.
- Ready for integration with PostgreSQL via Prisma ORM.

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
│   ├─ auth/
│   │   ├─ auth.controller.ts
│   │   ├─ auth.service.ts
│   │   ├─ getUser.decorator.ts
│   │   ├─ jwt.auth.guard.ts
│   │   ├─ jwt.strategy.ts
│   ├─ blog/
│   │   ├─ blog.controller.ts
│   │   ├─ blog.service.ts
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
- PrimeVue components
- PrimeVue icons
- TypeScript

### Backend
- NestJS (TypeScript)
- PostgreSQL (Neon)
- Prisma ORM
- JWT (jsonwebtoken) for authentication
- bcrypt for password hashing
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

> Make sure the frontend service URLs in `services/blogService.ts` point to your NestJS backend (`http://localhost:4000/blogs`) and authentication endpoints (`/auth/login` & `/auth/register`).

---

## 🔧 Usage

1. Open the frontend in your browser.
2. Register a new account or login with an existing user.
3. Access the **Admin page** (protected route) after login.
4. Click **Add Blog** to create a blog.
5. Use **Edit** or **Delete** on blog cards.
6. Search blogs using the search bar.
7. Navigate pages using **Previous / Next** buttons.
8. Backend API can also be tested via Postman or any API client.

---

## 🔒 Authentication Flow

1. **Register**

   * User sends name, email, and password to `/auth/register`.
   * Password is hashed and stored in the database.
2. **Login**

   * User sends email and password to `/auth/login`.
   * Backend verifies credentials and returns a JWT token.
3. **Token Storage**

   * Frontend stores the token in `localStorage`.
   * Token is used in the `Authorization` header for protected API calls.
4. **Protected Routes**

   * Backend uses JWT guard to allow only authenticated users to create, update, or delete blogs.
   * Frontend checks token and route meta to restrict access.

---

## 📌 Notes

* `composables/useSearch.ts` contains reusable search and pagination logic.
* `components/BlogCard.vue` is responsive and minimal.
* Protected routes use JWT authentication and route guards.
* `utils/auth.ts` in frontend manages token decoding and authentication state.
* NestJS backend uses DTOs for validation and Prisma for database management.
* UI elements like **Add/Edit modals, user info, and logout** are fully responsive and clean.

---

## 🎨 UI Highlights

* Modal-based forms for adding/editing blogs.
* Clean card layout with subtle shadows.
* Fully responsive design for mobile and desktop.
* Minimal color palette and readable typography.
* User info and logout button are modern, compact, and visually clear.
* Pagination and search provide smooth UX.

---

## 📦 License

MIT License – free to use and modify.

---

## 🙌 Author

**Haris Khan** – [GitHub Profile](https://github.com/developebyharis) | [Portfolio](https://hariskhan.vercel.app)


