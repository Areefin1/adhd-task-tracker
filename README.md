# ADHD Task Tracker

**A full-stack task management application designed to help users organize tasks, track productivity, and manage their working sessions.**

**Status: In Progress**

## Overview

ADHD Task Tracker is a personal project I'm developing to make task management and time tracking easier.

The application allows users to create and manage tasks while tracking how much time they spend working on each one.

Unlike a traditional task tracker, it includes two separate timers:

- **Time Worked:** Tracks the total time spent working on a task.
- **Current Session:** Tracks the duration of the current working session, automatically resetting after an extended break.

My goal is to continue expanding the application with productivity statistics, task history, customization options, and other features based on user feedback.

## Technologies Used

**Frontend**
- React
- JavaScript
- Tailwind CSS
- Vite

**Backend**
- Node.js
- Express.js
- REST APIs

**Database**
- PostgreSQL

**Development Tools**
- Git & GitHub
- Postman
- pgAdmin

## Current Features

### Task Management
- Create tasks with titles and descriptions.
- View existing tasks.
- Delete tasks.
- Track task progress through different states:
  - Not Started
  - In Progress
  - Completed

### Time Tracking
- Start, pause, resume, and finish tasks.
- Track total time worked on each task.
- Track individual working sessions.
- Automatically reset the current session timer after extended breaks.
- Preserve timer information in PostgreSQL, including after refreshing the application.
- Track multiple tasks independently.

### Backend & Database
- RESTful API endpoints for task management.
- PostgreSQL database for persistent storage.
- Database transactions for reliable timer updates.
- Timestamp-based time calculations.
- Database migrations for managing schema changes.

### User Interface
- Dark-themed interface.
- Custom fonts and colors.
- Task controls that change depending on task status.
- Styled forms and task cards using CSS and Tailwind CSS.

## How the Timers Work

**Time Worked**

Records the total time spent actively working on a task.

For example:

- Work for 30 minutes.
- Pause the task.
- Resume and work for another 20 minutes.
- Total Time Worked: **50 minutes**.

**Current Session**

Tracks the time spent in the current working session.

Short breaks preserve the current session, while longer breaks reset it.

For example:

- Work for 30 minutes.
- Take a 5-minute break.
- Resume working for another 20 minutes.
- Current Session: **50 minutes**.

If the break exceeds the configured threshold, the next working session starts from zero.

The total Time Worked remains unchanged.

*Note: The current break threshold is set to 20 seconds for development and testing.*

## Running Locally

The application currently runs locally and requires Node.js and PostgreSQL.

To run it:

1. Clone the repository.
2. Install the frontend and backend dependencies.
3. Configure the PostgreSQL connection using environment variables.
4. Set up the database using the SQL migrations.
5. Start the backend server.
6. Start the React development server.

More detailed setup instructions will be added as development continues.

## Planned Features

- [ ] Dashboard with productivity statistics.
- [ ] Task history for completed tasks.
- [ ] Search tasks by title or description.
- [ ] Sort tasks by creation date or last modification.
- [ ] Customizable break thresholds.
- [ ] Improved navigation and responsive design.
- [ ] User authentication.
- [ ] Cloud database hosting.
- [ ] Public deployment.
- [ ] Additional improvements based on user feedback.

## Project Goals

This project is an opportunity for me to strengthen my skills in full-stack software engineering, including frontend development, backend APIs, database design, and application deployment.

I also hope to eventually make the application available to others and improve it based on their experiences and suggestions.

## Development Status

This project is actively being developed. Features, designs, and implementation details may change over time.
