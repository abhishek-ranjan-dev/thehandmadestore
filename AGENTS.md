<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:workflow-rules -->
# Workflow rules

## Never run `npm run dev`
A dev server is always already running in the user's VS Code terminal on port 3000. Starting another instance (foreground OR background) kills theirs. **Do not** run `npm run dev`, `next dev`, or anything that binds :3000. To verify a change compiles, run `npm run build` (Next 16 exits non-zero on type/compile errors) or `npx tsc --noEmit`. To sanity-check rendered HTML, `curl -s http://localhost:3000/<path>` against the user's existing server.

## Spawn agents in parallel for non-trivial work
When a task has multiple independent pieces — separate components, separate files, separate research threads — dispatch them as parallel `Agent` calls in a single message (one message, multiple tool blocks). Reserve solo execution for tightly-coupled edits to a single file or trivial one-liners. Independent components (Header vs Footer, three unrelated sections, etc.) should always fan out.
<!-- END:workflow-rules -->
