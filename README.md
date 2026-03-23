# News App

A full-stack news application with a React frontend and Node.js backend.

## Project Structure

```
news-app/
├── frontend/          # React + Vite app (port 5173)
├── backend/           # Node.js + Express API (port 5000)
├── package.json       # Root scripts for running both apps
└── .gitignore
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

## Getting Started

### 1. Install dependencies

```bash
npm run install:all
```

Or install individually:
```bash
cd backend && npm install
cd frontend && npm install
```

### 2. Configure environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env and add your NEWS_API_KEY

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Run both apps together

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Run individually

```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/news` | Get news articles |

## Tooling

- **ESLint** - Code linting (flat config, ESLint v9)
- **Prettier** - Code formatting
- **Nodemon** - Backend hot reload (dev)
- **Vite** - Frontend build tool + HMR

### Lint & Format

```bash
# From root
npm run lint
npm run format

# Or per-app
cd backend && npm run lint
cd frontend && npm run lint
```


# Uses of Prettier and lint:

### Summary
- Added ESLint configuration using the latest flat config approach
- Integrated Prettier for consistent code formatting
- Configured React and React Hooks linting rules
- Disabled prop-types rule as it is not used in the project
- Applied formatting fixes across the codebase

---

### Commands to Check & Fix

#### 🔍 Check lint issues
npm run lint

#### 🔧 Fix lint issues automatically
npm run lint:fix

#### 🔍 Check Prettier formatting
npx prettier --check .

#### 🔧 Fix Prettier formatting
npx prettier --write .

---

### Why ESLint?
- Helps identify code issues and potential bugs
- Enforces coding standards across the project
- Improves code quality and maintainability

---

### Why Prettier?
- Ensures consistent code formatting
- Reduces formatting-related review comments
- Improves readability of the codebase

---

### Impact
- Cleaner and more consistent code
- Reduced manual effort during code reviews
- Better developer experience and maintainability

