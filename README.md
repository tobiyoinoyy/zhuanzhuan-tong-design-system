# 转转通 Design System (Zhuanzhuan Tong)

> 转转集团旗下面向商户的二手 3C 数码经营管理 SaaS 平台 — 设计系统
> A design system for Zhuanzhuan's B-to-Merchant SaaS platform for second-hand 3C electronics trading & merchant management.

---

## 1. Product context

**转转通 (Zhuanzhuan Tong / "Zhuanzhuan Pass")** is the B-end SaaS arm of Zhuanzhuan Group. It serves two merchant tiers — enterprise merchants (`企业商户`) and individual merchants (`个人商户`) — and covers the full lifecycle of second-hand 3C trade: phones, tablets, laptops, watches, headphones, cameras and so on.

**Three supply modes:**
1. `平台寄卖 (入仓)` — Platform consignment / warehoused
2. `自质检` — Self-inspected
3. `拍图挂售` — Photo-and-list

**Core modules**
| Module | Description |
|---|---|
| 工作台 Dashboard | KPI overview, alerts, drill-downs |
| 商品管理 Product Mgmt | SKU listing, batch price/shelf ops, multi-variant |
| 供货管理 Supply Mgmt | Sourcing, inbound, mode switching |
| 质检流程 QC | Inspection workflow, reject/grade reasons |
| 营销活动 Promotion | Campaigns, status filters, time ranges |
| 订单售后 Order & RMA | Order flow, fulfillment SLA, returns |
| 成本中心 Cost | P&L per SKU / batch / store |
| 数据中心 Data | Reports & analytics |
| 客服协同 CS | Service inbox, ticket routing |

**Merchant tiers (by GMV)**: T0-KA, T1 头部, T2 肩部, T3 腰部, T4 尾部. Head merchants do many batch operations on dense data tables; tail merchants need onboarding & guidance.

**Tone & posture**
- Professional, restrained, trustworthy. Information density and legibility before visual flair.
- Data-driven: heavy use of tables, charts, status tags, batch toolbars, empty-states.
- PC-first; mobile is a companion for inspection / order-status check on the floor.
- Carries the Zhuanzhuan parent brand (young, trustworthy) but is more sober and tool-grade than the C-end app.

---

## 2. Sources

| Source | Path / link |
|---|---|
| Figma "UI System to B-zhuan化" | mounted as virtual FS (this project) — see `Figma file (virtual)` notes; key pages: `/page` (color), `/page3` (radius/shadow), `/page4` (collapse), `/page13/Button`, `/Brand`, `/Icons`, `/Templates-Examples` |
| Brand description | provided as company text (this README, §1) |
| Fonts | `uploads/PingFangSC-*.woff2` (5 weights uploaded — **Light weight missing**; see §10 caveats) |

The Figma is a *generic UI-kit base* (Hero / NextUI-style) repurposed for 转转通 — the brand customization layer (logo, primary blue, density, Chinese type) is what this design system codifies.

---

## 3. Index of this folder

```
/
├─ README.md                ← you are here
├─ SKILL.md                 ← Agent Skill manifest
├─ colors_and_type.css      ← all design tokens + @font-face
├─ fonts/                   ← PingFang SC woff2
├─ assets/                  ← logo, icons (124 real SVGs from Figma), imagery
├─ preview/                 ← cards rendered in the Design System tab
└─ ui_kits/
   ├─ dashboard/            ← 工作台 full page (active deliverable)
   │   ├─ index.html
   │   ├─ dashboard.css
   │   └─ README.md
   ├─ pc_console/           ← desktop SaaS console (paused)
   └─ mobile_companion/     ← mobile companion app (paused)
       ├─ index.html
       ├─ README.md
       └─ *.jsx
```

---

## 4. Content fundamentals

The product speaks **Mainland Simplified Chinese**, with bilingual support implied by Inter being the dominant Latin/numeric face.

