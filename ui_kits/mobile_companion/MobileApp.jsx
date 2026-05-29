// ui_kits/mobile_companion/MobileApp.jsx
// 转转通商户 App — mobile companion. 三个核心 tab：
//   1) 工作台   待办、KPI、快速操作
//   2) 订单     列表 + 详情 + 状态时间线
//   3) 质检     扫码 + 结果详情

const M_STATUS = {
  to_ship:   { label:"待发货",   tone:"warning" },
  shipped:   { label:"已发货",   tone:"info" },
  delivered: { label:"已签收",   tone:"success" },
  return:    { label:"退货中",   tone:"danger" },
  qc_pass:   { label:"质检通过", tone:"success" },
  qc_reject: { label:"质检退回", tone:"danger" },
};

const ORDERS_M = [
  { id:"ZZO-00128", name:"iPhone 14 Pro 256GB", buyer:"杨**雨", price:4599, status:"to_ship", sla:"6h 内" },
  { id:"ZZO-00127", name:"AirPods Pro 2",       buyer:"陈**轩", price:1399, status:"shipped",  sla:"" },
  { id:"ZZO-00126", name:"iPhone 13 128GB 蓝色",buyer:"李**坤", price:3299, status:"to_ship",  sla:"<1h 内", urgent:true },
  { id:"ZZO-00125", name:"Galaxy S23 256GB",    buyer:"周**菲", price:2899, status:"delivered",sla:"" },
  { id:"ZZO-00124", name:"MacBook Air M2",      buyer:"郑**",   price:7899, status:"return",   sla:"" },
];

function MStatusTag({ status }) {
  const s = M_STATUS[status];
  return <span className={`m-tag m-tone-${s.tone}`}>{s.label}</span>;
}

function StatusBar() {
  return (
    <div className="m-statusbar">
      <span className="m-statusbar-time">9:41</span>
      <div className="m-statusbar-icons">
        <i data-lucide="signal"></i>
        <i data-lucide="wifi"></i>
        <i data-lucide="battery-full"></i>
      </div>
    </div>
  );
}

