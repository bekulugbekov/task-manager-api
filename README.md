# Task Manager — Backend API

A RESTful API for a task management application. Users can register, create projects, and manage tasks within each project — including file uploads per task.

**Live API:** [task-manager-api-jdbr.onrender.com](https://task-manager-api-jdbr.onrender.com)  
**Swagger docs:** [task-manager-api-jdbr.onrender.com/api-docs](https://task-manager-api-jdbr.onrender.com/api-docs/)

---

## Features

- **Authentication** — Register / login with JWT access tokens; passwords hashed with bcrypt
- **Projects** — Create, list, and delete projects (owner-only access)
- **Tasks** — Create, list, update status, and delete tasks; optional image upload per task
- **Authorization** — All project and task routes protected by JWT middleware
- **Validation** — Request validation with express-validator
- **Error handling** — Centralized error middleware with structured JSON responses
- **API docs** — Interactive Swagger UI at `/api-docs`

## Tech Stack

| | |
|--|--|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB Atlas + Mongoose |
| Auth | JSON Web Token + bcrypt |
| File upload | express-fileupload |
| Validation | express-validator |
| Docs | Swagger UI (swagger-jsdoc) |
| Deployment | Render |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas connection string (or local MongoDB)

### Installation

```bash
git clone https://github.com/bekulugbekov/task-manager-api.git
cd task-manager-api
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
DB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/task-manager
JWT_ACCESS_SECRET=your_jwt_secret_key
```

### Run

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

API is available at `http://localhost:5000`.

## API Endpoints

### Auth — `/api/auth`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/auth/register` | Create new account | — |
| POST | `/auth/login` | Login, receive access token | — |

### Projects — `/api/projects`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/projects` | Get all user's projects | Required |
| POST | `/projects` | Create a project | Required |
| DELETE | `/projects/:id` | Delete a project | Required |

### Tasks — `/api/projects/:projectId/tasks`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/projects/:projectId/tasks` | Get all tasks in a project | Required |
| POST | `/projects/:projectId/tasks` | Create a task (+ optional image) | Required |
| PUT | `/tasks/:id` | Update task status | Required |
| DELETE | `/tasks/:id` | Delete a task (+ its image) | Required |

### Task Status Values

| Value | Meaning |
|-------|---------|
| `todo` | Not started (default) |
| `doing` | In progress |
| `done` | Completed |

## Project Structure

```
src/
├── controllers/
│   ├── auth.controller.js
│   ├── project.controller.js
│   └── task.controller.js
├── services/
│   ├── auth.service.js
│   ├── project.service.js
│   ├── task.service.js
│   └── file.service.js
├── models/
│   ├── user.model.js
│   ├── project.model.js
│   └── task.model.js
├── routes/
│   ├── auth.route.js
│   └── index.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validator.middleware.js
├── errors/
│   └── base.error.js
└── swagger.js
server.js
```

## Deployment

Deployed as a **Web Service** on [Render](https://render.com).

| Setting | Value |
|---------|-------|
| Start command | `npm start` |
| Branch | `main` |

Environment variables (`DB_URL`, `JWT_ACCESS_SECRET`, `PORT`) are set in the Render dashboard. Every push to `main` triggers an automatic redeploy.

## Related

[task-manager-frontend](https://github.com/bekulugbekov/task-manager-frontend) — React 19 + Vite frontend
