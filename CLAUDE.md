# 转转通 Design System — Working notes for Claude

This project is a **B 端商家工作台**设计系统 + UI Kit。重要约定写在这里。

---

## 目录结构

```
colors_and_type.css        # design tokens (颜色/字号/间距/圆角)
preview/                   # 单独组件 demo 页 (按钮/表单/表格/分页/Tabs 等)
  buttons.html
  data-table.html
  form-fields.html
  tabs.html
  pagination.html
  …
ui_kits/dashboard/         # 已完成的多页 UI Kit (工作台 + 商品管理 …)
  dashboard.css            # 共用 shell + tokens
  products.css             # 商品管理页专属样式
  index.html               # 工作台
  products.html            # 商品管理
fonts/                     # PingFang SC 字体
assets/icons/              # SVG 图标库 (mask 用)
```

---

## 复用现有组件 — 这是硬规则

新增页面或组件时：**先在 `preview/` 里翻一遍**，找到对应组件直接复用样式约定（颜色、圆角、字号、间距）；然后看 `ui_kits/dashboard/` 里有没有已经派生过的版本。

**绝不要**重新发明：按钮、输入框、Tabs、表格、分页、复选框、徽标、标签、状态徽章、avatar、选择器、日期选择器 —— 这些在 `preview/` 都有参考实现。

如果用户提到"参考 fig"，先用 `fig_ls` / `fig_read` / `fig_screenshot` 看图层 `/page51` 表单组件 — 表格圆角 20、表体 16、表头/分页透明坐在灰底上，这是事实标准。

如果实在没有现成组件，**才**新建，并写在对应页面的 css 里（不要污染 dashboard.css）。

---

## 视觉规范（已确认 / 不要再调整）

### 背景与卡片
- **页面背景 `#FAFAFA`**（body / 左侧栏 / 顶栏全部）
- **卡片**：纯白底，**无 border / 无 box-shadow**，靠浅灰背景与白卡的对比形成层级
- **没有内容的区域** 永远是页面背景色，不要漏出 white

### 圆角阶梯
| 层级 | 圆角 |
|---|---|
| 顶级卡片（`.card`, `.ann`, `.todo-card`） | **16** |
| 内嵌卡片（`.kpi`, `.deposit`, `.sugg-row`） | **12** |
| 表格外灰框（products 列表页主表格） | **20** |
| 白色表体 | **16** |
| 缩略图 / icon-square | 8 |
| 输入框 / 按钮 / 分页项 | **8**（之前 6 已升级） |
| 小标签（cond-tag, grade-tag, tag-out） | 4 |
| 状态徽章 pill / avatar | 999 |

### 顶栏
- 高度 80px，内容 `align-items: center` 真居中
- 左侧栏 logo 锚定在同一行

### 颜色用法
- **主色** `--zzt-accent-500: #FF0F27` (ZZ RED · Pantone 185 C)，hover 用 400 `#FF4256`，按下用 600 `#D8001A`
- **白色为主体**：80% 以上的画面用白 + 浅灰承载，红色仅做 CTA、激活态、关键强调
- **涨用红 / 跌用绿**（中国习惯）— 涨用的红就是品牌红
- **辅助色** `--zzt-warm-*` （peach `#F0B895` / caramel `#B57856` / rust `#8C3200` / maroon `#410000`）— 用于营销活动、会员日、二级分类。不可作为品牌色单独使用。
- 状态徽章 = soft bg + 同色文字 + 同色 dot（语义：accent / success / warning / danger / warm / zinc）
- **不要发明颜色** — 用 `--zzt-*` token 或 oklch 派生

### 字体
- 数字一律 `font-family: var(--zzt-font-num)` + `font-variant-numeric: tabular-nums`
- 中文用 PingFang SC（已 @font-face）
- 大标题加 `letter-spacing: -0.005em`

---

## 组件具体形态备忘

### 按钮（products.css `.btn`）
- 高度 36，圆角 8，padding `0 16`
- `.btn-primary` 蓝实心 / `.btn-outline` 白底主色描边 / `.btn-ghost` 透明
- 主操作组：查询=primary、重置=outline、其余=outline；不要全 ghost（视觉太淡）
- 多个批量动作 → 收成一个 `批量操作 ▾` outline 下拉，别铺满工具栏

### 输入控件（`.inp`）
- 高度 36、圆角 8、内边距 12、`border-strong` 描边
- hover 用 `accent-300` 边
- 组合输入（`.inp.combo`）：左侧切换段 + 右侧输入，中间细分隔线

