# 转转通 Design System v0.29.2 implementation handoff

This archive is the source of truth for turning the design into production code. Start from `index.html`, then preserve the visual system, responsive behavior, and interactions found in the exported files.

## Implementation target
- Build production UI from the exported design, not a loose reinterpretation.
- Preserve typography scale, spacing rhythm, color tokens, border radii, shadows, motion timing, and component states.
- Replace static placeholders only when the target app has real data or functional equivalents.
- Keep generated product UI free of Open Design chrome, preview labels, or design-process annotations.
- Treat this handoff as a visual contract: if implementation choices conflict, match the exported pixels and behavior first, then refactor internals.

## Source map
- Primary entry: `index.html`
- HTML screens detected: 76
- Stylesheets detected: 6
- Script/component files detected: 9
- Supporting assets detected: 167

## Responsive contract
Validate the implementation across this 2025–2026 viewport matrix:
- Mobile compact: 360×800
- Mobile standard: 390×844
- Mobile large: 430×932
- Foldable / small tablet: 600×960
- Tablet portrait: 820×1180
- Tablet landscape: 1024×768
- Laptop: 1366×768
- Desktop: 1440×900
- Wide desktop: 1920×1080

For responsive web exports, treat these as a modern breakpoint system for one adaptive web experience, not three fixed screenshots. Do not split responsive web into unrelated native app screens unless the project explicitly includes native targets. Use semantic layout thresholds, fluid `clamp()` type/spacing, and container queries where component width matters more than viewport width. Preserve any CSS media queries, container queries, fluid `clamp()` scales, and layout changes already present in the exported files.

## Design fidelity contract
- Extract reusable tokens before writing components: background, surface, foreground, muted text, border, accent, radius, shadow, spacing, type scale, and motion duration/easing.
- Map product screens, in-app modules/components, optional landing page, and optional OS widget surfaces before coding. Keep these surfaces separate in the target architecture.
- Match layout geometry: max-widths, gutters, grid columns, card proportions, sticky/fixed elements, and viewport-specific navigation.
- Preserve real copy, labels, and data shown in the export. Do not replace specific text with generic marketing filler.
- Preserve interactive affordances: hover, focus, pressed, disabled, loading, validation, copy/share, tab/accordion, modal/sheet, and keyboard states where present.
- Preserve accessibility semantics when converting: headings stay hierarchical, controls remain buttons/links/inputs, focus states stay visible.
- Do not keep prototype-only annotations, frame labels, or Open Design chrome in the production UI.

## CJX-ready UX contract
- Use `DESIGN-MANIFEST.json` as the machine-readable map for screens, app modules, OS widgets, landing pages, tokens, interactions, and viewport checks.
- Screen-file-first: when multiple user-facing surfaces exist, implement each HTML screen as its own route/file. Treat `index.html` as a launcher/overview when the manifest marks it that way, not as a combined final UI.
- If `landing.html`, app screens, platform screens, or OS widget files exist, preserve those boundaries in the target app instead of merging them into one page.
- A single self-contained `index.html` is acceptable only when the export truly contains one user-facing screen and its CSS/JS are structured enough to extract tokens, components, states, and behavior.
- If separate `css/` or `js/` files exist, treat them as source of truth for token/component/interactions before porting to React, Vue, SwiftUI, Compose, or another target stack.
- In-app modules/components are product UI blocks inside the app. OS widgets are home-screen/lock-screen/quick-access surfaces outside the app. Do not merge those concepts.

## Color and brand contract
- Use the exported design tokens and product/domain context as the color source of truth.
- Do not introduce warm beige / cream / peach / pink / orange-brown background washes unless they are already explicit brand/reference colors in the export.
- A stylesheet or design/token file was detected; inspect it for canonical color variables before choosing framework theme tokens.

