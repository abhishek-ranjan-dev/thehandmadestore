# Admin Backend — Architecture

Concise reference for the server side of the `/admin` module (the CMS). Unlike
the [shop backend](./backend-architecture.md), **admin is a scaffold today** —
there are no API routes, no data layer, and no auth yet. This doc records what
exists, the seams already in place, and the intended shape so the next build
slots in cleanly.

> Sibling: [`backend-architecture.md`](./backend-architecture.md) (shop).
> Module split (marketing / shop / admin) is via Next route groups.

---

## 1. Current state

```
app/admin/
├── layout.tsx   Own shell (no public SiteHeader/Footer); noindex metadata
├── page.tsx     Placeholder dashboard — reads PRODUCTS.length
└── admin.css    Segment-scoped styling
```

- **No `app/api/admin/*` routes**, no `lib/` module owned by admin, no database.
- **No authentication** — the segment is currently open.
- The only data touchpoint: `page.tsx` imports `PRODUCTS` from
  [`lib/products.ts`](../lib/products.ts) — the same in-code catalogue the
  storefront renders.

The layout is deliberately isolated: its own shell and
`robots: { index: false, follow: false }` so the CMS is never indexed.

---

## 2. Seams already in place

These are the deliberate hooks the current code leaves for the real backend:

| Seam | Where | Becomes |
|---|---|---|
| Shared product model | `lib/products.ts`, imported by both storefront and admin | The single spot to swap the in-code array for a DB-backed model. Admin will **write** it; the shop **reads** it. |
| Isolated segment shell | `app/admin/layout.tsx` | Where the authenticated CMS chrome (nav, user menu) lands. |
| `noindex` metadata | `app/admin/layout.tsx` | Stays — CMS must never be indexed. |
| Auth TODO | `app/admin/layout.tsx` (`TODO(auth)`) | `middleware.ts` gating `/admin/:path*` (see §3). |

---

## 3. Planned backend (not yet built)

The code calls out the intended direction; capturing it here so it isn't lost.

### Auth (first thing to add)
Next 16 idiom: a root `middleware.ts` matching `/admin/:path*`, redirecting
unauthenticated requests to a sign-in route. This is the gate for the whole
segment — everything below assumes it exists.

```
middleware.ts  ── matcher: /admin/:path*
   └─ no session → redirect to sign-in
```

### Data layer
Today's catalogue is a static array in `lib/products.ts`. The CMS needs
**mutation**, so this is the natural point to introduce a database (Prisma/
Postgres, mirroring the swap-point noted in the shop's `lib/orders.ts`). The
shop's in-memory order store (`lib/orders.ts`) becomes admin's **Orders** view
once both are DB-backed.

### API surface (anticipated)
Route handlers under `app/api/admin/*` (Node runtime, behind the auth
middleware), roughly:

| Resource | Operations |
|---|---|
| Products | list / create / update / delete, inventory |
| Orders | list / view / update status (reads the shop's order store) |
| Content | marketing/site content editing |

---

## 4. When building the CMS

1. **Add auth first** (`middleware.ts`) — do not ship admin routes ungated.
2. **Introduce the DB** at `lib/products.ts` (and `lib/orders.ts`) so admin
   writes and the storefront reads the same source.
3. **Add `app/api/admin/*`** handlers behind the middleware; keep credentials
   and mutations server-only, matching the shop backend's conventions.
4. Keep the segment `noindex` and its isolated shell.
