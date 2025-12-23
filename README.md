
# Devnovate Blogs

A professional, modular, and secure fullstack blogging platform built with React, TypeScript, Node.js, and MongoDB.

## Problem
Modern content platforms require scalable, secure, and maintainable codebases. Devnovate Blogs solves this by providing a recruiter-grade, open-source solution with clear architecture, strong security, and a great developer experience.

## Architecture
- **Frontend:** React + TypeScript (Vite, Tailwind CSS)
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB (Mongoose)
- **API:** RESTful, JWT authentication
- **Testing:** Jest, Supertest (recommended)
- **CI/CD:** GitHub Actions (recommended)

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details.

## Features
- Modular, SOLID-compliant codebase
- Secure by default (no hardcoded secrets)
- User authentication, blog CRUD, comments, likes
- Admin dashboard, approval workflow
- Professional documentation and security policies

## Getting Started
1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-org/devnovate-blogs.git
   cd devnovate-blogs
   ```
2. **Install dependencies:**
   ```sh
   cd server && npm install
   cd ../client && npm install
   ```
3. **Configure environment:**
   - Copy `.env.example` to `.env` in both root and client if needed
   - Fill in all required secrets
4. **Run the app:**
   - Start backend: `cd server && npm run dev`
   - Start frontend: `cd client && npm run dev`

## Usage
- Access the frontend at `http://localhost:3000`
- API runs at `http://localhost:5000/api`

## Value
- Reviewer- and recruiter-friendly
- Easy to extend, test, and deploy
- Security and code quality built-in

## Contributing
See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

## License
MIT

---

For architecture, contribution, and changelog, see the `docs/` folder.
