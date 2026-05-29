// ui_kits/pc_console/Dashboard.jsx
// 工作台 — KPI overview + key tasks + chart.

function MiniChart({ data, color }) {
  const w = 240, h = 64;
  const max = Math.max(...data), min = Math.min(...data);
  const norm = (v) => h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
  const step = w / (data.length - 1);
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${norm(v)}`).join(" ");
  const area = line + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} className="zzt-spark">
      <path d={area} fill={color} fillOpacity="0.12" />
      <path d={line} stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function TaskRow({ tone, label, count, action }) {
  return (
    <div className="zzt-task-row">
      <span className={`zzt-dot-lg zzt-tone-${tone}`}></span>
      <span className="zzt-task-label">{label}</span>
      <span className="zzt-task-count">{count}</span>
      <button className="zzt-link">{action}<i data-lucide="arrow-right"></i></button>
    </div>
  );
}

function Dashboard({ onNav }) {
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <div className="zzt-page" data-screen-label="01 Dashboard">
      <div className="zzt-page-header">
        <div>
          <h1 className="zzt-h1">工作台</h1>
          <div className="zzt-page-sub">早上好，明哥 · 截至 09:24 ， 今天还有 86 单需要发货</div>
        </div>
        <div className="zzt-page-actions">
          <Button variant="outline" icon="download">导出周报</Button>
          <Button variant="primary" icon="plus" onClick={() => onNav && onNav("products")}>新建商品</Button>
        </div>
      </div>

      <div className="zzt-grid-4">
        <KPI label="今日 GMV"     value="128,540" unit="¥" delta="+12.4% vs 昨日" deltaTone="up" onClick={() => onNav("data")} />
        <KPI label="待发货订单"   value="86"      unit="单" delta="-3 vs 昨日"     deltaTone="down" onClick={() => onNav("orders")} />
        <KPI label="质检通过率"   value="94.2"    unit="%"  delta="+1.8 pt"        deltaTone="up" onClick={() => onNav("qc")} />
        <KPI label="在售 SKU"     value="1,284"   unit=""   delta="— 与昨日持平"    deltaTone="flat" onClick={() => onNav("products")} />
      </div>

      <div className="zzt-grid-12 zzt-mt-6">
        <div className="zzt-col-8">
          <Card>
            <div className="zzt-card-head">
              <h3 className="zzt-h3">近 7 日销售趋势</h3>
              <SegmentedControl
                value="gmv"
                onChange={() => {}}
                items={[
                  { value: "gmv", label: "GMV" },
                  { value: "orders", label: "订单" },
                  { value: "asp", label: "客单价" },
                ]}
              />
            </div>
            <div className="zzt-chart-wrap">
              <ChartArea />
            </div>
            <div className="zzt-chart-legend">
              <span><span className="zzt-dot" style={{background:"var(--zzt-accent-500)"}}></span>本周</span>
              <span><span className="zzt-dot" style={{background:"var(--zzt-zinc-400)"}}></span>上周</span>
            </div>
          </Card>
        </div>
        <div className="zzt-col-4">
          <Card>
            <div className="zzt-card-head">
              <h3 className="zzt-h3">待处理事项</h3>
              <span className="zzt-caption">10 项</span>
            </div>
            <TaskRow tone="warning" label="待入仓商品"      count="7 件"  action="去入仓" />
            <TaskRow tone="info"    label="待质检 SKU"     count="12 件" action="去质检" />
            <TaskRow tone="danger"  label="质检退回原因待回复" count="3 单"  action="去处理" />
            <TaskRow tone="success" label="活动审核已通过"   count="2 个"  action="去查看" />
            <TaskRow tone="neutral" label="本月成本对账"     count="待出"  action="去对账" />
          </Card>
        </div>
      </div>

      <div className="zzt-grid-12 zzt-mt-6">
        <div className="zzt-col-6">
          <Card>
            <div className="zzt-card-head"><h3 className="zzt-h3">品类销售占比</h3><span className="zzt-caption">本月</span></div>
            <div className="zzt-bars">
              {[
                {n:"手机", v:62.8, c:"var(--zzt-accent-500)"},
                {n:"笔记本", v:18.4, c:"var(--zzt-purple-500)"},
                {n:"平板", v:9.1, c:"var(--zzt-success-500)"},
                {n:"手表 / 耳机", v:6.2, c:"var(--zzt-warning-500)"},
                {n:"摄影摄像", v:3.5, c:"var(--zzt-zinc-400)"},
              ].map(r => (
                <div className="zzt-bar-row" key={r.n}>
                  <span className="zzt-bar-name">{r.n}</span>
                  <div className="zzt-bar-track"><div className="zzt-bar-fill" style={{ width:r.v+"%", background:r.c }}></div></div>
                  <span className="zzt-bar-val">{r.v}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="zzt-col-6">
          <Card>
            <div className="zzt-card-head"><h3 className="zzt-h3">近期活动</h3><button className="zzt-link" onClick={() => onNav("promotion")}>查看全部<i data-lucide="arrow-right"></i></button></div>
            <div className="zzt-promo-list">
              <PromoRow tone="active"  name="618 大促 · 全品类满 200 减 30" sku={62}  gmv="¥ 84,210" />
              <PromoRow tone="active"  name="官方补贴 · 二手 iPhone 直降"   sku={28}  gmv="¥ 41,800" />
              <PromoRow tone="upcoming" name="618 第二波 · 笔记本专场"        sku={11}  gmv="待开始" />
              <PromoRow tone="ended"   name="520 限时 · 充电类配件"           sku={42}  gmv="¥ 12,640" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PromoRow({ tone, name, sku, gmv }) {
  const map = { active: "进行中", upcoming: "未开始", ended: "已结束" };
  const toneClass = { active: "success", upcoming: "info", ended: "neutral" }[tone];
  return (
    <div className="zzt-promo-row">
      <div className="zzt-promo-icon"><i data-lucide="megaphone"></i></div>
      <div className="zzt-promo-body">
        <div className="zzt-promo-name">{name}</div>
        <div className="zzt-promo-meta"><StatusTag tone={toneClass}>{map[tone]}</StatusTag><span>{sku} SKU 参与</span></div>
      </div>
      <div className="zzt-promo-gmv">{gmv}</div>
    </div>
  );
}

function ChartArea() {
  // Two-series area chart, this week vs last week.
  const wk =   [82, 96, 88, 124, 118, 142, 128];
  const last = [70, 81, 76, 102,  95, 110, 104];
  const labels = ["周一","周二","周三","周四","周五","周六","周日"];
  const W = 720, H = 200, padX = 28, padY = 14;
  const max = 160, min = 60;
  const x = (i) => padX + (i * (W - padX*2) / (wk.length - 1));
  const y = (v) => H - padY - ((v - min) / (max - min)) * (H - padY*2);
  const path = (arr) => arr.map((v,i) => `${i?"L":"M"} ${x(i)} ${y(v)}`).join(" ");
  const area = (arr) => path(arr) + ` L ${x(arr.length-1)} ${H-padY} L ${x(0)} ${H-padY} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" style={{display:"block"}}>
      {[60, 90, 120, 150].map(v => (
        <g key={v}>
          <line x1={padX} x2={W-padX} y1={y(v)} y2={y(v)} stroke="var(--zzt-border-subtle)" strokeDasharray="3 3" />
          <text x={4} y={y(v)+4} fontSize="10" fill="var(--zzt-fg-muted)">{v}k</text>
        </g>
      ))}
      <path d={area(last)} fill="var(--zzt-zinc-400)" fillOpacity="0.10" />
      <path d={path(last)} stroke="var(--zzt-zinc-400)" strokeWidth="1.6" fill="none" strokeDasharray="4 4" />
      <path d={area(wk)} fill="var(--zzt-accent-500)" fillOpacity="0.14" />
      <path d={path(wk)} stroke="var(--zzt-accent-500)" strokeWidth="2.2" fill="none" />
      {wk.map((v,i) => <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#fff" stroke="var(--zzt-accent-500)" strokeWidth="1.5" />)}
      {labels.map((l,i) => <text key={l} x={x(i)} y={H-2} fontSize="11" fill="var(--zzt-fg-muted)" textAnchor="middle">{l}</text>)}
    </svg>
  );
}

window.Dashboard = Dashboard;
