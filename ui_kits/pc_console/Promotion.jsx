// ui_kits/pc_console/Promotion.jsx
// 营销活动 — segmented by status, soft-purple promo theme, card grid layout.

const PROMOS = [
  { id:1, name:"618 大促 · 全品类满 200 减 30", status:"active",  sku:62, gmv:84210, start:"06-15", end:"06-20", coverage:"全品类", uplift:"+22.4%" },
  { id:2, name:"官方补贴 · 二手 iPhone 直降",   status:"active",  sku:28, gmv:41800, start:"06-10", end:"07-10", coverage:"手机",   uplift:"+16.0%" },
  { id:3, name:"618 第二波 · 笔记本专场",        status:"upcoming",sku:11, gmv:0,     start:"06-23", end:"06-28", coverage:"笔记本", uplift:"待开始" },
  { id:4, name:"夏日清仓 · 配件类 5 折",         status:"upcoming",sku:46, gmv:0,     start:"07-05", end:"07-12", coverage:"配件",   uplift:"待开始" },
  { id:5, name:"520 限时 · 充电类配件",          status:"ended",   sku:42, gmv:12640, start:"05-18", end:"05-22", coverage:"配件",   uplift:"+8.1%" },
  { id:6, name:"五一焕新 · 平板专场",            status:"ended",   sku:18, gmv:38420, start:"04-29", end:"05-05", coverage:"平板",   uplift:"+12.6%" },
];

function Promotion() {
  const [tab, setTab] = React.useState("all");
  const list = tab === "all" ? PROMOS : PROMOS.filter(p => p.status === tab);
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

  return (
    <div className="zzt-page" data-screen-label="04 Promotion">
      <div className="zzt-page-header">
        <div>
          <h1 className="zzt-h1">营销活动</h1>
          <div className="zzt-page-sub">本月活动 6 个 · 进行中 2 · 已带动 ¥ 126,010 销售</div>
        </div>
        <div className="zzt-page-actions">
          <Button variant="outline" icon="bar-chart-3">活动看板</Button>
          <Button variant="primary" icon="plus">新建活动</Button>
        </div>
      </div>

      <Card padding={0}>
        <div className="zzt-list-tabs">
          <SegmentedControl
            value={tab}
            onChange={setTab}
            items={[
              { value:"all", label:"全部", count: PROMOS.length },
              { value:"active", label:"进行中", count: PROMOS.filter(p=>p.status==="active").length },
              { value:"upcoming", label:"未开始", count: PROMOS.filter(p=>p.status==="upcoming").length },
              { value:"ended", label:"已结束", count: PROMOS.filter(p=>p.status==="ended").length },
            ]}
          />
        </div>
        <div className="zzt-filters">
          <div className="zzt-search zzt-search-sm"><i data-lucide="search"></i><input placeholder="搜索活动名称" /></div>
          <button className="zzt-filter-chip">时间范围<i data-lucide="chevron-down"></i></button>
          <button className="zzt-filter-chip">覆盖品类<i data-lucide="chevron-down"></i></button>
          <span style={{flex:1}}></span>
          <button className="zzt-filter-chip"><i data-lucide="arrow-up-down"></i>按 GMV 排序</button>
        </div>
        <div className="zzt-promo-grid">
          {list.map(p => <PromoCard key={p.id} p={p} />)}
        </div>
      </Card>
    </div>
  );
}

function PromoCard({ p }) {
  const tone = p.status === "active" ? "success" : (p.status === "upcoming" ? "info" : "neutral");
  const label = { active:"进行中", upcoming:"未开始", ended:"已结束" }[p.status];
  return (
    <div className={"zzt-promo-card zzt-promo-card-" + p.status}>
      <div className="zzt-promo-card-head">
        <div className="zzt-promo-tag-row">
          <Tag kind="promotion">营销活动</Tag>
          <StatusTag tone={tone}>{label}</StatusTag>
        </div>
        <button className="zzt-icon-btn"><i data-lucide="more-horizontal"></i></button>
      </div>
      <h3 className="zzt-promo-card-name">{p.name}</h3>
      <div className="zzt-promo-card-meta">
        <span><i data-lucide="calendar"></i>{p.start} ~ {p.end}</span>
        <span><i data-lucide="package"></i>{p.sku} SKU</span>
        <span><i data-lucide="layers"></i>{p.coverage}</span>
      </div>
      <div className="zzt-promo-card-foot">
        <div>
          <div className="zzt-caption">活动 GMV</div>
          <div className="zzt-metric" style={{fontSize:22}}>
            {p.gmv === 0 ? <span className="zzt-fg-subtle">待开始</span> : <span>¥ {p.gmv.toLocaleString()}</span>}
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div className="zzt-caption">同期提升</div>
          <div className={"zzt-h4 " + (p.status === "active" || p.status === "ended" ? "zzt-fg-success" : "zzt-fg-muted")}
               style={{marginTop:2}}>{p.uplift}</div>
        </div>
      </div>
    </div>
  );
}

window.Promotion = Promotion;
