# Eduardo Chacaliaza — Developer Portfolio

Personal portfolio application built with Next.js, TypeScript, and Tailwind CSS.  
This site showcases selected projects, skills, and contact information.

> For a high-level overview of the project (intended for recruiters), see the main `README.md` in the repository root.

## Overview
This directory contains the Next.js application that powers my portfolio.  
Within this Next.js project, the `app/` folder defines the routes, layouts, and pages using the App Router.

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS

## Features
- Responsive design
- Projects section with links to live demos and repositories
- About and contact sections
- Clean UI focused on performance and readability

## Prerequisites
- Node.js (v18 or higher recommended)
- npm

## Getting Started (Local Development)

### Clone the repository

```bash
git clone https://github.com/educmz/portfolio.git
cd portfolio/app
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000` by default.

### Available scripts
- `npm run dev` – Start the development server
- `npm run build` – Create a production build
- `npm run start` – Run the production build
- `npm run lint` – Run ESLint to check code quality

## Project structure (basic)
- `app/layout.tsx` – Root layout of the application
- `app/page.tsx` – Main portfolio page
- `app/globals.css` – Global styles
- `public/` – Static assets (icons, images, etc.)

## Deployment

This application is ready to be deployed on platforms that support Next.js, such as Vercel.  
You can connect this repository and use the main branch as the deployment source.

## License

This project is distributed under the license included in `../LICENSE`.
