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
- **Proposed answer:** Jest/Vitest for React frontend and Jest for NestJS backend.
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
- **Proposed answer:** Playwright or Puppeteer headless script taking snapshots of rendered React components.
- **Answer:** 
- **Recorded as:** 
