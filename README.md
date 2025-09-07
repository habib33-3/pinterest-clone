# 📌 Pinterest Clone

A full-featured Pinterest clone built with modern web technologies in a **Turborepo** monorepo setup. Explore, create, and manage pins and boards, interact with others through likes, comments, and follows, and enjoy a responsive and scalable web application.

---

## ✨ Features

- **Authentication**: Sign up, log in, and log out securely using JWT and cookies.
- **Post Management**: Create, edit, and delete posts.
- **Board Management**: Create, edit, and delete boards.
- **Pin Management**: Add, edit, and delete pins.
- **Comments**: Add, edit, and delete comments on pins.
- **Likes**: Like and unlike pins.
- **Follow System**: Follow and unfollow other users.
- **Search**: Dynamic search for pins, boards, and users.

---

## 🧩 Monorepo Structure

Built with **Turborepo** for optimized builds and shared tooling:

```bash
.
├── apps/
│   ├── frontend/        # Frontend (React, Tailwind)
│   └── backend/         # Backend (Express, Prisma)
├── packages/
│   ├── ui/              # Shared UI components
│   └── config/          # Shared configs (eslint, tsconfig, etc.)
├── turbo.json
└── README.md
```

---

## 🛠️ Technologies Used

### 📦 Languages & Tooling

- TypeScript, ESLint, Prettier, Husky, lint-staged

### 💻 Frontend

- React, React Router, Shadcn UI, Tailwind CSS, Zustand

### 🧠 Backend

- Node.js, Express.js, Prisma ORM, PostgreSQL

### 🔐 Authentication

- JWT, argon2, cookie-parser

### 🖼️ Media Handling

- ImageKit for image uploads and optimization

### 📦 Monorepo Tooling

- Turborepo

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/habib33-3/pinterest-clone
cd pinterest-clone
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` for both frontend and backend:

```bash
cp apps/frontend/.env.example apps/frontend/.env
cp apps/backend/.env.example apps/backend/.env
```

### 4. Generate Prisma Client

```bash
pnpm db:generate
```

### 5. Push Prisma Schema (optional)

```bash
pnpm db:push
```

### 6. Seed the Database

```bash
pnpm seed
```

### 7. Run the App (Development Mode)

```bash
pnpm dev
```

---

## 🐳 Docker Setup

Run the entire stack with Docker Compose:

```bash
docker compose up -d
```

### Seed the database inside Docker

```bash
docker compose exec backend sh -c "DATABASE_URL=postgresql://postgres:admin@db:5432/pinterest-clone NODE_ENV=development pnpm i && node dist/db/seed.js"
```

This sets up:

- Backend → `http://localhost:5000`
- Frontend → `http://localhost:8080`
- PostgreSQL database → accessible internally via Docker network

---

## 📸 Demo Credentials

**Email:** `user@email.com`
**Password:** `password`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Contact

- **Portfolio**: [https://habibur-rahman-snowy.vercel.app](https://habibur-rahman-snowy.vercel.app)
- **Email**: [habib.rahman0330@gmail.com](mailto:habib.rahman0330@gmail.com)
- **GitHub**: [@habib33-3](https://github.com/habib33-3)
