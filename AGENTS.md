# AGENTS.md — 转转通 Design System · 智能体协作 & 产出规约

> 适用对象:任意 AI 智能体(Claude Code / Cursor / Codex / Copilot / Hermes / 通义 等)。
> 你的角色:转转通 **B 端商家工作台**设计系统的协作前端 / 设计智能体。
> 本文件 = ①把项目跑起来的流程 + ②产出设计稿必须遵守的硬规约。**两部分都要读完再动手。**
>
> 版本:v0.29.2 ｜ 入口文件:`index.html` ｜ 机读清单:`DESIGN-MANIFEST.json` ｜ AI 地图:`llms.txt`

---

# 第一部分 · 拉取与渲染流程

## 0. 仓库

```
https://github.com/tobiyoinoyy/zhuanzhuan-tong-design-system.git
```

Public 仓库,**无需账号或 token**,直接 clone。

## 1. 拉取到本地

```bash
git clone https://github.com/tobiyoinoyy/zhuanzhuan-tong-design-system.git zzt-design
cd zzt-design
# 已存在则:git pull
```

## 2. 先读这几个文件(顺序重要)

| 顺序 | 文件 | 作用 |
| --- | --- | --- |
| 1 | `AGENTS.md`(本文件) | 流程 + 产出规约 **(必读)** |
| 2 | `colors_and_type.css` | 全部设计 token 的权威来源(颜色/字号/间距/圆角/阴影) |
| 3 | `CLAUDE.md` | 组件具体形态、踩坑清单、工作流约定 |
| 4 | `README.md` | 产品背景:转转集团 B 端二手 3C 商户 SaaS |
| 5 | `DESIGN-MANIFEST.json` | 机读文件清单 + 实现 checklist + 断点 |

## 3. 本地渲染(纯静态,无需构建)

```bash
python3 -m http.server 8080
# 无 python 时:npx serve .
```

| 页面 | 地址 |
| --- | --- |
| 设计系统首页(组件 + UI Kit 入口) | http://localhost:8080/index.html |
| 工作台 Dashboard | http://localhost:8080/ui_kits/dashboard/index.html |
| PC 控制台(多页可点) | http://localhost:8080/ui_kits/pc_console/index.html |
| 移动端 Companion(375×812) | http://localhost:8080/ui_kits/mobile_companion/index.html |
| 单组件 demo(70 个) | http://localhost:8080/preview/<组件名>.html |

---

# 第二部分 · 设计稿产出规约(产出前必须遵守)

> 目标:让你产出的稿子**一次就符合转转通设计语言**,而不是事后返工。
> 总原则:**白色为主体(80%+ 画面),红色是标点,不是底色。** 不发明颜色、不发明圆角、不发明间距 —— 一切走 token。

## A. 硬红线(违反任意一条即不合规)

| # | 必须 (DO) | 禁止 (DON'T) |
| --- | --- | --- |
| 1 | 页面背景用 `#FAFAFA`(= `--zzt-zinc-75`),body / 侧栏 / 顶栏统一 | 页面底色漏出纯白 `#FFFFFF` |
| 2 | 卡片纯白底,靠"浅灰背景 vs 白卡"对比形成层级 | 给卡片加 `border` 或 `box-shadow`(本系统卡片**无边框无投影**) |
| 3 | 唯一品牌色 = ZZ RED `#FF0F27`(`--zzt-accent-500`);仅用于 CTA、激活态、关键强调 | 把红色当大面积底色;用红色做装饰 |
| 4 | 颜色一律引用 `--zzt-*` token,或基于 token 做 oklch 派生 | 写裸十六进制 / 发明新色值 |
| 5 | 数字用 `var(--zzt-font-num)` + `font-variant-numeric: tabular-nums` | 数字用正文字体导致跳动 |
| 6 | 涨用红(= 品牌红)、跌用绿 `--zzt-success-500`(中国习惯) | 涨绿跌红(西方习惯) |
| 7 | 辅助暖色 `--zzt-warm-*` 仅用于营销/会员日/二级分类 | 把暖色当品牌色单独使用 |
| 8 | 工具型 / 数据型页面保持克制 | 加 emoji、渐变、玻璃拟态(glassmorphism) |
| 9 | 每张卡只决定**一种**底色(白或浅灰) | 套"白卡→灰框→白卡"双层背景(视觉断裂头号原因) |
| 10 | 空状态区域 = 页面背景色 | 空区域漏出 white |

## B. 颜色 token(权威值见 `colors_and_type.css`)

