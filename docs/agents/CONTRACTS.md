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
- **Shape:** JSON request and response payloads for equipment catalogue, inventory availability, rental orders, and customer management.
- **Rules:** Endpoints versioned under `/api/v1/`, JSON payloads, standard HTTP status codes.
- **Evidence:** Planned NestJS REST backend service.
- **Source:** user · confidence medium

## Consumed

## External

### MySQL · Database storage engine
- **Interface:** MySQL 8.x TCP protocol / connection string
- **We rely on:** Relational schema, transactions (ACID), foreign keys, connection pooling
- **Known quirks:** Connection timeouts require reconnect / health check logic in NestJS database client
- **Evidence:** Planned Docker and NestJS configuration
