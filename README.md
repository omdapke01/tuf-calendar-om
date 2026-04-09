# Luma Calendar

A polished interactive calendar built with Next.js, Tailwind CSS, and Framer Motion.

This project is frontend-only. It supports date-range selection, note management, smooth animations, and local persistence with `localStorage`.

## Features

- Month-view calendar layout
- Date range selection
- Notes linked to a selected date or date range
- Add, edit, and delete notes in a modal
- `localStorage` persistence
- Dark-first glassmorphism-inspired UI
- Keyboard and accessibility improvements
- Responsive layout for desktop and mobile

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lucide React

## Prerequisites

Make sure these are installed:

- Node.js 18 or newer
- npm

## Getting Started

Clone the repository and move into the project folder:

```bash
git clone https://github.com/omdapke01/tuf-calendar-om.git
cd tuf-calendar-om
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production Build

Build the app:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Project Structure

```text
app/
  globals.css
  layout.jsx
  page.jsx

components/
  CalendarApp.jsx
  CalendarGrid.jsx
  DayCell.jsx
  HeroImagePanel.jsx
  NoteModal.jsx
  NotesSection.jsx

hooks/
  useDateRange.js
  useNotes.js

lib/
  date.js
  hero.js
```

## How It Works

1. The user selects a start date.
2. The user selects an end date.
3. The calendar highlights the full selected range.
4. Notes can be attached to that date or range.
5. Notes are stored in the browser using `localStorage`.

## Notes

- No backend is used in this project.
- No external database is required.
- Notes are stored per browser, so clearing browser storage will remove saved notes.

## Available Scripts

- `npm run dev` — starts the development server
- `npm run build` — creates the production build
- `npm run start` — runs the production build
- `npm run lint` — runs Next.js linting

## Repository

GitHub repository:

```text
https://github.com/omdapke01/tuf-calendar-om
```