```
品牌 / 强调   --zzt-accent-500 #FF0F27 (主)  · 400 #FF4256 (hover) · 600 #D8001A (pressed) · 700 #A20017 (深红文字)
品牌软背景   --zzt-accent-soft rgba(255,15,39,.07) · -soft-strong rgba(255,15,39,.12)
破坏性状态   --zzt-danger-500 = 品牌红本身(删除/退回/警告)。旧 salmon #FF383C/#FF5551 已废弃,勿用。
成功 / 涨     --zzt-success-500 #17C964     警告 --zzt-warning-500 #F5A524
平台信息蓝   --zzt-info-500 #2D63E5(系统通知 / 平台类型标签,非品牌色)
辅助暖色     --zzt-warm-200 #F0B895(peach) · 500 #B57856(caramel) · 700 #8C3200(rust) · 900 #410000(maroon)
中性 ramp    --zzt-zinc-50…950;关键:zinc-75 #FAFAFA=页面背景,zinc-900 #18181B=主文字
前景文字     --zzt-fg(默认) · --zzt-fg-muted(次要) · --zzt-fg-subtle(占位/禁用)
边框        --zzt-border rgba(0,0,0,.12)(注意:用于控件,不是卡片)
```

## C. 圆角阶梯(按层级取值,勿随意)

```
顶级卡片(.card/.ann/.todo-card) 16   内嵌卡片(.kpi/.deposit) 12
表格外灰框(主表格) 20             白色表体 16
缩略图 / icon-square 8            输入框 / 按钮 / 分页项 8
小标签(cond-tag/grade-tag) 4     状态徽章 pill / avatar 999
```
token:`--zzt-radius-{xs4,sm6,md8,lg12,xl16,2xl20,3xl24,pill999}`

## D. 间距 & 字号

```
间距(4px 基):--zzt-space-{1=4 … 16=64}
字号:--zzt-text-{2xs10,xs12,sm14(正文/表格),md16(正文/按钮),lg18(区块标题),2xl24(卡片指标),3xl32,display56}
行高:正文 1.43(--zzt-lh-normal);标题 1.15–1.3
字体:中文 PingFang SC(已 @font-face),拉丁/数字 Inter
```

## E. 组件清单 — 先复用,别重造

`preview/` 下已有 **83 个**组件 demo。产出新页面前**先翻 preview/**,直接复用其样式约定;再看 `ui_kits/` 有没有派生版。

**绝不重新发明**(这些都有现成实现):
按钮、输入框、Tabs、表格、分页、复选框、单选、开关、徽标 badge、标签 tag、状态徽章、avatar、select、datepicker、drawer、modal、toast、tooltip、stepper、breadcrumb、pagination、empty-states、skeleton、成色标签(cond-badge)、KPI 卡、排名徽章(medal)。

已成型的 4 个 UI Kit(可整页参考):
- `ui_kits/dashboard/` — 工作台:KPI 总览 + 告警 + 商品管理,纯静态无 JS
- `ui_kits/pc_console/` — 桌面控制台:单页可点,工作台→商品管理(批量)→营销活动→订单售后→质检抽屉
- `ui_kits/mobile_companion/` — 移动端商家 App,iPhone 框 375×812

## F. 常见坑(CLAUDE.md 沉淀,别再犯)

1. `.body` 是 grid 容器,子内容用 `.txt`/`.ctl`/`.inner`,别复用 `.body` 类。
2. `products.css` 在 `dashboard.css` 之后加载,同名选择器后写赢;跨用要换类名或提特异性。
3. 顶栏真居中:别同时给 `padding-top` 和居中;一个方向给 padding 时另一方向用 `align-items`。
4. 小卡片内的表格**不套灰框**,直接透明背景 + 表头 zinc-75 胶囊条。
5. 给数据示例用真实二手 3C(红米 K80 Pro / iPhone 14 Pro / Mate 60 / MatePad 等),不要 Lorem。

## G. 新增 ui_kits 页的强制同步

新增 `ui_kits/` 成型页面时,**必须**同步往根 `index.html` 的 `.kits` 容器加一张并列卡 `.kit`(含 kit-tag、NEW 角标、标题链接、一句话简介、"打开 →" 按钮)。
tag 配色已定:`dashboard=红 / supply=蓝(info) / analytics=绿(success) / console=浅蓝 / mobile=暖`。新主题色从未占用的语义 token 续用,不发明色。

---

# 第三部分 · 对话式修改循环

用户用自然语言提需求(如「侧边栏改窄」「主色暗一档」「加订单状态标签组件」)。每次:
1. **先定位**对应文件(根级 HTML/CSS/JSX 或 `ui_kits/` / `preview/`),改前简述改哪里。
2. 按上面规约改(token / 圆角 / 间距 / 层级),不引入新硬编码色、不加新依赖。
3. 改完让用户**刷新浏览器**即可看效果(本地服务器是热的)。
4. 若改的是共享 atom / 组件,**主动提醒**哪些页面会一起受影响。

## 改动留存(可选)
- 用户说「提交 / 推上去」才 `git add`/`commit`/`push`;否则只改本地,**不擅自提交**。

---

**启动动作**:先执行第一部分 1–3 步把项目跑起来,确认首页渲染正常,再向用户报告并等待指令。产出任何稿子前,确保已对照第二部分 A–G 自检。
