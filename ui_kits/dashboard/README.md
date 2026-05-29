# Dashboard UI Kit · 转转通工作台

Full SaaS dashboard page for 转转通 merchant operators. Built from primitives in the design system (`colors_and_type.css` + icons under `assets/icons/`), no JS runtime.

## Files
- `index.html` — the dashboard. Open this to see the kit.
- `dashboard.css` — page-scoped styles. Imports nothing; relies on `../../colors_and_type.css`.

## Surfaces composed here
| Surface | Built from |
|---|---|
| **Left rail nav** (92 px) | Icon-only stack with stacked label, active state uses an accent-gradient icon chip + accent underline. |
| **Top bar** | Brand lockup + quick-action links + notification badges + user chip. |
| **Announcement bar** | Horizontal Alert variant with status tag prefix and per-row date. |
| **4-column todo board** | Single `Card` with 4 dividers, each column has a colored icon chip + 4 stats. |
| **Operational suggestions** | `sugg-row` (icon chip + body sentence with semantic highlights + trailing Link). |
| **Trading data** | KPI row (4 cards, active = blue border + glow) + segmented day/month toggle + line + dashed-line dual-axis chart. |
| **Merchant identity** | Avatar + identity string. |
| **Merchant tier bar** | Custom 4-segment progress bar with tier badge (T1/T2/T3/T4) sliding across; color encodes tier (red / purple / orange / green). |
| **限流 / 返佣 notices** | Notice rows in a `Card`, with semantic icon squares. |
| **保证金** | 2-column mini cards + outline `充值` buttons + dashed-foot summary. |
| **商家日历** | Mini month grid with multi-color event dots under each date + bottom 5-color legend. |

## Tier-bar — the only fully new component

A 4-segment horizontal bar with a circular badge that sits on the active segment. The component takes one of `active-T1 / active-T2 / active-T3 / active-T4` modifier classes; the active segment shows a soft gradient halo behind it.

```html
<div class="tier-bar active-T2">
  <div class="seg">T4</div><div class="seg">T3</div>
  <div class="seg">T2</div><div class="seg right">T1</div>
  <span class="badge T2" style="left: 50%;">T2</span>
</div>
```

The badge's `left:` / `right:` style positions it; T1 → right edge, T2 → 50%, T3 → 25%, T4 → left edge.

## Decisions worth knowing
- **B-end "rise is risk" semantics:** GMV / volume rising shows a red arrow; falling shows green. Inverted from C-end conventions. Easy to flip.
- **Brand red `#FF0F27` is logo-only.** UI semantic-red stays `#FF383C`.
- **Calendar event dots** are placeholders with 5 colors — red (双 11) / blue (快惠选) / green (新人首单) / purple (会员日) / orange (清仓特惠). Swap to your real campaign → color mapping.
- **Mock data** is illustrative; replace with real APIs in production.

## Not included (intentional placeholders)
- Real keyboard nav / focus management
- The other side-rail destinations (only "首页" is interactive)
- The 4 todo column items don't link out
- KPI cards don't actually swap the chart when clicked

These are styling-complete but behavior-stubs — wire as needed.
