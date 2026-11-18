# Architecture — equipment-rental

<!-- graffino-agentic:begin v1 -->
> How this repo is built, generated from the code at backfill and kept current by
> whoever changes the structure. The code wins: when this page is wrong, fix it.
<!-- graffino-agentic:end -->

## Overview
Equipment rental web application (RentCam) providing physical unit tracking, multi-tier pricing, and inspection workflows.
Consists of a React single-page frontend, a NestJS backend REST API, and a MySQL relational database,
orchestrated using Docker containers for development and deployment (see [DECISIONS.md](DECISIONS.md#D-001)).

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
| Frontend | `frontend/` (planned) | UI for Client (catalog/booking), Operator (dispatch/returns/damage), Admin | Backend REST API |
| Backend | `backend/` (planned) | Domain logic, tiered pricing engine, role authorization, asset tracking | MySQL database, Storage |
| Database | Docker service | Relational storage of models, serials, rentals, checklists, damage reports | Backend |

## Data flow
1. **Catalog Browsing & Optimal Quote:** Client browses models -> Frontend calls `POST /api/v1/rentals/quote` -> Backend evaluates 4 tiers (hour, day, weekend, week) -> Returns optimal rate and deposit (see [DECISIONS.md](DECISIONS.md#D-003)).
2. **Reservation Booking:** Client books rental -> Backend reserves model availability over the calendar window, accounting for maintenance buffer windows.
3. **Counter Check-Out (Predare):** Operator opens dispatch dashboard -> Scans/selects physical unit serial numbers -> Validates bundled kit accessories checklist -> Handoff confirmed (see [DECISIONS.md](DECISIONS.md#D-002)).
4. **Counter Check-In & Damage Reporting:** Operator inspects returned items -> Processes full or partial returns per physical unit -> Checks accessories checklist -> If damaged, files incident report with uploaded photos -> Triggers maintenance turnover buffer (see [DECISIONS.md](DECISIONS.md#D-005)).

## State and storage
| What | Where | Owner | Notes |
|---|---|---|---|
| Equipment Models | MySQL | Backend | Abstract models, categories, specifications, base tiered pricing |
| Physical Units | MySQL | Backend | Individual serial numbers, operational states, bundled kit accessories |
| Rentals & Items | MySQL | Backend | Reservation agreements, allocated unit serials, timestamps, deposits |
| Damage Reports & Photos | MySQL / Storage | Backend | Incident notes, severity, deposit deductions, photo evidence |
| Users & Roles | MySQL | Backend | Client, Operator, and Admin credentials with hashed passwords |

## Configuration
| Name | Where set | Used by | Notes |
|---|---|---|---|
| `PORT` | `.env` / Docker Compose | Backend | API listening port |
| `DATABASE_URL` | `.env` / Docker Compose | Backend | MySQL connection string |
| `JWT_SECRET` | `.env` / Docker Compose | Backend | Authentication token secret |
| `REACT_APP_API_URL` | `.env` / Docker Compose | Frontend | Target URL for backend API |

## Build, deploy, runtime
Multi-container application managed via Docker Compose.
Frontend served as static assets or Node container, Backend running NestJS under Node runtime.
See AGENTS.md sections 2 and 5.

## Boundaries
- Frontend client communicates exclusively with Backend via HTTP REST API.
- Role-based authorization strictly enforced by NestJS guards (`client`, `operator`, `admin`) (see [DECISIONS.md](DECISIONS.md#D-004)).
- Database is not exposed publicly; only accessible by Backend within internal Docker network.
- See contracts in [CONTRACTS.md](CONTRACTS.md) and stack decision [DECISIONS.md](DECISIONS.md#D-001).
