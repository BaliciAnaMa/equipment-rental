# Decisions — equipment-rental

<!-- graffino-agentic:begin v1 -->
> Constraints the code must obey. Status: `approved` (obey) · `proposed` (do not
> build on it) · `superseded-by <ID>` (kept to explain old code).
> Adding or changing an entry needs the user's OK (AGENTS.md → The gate).
<!-- graffino-agentic:end -->

## Index
- D-001 · Primary technology stack
- D-002 · Two-tier inventory model and physical unit tracking
- D-003 · Multi-tier pricing and optimal rate calculation
- D-004 · Role-based permissions (Client, Operator, Admin)
- D-005 · Partial returns, accessory checklists, and damage photo reporting
- D-006 · External media storage in Amazon AWS S3
- D-007 · Light and vibrant studio visual theme inspired by F64 Rent
- D-008 · Dedicated Rental Help and Guide section (DS-rent-help)

---

## D-001 · Primary technology stack
- **Status:** approved
- **Date:** 2026-11-18
- **Confirmed:** 2026-11-19
- **Rule:** The project uses React for frontend UI, NestJS (Node.js) for backend REST API, MySQL for persistent data storage, and Docker for containerized development and deployment.
- **Why:** Established project architecture chosen for modularity, strong typing, relational integrity for rental transactions, and containerized consistency.
- **Rejected:** Monolithic non-containerized architectures or NoSQL databases lacking ACID rental transaction guarantees.
- **Evidence:** User architectural requirement in project setup session.
- **Source:** user · confidence high
- **Owner note:** Initial project stack setup.

## D-002 · Two-tier inventory model and physical unit tracking
- **Status:** approved
- **Date:** 2026-11-18
- **Confirmed:** 2026-11-19
- **Rule:** Equipment catalog separates Equipment Models (metadata, description, specifications, media, base rental pricing) from Physical Units (individual serial number/inventory code, operational status, kit accessory checklist, and condition notes).
- **Why:** Essential for tracking discrete hardware assets, maintaining individual unit lifecycles, and enabling partial return of multi-item rentals.
- **Rejected:** Flat inventory model tracking only aggregate quantities without serial identification.
- **Evidence:** User requirement for P04 equipment rental specification.
- **Source:** user · confidence high
- **Owner note:** Provisional domain is photo/video/audio gear under platform RentCam.

## D-003 · Multi-tier pricing and optimal rate calculation
- **Status:** approved
- **Date:** 2026-11-18
- **Confirmed:** 2026-11-19
- **Rule:** Rental rates are structured across four tiers (hourly, daily, weekend, weekly). Pricing engine must automatically calculate the optimal/minimum price combination matching the customer's selected time interval.
- **Why:** Standard photo/video industry billing model allowing flexible customer rentals while maximizing utilization.
- **Rejected:** Fixed flat daily rate without weekend promotion or volume discounts.
- **Evidence:** User requirement for P04 equipment rental specification.
- **Source:** user · confidence high

## D-004 · Role-based permissions (Client, Operator, Admin)
- **Status:** approved
- **Date:** 2026-11-18
- **Confirmed:** 2026-11-19
- **Rule:** Application strictly segregates capabilities into three roles: Client (browsing, calendar availability, price/deposit calculator, booking, history), Operator (front-desk dispatch/return dashboard, serial check-in/check-out, accessory checklists, partial returns, damage photo reports, maintenance locking), and Admin (equipment models, physical serials, pricing tiers, deposits, users, reports).
- **Why:** Ensures clean separation between public customer booking, warehouse/counter physical operations, and administrative oversight.
- **Rejected:** Unified single-interface dashboard without role boundaries.
- **Evidence:** User requirement for P04 equipment rental specification.
- **Source:** user · confidence high

## D-005 · Partial returns, accessory checklists, and damage photo reporting
- **Status:** approved
- **Date:** 2026-11-18
- **Confirmed:** 2026-11-19
- **Rule:** Rentals support partial returns per individual physical unit. Every return requires inspecting the kit accessories checklist. Any detected damage requires an incident report with photographic attachments before deposit settlement.
- **Why:** Protects rental business from accessory loss, ensures accountability per physical unit, and provides timestamped photo evidence for deposit withholding or damage recovery.
- **Rejected:** All-or-nothing return enforcement or text-only damage logs.
- **Evidence:** User requirement for P04 equipment rental specification.
- **Source:** user · confidence high

## D-006 · External media storage in Amazon AWS S3
- **Status:** approved
- **Date:** 2026-11-25
- **Confirmed:** 2026-11-25
- **Rule:** Media files (equipment showcase images and incident damage report photo evidence) are stored externally in Amazon AWS S3 (Free Tier). The MySQL database stores exclusively the S3 object URL or object key, strictly prohibiting raw image BLOBs inside the relational database.
- **Why:** Prevents database bloat, optimizes relational backup and query performance, and leverages dedicated object storage with CDN capabilities for high-resolution photo assets.
- **Rejected:** Storing binary images as BLOBs in MySQL or saving uploads directly to local container filesystem ephemeral volumes.
- **Evidence:** User explicit requirement for RentCam media storage architecture.
- **Source:** user · confidence high

## D-007 · Light and vibrant studio visual theme inspired by F64 Rent
- **Status:** approved
- **Date:** 2026-11-25
- **Confirmed:** 2026-11-25
- **Rule:** The visual identity adopts a Light & Vibrant Studio Theme inspired by F64 Rent, utilizing a warm cream-white background (`#FFFDF9`), clean white card surfaces (`#FFFFFF`), energetic accents (warm rose/red `#E11D48`, vibrant orange `#F97316`, amber/yellow `#F59E0B`), and dynamic hover/focus zoom animations on media cards.
- **Why:** Establishes an energetic, professional studio aesthetic appropriate for creative photography and cinematography equipment rentals, maximizing clarity and visual appeal over dark or dull utility styling.
- **Rejected:** Monochromatic dark-only industrial dashboard or generic cold slate-gray UI themes.
- **Evidence:** User explicit design requirement for RentCam visual identity.
- **Source:** user · confidence high

## D-008 · Dedicated Rental Help and Guide section (DS-rent-help)
- **Status:** approved
- **Date:** 2026-11-25
- **Confirmed:** 2026-11-25
- **Rule:** The application includes a dedicated Help & Rental Guide screen (`DS-rent-help`) accessible to all user roles (Client, Operator, Admin), providing booking steps, rental schedule details (e.g. weekend rates), deposit guidelines, return checklists, and FAQs.
- **Why:** Minimizes operational overhead and customer support requests by clarifying rental terms, weekend pickup/return timeframes, warranty/deposit handling, and damage policy directly within the platform.
- **Rejected:** Hidden or fragmented help tooltips without a centralized searchable guide.
- **Evidence:** User explicit requirement for RentCam help documentation architecture.
- **Source:** user · confidence high
