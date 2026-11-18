# Contracts — equipment-rental

<!-- graffino-agentic:begin v1 -->
> Promises across a boundary. **Provided:** this repo owns the contract; the text
> lives here only. **Consumed:** a link to the provider's entry plus the fields this
> repo relies on. **External:** what we rely on from a third-party service.
> Changing a provided contract is a PROPOSAL (AGENTS.md → The gate) and the plan
> lists the consumers' files too. Status: `approved` · `proposed` · `superseded-by`.
<!-- graffino-agentic:end -->

## Index
- C-001 · Equipment rental management REST API · provided · _proposed_

---

## Provided

### C-001 · Equipment rental management REST API
- **Status:** proposed
- **Interface:** HTTP REST API (NestJS backend service)
- **Consumers:** React frontend web client
- **Shape:** JSON request and response payloads with endpoints:
  - `GET /api/v1/equipment-models` (catalog listing with filters, pagination, and date availability)
  - `GET /api/v1/equipment-models/:id` (model details, photo gallery, specs, tiered rates, kit items)
  - `POST /api/v1/rentals/quote` (optimal price calculation across hour/day/weekend/week tiers + deposit)
  - `POST /api/v1/rentals` (create reservation order)
  - `GET /api/v1/rentals` (customer booking list / operator dispatch schedule)
  - `POST /api/v1/rentals/:id/checkout` (assign serials, verify kit checklist, handoff units)
  - `POST /api/v1/rentals/:id/checkin` (partial/full return, verify kit checklist, calculate late fee)
  - `POST /api/v1/rentals/:id/damage-reports` (multipart/form-data with photos, severity, deposit impact)
  - `GET /api/v1/physical-units` (manage physical assets, serial numbers, operational states)
  - `PATCH /api/v1/physical-units/:id/maintenance` (lock/unlock physical unit for turnover/repairs)
- **Rules:** Versioned under `/api/v1/`, JWT Bearer token authentication with role guards (`client`, `operator`, `admin`), standard HTTP status codes (`200`, `201`, `400`, `401`, `403`, `404`, `422`).
- **Evidence:** Planned NestJS REST backend service.
- **Source:** user · confidence high

## Consumed

## External

### MySQL · Database storage engine
- **Interface:** MySQL 8.x TCP protocol / connection string
- **We rely on:** Relational schema, transactions (ACID), foreign keys, connection pooling
- **Known quirks:** Connection timeouts require reconnect / health check logic in NestJS database client
- **Evidence:** Planned Docker and NestJS configuration
