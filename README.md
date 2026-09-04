# TaskFlow — Kanban Board with Dashboard

TaskFlow is a client-side task management application built with React. It provides a three-column Kanban Board for managing team tasks and a Dashboard for tracking task progress, categories, overdue work, and completion performance.

## Live Application

- GitHub Pages: [TaskFlow Kanban Dashboard](https://myatzay.github.io/kanban-dashboard/)
- GitHub Repository: [kanban-dashboard](https://github.com/MyatZay/kanban-dashboard)

## Features

- Create, edit, and delete tasks
- Confirm before deleting a task to prevent accidental removal
- Organize tasks in **To Do**, **Doing**, and **Done** columns
- Move tasks between statuses using Previous and Next controls
- Automatically set a completion date when a task is moved to Done
- Assign a category and responsible person to each task
- Set start dates and due dates
- Add reusable task categories and prevent duplicates
- Store tasks and categories in browser Local Storage
- Restore saved data after refreshing or reopening the application
- View task totals, status counts, and overdue tasks
- View task status distribution with a doughnut chart
- View task counts by category with a bar chart
- Compare Early, On Time, and Late completion performance
- Responsive layout for desktop, tablet, and mobile devices

## Screenshots

### Kanban Board

![Kanban Board](public/screenshots/kanban-board.png)

The Kanban Board organizes work into **To Do**, **Doing**, and **Done** columns. Users can create, edit, delete, and move tasks while managing categories.

### Dashboard

![Dashboard](public/screenshots/dashboard.png)

The Dashboard provides live summary cards and visual reports for task status, category distribution, overdue work, and completion performance.

## Technologies Used

- React
- Vite
- React Router
- Recharts
- Lucide React
- CSS
- Browser Local Storage
- GitHub Pages

## Project Requirements Covered

This project follows the requirements for **Project 1 – Kanban Board with Dashboard**:

- React JS web application with no backend
- Local Storage data persistence
- Three-column Kanban Board
- Create, edit, delete, and move tasks
- Category management
- Dashboard summary cards and charts
- GitHub Pages deployment
- Responsive user interface

## Kanban Board

The Kanban Board contains three task-status columns:

| Column | Description |
| --- | --- |
| **To Do** | Tasks that have not been started |
| **Doing** | Tasks currently in progress |
| **Done** | Tasks that have been completed |

Each task card displays its information and provides controls for editing, deleting, and moving the task between columns.

## Task Data

Each task includes the following information:

- Title
- Description
- Category
- Start date
- Due date
- Complete date
- Responsible person
- Status

## Responsible Persons

Responsible-person data is predefined. Each person has an ID and name. Person management is not included because it is outside the project requirements.

## Category Management

Users can:

1. Select an existing category when creating or editing a task.
2. Add a new category using the category input.
3. Use the new category for future tasks.
4. Avoid duplicate category names.

## Dashboard

The Dashboard summarizes information from the Kanban Board.

### Summary Cards

The dashboard displays:

- Total number of tasks
- Number of To Do tasks
- Number of Doing tasks
- Number of Done tasks
- Number of overdue tasks

### Charts

| Chart | Purpose |
| --- | --- |
| Task Status Doughnut Chart | Shows the number of tasks in To Do, Doing, and Done |
| Task Category Bar Chart | Shows the number of tasks in each category |
| Completion Performance Chart | Compares Early, On Time, and Late completed tasks |

## Data Persistence and Calculations

Tasks and categories are serialized as JSON and stored under separate Local Storage keys. React loads this saved data when the application starts and writes updated data whenever tasks or categories change.

A task is overdue when its due date has passed and its status is not Done. Completion performance includes completed tasks with a due date and completion date:

- **Early:** completion date is before the due date.
- **On Time:** completion date is the same as the due date.
- **Late:** completion date is after the due date.

## Installation and Setup

### Requirements

- Node.js 20 or later
- npm

### Run Locally

```bash
git clone https://github.com/MyatZay/kanban-dashboard.git
cd kanban-dashboard
npm install
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the production version of the application. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs project lint checks. |
| `npm run deploy` | Builds and deploys the application to GitHub Pages. |

## Basic Usage

1. Open the **Kanban Board** page.
2. Select **New Task**.
3. Enter the task title, description, category, responsible person, start date, and due date.
4. Select **Create Task**.
5. Use **Next** and **Previous** to move tasks between To Do, Doing, and Done.
6. Moving a task to Done automatically records its completion date.
7. Use the edit button to update a task or the delete button to remove it.
8. Add categories using the **Add Category** input.
9. Open the **Dashboard** page to review task summaries and charts.

## Group Members

- Myat Zay Hein
- Myo Kyi Sim Thar

Member names only are listed as required; student IDs are intentionally excluded.

## License

This project was created for educational purposes as part of Project 1 – Kanban Board with Dashboard.
