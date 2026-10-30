# ADHD Task Tracker

**A full-stack task management application designed to help users organize tasks, track productivity, and manage their working sessions.**

**Status: In Progress**

## Overview

ADHD Task Tracker is a full-stack productivity application designed to help people with ADHD manage their tasks, track their time, and better understand their working habits.

One of the challenges associated with ADHD is **time blindness**, which refers to difficulty accurately perceiving how much time has passed. This can make it harder to estimate how long tasks take, manage time effectively, and recognize how much effort has been spent working.

Other challenges, such as difficulty maintaining focus, managing multiple responsibilities, and returning to tasks after interruptions, can make everyday productivity more difficult.

I wanted to build an application that addresses some of these challenges by making time and progress more visible.

Rather than simply providing a list of tasks to complete, ADHD Task Tracker focuses on helping users understand **how much time they're investing in their work and how their working sessions are structured.**

### How It Works

The application currently includes two independent timers:

**Time Worked**

Tracks the total amount of time actively spent working on a task, even across multiple breaks and working sessions.

**Current Session**

Tracks the duration of an individual working session. Short breaks preserve the current session, while extended breaks automatically reset it, allowing users to distinguish between their total working time and their current session.

Both timers use timestamps and persistent database storage, ensuring that working time is accurately calculated without relying solely on the browser remaining open.

*Development Note: The break threshold is temporarily set to 20 seconds to make testing easier. The intended default is 20 minutes, with customizable thresholds planned for a future update.*

### Long-Term Vision

My goal is to develop ADHD Task Tracker into a more comprehensive productivity tool that helps users:

- Better understand how they spend their time.
- Recognize their progress, even when tasks take longer than expected.
- Organize responsibilities without feeling overwhelmed by completed tasks.
- Review productivity patterns through statistics and dashboards.
- Customize their working sessions and break preferences.
- Build a workflow that accommodates their individual needs.

As development continues, I hope to make the application publicly available, gather feedback from people with ADHD, and use that feedback to guide future improvements.

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
