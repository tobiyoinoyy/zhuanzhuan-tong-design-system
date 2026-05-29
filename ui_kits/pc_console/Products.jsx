// ui_kits/pc_console/Products.jsx
// 商品管理 — list with filters, batch selection + floating action bar.

const PRODUCTS_SEED = [
  { id:"SKU-58219", name:"iPhone 14 Pro 256GB 深空黑",    cat:"手机",   status:"on",      grade:"A",    price:4599, stock:28, gmv:28540, promo:"618 大促", date:"08-12 14:02" },
  { id:"SKU-58218", name:"iPhone 13 128GB 蓝色",          cat:"手机",   status:"on",      grade:"A",    price:3299, stock:42, gmv:21640, promo:"官方补贴", date:"08-12 11:18" },
  { id:"SKU-58217", name:"iPad Air 5 64GB 紫色",          cat:"平板",   status:"pending", grade:"待定", price:3180, stock:7,  gmv:9840,  promo:null,        date:"08-12 09:55" },
  { id:"SKU-58216", name:"MacBook Air M2 8+256",          cat:"笔记本", status:"qc",      grade:"S",    price:7899, stock:3,  gmv:23697, promo:null,        date:"08-11 18:30" },
  { id:"SKU-58215", name:"Galaxy S23 256GB 幻境黑",       cat:"手机",   status:"on",      grade:"B",    price:2899, stock:15, gmv:12200, promo:"618 大促", date:"08-11 16:08" },
  { id:"SKU-58214", name:"AirPods Pro 2",                 cat:"耳机",   status:"on",      grade:"A",    price:1399, stock:62, gmv:24180, promo:null,        date:"08-11 15:24" },
  { id:"SKU-58213", name:"Apple Watch S9 GPS 41mm",       cat:"手表",   status:"off",     grade:"B",    price:2199, stock:0,  gmv:0,     promo:null,        date:"08-11 11:02" },
  { id:"SKU-58212", name:"小米 13 Ultra 16+512",          cat:"手机",   status:"reject",  grade:"—",    price:3699, stock:0,  gmv:0,     promo:null,        date:"08-10 22:11" },
  { id:"SKU-58211", name:"Sony WH-1000XM5",               cat:"耳机",   status:"on",      grade:"A",    price:1799, stock:12, gmv:8980,  promo:"官方补贴", date:"08-10 19:52" },
];

const STATUS = {
  on:      { label:"已上架",   tone:"success" },
  off:     { label:"已下架",   tone:"neutral" },
  pending: { label:"待入仓",   tone:"warning" },
  qc:      { label:"质检中",   tone:"info" },
  reject:  { label:"质检退回", tone:"danger" },
};

