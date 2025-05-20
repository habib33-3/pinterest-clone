# 📌 Pinterest Clone

A full-featured Pinterest clone built with modern web technologies and a scalable **Turborepo** monorepo setup. This app allows users to explore, create, and manage pins and boards, interact through likes and comments, and connect with others via follow functionality.

---

## ✨ Features

- **Authentication**: Sign up, log in, and log out securely using JWT and cookies
- **Post Management**: Create, edit, and delete posts
- **Board Management**: Create, edit, and delete boards
- **Pin Management**: Create, edit, and delete pins
- **Comment System**: Add, edit, and delete comments on pins
- **Likes**: Like and unlike pins
- **Follow System**: Follow and unfollow other users
- **Search**: Find pins, boards, and users with dynamic search

---

## 🧩 Monorepo Structure

Powered by **Turborepo** for optimized builds and shared tooling.

```bash

.
├── apps/
│   ├── frontend/        # Frontend (React, Tailwind)
│   └── backend/        # Backend (Express, Prisma)
├── packages/
│   ├── ui/         # Shared UI components (optional)
│   └── config/     # Shared configs (eslint, tsconfig, etc.)
├── turbo.json
└── README.md

```

## 🛠️ Technologies Used

### 📦 Languages & Tooling

- **TypeScript**
- **ESLint** – for code linting
- **Prettier** – for code formatting
- **Husky** – for Git hooks (pre-commit)
- **lint-staged** – for running linters on staged files

### 💻 Frontend

- React
- React Router
- Shadcn UI
- Tailwind CSS
- Zustand (state management)

### 🧠 Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### 🔐 Authentication

- JWT
- argon2
- cookie-parser

### 🖼️ Media Handling

- ImageKit (image uploads and optimization)

### 📦 Monorepo Tooling

- Turborepo

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/habib33-3/pinterest-clone
```

```bash
cd pinterest-clone
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Copy `.env.example` into `.env` files in both frontend and backend:

```bash
cp apps/frontend/.env.example apps/frontend/.env
cp apps/backend/.env.example apps/backend/.env

```

### 4. Run the App

```bash
pnpm dev
```

## 📸 Demo

- **Live Site**: _Coming soon..._
- **Screenshots**: Add GIFs or images of UI/UX

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Contact

- **Portfolio**: [https://habibur-rahman-snowy.vercel.app](https://habibur-rahman-snowy.vercel.app)
- **Email**: [habib.rahman0330@gmail.com](mailto:habib.rahman0330@gmail.com)
- **GitHub**: [@habib33-3](https://github.com/habib33-3)

---
