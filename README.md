# Simple Blog

A simple blog platform built with [Next.js v15](https://nextjs.org/), [shadcn/ui](https://ui.shadcn.com/).

## Features

- 📝 Admin section for creating, editing, and deleting posts
- 🔒 Single admin user authentication
- 💅 Modern UI with Tailwind CSS and shadcn/ui components
- ⚡ Fast, type-safe codebase with TypeScript
- 📦 Efficient dependency management with pnpm

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Configuration

- Copy `.env.example` to `.env` and set the following variables:

```env
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_database_url_here
```

- Edit `config.ts` to adjust project-specific configuration variables.
SHOULD MOVE THIS TO DB AND ADMIN PANEL

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                # Next.js app directory
├── components/         # UI components (shadcn/ui)
├── lib/                # Utility libraries
├── config.ts           # Project configuration variables
├── .env                # Environment variables (JWT_SECRET, DATABASE_URL)
├── package.json
└── README.md
```

## Admin Section

- Only one user (admin) can log in.
- Admin can create, edit, and delete blog posts.
- Access the admin dashboard at `/admin`.

## License

MIT

---