function HomeScreen({ onOpenOrder, onTab }) {
  return (
    <div className="m-screen" data-screen-label="01 Home">
      <StatusBar />
      <header className="m-home-head">
        <div>
          <div className="m-home-greeting">早上好，明哥</div>
          <div className="m-home-store">
            <span className="m-tag m-tag-q">KA</span>
            <span>明哥手机直营店</span>
          </div>
        </div>
        <button className="m-icon-btn"><i data-lucide="bell"></i><span className="m-dot-red"></span></button>
      </header>

      <div className="m-kpi-card">
        <div className="m-kpi-row">
          <div>
            <div className="m-kpi-label">今日 GMV</div>
            <div className="m-kpi-v"><span className="m-kpi-unit">¥</span>128,540</div>
            <div className="m-kpi-delta m-tone-up"><i data-lucide="trending-up"></i>+12.4% vs 昨日</div>
          </div>
          <div className="m-kpi-mini">
            <div className="m-mini-row"><span>待发货</span><b>86</b></div>
            <div className="m-mini-row"><span>质检中</span><b>12</b></div>
            <div className="m-mini-row"><span>在售 SKU</span><b>1,284</b></div>
          </div>
        </div>
      </div>

      <div className="m-section-head"><h4>快速操作</h4></div>
      <div className="m-quick-grid">
        <button className="m-quick" onClick={() => onTab("qc")}>
          <span className="m-quick-icon" style={{background:"rgba(255,15,39,.12)", color:"var(--zzt-accent-500)"}}><i data-lucide="scan-line"></i></span>
          扫码质检
        </button>
        <button className="m-quick" onClick={() => onTab("orders")}>
          <span className="m-quick-icon" style={{background:"rgba(245,165,36,.16)", color:"var(--zzt-warning-500)"}}><i data-lucide="truck"></i></span>
          批量发货
        </button>
        <button className="m-quick">
          <span className="m-quick-icon" style={{background:"rgba(23,201,100,.14)", color:"var(--zzt-success-500)"}}><i data-lucide="tag"></i></span>
          改价上下架
        </button>
        <button className="m-quick">
          <span className="m-quick-icon" style={{background:"rgba(181,120,86,.14)", color:"var(--zzt-purple-600)"}}><i data-lucide="megaphone"></i></span>
          活动管理
        </button>
      </div>

      <div className="m-section-head">
        <h4>待处理</h4>
        <button className="m-link">全部 5 项<i data-lucide="chevron-right"></i></button>
      </div>
      <div className="m-card">
        <button className="m-task-row">
          <span className="m-dot m-tone-warning"></span>
          <div className="m-task-body">
            <div>待入仓商品</div>
            <div className="m-caption">本批次 7 件需于今日 18:00 前入仓</div>
          </div>
          <span className="m-task-count">7</span>
          <i data-lucide="chevron-right"></i>
        </button>
        <button className="m-task-row" onClick={() => onTab("qc")}>
          <span className="m-dot m-tone-info"></span>
          <div className="m-task-body">
            <div>待质检 SKU</div>
            <div className="m-caption">仓内待检 12 件 · 预计耗时 2h</div>
          </div>
          <span className="m-task-count">12</span>
          <i data-lucide="chevron-right"></i>
        </button>
        <button className="m-task-row">
          <span className="m-dot m-tone-danger"></span>
          <div className="m-task-body">
            <div>质检退回需回复</div>
            <div className="m-caption">3 单需在 24h 内处理</div>
          </div>
          <span className="m-task-count" style={{background:"var(--zzt-danger-500)", color:"#fff"}}>3</span>
          <i data-lucide="chevron-right"></i>
        </button>
      </div>

      <div className="m-section-head">
        <h4>最近订单</h4>
        <button className="m-link" onClick={() => onTab("orders")}>查看全部<i data-lucide="chevron-right"></i></button>
      </div>
      <div className="m-card m-card-p0">
        {ORDERS_M.slice(0,3).map(o => (
          <button key={o.id} className="m-order-row" onClick={() => onOpenOrder(o)}>
            <div className="m-thumb"></div>
            <div className="m-order-body">
              <div className="m-order-name">{o.name}</div>
              <div className="m-order-meta">
                <span className="m-caption">{o.id}</span>
                <MStatusTag status={o.status} />
              </div>
            </div>
            <div className="m-order-price">¥ {o.price.toLocaleString()}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OrdersScreen({ onOpenOrder }) {
  const [tab, setTab] = React.useState("to_ship");
  const list = tab === "all" ? ORDERS_M : ORDERS_M.filter(o => o.status === tab);
  return (
    <div className="m-screen" data-screen-label="02 Orders">
      <StatusBar />
      <header className="m-page-head">
        <h2>订单</h2>
        <div className="m-page-actions">
          <button className="m-icon-btn"><i data-lucide="search"></i></button>
          <button className="m-icon-btn"><i data-lucide="filter"></i></button>
        </div>
      </header>
      <div className="m-tabs">
        {[
          {v:"to_ship", l:"待发货", c:86},
          {v:"shipped", l:"已发货", c:142},
          {v:"delivered", l:"已签收", c:1024},
          {v:"return", l:"售后", c:3},
        ].map(t => (
          <button key={t.v} className={"m-tab" + (tab === t.v ? " is-active" : "")} onClick={() => setTab(t.v)}>
            {t.l}<span className="m-count">{t.c}</span>
          </button>
        ))}
      </div>
      <div className="m-card m-card-p0 m-mt-2">
        {list.length === 0 ? (
          <div className="m-empty">
            <i data-lucide="inbox"></i>
            <div>没有符合条件的订单</div>
          </div>
        ) : list.map(o => (
          <button key={o.id} className="m-order-row" onClick={() => onOpenOrder(o)}>
            <div className="m-thumb"></div>
            <div className="m-order-body">
              <div className="m-order-name">{o.name}</div>
              <div className="m-order-meta">
                <span className="m-caption">{o.id} · {o.buyer}</span>
                <MStatusTag status={o.status} />
                {o.sla && <span className={"m-sla " + (o.urgent ? "m-tone-danger" : "m-tone-warning")}><i data-lucide="alarm-clock"></i>{o.sla}</span>}
              </div>
            </div>
            <i data-lucide="chevron-right" className="m-fg-muted"></i>
          </button>
        ))}
      </div>
    </div>
  );
}

function OrderDetailScreen({ order, onBack }) {
  if (!order) return null;
  const steps = [
    { l:"下单 · 已支付",    t:"08-12 09:18", d:true },
    { l:"出库前抽检",       t:"08-12 09:30", d:order.status !== "to_ship" },
    { l:"发货 · 顺丰特快",  t:order.status === "shipped" || order.status === "delivered" ? "08-12 11:02" : "—", d:order.status === "shipped" || order.status === "delivered" },
    { l:"已签收",           t:order.status === "delivered" ? "08-14 10:40" : "—", d:order.status === "delivered" },
  ];
  return (
    <div className="m-screen" data-screen-label="03 Order Detail">
      <StatusBar />
      <header className="m-page-head">
        <button className="m-icon-btn" onClick={onBack}><i data-lucide="arrow-left"></i></button>
        <h2 style={{flex:1}}>订单详情</h2>
        <button className="m-icon-btn"><i data-lucide="more-horizontal"></i></button>
      </header>

      <div className="m-card">
        <div className="m-detail-head">
          <div>
            <div className="m-caption">{order.id}</div>
            <h3 style={{margin:"4px 0 0"}}>{order.name}</h3>
          </div>
          <MStatusTag status={order.status} />
        </div>
        <div className="m-kv">
          <div><span>买家</span><b>{order.buyer}</b></div>
          <div><span>金额</span><b className="m-num">¥ {order.price.toLocaleString()}</b></div>
          <div><span>履约要求</span><b>{order.sla || "—"}</b></div>
        </div>
      </div>

      <div className="m-section-head"><h4>履约进度</h4></div>
      <div className="m-card">
        <div className="m-timeline">
          {steps.map((s,i) => (
            <div key={i} className={"m-tl-step" + (s.d ? " is-done" : "")}>
              <span className="m-tl-dot">{s.d ? <i data-lucide="check"></i> : null}</span>
              <div className="m-tl-text">
                <div>{s.l}</div>
                <div className="m-caption">{s.t}</div>
              </div>
              {i < steps.length - 1 && <span className={"m-tl-line" + (steps[i+1].d ? " is-done" : "")}></span>}
            </div>
          ))}
        </div>
      </div>

      <div className="m-action-bar">
        <button className="m-btn m-btn-outline" style={{flex:1}}>联系买家</button>
        <button className="m-btn m-btn-primary" style={{flex:2}}><i data-lucide="truck"></i>发货</button>
      </div>
    </div>
  );
}

function QCScreen() {
  return (
    <div className="m-screen" data-screen-label="04 QC">
      <StatusBar />
      <header className="m-page-head">
        <h2>质检</h2>
        <button className="m-icon-btn"><i data-lucide="history"></i></button>
      </header>

      <div className="m-scanner">
        <div className="m-scanner-frame">
          <span className="m-scanner-corner m-tl"></span>
          <span className="m-scanner-corner m-tr"></span>
          <span className="m-scanner-corner m-bl"></span>
          <span className="m-scanner-corner m-br"></span>
          <span className="m-scanner-line"></span>
          <div className="m-scanner-hint">将 IMEI 条码对准框内</div>
        </div>
        <div className="m-scanner-actions">
          <button className="m-btn m-btn-outline" style={{flex:1}}><i data-lucide="keyboard"></i>手动输入</button>
          <button className="m-btn m-btn-outline" style={{flex:1}}><i data-lucide="image"></i>从相册</button>
        </div>
      </div>

      <div className="m-section-head">
        <h4>最近 3 次质检</h4>
        <button className="m-link">全部记录<i data-lucide="chevron-right"></i></button>
      </div>
      <div className="m-card m-card-p0">
        <div className="m-qc-row">
          <div className="m-thumb"></div>
          <div className="m-order-body">
            <div className="m-order-name">iPhone 14 Pro 256GB</div>
            <div className="m-order-meta"><span className="m-caption">SKU-58219</span><MStatusTag status="qc_pass" /></div>
          </div>
          <span className="m-grade m-grade-a">A</span>
        </div>
        <div className="m-qc-row">
          <div className="m-thumb"></div>
          <div className="m-order-body">
            <div className="m-order-name">小米 13 Ultra 16+512</div>
            <div className="m-order-meta"><span className="m-caption">SKU-58212</span><MStatusTag status="qc_reject" /></div>
          </div>
          <span className="m-grade m-grade-c">C</span>
        </div>
        <div className="m-qc-row">
          <div className="m-thumb"></div>
          <div className="m-order-body">
            <div className="m-order-name">MacBook Air M2</div>
            <div className="m-order-meta"><span className="m-caption">SKU-58216</span><MStatusTag status="qc_pass" /></div>
          </div>
          <span className="m-grade m-grade-s">S</span>
        </div>
      </div>
    </div>
  );
}

function TabBar({ active, onTab }) {
  const items = [
    { id:"home",   label:"工作台", icon:"layout-dashboard" },
    { id:"orders", label:"订单",   icon:"receipt" },
    { id:"qc",     label:"质检",   icon:"scan-line" },
    { id:"me",     label:"我的",   icon:"user" },
  ];
  return (
    <nav className="m-tabbar">
      {items.map(it => (
        <button key={it.id} className={"m-tabbar-item" + (active === it.id ? " is-active" : "")} onClick={() => onTab(it.id)}>
          <i data-lucide={it.icon}></i>
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}

function MobileApp() {
  const [tab, setTab] = React.useState("home");
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

  let screen;
  if (order) screen = <OrderDetailScreen order={order} onBack={() => setOrder(null)} />;
  else if (tab === "home")    screen = <HomeScreen onOpenOrder={setOrder} onTab={setTab} />;
  else if (tab === "orders")  screen = <OrdersScreen onOpenOrder={setOrder} />;
  else if (tab === "qc")      screen = <QCScreen />;
  else                        screen = (
    <div className="m-screen" data-screen-label="99 Me">
      <StatusBar />
      <header className="m-page-head"><h2>我的</h2></header>
      <div className="m-card">
        <div className="m-empty"><i data-lucide="user"></i><div>商户信息占位</div></div>
      </div>
    </div>
  );

  return (
    <div className="m-shell">
      <div className="m-body">{screen}</div>
      {!order && <TabBar active={tab} onTab={setTab} />}
    </div>
  );
}

window.MobileApp = MobileApp;
