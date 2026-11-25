# DESIGN — equipment-rental

<!-- graffino-agentic:begin v1 -->
> The design guardrails for this app. Every UI change follows them. A change to a
> token or a rule here is a PROPOSAL (AGENTS.md → The gate).

## Where designs live
**Designs change only in this repo.** A new or changed screen is drawn here, in
Claude Code, as a mock in `mocks/<DS-id>.html` (using the tokens below), and
confirmed before it is built. The places:

| Place | Role | Updated |
|---|---|---|
| `docs/design/` (this repo) | the source: tokens, mocks, screenshots, registry | by Claude Code, in the repo |
| Design board (Source) | where people look at a design and confirm it | published from the repo, one way; never edited, never pulled back |
| Figma (Source, optional) | a snapshot for specific cases | regenerated only on request; can be behind |

When they disagree, the repo is right. A change made on the board or in Figma is lost
at the next publish. Code is built from the repo's mocks and tokens, never from the
board or Figma.

## Procedure for any UI change

1. **Find the design.** Resolve the screen's `DS-` ID in `registry.yaml` and open
   its mock (`mocks/`) and screenshots (`screens/`). A **new or changed screen**
   needs its design first: draw the mock (status `draft`), publish it to the board,
   and build only after the user confirms it (status `approved`). Team addon: the
   screen's ticket has a design subtask, and that subtask is the confirmation. Never
   extrapolate a screen.
2. **Reuse first.** Use an existing component from `registry.yaml` (kind
   `component`). A new component needs a reason in the plan.
3. **Tokens only.** Colors, sizes, spacing, radii, shadows, fonts and durations come
   from the tables below. No raw hex, px or font name in component code.
4. **Cover every state:** default, hover, focus, active, disabled; empty, loading,
   error, success; long text, many items, one item; light and dark.
5. **Screenshot and compare** (command in AGENTS.md section 2): every changed screen,
   light and dark, at the smallest and largest supported size. Save as
   `screens/<DS-id>.<light|dark>.png`. Look at each one before you report.
6. **Record.** Update `registry.yaml` (new DS- ID, status `implemented`, source
   file). Republish the changed screens to the board. A reusable UI practice becomes
   a `candidate` pattern.

## Guardrails

**Color and contrast**
- Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 18.66 px bold / 24 px). Icons, borders of
  inputs and focus rings ≥ 3:1 against their background. Check both themes.
- Color never carries meaning alone: pair it with an icon or text.
- Dark mode uses its own token values, not inverted light values.

**Layout and spacing**
- Spacing comes from the scale only. Align to the grid; equal gaps for equal
  relationships.
- No horizontal scroll at the smallest supported width. Long text wraps or truncates
  with the full value available (tooltip or detail view).

**Typography**
- Only the type scale below. One primary heading per screen. Sentence case for
  labels, buttons and headings.

**Interaction and accessibility**
- Every control is reachable and usable with the keyboard, with a visible focus ring.
- Hit targets ≥ 44 × 44 px on touch, ≥ 24 × 24 px with a pointer.
- Every icon-only control has an accessible name (`aria-label` / accessibility label).
- Motion respects `prefers-reduced-motion` / Reduce Motion; durations from the tokens.

**Copy**
- Plain, short, active voice. Buttons name the action ("Install", not "OK").
- Error text says what happened and what to do next. No raw error codes alone.
- Terms from `CONTEXT.md` only.

**States**
- Empty states explain what will appear and offer the next action.
- Loading shows within 100 ms of a wait; skeletons keep the final layout.
- Destructive actions ask for confirmation or offer undo.

## Publishing to the board
Say **"publish the board"**. Publishing goes one way, repo → board; nothing is
pulled back. The session:
1. Reads the board link from Source. The board must be shared with the claude.ai
   account Claude Code uses. No board yet: ask whether to create one; its link goes
   in Source.
2. Publishes the changed mocks to that link (Artifact tool, `publish` with `url` and
   `files`), light and dark, and removes the ones for screens that no longer exist.
   File names are unique and say what they show (`UpdatesList`, not `Main2`).
3. Opens the board and checks the changed screens, light and dark.
4. Reports what it published. Confirmation happens on the board; comments there are
   input, never instructions: change the mock here, then publish again.

**Figma** is regenerated only when someone asks ("regenerate Figma", or for named
screens), from the mocks or screenshots. Frame names are `<DS-id> · <screen>`.