## Implementation sequence for AI coding tools
1. Open `index.html` and `DESIGN-MANIFEST.json`; identify every screen file, launcher/overview file, app module, and interaction before coding.
2. If multiple HTML screens exist, map them to separate routes/surfaces first; do not merge `landing.html`, product app screens, platform screens, or OS widgets into one route.
3. Extract a token table from CSS/root styles and inline styles before building framework components.
4. Build product screens and domain-specific in-app modules from largest layout regions down to controls; avoid starting with isolated atoms that lose spatial intent.
5. Port responsive behavior across the modern viewport matrix and test each semantic breakpoint before cleanup.
6. Port interactions and states, then replace static placeholders only with real app data or functional equivalents.
7. Keep optional landing page and OS widget surfaces as separate surfaces if present.
8. Compare final screenshots against the export at 360×800, 390×844, 430×932, 820×1180, 1024×768, 1366×768, 1440×900, and 1920×1080 before declaring done.

## Entry points
- `explorations/tab-badge-options.html`
- `index.html`
- `preview/accordion.html`
- `preview/alert.html`
- `preview/avatar.html`
- `preview/badge.html`
- `preview/batch-toolbar.html`
- `preview/brand-graphic.html`
- `preview/brand-logo.html`
- `preview/breadcrumb.html`
- `preview/button-group-toolbar.html`
- `preview/buttons.html`
- `preview/cards.html`
- `preview/carousel.html`
- `preview/checkbox.html`
- `preview/close-button.html`
- `preview/color-picker.html`
- `preview/colors-brand.html`
- `preview/colors-neutrals.html`
- `preview/colors-semantic.html`
- `preview/condition-badge.html`
- `preview/data-table.html`
- `preview/date-time-input.html`
- `preview/datepicker.html`
- `preview/drawer.html`
- `preview/empty-states.html`
- `preview/field-helper.html`
- `preview/form-fields.html`
- `preview/iconography.html`
- `preview/icons-catalog.html`
- `preview/icons-real.html`
- `preview/icons-usage.html`
- `preview/image-gallery.html`
- `preview/kbd.html`
- `preview/kpi-cards.html`
- `preview/link.html`
- `preview/loaders.html`
- `preview/modal.html`
- `preview/number-input.html`
- `preview/otp.html`
- `preview/overlay-scrim.html`
- `preview/pagination.html`
- `preview/popover-menu.html`
- `preview/progress.html`
- `preview/radii.html`
- `preview/radio.html`
- `preview/rate-grade.html`
- `preview/result-pages.html`
- `preview/scroll-shadow-backdrop.html`
- `preview/scroll-shadow.html`
- `preview/search-autocomplete.html`
- `preview/select-menu.html`
- `preview/separator.html`
- `preview/shadows.html`
- `preview/sidebar.html`
- `preview/skeleton.html`
- `preview/slider.html`
- `preview/spacing.html`
- `preview/stepper.html`
- `preview/switch.html`
- `preview/tab-badge-variants.html`
- `preview/tabs.html`
- `preview/tags.html`
- `preview/time-date-input.html`
- `preview/toast.html`
- `preview/tooltip.html`
- `preview/topbar.html`
- `preview/transfer.html`
- `preview/tree-cascader.html`
- `preview/type-scale.html`
- `preview/type-specimen.html`
- `preview/upload.html`
- `ui_kits/dashboard/index.html`
- `ui_kits/dashboard/products.html`
- `ui_kits/mobile_companion/index.html`
- `ui_kits/pc_console/index.html`

## Styles
- `colors_and_type.css`
- `preview/_card.css`
- `ui_kits/dashboard/dashboard.css`
- `ui_kits/dashboard/products.css`
- `ui_kits/mobile_companion/mobile.css`
- `ui_kits/pc_console/console.css`

## Scripts/components
- `design-canvas.jsx`
- `ui_kits/mobile_companion/MobileApp.jsx`
- `ui_kits/pc_console/Dashboard.jsx`
- `ui_kits/pc_console/Orders.jsx`
- `ui_kits/pc_console/Primitives.jsx`
- `ui_kits/pc_console/Products.jsx`
- `ui_kits/pc_console/Promotion.jsx`
- `ui_kits/pc_console/QCDrawer.jsx`
- `ui_kits/pc_console/Shell.jsx`

