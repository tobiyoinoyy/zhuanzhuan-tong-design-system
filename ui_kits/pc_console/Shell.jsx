// ui_kits/pc_console/Shell.jsx
// Sidebar + topbar shell shared by every PC console screen.
// Composable: <Shell active="products"><PageBody/></Shell>

const NAV = [
  { id: "dashboard",  icon: "layout-dashboard", label: "工作台" },
  { id: "products",   icon: "package",          label: "商品管理",   badge: 7 },
  { id: "supply",     icon: "warehouse",        label: "供货管理" },
  { id: "qc",         icon: "shield-check",     label: "质检流程",   badge: 3 },
  { id: "promotion",  icon: "megaphone",        label: "营销活动" },
  { id: "orders",     icon: "receipt",          label: "订单售后" },
  { id: "cost",       icon: "wallet",           label: "成本中心" },
  { id: "data",       icon: "bar-chart-3",      label: "数据中心" },
  { id: "cs",         icon: "headphones",       label: "客服协同" },
];

function Sidebar({ active, onNav }) {
  return (
    <aside className="zzt-side">
      <div className="zzt-side-brand">
        <img src="../../assets/logo-mark.svg" alt="转转通" width="28" height="28" />
        <div>
          <div className="zzt-side-brand-title">转转通</div>
          <div className="zzt-side-brand-sub">Merchant Console</div>
        </div>
      </div>
      <div className="zzt-side-merchant">
        <div className="zzt-side-merchant-row">
          <span className="zzt-tag zzt-tag-q">KA</span>
          <span className="zzt-side-merchant-name">明哥手机直营店</span>
        </div>
        <div className="zzt-side-merchant-id">ZZT-K-04812 · 入仓 / 自质检</div>
      </div>
      <nav className="zzt-side-nav">
        {NAV.map((item) => (
          <button
            key={item.id}
            className={"zzt-side-link" + (active === item.id ? " is-active" : "")}
            onClick={() => onNav && onNav(item.id)}
          >
            <i data-lucide={item.icon}></i>
            <span>{item.label}</span>
            {item.badge ? <span className="zzt-side-badge">{item.badge}</span> : null}
          </button>
        ))}
      </nav>
      <div className="zzt-side-foot">
        <button className="zzt-side-link"><i data-lucide="settings"></i><span>设置</span></button>
        <button className="zzt-side-link"><i data-lucide="circle-help"></i><span>帮助中心</span></button>
      </div>
    </aside>
  );
}

function Topbar({ title, crumbs, onSearch }) {
  return (
    <header className="zzt-top">
      <div className="zzt-top-crumbs">
        {crumbs && crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <i data-lucide="chevron-right" className="zzt-top-sep"></i>}
            <span className={i === crumbs.length - 1 ? "is-current" : ""}>{c}</span>
          </React.Fragment>
        ))}
        {!crumbs && <span className="is-current">{title}</span>}
      </div>
      <div className="zzt-top-right">
        <div className="zzt-search">
          <i data-lucide="search"></i>
          <input placeholder="搜索商品 / 订单号 / 客户" />
          <span className="zzt-kbd">⌘ K</span>
        </div>
        <button className="zzt-icon-btn"><i data-lucide="bell"></i><span className="zzt-dot-red"></span></button>
        <button className="zzt-icon-btn"><i data-lucide="message-square"></i></button>
        <div className="zzt-avatar">明</div>
      </div>
    </header>
  );
}

function Shell({ active, onNav, title, crumbs, children }) {
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <div className="zzt-shell">
      <Sidebar active={active} onNav={onNav} />
      <div className="zzt-main">
        <Topbar title={title} crumbs={crumbs} />
        <main className="zzt-body">{children}</main>
      </div>
    </div>
  );
}

window.Shell = Shell;
window.Sidebar = Sidebar;
window.Topbar = Topbar;
window.NAV = NAV;
