# PC Console UI Kit

Desktop merchant console for 转转通. Single-page, no real backend — wired to demo data so
the user can click through 工作台 → 商品管理 (with batch selection & toolbar) → 营销活动 → 订单售后 → 质检结果抽屉.

## Files
- `index.html` — entry. Wires the shell with React + Babel, loads the JSX files below.
- `console.css` — all kit-level styles (`.zzt-*`). Loads after the root `colors_and_type.css`.
- `Shell.jsx` — `<Shell active onNav>` (sidebar + topbar + body), plus `<Sidebar>`, `<Topbar>`, and the `NAV` table.
- `Primitives.jsx` — `<Button>`, `<IconButton>`, `<Tag>`, `<StatusTag>`, `<Card>`, `<KPI>`, `<SegmentedControl>`, `<EmptyState>`, `<Toast>`. Each is a small, self-contained surface; all use only design-system tokens.
- `Dashboard.jsx` — 工作台. KPI grid + custom area chart + tasks + breakdown bars + recent promos.
- `Products.jsx` — 商品管理. Tabs by status, filters chips, dense table with thumb/grade/status, multi-select drives the floating batch toolbar.
- `Promotion.jsx` — 营销活动. Status tabs (进行中 / 未开始 / 已结束), card grid with soft-purple promo theme.
- `Orders.jsx` — 订单售后. Order list with SLA chip + side detail panel with履约进度 timeline.
- `QCDrawer.jsx` — 质检结果抽屉. Right-side drawer with summary, structured per-item results, suggested actions.

## Patterns to lift
- **Status tag taxonomy** — see `<StatusTag tone="success|warning|danger|info|neutral">`. Use these for every lifecycle indicator and do not invent new tones.
- **Batch selection pattern** — `<BatchBar>` in `Products.jsx`. Floats above the table at fixed bottom-center; appears only when `Set` of selected ids is non-empty.
- **KPI cards are clickable** — every dashboard tile drills down via `onClick` to its module (`onNav("orders")` etc.). Keep that affordance.
- **Side-by-side master-detail** — see `<Orders>`. 7/5 split: list on the left, detail card on the right.
- **Drawer over modal** — Use the QC drawer pattern for inspection / detail flows that may need scrolling and contain action footers. Modal is for confirms.

## Interactions in the demo
- Click any sidebar item to switch screens. 占位 modules show an empty card.
- In **商品管理**, click checkboxes (header check selects all visible). A batch toolbar floats up.
- Click the `…` button on a `质检中` / `质检退回` row to open the QC drawer.
- In **订单售后**, click any list row to swap the right-side detail.
- The QC nav item is wired as a shortcut: it jumps to 商品管理 and pre-opens a sample QC drawer.

## Not implemented (intentional)
- Real form modals (new product / new promotion).
- Cost center, data center, customer service screens — placeholder empty-state.
- Calendar / time-range picker (provided in the figma; substitute via a date library in production).
