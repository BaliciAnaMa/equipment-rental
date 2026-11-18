# Decisions — equipment-rental

<!-- graffino-agentic:begin v1 -->
> Constraints the code must obey. Status: `approved` (obey) · `proposed` (do not
> build on it) · `superseded-by <ID>` (kept to explain old code).
> Adding or changing an entry needs the user's OK (AGENTS.md → The gate).
<!-- graffino-agentic:end -->

## Index
- D-001 · Primary technology stack

---

## D-001 · Primary technology stack
- **Status:** approved
- **Date:** 2026-11-18
- **Rule:** The project uses React for frontend UI, NestJS (Node.js) for backend REST API, MySQL for persistent data storage, and Docker for containerized development and deployment.
- **Why:** Established project architecture chosen for modularity, strong typing, relational integrity for rental transactions, and containerized consistency.
- **Rejected:** Monolithic non-containerized architectures or NoSQL databases lacking ACID rental transaction guarantees.
- **Evidence:** User architectural requirement in project setup session.
- **Source:** user · confidence high
- **Owner note:** Initial project stack setup.
