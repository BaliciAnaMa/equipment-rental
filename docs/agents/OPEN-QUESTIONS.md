# Open questions — equipment-rental

<!-- graffino-agentic:begin v1 -->
> Unknowns. Work that depends on an open question is out of scope until it is
> answered. Only the user answers; an agent never answers by guessing. An agent may
> write a `Proposed answer` the evidence supports; the question stays
> `investigating` until the user confirms it.
> Answered entries stay, with the answer and date, and usually become a D- or PATTERN-.
<!-- graffino-agentic:end -->

## Index
- Q-001 · What are the exact install, run, and dev commands for frontend and backend?
- Q-002 · What test framework and test runner commands will be configured?
- Q-003 · What are the build, type-check, and lint commands?
- Q-004 · How will automated screenshots be captured for UI verification?
- Q-005 · What will be the final company branding and identity?
- Q-006 · What is the partner company operating schedule and pickup/return hours?
- Q-007 · What is the exact formula and policy for equipment deposits and guarantees?
- Q-008 · What are the exact rates and grace periods for late return fees?
- Q-009 · Are additional physical tracking metrics required (shutter count, rack/shelf location)?
- Q-010 · What is the standard maintenance buffer window between consecutive rentals of a physical unit?
- Q-011 · What payment gateway or deposit hold integration will be used for online reservations?
- Q-012 · Where will damage report photographic attachments be stored?

---

## Q-001 · What are the exact install, run, and dev commands for frontend and backend?
- **Status:** open
- **Blocks:** Running and local development scripts in AGENTS.md section 2.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Docker Compose commands (e.g. `docker compose up --build`) and package scripts once frontend/backend codebases are initialized.
- **Answer:** 
- **Recorded as:** 

## Q-002 · What test framework and test runner commands will be configured?
- **Status:** open
- **Blocks:** Automated test step in Definition of Done and AGENTS.md section 2.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Vitest or Jest for React frontend and Jest for NestJS backend.
- **Answer:** 
- **Recorded as:** 

## Q-003 · What are the build, type-check, and lint commands?
- **Status:** open
- **Blocks:** CI / build verification and Definition of Done in AGENTS.md section 6.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Standard npm/yarn/pnpm scripts (`npm run build`, `npm run lint`) in frontend and backend workspaces.
- **Answer:** 
- **Recorded as:** 

## Q-004 · How will automated screenshots be captured for UI verification?
- **Status:** open
- **Blocks:** Automated screenshot capture command in AGENTS.md section 2.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Playwright headless script taking snapshots of rendered React components.
- **Answer:** 
- **Recorded as:** 

## Q-005 · What will be the final company branding and identity?
- **Status:** open
- **Blocks:** Final branding, logos, domain, and company legal info on UI and rental contracts.
- **Who answers:** Partner company / Client
- **Proposed answer:** Use provisional platform name "RentCam" with neutral styling until partner branding is confirmed.
- **Answer:** 
- **Recorded as:** 

## Q-006 · What is the partner company operating schedule and pickup/return hours?
- **Status:** open
- **Blocks:** Rental start/end time validation and pickup/return slot booking.
- **Who answers:** Partner company / Client
- **Proposed answer:** Standard business hours (e.g., 09:00 - 18:00 Mon-Fri, 10:00 - 14:00 Sat).
- **Answer:** 
- **Recorded as:** 

## Q-007 · What is the exact formula and policy for equipment deposits and guarantees?
- **Status:** open
- **Blocks:** Exact deposit calculation logic during checkout and reservation.
- **Who answers:** Partner company / Client
- **Proposed answer:** Percentage of equipment replacement value or fixed deposit tiers based on category/tier.
- **Answer:** 
- **Recorded as:** 

## Q-008 · What are the exact rates and grace periods for late return fees?
- **Status:** open
- **Blocks:** Automated late fee calculation on delayed returns.
- **Who answers:** Partner company / Client
- **Proposed answer:** Hourly multiplier or full extra day charge with a 1-hour grace window.
- **Answer:** 
- **Recorded as:** 

## Q-009 · Are additional physical tracking metrics required (shutter count, rack/shelf location)?
- **Status:** open
- **Blocks:** Advanced physical unit inventory metadata schema.
- **Who answers:** Partner company / Client
- **Proposed answer:** Base tracking covers serial/inventory code, operational status, kit accessories checklist, and condition notes. Shutter counts or precise warehouse shelf IDs can be added if required.
- **Answer:** 
- **Recorded as:** 

## Q-010 · What is the standard maintenance buffer window between consecutive rentals of a physical unit?
- **Status:** open
- **Blocks:** Automated calendar availability calculation and turnover buffers.
- **Who answers:** Partner company / Client
- **Proposed answer:** Standard buffer of 2 hours or overnight turnover for inspection, sensor cleaning, and battery charging.
- **Answer:** 
- **Recorded as:** 

## Q-011 · What payment gateway or deposit hold integration will be used for online reservations?
- **Status:** open
- **Blocks:** Online pre-authorization payment gateway integration.
- **Who answers:** Partner company / Client
- **Proposed answer:** Simulate authorization hold / counter payment flow initially until Stripe/Netopia credentials are provided.
- **Answer:** 
- **Recorded as:** 

## Q-012 · Where will damage report photographic attachments be stored?
- **Status:** open
- **Blocks:** Storage infrastructure for inspection media attachments.
- **Who answers:** Developer / Architect
- **Proposed answer:** Local filesystem volume mounted in Docker container for development; S3-compatible bucket (MinIO or AWS S3) for production.
- **Answer:** 
- **Recorded as:** 
