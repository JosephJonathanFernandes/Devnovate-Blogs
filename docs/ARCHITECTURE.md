# Architecture Overview

## Problem Statement
Devnovate Blogs is a modular, scalable blogging platform designed for modern web development. It separates client and server concerns, supports rapid feature development, and is secure by default.

## High-Level Architecture
- **Client (Frontend):** React + Vite + Tailwind CSS
- **Server (Backend):** Node.js + Express + MongoDB
- **API:** RESTful endpoints for authentication, blog management, and user profiles
- **Config:** All environment-specific settings are managed via config files and environment variables

## Folder Structure
- `src/` — Core application logic (to be migrated from client/src and server/src)
- `tests/` — Unit and integration tests
- `docs/` — Documentation (architecture, contributing, changelog)
- `config/` — Configuration and environment setup
- `scripts/` — Automation and utility scripts
- `client/` — Frontend app (to be modularized)
- `server/` — Backend app (to be modularized)

## Key Principles
- **Separation of Concerns:** Client, server, config, and scripts are isolated
- **SOLID & Clean Code:** Each module has a single responsibility
- **Security:** No hardcoded secrets, input validation, and secure defaults
- **Extensibility:** Easy to add new features or swap components

## Ownership
- Each folder contains a README.md describing its purpose and ownership

---
For detailed design, see individual module docs and CONTRIBUTING.md.
