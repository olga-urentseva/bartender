# CLAUDE.md

## Package Manager

Always use `pnpm`. Never use `npm` or `yarn`.

## Tech Stack

- React 19, TypeScript, Vite
- CSS Modules for styling (no styled-components)
- React Router v6 for routing
- Vitest + Testing Library for tests
- ESLint + Prettier for linting and formatting

## Code Style

- Prefer functional components with hooks
- No `any` types — use proper TypeScript types or `unknown`
- Keep components small and focused; extract logic into custom hooks in `src/hooks/`
- Use CSS Modules (`.module.css`) for component styles — no inline styles, no global classes
- Imports: external libs first, then internal modules, then relative imports

## Testing

Run tests with `pnpm test`. Tests live next to their source files or under `src/test/`.

- Write tests for non-trivial logic and custom hooks
- Use Testing Library queries (`getByRole`, `getByText`) over `querySelector`
- Mock at the network boundary using MSW (already configured in `src/__mocks__/`)

## Definition of Done

Before considering any task complete, verify the following commands all pass without errors:

1. **Type check** — `pnpm build` runs `tsc && vite build`, so a successful build confirms no type errors.
2. **Build** — `pnpm build`
3. **Dev server starts** — `pnpm dev` (confirm it starts without errors, let me (real person) check it on localhost)

## What NOT to Do

- Do not add comments that restate what the code does — only comment non-obvious logic
- Do not add extra error handling, abstractions, or features beyond what was asked
- Do not commit secrets, `.env` files, or credentials
- Do not skip pre-commit hooks (`--no-verify`)
