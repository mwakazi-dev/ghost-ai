# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Feature 02 (Editor Chrome) — complete

## Current Goal

- Feature 03 (TBD)

## Completed

- Feature 01: Design System — shadcn/ui 4.18.0 installed and configured for Tailwind v4, dark-only theme tokens in globals.css (all shadcn semantic aliases wired to custom CSS vars, no .dark class switching), Button/Card/Dialog/Input/Tabs/Textarea/ScrollArea components added to components/ui/, lucide-react installed, lib/utils.ts cn() helper in place. TypeScript compiles clean.
- Feature 02: Editor Chrome — `components/editor/editor-navbar.tsx` (fixed-height top bar, PanelLeftOpen/PanelLeftClose sidebar toggle, dark bg + bottom border), `components/editor/project-sidebar.tsx` (floating overlay, no layout push, slides in from left, isOpen/onClose props, Projects header + close button, My Projects / Shared tabs with empty placeholder states, full-width New Project button), dialog pattern ready for future use via existing shadcn Dialog, page.tsx wired with useState to drive sidebar open/close. TypeScript compiles clean, zero lint errors.

## In Progress

- None.

## Next Up

- Feature 03 (TBD)

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