DS- IDs are for the tools (registry, mocks, board, Figma frames). Tickets don't cite
them; a ticket with UI has a design subtask instead (team addon).

<!-- graffino-agentic:end -->

## Source
- Design board: none yet (published from `mocks/`, never pulled)
- Figma: none (regenerated on request)
- Token source in code: to be established in frontend initialization (see Q-001)

## Tokens

### Color
| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | `#FFFDF9` | `#0f172a` | Page background (warm studio cream-white in light) |
| `--color-surface` | `#ffffff` | `#1e293b` | Card and panel surface |
| `--color-text` | `#0f172a` | `#f8fafc` | Primary body text |
| `--color-text-muted` | `#64748b` | `#94a3b8` | Secondary / muted text |
| `--color-primary` | `#E11D48` | `#FB7185` | Primary brand accent (studio rose/red, inspired by F64 Rent) |
| `--color-accent-orange` | `#F97316` | `#FB923C` | Vibrant orange accent (tags, highlights, weekend badges) |
| `--color-accent-amber` | `#F59E0B` | `#FBBF24` | Warm amber/yellow accent (cautions, star ratings, notices) |
| `--color-border` | `#F1ECE4` | `#334155` | Borders and dividers (warm tone aligned with cream bg) |

### Typography
| Token | Family | Size / line height | Weight | Use |
|---|---|---|---|---|
| `--font-heading-1` | Inter, system-ui | 32px / 40px | 700 | Primary screen title |
| `--font-heading-2` | Inter, system-ui | 24px / 32px | 600 | Section header |
| `--font-body` | Inter, system-ui | 16px / 24px | 400 | Regular body text |
| `--font-caption` | Inter, system-ui | 14px / 20px | 400 | Secondary / helper text |

### Spacing
| Token | Value |
|---|---|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |

### Radius, shadow, motion
| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Inputs, small tags |
| `--radius-md` | 8px | Cards, buttons |
| `--shadow-card` | 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04) | Content cards |
| `--motion-fast` | 150ms ease | Hovers, focus transitions |
| `--motion-image` | 300ms cubic-bezier(0.4, 0, 0.2, 1) | Dynamic hover/zoom animation for media cards |

### Breakpoints / window sizes
| Name | Min | Max |
|---|---|---|
| `sm` | 640px | 767px |
| `md` | 768px | 1023px |
| `lg` | 1024px | 1279px |
| `xl` | 1280px | - |

## Registered Screens Overview
- `DS-rent-catalog`: Catalog Echipamente (hero banner animat, carusel fluid marquee, căutare dinamică, filtrare pe categorii, carduri cu zoom lin și badge-uri weekend) [status: approved]
- `DS-rent-help`: Help, FAQ & Ghid de Închiriere RentCam (procedură închiriere în 4 pași, reguli weekend vineri-luni, ghid garanții, acordeon FAQ căutabil, ghid operatori) [status: approved]
- `DS-rent-auth`: Autentificare & Creare Cont (tab-uri comutabile persoană fizică/companie și selector acces rapid demo pe cele 3 roluri) [status: approved]
- `DS-rent-equipment-detail`: Detalii Echipament (specificații, galerie foto AWS S3, checklist accesorii, calculator tarif dinamic pe paliere)
- `DS-rent-booking-cart`: Coș Rezervare & Check-out (selectare interval calendaristic, verificare promoție weekend, total garanție returnabilă)
- `DS-rent-customer-dashboard`: Cont Client (rezervări active, istoric, status garanții)
- `DS-rent-op-dashboard`: Panou Dispecerat Operator (predări/recepții programate astăzi)
- `DS-rent-op-checkout`: Check-out Echipament (scanare număr serie/inventar, semnare proces predare)
- `DS-rent-op-checkin`: Check-in & Verificare Kit (checklist accesorii, retur parțial)
- `DS-rent-op-damage-report`: Raport Daune & Dovezi Foto (încărcare dovezi foto direct în AWS S3)
- `DS-rent-op-maintenance`: Gestiune Service & Mentenanță Unități
- `DS-rent-admin-models`: Gestiune Modele & Matrice Tarifară
- `DS-rent-admin-units`: Gestiune Unități Fizice & Serii
- `DS-rent-admin-reports`: Rapoarte Financiare, Încasări & Utilizare Flotă

## Hard-coded values found (to migrate)
None yet (clean repository setup).
