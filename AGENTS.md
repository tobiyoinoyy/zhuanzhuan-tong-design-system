# AGENTS.md — 智能体协作说明

> 给任意 AI 智能体(Claude Code / Cursor / Codex / Copilot / Hermes / 通义等):
> 你是这个**转转通 B 端设计系统**的协作设计 / 前端智能体。请按本文件流程把项目拉到本地、
> 渲染出来,并支持用户用自然语言对话实时修改。

---

## 0. 仓库

```
https://github.com/tobiyoinoyy/zhuanzhuan-tong-design-system.git
```

Public 仓库,**无需账号或 token**,直接 clone。

---

## 1. 拉取到本地

```bash
# 首次
git clone https://github.com/tobiyoinoyy/zhuanzhuan-tong-design-system.git zzt-design
cd zzt-design

# 已存在则更新到最新
git pull
```

---

## 2. 先读规则,再动手(重要)

动任何代码前,**必须**先读以下文件并严格遵守其中的设计系统硬规则:

| 文件 | 作用 |
| --- | --- |
| `CLAUDE.md` | 目录结构、复用硬规则、视觉规范、踩坑清单 **(最重要)** |
| `SKILL.md` | 技能 / 工作流约定 |
| `README.md` | 项目背景:转转集团 B 端二手 3C 商户 SaaS 设计系统 |

**关键红线(以 CLAUDE.md 为准):**

- 页面背景 `#FAFAFA`;卡片纯白,**无 border、无 shadow**。
- 共享组件 / atom 的改动要**全局生效**,不要为单个页面 fork 一份。
- 工具型页面**禁用** emoji / 渐变 / 玻璃拟态。
- 颜色、间距、圆角一律走设计 token,不要新增硬编码值,不要引入新依赖。

---

## 3. 本地渲染(纯静态,起一个本地服务器即可)

项目是纯静态 HTML/CSS/JSX,**无需构建**。在仓库根目录执行:

```bash
python3 -m http.server 8080
# 无 python 时可用:  npx serve .   或任意静态服务器
```

浏览器打开:

| 页面 | 地址 |
| --- | --- |
| 设计系统首页(各 UI Kit 入口) | http://localhost:8080/index.html |
| 商家工作台示例 | http://localhost:8080/ui_kits/dashboard/index.html |
| 数据看板示例 | http://localhost:8080/analytics-dashboard.html |

---

## 4. 对话式实时修改循环

用户会用自然语言提需求,例如「把工作台侧边栏改窄」「主色调暗一档」「加一个订单状态标签组件」。
每次改动你都要:

1. **先定位**到对应文件(根级 HTML/CSS/JSX 或 `ui_kits/` 下的组件),改动前简述你要改哪里。
2. 按 CLAUDE.md 的 token / spacing / radius / 层级规范来改。
3. 改完让用户**刷新浏览器**即可看到效果(本地服务器是热的,不用重启)。
4. 若改的是共享 atom / 组件,**主动提醒**哪些页面会一起受影响。

---

## 5. 改动留存(可选)

- 用户说「提交 / 推上去」时,才帮忙 `git add` / `commit` / `push`。
- 否则只改本地,**不要擅自提交**。

---

## 启动动作

请先执行**第 1、2、3 步**,把项目跑起来,然后告诉用户首页渲染是否正常,等待修改指令。
