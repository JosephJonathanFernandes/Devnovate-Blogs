# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by emailing security@devnovate.com or opening a private issue. We will respond promptly.

## Security Best Practices
- **No hardcoded secrets:** All secrets must be managed via environment variables. Never commit credentials, tokens, or passwords.
- **Input validation:** All user input must be validated and sanitized.
- **Dependency management:** Keep dependencies up to date. Use tools like `npm audit` and `yarn audit`.
- **Least privilege:** Services and users should have the minimum permissions required.
- **Code reviews:** All code changes must be reviewed for security impact.

## Tools & Monitoring
- Use GitGuardian or similar tools to monitor for secrets in the repository.
- Enable Dependabot or similar for automated dependency updates.

## Contact
For urgent security issues, contact security@devnovate.com.