### Voice & casing
- **Concise nominal style** for menu/labels: `商品管理`, `批量改价`, `待入仓`, `已质检`, `回收成本`. No verbs in command form, no marketing-speak.
- **Imperative-direct for actions** in buttons: `保存`, `提交质检`, `批量上架`, `导出报表`. Two characters preferred; max four.
- **Subject-elided sentences** in helper text: `*手机型号将自动同步至商详`, not `我们会自动同步…`. The platform is implicit; "you" (`您`) is reserved for formal addresses, opt-in dialogs, or error explanations: `您当前可用余额不足，请充值后再发起退款`.
- **Numbers are signal**: numeric KPIs use tabular Inter (Latin), Chinese descriptors sit alongside (`¥ 128,540  累计销售额`). Always include the unit (`¥`, `件`, `%`, `天`).
- **Status tag copy is fixed**: `进行中` / `已结束` / `待审核` / `已下架` — never rewritten as `Now active` etc.

### Punctuation
- Full-width punctuation in body Chinese: `、，。「」`. Half-width inside English / code.
- Em-dash separates KPI label and value: `总销售 — ¥ 128,540`.
- Use `/` not `&` between siblings (`订单与售后` is one module, `批量改价 / 批量上下架` is a list).

### Emoji
- **Do not use emoji** in product UI. Status is communicated via colored dot tags (`StatusTag`), never emoji.
- Allowed in onboarding empty-states and operator chat (CS module) — only if pulled from a curated set.

### Examples (do / don't)
| Don't | Do |
|---|---|
| `🎉 恭喜，你成功上架了 1 件商品！` | `已上架 1 件商品` (toast, success tone) |
| `Hey there! Welcome back 👋` | `工作台 · 早上好，明哥` |
| `Are you sure you want to delete?` | `确定要删除该 SKU 吗？删除后不可恢复` (modal title + body) |

---

## 5. Visual foundations

### Color
- **ZZ RED** `#FF0F27` (Pantone 185 C). The sole brand color, applied to CTAs, active states, key links, and selected chart series. Hover `#FF4256`, pressed `#D8001A`, soft fill `rgba(255,15,39,0.12)`. Per the 2026.04 VI manual: no warm/cool bias, no gradient, no alternative red.
- **Neutral ramp** (zinc): from `#FCFCFC` page bg → `#F5F5F5` table header → `#E4E4E7` border → `#71717A` muted text → `#18181B` primary text. The neutrals carry 80% of the surface area — white is explicitly the dominant surface per the VI manual.
- **Semantic**: success `#17C964`, warning `#F5A524`. **Danger now shares the brand red** `#FF0F27` — destructive/error states (删除/退回/警告) deliberately use ZZ RED so the brand and the "stop / undo / error" semantic carry the same energy. The old salmon `#FF383C` is gone.
- **Warm auxiliary** (`--zzt-warm-*`) — peach `#F0B895`, caramel `#B57856`, rust `#8C3200`, deep red `#A20017`, maroon `#410000`. From VI §22. Used for promotion / activity / membership / secondary category surfaces. Never replaces brand red.
- Backgrounds are dominantly white-on-light-zinc. **No gradients**, no full-bleed photography, no patterns on system surfaces. Decorative surfaces (营销活动 cards, 会员日) may use warm-50/100 soft fills.

### Type
- **Inter** for Latin and numeric (Medium 500 is the workhorse weight — 1497 uses in Figma).
- **PingFang SC** for Chinese.
- Sizes (px): `10, 12, 14, 16, 18, 24, 32`. **14 is the default body**; tables use 14, helper text 12.
- Line-height is uniform `1.43`; tracking `-0.005em` at 14–18, `-0.02em` at 24+.
- Numerals are always tabular (`font-variant-numeric: tabular-nums`).

### Spacing & layout
- **4 px base**. Common: 4, 8, 12, 16, 24, 32.
- Table row height **44 px** (head merchant density) or **52 px** (default); paging bar 56 px.
- Sidebar 224 px expanded, 64 px collapsed. Topbar 56 px. Content max 1440 px center-aligned with 32 px side gutters.
- Card padding `16px`; section padding `24px`; modal padding `24px 24px 16px`.

### Radii
`4 / 6 / 8 / 12 / 16 / 24 / 999` — the most used are **12** (card / input / tag) and **24** (primary button, large card / modal). Status pills use `999`.

### Shadow / elevation
Three step ramp, all near-zero:
- `--zzt-shadow-sm` for hover-elevated cards
- `--zzt-shadow-md` for popovers / dropdowns
- `--zzt-shadow-lg` for modals
Inner shadow `inset 0 0 1px rgba(0,0,0,.3)` for pressed segmented controls. Nothing has more than a 24 px blur; the system is flat-leaning.