function Products({ onOpenQC }) {
  const [tab, setTab] = React.useState("all");
  const [sel, setSel] = React.useState(new Set());
  const rows = React.useMemo(
    () => tab === "all" ? PRODUCTS_SEED : PRODUCTS_SEED.filter(p => p.status === tab),
    [tab]
  );
  const allSelected = rows.length > 0 && rows.every(r => sel.has(r.id));
  const toggle = (id) => {
    const s = new Set(sel); s.has(id) ? s.delete(id) : s.add(id); setSel(s);
  };
  const toggleAll = () => {
    const s = new Set(sel);
    if (allSelected) rows.forEach(r => s.delete(r.id)); else rows.forEach(r => s.add(r.id));
    setSel(s);
  };
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

  return (
    <div className="zzt-page" data-screen-label="02 Products">
      <div className="zzt-page-header">
        <div>
          <h1 className="zzt-h1">商品管理</h1>
          <div className="zzt-page-sub">在售 1,284 · 待入仓 7 · 质检中 12 · 已下架 32</div>
        </div>
        <div className="zzt-page-actions">
          <Button variant="outline" icon="upload">批量导入</Button>
          <Button variant="outline" icon="download">导出</Button>
          <Button variant="primary" icon="plus">新建商品</Button>
        </div>
      </div>

      <Card padding={0}>
        <div className="zzt-list-tabs">
          <SegmentedControl
            value={tab}
            onChange={setTab}
            items={[
              { value:"all", label:"全部",      count: PRODUCTS_SEED.length },
              { value:"on", label:"已上架",     count: PRODUCTS_SEED.filter(p=>p.status==="on").length },
              { value:"pending", label:"待入仓", count: PRODUCTS_SEED.filter(p=>p.status==="pending").length },
              { value:"qc", label:"质检中",     count: PRODUCTS_SEED.filter(p=>p.status==="qc").length },
              { value:"reject", label:"质检退回",count: PRODUCTS_SEED.filter(p=>p.status==="reject").length },
              { value:"off", label:"已下架",     count: PRODUCTS_SEED.filter(p=>p.status==="off").length },
            ]}
          />
        </div>
        <div className="zzt-filters">
          <div className="zzt-search zzt-search-sm"><i data-lucide="search"></i><input placeholder="搜索商品名 / SKU / IMEI" /></div>
          <button className="zzt-filter-chip"><i data-lucide="filter"></i>品类<i data-lucide="chevron-down"></i></button>
          <button className="zzt-filter-chip">售价区间<i data-lucide="chevron-down"></i></button>
          <button className="zzt-filter-chip">活动归属<i data-lucide="chevron-down"></i></button>
          <button className="zzt-filter-chip">质检等级<i data-lucide="chevron-down"></i></button>
          <span style={{flex:1}}></span>
          <button className="zzt-filter-chip"><i data-lucide="sliders-horizontal"></i>列设置</button>
        </div>

        <div className="zzt-table-wrap">
          <table className="zzt-table">
            <thead>
              <tr>
                <th style={{width:32}}><Check checked={allSelected} onChange={toggleAll} /></th>
                <th>商品</th>
                <th>分类</th>
                <th>状态</th>
                <th>质检等级</th>
                <th className="num">售价</th>
                <th className="num">库存</th>
                <th className="num">7日 GMV</th>
                <th>活动</th>
                <th>更新</th>
                <th style={{width:60}}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => {
                const st = STATUS[r.status];
                const checked = sel.has(r.id);
                return (
                  <tr key={r.id} className={checked ? "is-sel" : ""}>
                    <td><Check checked={checked} onChange={() => toggle(r.id)} /></td>
                    <td>
                      <div className="zzt-sku">
                        <div className="zzt-thumb"></div>
                        <div>
                          <div className="zzt-sku-name">{r.name}</div>
                          <div className="zzt-sku-id">{r.id}</div>
                        </div>
                      </div>
                    </td>
                    <td><Tag kind="category">{r.cat}</Tag></td>
                    <td><StatusTag tone={st.tone}>{st.label}</StatusTag></td>
                    <td>{r.grade === "—" ? <span className="zzt-fg-subtle">—</span> :
                         <span className={"zzt-grade zzt-grade-"+r.grade.toLowerCase()}>{r.grade}</span>}</td>
                    <td className="num">¥ {r.price.toLocaleString()}</td>
                    <td className="num"><span className={r.stock === 0 ? "zzt-fg-danger" : ""}>{r.stock}</span></td>
                    <td className="num">¥ {r.gmv.toLocaleString()}</td>
                    <td>{r.promo ? <Tag kind="promotion">{r.promo}</Tag> : <span className="zzt-fg-subtle">—</span>}</td>
                    <td className="zzt-fg-muted">{r.date}</td>
                    <td>
                      <button className="zzt-icon-btn" onClick={() => r.status === "qc" || r.status === "reject" ? onOpenQC(r) : null}>
                        <i data-lucide="more-horizontal"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="zzt-table-foot">
          <span className="zzt-caption">共 {rows.length} 条</span>
          <Pager />
        </div>
      </Card>

      {sel.size > 0 && (
        <BatchBar count={sel.size} total={PRODUCTS_SEED.length} onClear={() => setSel(new Set())} />
      )}
    </div>
  );
}

function Check({ checked, onChange }) {
  return (
    <span className={"zzt-check" + (checked ? " is-on" : "")} onClick={onChange} role="checkbox" aria-checked={checked} />
  );
}

function Pager() {
  return (
    <div className="zzt-pager">
      <button className="zzt-pager-btn"><i data-lucide="chevron-left"></i></button>
      <button className="zzt-pager-btn is-active">1</button>
      <button className="zzt-pager-btn">2</button>
      <button className="zzt-pager-btn">3</button>
      <span className="zzt-pager-ell">…</span>
      <button className="zzt-pager-btn">12</button>
      <button className="zzt-pager-btn"><i data-lucide="chevron-right"></i></button>
    </div>
  );
}

function BatchBar({ count, total, onClear }) {
  return (
    <div className="zzt-batch-bar">
      <span className="zzt-batch-count">已选 <b>{count}</b> / 共 {total} 件</span>
      <span className="zzt-batch-sep">·</span>
      <button className="zzt-batch-act" onClick={onClear}><i data-lucide="circle-x"></i>取消选择</button>
      <span style={{flex:1}}></span>
      <button className="zzt-batch-act"><i data-lucide="tag"></i>批量改价</button>
      <button className="zzt-batch-act"><i data-lucide="check"></i>批量上架</button>
      <button className="zzt-batch-act"><i data-lucide="archive"></i>批量下架</button>
      <button className="zzt-batch-act"><i data-lucide="megaphone"></i>加入活动</button>
      <button className="zzt-batch-act zzt-batch-danger"><i data-lucide="trash-2"></i>删除</button>
    </div>
  );
}

Object.assign(window, { Products, Check, Pager, BatchBar });
