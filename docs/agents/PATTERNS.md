# Patterns — equipment-rental

<!-- graffino-agentic:begin v1 -->
> How we build things here. Copy only `approved` entries. `candidate` = seen once or
> not yet confirmed; agents add these freely. Promotion needs the user's OK.
<!-- graffino-agentic:end -->

## Index
- PATTERN-001 · Containerized environment with Docker · approved

---

## PATTERN-001 · Containerized environment with Docker
- **Status:** approved
- **Confirmed:** 2026-11-19
- **Use when:** Configuring, developing, or running services for this repository.
- **How:** Define services in Docker Compose configurations and run services inside containers with environment variables passed via configuration.
- **Example:** docs/agents/DECISIONS.md:D-001
- **Why:** Prevents environment discrepancies between local development and deployment.
- **Source:** user · confidence high