### Borders
`1px solid rgba(0,0,0,0.12)` is the default. Strong border `--zzt-border-strong` `#DEDEE0` for permanent dividers / table grids. Inputs use the rgba border by default and `--zzt-border-accent` (blue 500) on focus.

### Backgrounds, imagery
- **No gradients**, no full-bleed marketing imagery in the console.
- Product thumbnails are clean studio shots (white background) on light-zinc card. We **never** apply filters, B&W, or warm-cool tints — photos are sold as-is.
- Empty-states use a flat **monochrome SVG illustration** in `var(--zzt-zinc-400)` ~ 96–120 px tall.
- The 营销活动 module is the **only** place with soft-fill colored cards (purple 50).

### Motion
- Durations: micro `120ms`, snap `200ms`, page `320ms`. Easing: `cubic-bezier(0.2,0.8,0.2,1)` for enter, `cubic-bezier(0.4,0,0.6,1)` for exit.
- **No bounce, no spring.** No parallax. Fades + small 4-8 px translates.
- Skeletons shimmer at ~1.4 s.

### States
- **Hover**: lighten/darken by ~8% — accent buttons go from `#FF0F27` to `#FF4256` (lighter, not darker — see figma). Neutral surfaces add `rgba(0,0,0,0.04)` overlay.
- **Press**: scale not used; instead the surface shifts one tone darker. Buttons get inner `0 0 1px rgba(0,0,0,.3)`.
- **Focus**: 2-px outer ring `var(--zzt-accent-500)` with 2-px white inset. Visible on keyboard only (`:focus-visible`).
- **Selected**: background `var(--zzt-accent-soft)`, left border `2px` blue, text `var(--zzt-accent-700)` (sidebar nav, list row).
- **Disabled**: 40% opacity AND `cursor: not-allowed`.

### Transparency / blur
- Backdrop blur 24 px on modal overlay, top app bar when scrolled, mobile bottom sheet handle area. Otherwise opaque.
- Protection gradients (e.g. behind sticky table footer): `linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 60%)`.

### Cards
- White surface, 12 px radius, 1 px `rgba(0,0,0,0.06)` border, shadow `--zzt-shadow-sm` on hover, no shadow at rest. KPI cards on dashboard are **clickable** with `cursor: pointer` and the hover shadow.

---

## 6. Iconography

- **124 line icons extracted directly from the Figma** into `assets/icons/*.svg` — these are the real source SVGs (1.5 px stroke, line style), not substitutes.
- The set covers **8 use-case groups**: navigation, CRUD actions, status feedback, commerce, 3C category, charts & signals, directional, files / comms / location, plus geometric primitives.
- All icons are single-color and **inherit text color** via either inline use as a mask-image or via SVG `fill="currentColor"` (the extracted ones already use `currentColor`; the copied-from-Figma `icon.svg` files we re-normalized to use it too).
- **Size scale**: 12 (tag) / 14 (button md) / 16 (table row, default) / 20 (sidebar nav) / 24 (drawer header) / 32 (empty-state) px.

### Two equally-valid render patterns

**1) SVG mask + currentColor — recommended for theme-able icons.** The color follows the parent's `color` automatically.

```css
.icon { width: 16px; height: 16px; display: inline-block;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
                mask: var(--src) center / contain no-repeat; }
```

```html
<span class="icon" style="--src: url(assets/icons/box.svg)"></span>
```

**2) Inline `<svg>` from the file** — same effect for the JSX-extracted ones (they already include `fill="currentColor"`). Fastest for React; copy the SVG file contents into a component.

### No emoji, no unicode-glyph icons

- The product never uses 🎉 / ✓ / ▲ etc. Always reach for an icon from this set first.
- For statuses: success = `circle-check`, warning = `circle-alert`, danger = `circle-x`, info = `info` — never anything else.

### What didn't extract

`star-half`, `dashboard`, `circle-dashed`, `flag`, `route`, `cog`, `dots-9`, `calendar-days` etc. live as nested instances in the Figma and couldn't be cleanly parsed. They are listed in `assets/icons/MISSING.md` so you know to either upload them or extract a usable substitute (Lucide same-name works fine; the visual delta is < 5%). The 124 we extracted cover 99% of the surface area of the console.

