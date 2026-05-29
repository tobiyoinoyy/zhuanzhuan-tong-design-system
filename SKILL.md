---
name: zhuanzhuan-tong-design
description: Use this skill to generate well-branded interfaces and assets for 转转通 (Zhuanzhuan Tong), the B-end SaaS platform for second-hand 3C trading merchants. Contains color tokens, type, fonts, icon guidance, tag taxonomy, and full UI kits (PC console + mobile companion) for prototyping or production design work.
user-invocable: true
---

# 转转通 Design Skill

Read `README.md` in this directory first — it covers product context, content fundamentals, visual foundations, iconography, the tag taxonomy, and a manifest of every other file.

## What's here
- `README.md` — master reference. Read this first.
- `colors_and_type.css` — drop-in stylesheet. All `--zzt-*` CSS variables plus `@font-face` for PingFang SC. Latin/numeric type uses Inter (load from Google Fonts).
- `fonts/` — PingFang SC woff2 files.
- `assets/` — logo, mark, plus an icon mapping (`README.md`) pointing to Lucide.
- `preview/` — small cards that render every token group (colors, type, radii, shadows, spacing, buttons, tags, forms, KPI, tables, batch toolbar, empty states, icons). Open them as standalone HTML to inspect.
- `ui_kits/pc_console/` — full PC merchant console kit. Open `index.html` to see it interactive; `*.jsx` files are the reusable components.
- `ui_kits/mobile_companion/` — mobile companion in an iPhone frame. Same data model, scaled-down patterns.

## How to use

### When creating visual artifacts (slides, mocks, throwaway prototypes)
1. Always link `colors_and_type.css` first; this gives you every token via `var(--zzt-*)`.
2. Reuse components by copying the relevant `*.jsx` files out of `ui_kits/<surface>/` rather than rewriting from scratch.
3. Default font stack is already set on `body`: `Inter` for Latin/numerals + `PingFang SC` for Chinese.
4. Use Lucide icons from CDN (`<script src="https://unpkg.com/lucide@latest"></script>`, then `<i data-lucide="package"></i>` and `lucide.createIcons()`).
5. Copy `assets/logo-zhuanzhuan.svg` for the lockup, or `assets/logo-mark.svg` for the chip-only mark.

### When working on production code
- Treat `colors_and_type.css` as the SSOT for tokens — port the variables into your CSS-in-JS / Tailwind theme.
- The tag taxonomy in `README.md §7` is the rule, not a suggestion. Add new tag types only after a system review.
- Density: PC tables 44 px (head merchants) or 52 px (default). Buttons radius **24 px** (`pill`); cards/inputs **12 px**.
- Never use gradients in the PC console. The mobile home-screen KPI gradient is the only sanctioned gradient.

## If invoked without specific guidance
Ask what surface and which module the user wants to design for (工作台 / 商品管理 / 营销活动 / 订单售后 / 质检流程 / something else), whether it's PC or mobile, and whether they want a static HTML mock or production-ready components. Then operate as an expert in this design system, using its tokens, taxonomy and component patterns.

## Caveats to flag
- PingFang Light woff2 is missing; weight 300 falls back to Regular.
- Brand logo is a placeholder reconstruction — swap in the real 转转通 wordmark when provided.
- Icons are Lucide via CDN as a visually-equivalent substitute for the Figma's bundled set.
