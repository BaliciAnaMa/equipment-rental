# Architecture — equipment-rental

<!-- graffino-agentic:begin v1 -->
> How this repo is built, generated from the code at backfill and kept current by
> whoever changes the structure. The code wins: when this page is wrong, fix it.
<!-- graffino-agentic:end -->

## Overview
Equipment rental web application providing inventory management and rental booking workflows.
Consists of a React single-page frontend, a NestJS backend REST API, and a MySQL relational database,
orchestrated using Docker containers for development and deployment.

```text
+-------------------+        HTTP / REST        +--------------------+
|  React Frontend   | ------------------------> |   NestJS Backend   |
|  (Web Client UI)  | <------------------------ |   (REST API)       |
+-------------------+                           +--------------------+
                                                           |
                                                    SQL / TCP
                                                           v
                                                +--------------------+
                                                |   MySQL Database   |
                                                | (State & Inventory)|
                                                +--------------------+
```

## Parts
| Part | Path | Responsibility | Talks to |
|---|---|---|---|
| Frontend | `frontend/` (planned) | User interface for equipment catalogue and rental orders | Backend REST API |
| Backend | `backend/` (planned) | Business logic, authentication, rental validation, and API | MySQL database |
| Database | Docker service | Persistent storage of users, inventory, rentals, and transactions | Backend |

## Data flow
1. **Equipment Catalogue Browsing:** Customer requests available equipment -> Frontend calls `GET /api/v1/equipment` -> Backend queries MySQL -> Returns equipment list with availability status.
2. **Rental Creation:** Customer submits rental request -> Frontend calls `POST /api/v1/rentals` -> Backend validates availability in transaction, reserves equipment, creates rental record -> Returns confirmation.

## State and storage
| What | Where | Owner | Notes |
|---|---|---|---|
| Equipment & Inventory | MySQL | Backend | Relational records of items, categories, and maintenance status |
| Rentals & Transactions | MySQL | Backend | Active and completed rental agreements |
| Users & Auth | MySQL | Backend | Customer and administrator credentials / profiles |

## Configuration
| Name | Where set | Used by | Notes |
|---|---|---|---|
| `PORT` | `.env` / Docker Compose | Backend | API listening port |
| `DATABASE_URL` | `.env` / Docker Compose | Backend | MySQL connection string |
| `REACT_APP_API_URL` | `.env` / Docker Compose | Frontend | Target URL for backend API |

## Build, deploy, runtime
Multi-container application managed via Docker Compose.
Frontend served as static assets or Node container, Backend running NestJS under Node runtime.
See AGENTS.md sections 2 and 5.

## Boundaries
- Frontend client communicates exclusively with Backend via HTTP REST API.
- Database is not exposed publicly; only accessible by Backend within internal Docker network.
- See contracts in [CONTRACTS.md](CONTRACTS.md) and stack decision [DECISIONS.md](DECISIONS.md#D-001).
