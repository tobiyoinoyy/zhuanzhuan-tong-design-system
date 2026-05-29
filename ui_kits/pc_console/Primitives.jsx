// ui_kits/pc_console/Primitives.jsx
// Tiny shared primitives: Button, Tag, StatusTag, Card, KPI, EmptyState, etc.

function Button({ variant = "primary", size = "md", icon, children, onClick, disabled }) {
  const cls = `zzt-btn zzt-btn-${variant} zzt-btn-${size}` + (disabled ? " is-disabled" : "");
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {icon && <i data-lucide={icon}></i>}
      {children}
    </button>
  );
}

function IconButton({ icon, onClick, label, variant = "ghost" }) {
  return (
    <button className={`zzt-icon-btn zzt-icon-btn-${variant}`} title={label} onClick={onClick}>
      <i data-lucide={icon}></i>
    </button>
  );
}

function StatusTag({ tone = "neutral", children }) {
  return <span className={`zzt-tag zzt-tag-status zzt-tone-${tone}`}>
    <span className="zzt-dot"></span>{children}
  </span>;
}

function Tag({ kind = "category", children }) {
  return <span className={`zzt-tag zzt-tag-${kind}`}>{children}</span>;
}

function Card({ children, padding = 16, hover, onClick }) {
  return (
    <div className={"zzt-card" + (hover ? " is-hoverable" : "")} style={{ padding }} onClick={onClick}>
      {children}
    </div>
  );
}

function KPI({ label, value, unit, delta, deltaTone = "up", onClick }) {
  return (
    <Card hover onClick={onClick}>
      <div className="zzt-kpi-head">
        <span>{label}</span>
        <i data-lucide="chevron-right"></i>
      </div>
      <div className="zzt-kpi-v">
        {unit && unit.startsWith("¥") ? <span className="zzt-kpi-unit">¥</span> : null}
        <span>{value}</span>
        {unit && !unit.startsWith("¥") ? <span className="zzt-kpi-unit">{unit}</span> : null}
      </div>
      {delta && (
        <span className={`zzt-kpi-delta zzt-tone-${deltaTone}`}>
          <i data-lucide={deltaTone === "up" ? "trending-up" : (deltaTone === "down" ? "trending-down" : "minus")}></i>
          {delta}
        </span>
      )}
    </Card>
  );
}

function EmptyState({ icon = "inbox", title, subtitle, cta }) {
  return (
    <div className="zzt-empty">
      <i data-lucide={icon} className="zzt-empty-icon"></i>
      <h4>{title}</h4>
      <p>{subtitle}</p>
      {cta}
    </div>
  );
}

function Toolbar({ children }) {
  return <div className="zzt-toolbar">{children}</div>;
}

function Toast({ tone = "success", icon, children, visible }) {
  if (!visible) return null;
  return (
    <div className={`zzt-toast zzt-tone-${tone}`}>
      <i data-lucide={icon || (tone === "success" ? "check" : "info")}></i>
      <span>{children}</span>
    </div>
  );
}

function SegmentedControl({ items, value, onChange }) {
  return (
    <div className="zzt-segment">
      {items.map((it) => (
        <button key={it.value} className={"zzt-segment-item" + (it.value === value ? " is-active" : "")}
                onClick={() => onChange(it.value)}>
          {it.label}
          {typeof it.count === "number" && <span className="zzt-count">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { Button, IconButton, StatusTag, Tag, Card, KPI, EmptyState, Toolbar, Toast, SegmentedControl });
