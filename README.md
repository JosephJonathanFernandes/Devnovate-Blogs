
# Devnovate Blogs

## Problem Statement
A modern, modular, and secure blogging platform for teams and individuals. Built for extensibility, security, and professional code quality.

## Architecture
- **Frontend:** React (Vite, Tailwind CSS)
- **Backend:** Node.js (Express, MongoDB)
- **API:** RESTful, modular, and secure
- **Config:** Environment-driven, no hardcoded secrets

## Features
- Modular, scalable codebase (SOLID, Clean Code)
- Secure by default (GitGuardian compliant)
- Clear separation of concerns
- Easy to run, extend, and maintain

## Tech Stack
- React, TypeScript, Vite, Tailwind CSS
- Node.js, Express, MongoDB
- Jest (testing), ESLint, Prettier

## Getting Started
1. Clone the repo
2. Copy `.env.example` to `.env` and fill in values
3. Install dependencies: `npm install` in root, client, and server
4. Start dev servers:
   - `npm run dev` (client)
   - `npm run dev` (server)

## Testing
- Add tests in `tests/`
- Run tests with `npm test`
- Aim for >80% coverage

## Linting & Formatting
- Use ESLint and Prettier
- Recommended: set up pre-commit hooks with lint-staged

## CI/CD
- See `.github/workflows/ci.yml` for GitHub Actions pipeline example

## Documentation
- See `docs/` for architecture, contributing, and changelog

## Value
- Recruiter- and reviewer-friendly
- Secure, maintainable, and production-ready
- Easy onboarding for new contributors

---
For details, see `docs/ARCHITECTURE.md` and `docs/CONTRIBUTING.md`.