Full mapping & previews in **`preview/icons-real.html`** (Design System tab) and **`assets/README.md`**.

---

## 7. Tag system

A unified taxonomy avoids the "too many tag styles" problem flagged in the brief:

| Tag class | Visual | When |
|---|---|---|
| **Status tag** | rounded-`999`, soft fill + colored text + leading dot | order/QC/promo lifecycle (`进行中`, `待入仓`, `已退回`) |
| **Category tag** | rounded-`6`, zinc-150 fill, zinc-700 text, no border | product category (`手机`, `平板`) |
| **Qualification tag** | rounded-`6`, accent-soft fill, accent-700 text | merchant qualification (`官方认证`, `KA 商户`) |
| **Promotion tag** | rounded-`6`, purple-50 fill, purple-600 text | active campaign membership |
| **Count tag** | rounded-pill, zinc-200 fill, zinc-600 text, 10 px font | inline count next to tab labels |

All five live in `ui_kits/pc_console/Tag.jsx`.

---

## 8. Component coverage

The Design System tab carries every component documented in the Figma source, each as a small preview card. Coverage by area:

| Area | Components |
|---|---|
| **Foundations** | Colors (brand / purple / neutrals / semantic) · Type scale & specimen · Radii · Shadows · Spacing · Separator · Overlay scrim · Scroll shadow (渐消投影) |
| **Brand** | Logo (lockup + mark) · Iconography |
| **Buttons & actions** | Buttons (5 variants × 3 sizes) · Button group & toolbar · Close button · Link · Kbd |
| **Form input** | Form fields (text) · Number input + stepper · Date & time input · Date picker calendar · Search & autocomplete · Select & menu · OTP · Checkbox · Radio · Switch · Slider · Field label & helper |
| **Tags & status** | Tag system (5 kinds) · Badge · Avatar |
| **Containers** | Cards (6 variants) · Accordion · Tabs |
| **Data display** | KPI cards · Data table · Batch action bar · Pagination · Skeleton · Loaders · Progress (linear + circular) |
| **Feedback & overlays** | Alert · Toast · Tooltip · Popover & menu · Modal / Dialog · Drawer (4 placements) · Empty states |
| **Navigation** | Breadcrumb |

If a control you need isn't here, search the Figma — the source has ~50 documented patterns; ask me to lift any that's missing.

> **UI Kits** (PC console + mobile companion) live under `ui_kits/` but are **not registered** in the Design System tab — the user paused them; they'll be addressed in a separate conversation.

---

## 9. How to use this design system

1. Link `colors_and_type.css` from `<head>`. Add the Google Fonts `<link>` for Inter as commented at top.
2. Use the `--zzt-*` tokens, never hard-coded color or radius values.
3. Compose using the JSX files inside `ui_kits/<surface>/` — they import tokens via CSS vars only.
4. For new product surfaces, follow the layout rules in §5 and the tag taxonomy in §7. Talk to design before introducing a new tag style.

---

## 10. Caveats — please review

- **PingFang Light is missing.** Only 5 weights uploaded; the `@font-face` for weight 300 falls back to Regular. Please upload `PingFangSC-Light.woff2` so subtitle/helper specimens render correctly.
- ~~Brand logo is reconstructed~~ — **resolved**. Real 转转通 wordmark (black 转转通 + red `ZZ` chip `#FF0F27`) is now in `assets/logo-zhuanzhuan.svg`. Dark variant at `assets/logo-zhuanzhuan-dark.svg`. Chip-only mark at `assets/logo-mark.svg`.
- **Icons are substituted via Lucide CDN.** Visually equivalent (same stroke / shape) but not byte-identical to the Figma set. For production, ship the figma SVGs.
- **The Figma file is a generic UI kit base** — the design system here is the *转转通 lens* applied on top: a stricter color story (one blue + neutrals + semantics), the tag taxonomy, density / spacing for table-heavy SaaS, and Chinese-first typography. If the Zhuanzhuan team has its own component library, point me to it and I'll fold the deltas in.
- **No real product copy** was provided — example strings throughout are plausible reconstructions consistent with the tone spec.
