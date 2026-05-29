# Mobile Companion UI Kit

Mobile companion app for the same merchant operator. Wraps everything inside an iPhone-style frame at 375 × 812 px.

## Files
- `index.html` — entry. Mounts `<MobileApp />`.
- `mobile.css` — all styles prefixed `.m-*`. Loads after the root `colors_and_type.css`.
- `MobileApp.jsx` — the app. Includes `<MobileApp>` (root with tab routing), `<StatusBar>`, `<HomeScreen>`, `<OrdersScreen>`, `<OrderDetailScreen>`, `<QCScreen>`, `<TabBar>`, `<MStatusTag>`.

## Screens
| Tab | Screen | What it shows |
|---|---|---|
| 工作台 | `HomeScreen` | Gradient KPI hero card (¥ today + mini-table), 4 quick-actions, top待处理, last 3 orders. |
| 订单 | `OrdersScreen` | Tabs by status, dense list rows with SLA chip on urgent待发货. |
| 订单详情 | `OrderDetailScreen` | Status tag, KV pairs, vertical 履约 timeline, sticky bottom action bar. |
| 质检 | `QCScreen` | Animated 扫码 frame + manual / album fallback, last 3 results. |

## Patterns
- **Gradient KPI hero on home** is the *only* gradient in the whole design system — reserved for the mobile home screen because it earns the visual weight there. The PC console never uses one.
- **Status tag color = its meaning across both kits** — same hex values, same tones. A 进行中 promo and an 已上架 SKU are both `m-tone-success` / `zzt-tone-success`.
- **Sticky bottom action bar with a protection gradient** — see `.m-action-bar`. Used for any detail screen where the primary action shouldn't scroll away.

## Not implemented
- Real keyboards, push permission modal, login flow.
- "我的" tab is placeholder.
