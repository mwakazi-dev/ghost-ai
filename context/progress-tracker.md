# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Feature 05 (Prisma Models + Client) — complete

## Current Goal

- Feature 06 (TBD)

## Completed

- Feature 01: Design System — shadcn/ui 4.18.0 installed and configured for Tailwind v4, dark-only theme tokens in globals.css (all shadcn semantic aliases wired to custom CSS vars, no .dark class switching), Button/Card/Dialog/Input/Tabs/Textarea/ScrollArea components added to components/ui/, lucide-react installed, lib/utils.ts cn() helper in place. TypeScript compiles clean.
- Feature 02: Editor Chrome — `components/editor/editor-navbar.tsx` (fixed-height top bar, PanelLeftOpen/PanelLeftClose sidebar toggle, dark bg + bottom border), `components/editor/project-sidebar.tsx` (floating overlay, no layout push, slides in from left, isOpen/onClose props, Projects header + close button, My Projects / Shared tabs with empty placeholder states, full-width New Project button), dialog pattern ready for future use via existing shadcn Dialog, page.tsx wired with useState to drive sidebar open/close. TypeScript compiles clean, zero lint errors.
- Feature 04: Project Dialogs — `lib/mock-projects.ts` (Project type, mock owned + shared projects, `toSlug` helper), `hooks/use-project-dialogs.ts` (dialog/form/loading state), `components/editor/dialogs/` (CreateProjectDialog with live slug preview, RenameProjectDialog with autofocus + Enter submit, DeleteProjectDialog with destructive confirm), `components/editor/project-sidebar.tsx` updated with project items, owned-only rename/delete action menus, mobile backdrop scrim, sidebar New Project wired. `app/editor/page.tsx` updated with home heading + New Project button + all three dialogs wired. TypeScript clean, zero lint errors.
- Feature 03: Auth — `@clerk/ui` installed. `proxy.ts` at project root with protected-first Clerk middleware (public: `/`, `/sign-in(.*)`, `/sign-up(.*)`). `ClerkProvider` wraps root layout with `dark` theme from `@clerk/ui/themes` and appearance variable overrides pointing to app CSS vars (no hardcoded colors). Two-panel sign-in/sign-up pages (`app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx`) — left panel with compact logo, tagline, and text-only feature list on large screens; form only on small screens. `app/editor/page.tsx` created with editor chrome (navbar + project sidebar). `app/page.tsx` redirects authenticated users to `/editor`, unauthenticated to `/sign-in`. `UserButton` added to editor navbar right section. Clerk env vars for sign-in/sign-up URLs and fallback redirects added to `.env.local`.
- Feature 05: Prisma Models + Client — `prisma/models/project.prisma` with `Project` (ownerId, name, description?, status enum DRAFT/ARCHIVED, canvasJsonPath?, timestamps, indexes on ownerId and createdAt) and `ProjectCollaborator` (projectId cascade-delete relation, email, createdAt, unique on project/email, indexes on email and project/date). `lib/prisma.ts` cached singleton branching on `DATABASE_URL`: `prisma+postgres://` → Accelerate via `accelerateUrl`, otherwise → `@prisma/adapter-pg`. Migration `20260816104041_init_projects` applied to Prisma Postgres. Client generated to `app/generated/prisma/`. TypeScript compiles clean, `npm run build` passes.

## In Progress

- None.

## Next Up

- Feature 06 (TBD)

## Open Questions

- None yet.

## Architecture Decisions

- shadcn/ui over Tailwind v4 (CSS-based token config via @theme inline in globals.css, no tailwind.config.js).
- Dark-only theme: all shadcn :root variables removed; semantic aliases in @theme inline point directly to custom dark tokens. No .dark class switching.
- Do not modify generated components/ui/* files after shadcn installation.

## Session Notes

- Using Next.js 16.3.1 with React 19 and Tailwind CSS v4.
- shadcn 4.18.0 used; it auto-detected Tailwind v4.
- lucide-react was already present as a transitive dependency after shadcn install.
- @theme inline maps --color-background, --color-foreground, etc. to custom --bg-* / --text-* / --accent-* tokens defined in :root. shadcn components consume these via bg-background, text-foreground Tailwind classes — no direct CSS var references needed.
