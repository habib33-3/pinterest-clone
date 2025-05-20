# 🧠 Backend – Pinterest Clone

This is the backend service for the Pinterest Clone. It handles core functionality such as authentication, pins, boards, comments, likes, follows, and search using a RESTful API built with **Express**, **Prisma**, and **PostgreSQL**.

---

## 🛠️ Technology Stack

* **Node.js** — JavaScript runtime environment
* **Express** — Web framework for building RESTful APIs
* **TypeScript** — Typed superset of JavaScript for improved developer experience
* **Prisma** — ORM for PostgreSQL with type-safe database access
* **PostgreSQL** — Relational database management system
* **Argon2** — Password hashing algorithm for secure authentication
* **JWT (JSON Web Tokens)** — Authentication tokens stored in HTTP-only cookies
* **ImageKit SDK** — Media upload and optimization service
* **Zod** — Schema validation for request data
* **Helmet** — Security middleware for setting HTTP headers
* **express-rate-limit** — Rate limiting middleware to prevent abuse
* **ESLint & Prettier** — Code linting and formatting tools

---

## 📁 Project Structure

```bash
apps/backend/
├── prisma/                # Prisma schema and migrations
├── src/
│   ├── app/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic and service layer
│   │   ├── validations/    # Request validation schemas
│   │   └── constants/      # App constants
│   ├── config/             # Configuration files
│   ├── db/                 # Database connection setup
│   ├── errors/             # Custom error classes and handlers
│   ├── lib/                # Library/helper functions
│   ├── middlewares/        # Express middlewares (auth, error handling, etc.)
│   ├── shared/             # Shared utilities or types across the app
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions (including logging)
│   └── server.ts           # Entry point of the application
├── dist/                   # Compiled output
├── eslint.config.mjs       # ESLint configuration
├── lint-staged.config.mjs  # Git pre-commit hooks config
├── node_modules/
├── package.json
├── prettier.config.mjs     # Prettier configuration
├── README.md
└── tsconfig.json           # TypeScript configuration
```

---

## 🧬 Environment Variables

Create a `.env` file in the `apps/backend` folder using the example below:

```env
# App
PORT=5000

# Security
JWT_SECRET=your_jwt_secret_key
TOKEN_EXPIRATION=1d

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/database_name

# CORS
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com

# ImageKit (media handling)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Rate Limiting & Uploads
RATE_LIMIT_WINDOW_MS=900000
MAX_REQUESTS=100
MAX_FILE_SIZE=5242880

# Cookie
COOKIE_NAME=your_cookie_name
```

> ⚠️ Never commit your `.env` file. Keep secrets safe and secure.

---

## 🔐 Authentication

* Passwords are hashed securely with **Argon2**.
* JWT tokens are signed and stored in **HTTP-only cookies**.
* Middleware verifies token validity and user identity for protected routes.

---

## 🛡️ Security & Middleware Details

* **Rate Limiting:**
  Implemented using `express-rate-limit` to protect against brute-force and DDoS attacks. Limits requests per IP based on environment variables (`RATE_LIMIT_WINDOW_MS`, `MAX_REQUESTS`).

* **File Uploads & Media Handling:**
  Image uploads are managed with **ImageKit SDK**, ensuring efficient and secure media storage and delivery. Upload size is restricted to `MAX_FILE_SIZE` from environment settings.

* **Error Handling:**
  Centralized error handling middleware captures and formats errors consistently, returning JSON responses with appropriate HTTP status codes and error messages. Custom error classes extend native errors for fine-grained control.

* **Security Middleware:**
  The backend uses `helmet` to set secure HTTP headers, enhancing protection against common vulnerabilities. JWT tokens are stored in HTTP-only cookies to prevent XSS access. CORS policy is enforced based on configured origins (`CORS_ORIGINS`).

* **Environment Security:**
  Sensitive keys and secrets are stored securely in `.env` (excluded from version control). Make sure never to commit `.env` files or secrets to public repositories.

---

## 📦 Features Handled by Backend

* CRUD operations for Pins, Boards, and Comments
* Follow/Unfollow users
* Like/Unlike pins
* User authentication & authorization
* Image uploads via **ImageKit**
* Rate limiting
* CORS policy enforcement
* Centralized logging utility/middleware implemented
* Request validation using Zod

---

## 🧠 Prisma & Database

* Database: **PostgreSQL**
* ORM: **Prisma**

### Useful Commands

```bash
# Seed the database
pnpm seed

# Generate Prisma Client
pnpm dlx prisma generate

# Apply migrations (development)
pnpm dlx prisma migrate dev --name init
```

---

## 📌 To Do

* [ ] Add API documentation (Swagger/Postman)
* [ ] Expand test coverage and integration tests
