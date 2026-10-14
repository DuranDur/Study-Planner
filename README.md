# Study Planner

A full-stack study planning app that tells you what to study first. Log your courses, add assignments and exams, and the app ranks everything by deadline urgency, priority level, and exam importance — so you always know where your study hours should go.

## Features

- **Course tracking** — add courses with name, instructor, and credit hours
- **Assignments & exams** — two task types with their own fields:
  - Assignments carry estimated hours
  - Exams carry topics and an importance rating
- **Smart prioritization** — every task gets a priority score computed from:
  - Priority level (Low → Critical)
  - Urgency from days until due (overdue and due-soon tasks bubble up)
  - Exam importance (exams get an extra weight)
- **Task management** — statuses (Not Started / In Progress / Done), plus filtering by course, status, and priority
- **Overdue & upcoming views** — quickly see what's late and what's coming up
- **Web UI** — clean "Study Ledger" frontend for logging courses and tasks

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Language | TypeScript (strict mode, ES2022)        |
| Backend  | Node.js, Express 5                      |
| Frontend | HTML, CSS                               |
| Runtime  | tsx (dev), tsc-compiled JS (prod)       |

## Project Structure

```
Study-Planner/
├── TS/                  # TypeScript source
│   ├── server.ts        # Express app entry point, middleware, /api mounting
│   ├── route.ts         # API routes (/api/tasks)
│   ├── app.ts           # Domain model + prioritization engine
│   └── index.d.ts       # Shared type declarations
├── JS/                  # Compiled output (tsc) — generated, not hand-edited
├── index.html           # Frontend — "Study Ledger" UI
├── CSS/
│   └── index.css        # Frontend styles
├── package.json
└── tsconfig.json
```

## How Prioritization Works

Each task is scored and sorted highest-first:

```
score = priorityLevelScore + urgencyScore (+ importance for exams)
```

- **Priority level score** — Critical: 4, High: 3, Medium: 2, Low: 1
- **Urgency score** — Overdue: 4, due within 2 days: 3, due within a week: 2, otherwise: 1
- **Exam importance** — added on top for exams, so high-stakes exams rank above routine assignments

Supporting helpers in `TS/app.ts`: `sortByDueDate`, `taskSort`, `taskOverDue`, `isUpcoming`, `filterByCourse`, `filterByStatus`, `filterByPriority`.

## Getting Started

**Requirements:** Node.js 18+

```bash
# Install dependencies
npm install

# Run in development (auto-reload on change)
npm run dev

# Build TypeScript to JS/
npm run build

# Run the compiled app
npm start
```

The server starts at `http://localhost:3000`.

## API

| Method | Endpoint      | Description                      |
|--------|---------------|----------------------------------|
| GET    | `/api/tasks`  | Returns the task list (JSON)     |

Unknown `/api` routes return `404 { error: "Route not found" }`; unhandled errors return `500 { error: "Internal server error" }`.

## Status

Active development — the prioritization engine and data model are in place, the API surface is being built out, and the frontend is wired up for course/task entry.