### 表格（`.table-card` + `table.products`）
- 外灰框 `zinc-150` + radius 20 + padding 4（**仅页面主表格使用**）
- 白色表体 radius 16，第一/最后行四个角通过 `td:first/last-child` 圆角实现
- 表头透明坐灰底；分页器透明坐灰底
- 行间分隔线 `rgba(205,205,206,0.5)` (= zinc-250 半透)
- **小卡片内的表格不要套灰框**，直接用透明背景 + 表头 zinc-75 胶囊条

### Tabs
- L1（页面级）：18px 粗体，激活态主色文字 + 28px 主色短下划线
- L2（次级筛选）：13.5px，激活态主色 + 全宽下划线 + count pill badge（zinc-150 默认 / accent-soft 激活）

### 分页（`.pager-row`）
- 完整版：左 "共 X 条 · 第 a-b 条"，右 控件组 + 每页条数 + 跳页
- 紧凑版（小卡内）：仅右侧控件组 + 每页条数，无总条数无跳页

### 排名徽章（dashboard.css `.medal`）
- 前 3 名 clip-path 盾牌/丝带 + 三色渐变（金/银/铜）
- 4 名起纯数字，灰色 tabular-nums

### Tab 上的提示气泡（`.tab-bubble`）
- 用全 pill 圆角（999 999 999 4，左下尖）
- 不要做 clip-path 三角尾，太花哨

### 成色标签（`.cond-badge`，preview/condition-badge.html · products.css）
- 双色拼接：左半 `.ap` 深青 `#2E6E89`（外观），右半 `.fn` 橘 `#EE8B57`（功能）— 颜色固定不随等级变
- 数字外观：`<span class="ap"><b>99</b><span class="suf">新</span></span>` — 数字 12px Akrobat 风，新 7px PingFang
- 中文外观：`<span class="ap zh">瑕疵</span>` 或 `9成新`、`全新` — 9px PingFang
- 功能 A/B/C：`<span class="fn">A</span>` — 11px 粗体
- 单边模式：`.cond-badge.solo-ap` 或 `.cond-badge.solo-fn`（外圆角）
- 高度固定 16px，flex-shrink: 0，行内放表格 ok
- 72×72 圆角 8，居中盖图
- **有图**：`<div class="sku-thumb has-img" style="--img: url(...)"></div>` — 通过 CSS 变量传图，不要 inline `background-image:`
- **无图**：`<div class="sku-thumb placeholder"></div>` — 自动渲染 28px 相机图标
- 图片资源放 `assets/products/` 下，命名格式 `{brand}-{model}-{color}.png`（例：`huawei-p30-blue.png` / `iphone-11-red.png`）
- 已有真实样例：`huawei-p30-blue.png` / `iphone-11-red.png` / `iphone-11-white.png`

---

## 反复踩过的坑（别再犯）

1. **`.body` 是 grid 容器** — 不要给子元素也用 `.body` 类，会继承 grid。子内容用 `.txt` / `.ctl` / `.inner` 等专用名。
2. **css 加载顺序** — `products.css` 在 `dashboard.css` 后，所以同名同特异性选择器后写赢。dashboard 页要用 products 的部分组件时，要么换个类名（如 `.rank-table-wrap` 替代 `.table-card`），要么提高特异性。
3. **不要 `padding: 0` + 居中字段同时用** — 顶栏想真居中就别给 padding-top；padding 给一个方向时另一方向用 align-items。
4. **`flex` 子元素继承 display** — 没显式 `display: block` 时，里面的 inline 会被 grid 当 grid item。
5. **不要套白卡再灰框再白卡** — 双层背景是 ui kit 视觉断裂的头号原因。每张卡只决定**一种**底色（白或浅灰）。

---

## 工作流约定

- 加新页时：复制 `index.html` 的 shell (side nav + top bar)，只改 `.body` 里的内容；激活态 `.side-link.active` 切到对应导航
- 加新组件前：先看 `preview/` 有没有；有就 read 它的 style 块复用
- 圆角 / 颜色 / 间距：永远用 `--zzt-*` token 或上表中已确定的值；写新的硬编码值要先在这个文件里登记
- 用户说"全改了" → 按总结清单逐项实施，不要漏；改完一次性 `done`
- 给数据示例时优先用真实的二手 3C 商品（红米 K80 Pro / iPhone 14 Pro / MatePad / Mate 60 等），不要 Lorem
- **新增 `ui_kits/` 下成型页面时，必须同步往项目根 `index.html` 的 `UI Kits · 完整页面` 区块（`.kits` 容器）加一张并列卡** `.kit`：包含 kit-tag、新页加 NEW 角标、标题链接、一句话简介（覆盖核心业务规则）、`.kit-cta` "打开 →" 按钮。tag 色规则已沉淀：`dashboard=红 / supply=蓝(info) / analytics=绿(success) / console=浅蓝 / mobile=暖`。新主题色找未占用语义 token 续用，不要发明色。无需用户提醒。