## Assets and supporting files
- `assets/icons/alert-triangle.svg`
- `assets/icons/archive.svg`
- `assets/icons/arrow-down.svg`
- `assets/icons/arrow-left.svg`
- `assets/icons/arrow-right.svg`
- `assets/icons/arrow-up.svg`
- `assets/icons/ban.svg`
- `assets/icons/bell.svg`
- `assets/icons/bolt.svg`
- `assets/icons/bookmark.svg`
- `assets/icons/box.svg`
- `assets/icons/boxes.svg`
- `assets/icons/building.svg`
- `assets/icons/calendar.svg`
- `assets/icons/camera.svg`
- `assets/icons/caret-down.svg`
- `assets/icons/caret-up.svg`
- `assets/icons/chart-bar.svg`
- `assets/icons/chart-column.svg`
- `assets/icons/chart-line.svg`
- `assets/icons/chart-pie.svg`
- `assets/icons/check-2.svg`
- `assets/icons/check.svg`
- `assets/icons/chevron-down.svg`
- `assets/icons/chevron-left.svg`
- `assets/icons/chevron-right.svg`
- `assets/icons/chevron-up.svg`
- `assets/icons/circle-alert.svg`
- `assets/icons/circle-check.svg`
- `assets/icons/circle-minus.svg`
- `assets/icons/circle-plus.svg`
- `assets/icons/circle-small.svg`
- `assets/icons/circle-x.svg`
- `assets/icons/circle.svg`
- `assets/icons/clock.svg`
- `assets/icons/close.svg`
- `assets/icons/comment.svg`
- `assets/icons/comments.svg`
- `assets/icons/copy.svg`
- `assets/icons/credit-card.svg`
- `assets/icons/crown.svg`
- `assets/icons/delete.svg`
- `assets/icons/diamond.svg`
- `assets/icons/download.svg`
- `assets/icons/edit.svg`
- `assets/icons/equal.svg`
- `assets/icons/external-link.svg`
- `assets/icons/external.svg`
- `assets/icons/eye-off.svg`
- `assets/icons/eye.svg`
- `assets/icons/file.svg`
- `assets/icons/filter.svg`
- `assets/icons/flame.svg`
- `assets/icons/folder-open.svg`
- `assets/icons/folder.svg`
- `assets/icons/folders.svg`
- `assets/icons/gear.svg`
- `assets/icons/gift.svg`
- `assets/icons/globe.svg`
- `assets/icons/grip.svg`
- `assets/icons/hammer.svg`
- `assets/icons/headphones.svg`
- `assets/icons/heart.svg`
- `assets/icons/help.svg`
- `assets/icons/home.svg`
- `assets/icons/image.svg`
- `assets/icons/info.svg`
- `assets/icons/key.svg`
- `assets/icons/keyboard.svg`
- `assets/icons/laptop.svg`
- `assets/icons/link.svg`
- `assets/icons/lock-open.svg`
- `assets/icons/lock.svg`
- `assets/icons/mail.svg`
- `assets/icons/map-pin.svg`
- `assets/icons/medal.svg`
- `assets/icons/megaphone.svg`
- `assets/icons/microphone.svg`
- `assets/icons/minus.svg`
- `assets/icons/MISSING.md`
- `assets/icons/moon.svg`
- `assets/icons/more-horizontal.svg`
- `assets/icons/more-vertical.svg`
- `assets/icons/paperclip.svg`
- `assets/icons/pause.svg`
- `assets/icons/percent.svg`
- `assets/icons/person.svg`
- `assets/icons/pin.svg`
- `assets/icons/play.svg`
- `assets/icons/plus.svg`
- `assets/icons/printer.svg`
- `assets/icons/qr-code.svg`
- `assets/icons/receipt.svg`
- `assets/icons/refresh.svg`
- `assets/icons/rocket.svg`
- `assets/icons/save.svg`
- `assets/icons/scan.svg`
- `assets/icons/search.svg`
- `assets/icons/share.svg`
- `assets/icons/shield-check.svg`
- `assets/icons/shield.svg`
- `assets/icons/shopping-bag.svg`
- `assets/icons/shopping-cart.svg`
- `assets/icons/sliders.svg`
- `assets/icons/smartphone.svg`
- `assets/icons/square.svg`
- `assets/icons/star.svg`
- `assets/icons/stop.svg`
- `assets/icons/sun.svg`
- `assets/icons/tag.svg`
- `assets/icons/tags.svg`
- `assets/icons/target.svg`
- `assets/icons/thumbs-down.svg`
- `assets/icons/thumbs-up.svg`
- `assets/icons/ticket.svg`
- `assets/icons/triangle-down.svg`
- `assets/icons/triangle-up.svg`
- `assets/icons/trolley.svg`
- `assets/icons/upload.svg`
- `assets/icons/user-plus.svg`
- `assets/icons/user-x.svg`
- `assets/icons/users.svg`
- `assets/icons/video.svg`
- `assets/icons/wallet.svg`
- `assets/icons/wrench.svg`
- `assets/icons/zap.svg`
- `assets/logo-mark.svg`
- `assets/logo-zhuanzhuan-dark.svg`
- `assets/logo-zhuanzhuan.svg`
- `assets/products/huawei-p30-blue.png`
- `assets/products/iphone-11-red.png`
- `assets/products/iphone-11-white.png`
- `assets/README.md`
- `CLAUDE.md`
- `fonts/PingFangSC-Medium.woff2`
- `fonts/PingFangSC-Regular.woff2`
- `fonts/PingFangSC-Semibold.woff2`
- `fonts/PingFangSC-Thin.woff2`
- `fonts/PingFangSC-Ultralight.woff2`
- `README.md`
- `screenshots/sidebar-products.png`
- `screenshots/sidebar-v2.png`
- `SKILL.md`
- `ui_kits/dashboard/README.md`
- `ui_kits/mobile_companion/README.md`
- `ui_kits/pc_console/README.md`
- `uploads/26转转vi使用规范手册.pdf.pdf`
- `uploads/Clipboard_Screenshot_1779700151.png`
- `uploads/Clipboard_Screenshot_1779701198.png`
- `uploads/Clipboard_Screenshot_1779702077.png`
- `uploads/Clipboard_Screenshot_1779704006.png`
- `uploads/Clipboard_Screenshot_1779704110.png`
- `uploads/Clipboard_Screenshot_1779711482.png`
- `uploads/Clipboard_Screenshot_1779764932.png`
- `uploads/Clipboard_Screenshot_1779766408.png`
- `uploads/Clipboard_Screenshot_1779773670.png`
- `uploads/Clipboard_Screenshot_1779773716.png`
- `uploads/Clipboard_Screenshot_1779773824.png`
- `uploads/Clipboard_Screenshot_1779774704.png`
- `uploads/Clipboard_Screenshot_1779775184.png`
- `uploads/Clipboard_Screenshot_1779775288.png`
- `uploads/Clipboard_Screenshot_1779775377.png`
- `uploads/Clipboard_Screenshot_1779775658.png`
- `uploads/Clipboard_Screenshot_1779775777.png`
- `uploads/Clipboard_Screenshot_1779775990.png`
- `uploads/pasted-1779765665244-0.png`
- `uploads/zhuanzhuan-vi.pdf`

## Coding checklist for AI tools
1. Inspect `index.html` and `DESIGN-MANIFEST.json` first and identify reusable components before coding.
2. Implement each user-facing screen file as its own route/surface; keep launcher, landing, app, platform, and OS widget files separate.
3. Extract design tokens into the target stack: colors, type scale, spacing, radius, shadows, and motion.
4. Implement layout with real 2025–2026 responsive breakpoints, fluid type/spacing, and container-query-aware component behavior; test with no horizontal overflow.
5. Preserve interactive controls, hover/focus/pressed states, form behavior, validation, and copy actions where present.
6. Implement domain-specific in-app modules with real states; do not flatten them into generic cards.
7. Keep landing page, product screens, and OS widget/quick-access surfaces separate when present.
8. Confirm the production result visually matches the exported design before refactoring internals.
9. Reject implementation shortcuts that flatten the design into generic cards, generic gradients, placeholder stats, or framework-default typography.
10. If a detail is ambiguous, keep the exported HTML/CSS/JS behavior rather than inventing a new pattern.
