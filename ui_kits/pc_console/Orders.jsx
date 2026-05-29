// ui_kits/pc_console/Orders.jsx
// 订单售后 — list with SLA visual cue + side detail with status timeline.

const ORDERS = [
  { id:"ZZO-220812-00128", sku:"SKU-58219", name:"iPhone 14 Pro 256GB 深空黑", buyer:"杨**雨", phone:"139****8821", price:4599, status:"to_ship", sla_hours:6,    placed:"08-12 09:18" },
  { id:"ZZO-220812-00127", sku:"SKU-58214", name:"AirPods Pro 2",            buyer:"陈**轩", phone:"137****6643", price:1399, status:"shipped", sla_hours:36,   placed:"08-11 23:02" },
  { id:"ZZO-220812-00126", sku:"SKU-58218", name:"iPhone 13 128GB 蓝色",     buyer:"李**坤", phone:"152****0091", price:3299, status:"to_ship", sla_hours:1.5,  placed:"08-11 21:40", urgent:true },
  { id:"ZZO-220812-00125", sku:"SKU-58215", name:"Galaxy S23 256GB 幻境黑",  buyer:"周**菲", phone:"186****4408", price:2899, status:"delivered", sla_hours:96,  placed:"08-08 17:10" },
  { id:"ZZO-220812-00124", sku:"SKU-58216", name:"MacBook Air M2 8+256",     buyer:"郑**", phone:"131****2271", price:7899, status:"return",  sla_hours:24,   placed:"08-09 13:48" },
];

const O_STATUS = {
  to_ship:   { label:"待发货",   tone:"warning" },
  shipped:   { label:"已发货",   tone:"info" },
  delivered: { label:"已签收",   tone:"success" },
  return:    { label:"退货中",   tone:"danger" },
  done:      { label:"已完成",   tone:"neutral" },
};

function Orders() {
  const [active, setActive] = React.useState(ORDERS[0]);
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <div className="zzt-page" data-screen-label="05 Orders">
      <div className="zzt-page-header">
        <div>
          <h1 className="zzt-h1">订单售后</h1>
          <div className="zzt-page-sub">今日新增 24 · 待发货 86 · 售后处理中 3</div>
        </div>
        <div className="zzt-page-actions">
          <Button variant="outline" icon="download">导出订单</Button>
          <Button variant="primary" icon="truck">批量发货</Button>
        </div>
      </div>

      <div className="zzt-grid-12">
        <div className="zzt-col-7">
          <Card padding={0}>
            <div className="zzt-list-tabs">
              <SegmentedControl
                value="to_ship" onChange={()=>{}}
                items={[
                  { value:"all", label:"全部", count: 1284 },
                  { value:"to_ship", label:"待发货", count: 86 },
                  { value:"shipped", label:"已发货", count: 142 },
                  { value:"delivered", label:"已签收", count: 1024 },
                  { value:"return", label:"售后", count: 3 },
                ]}
              />
            </div>
            <div className="zzt-order-list">
              {ORDERS.map(o => {
                const st = O_STATUS[o.status];
                return (
                  <button key={o.id} className={"zzt-order-row" + (active.id === o.id ? " is-active" : "")} onClick={() => setActive(o)}>
                    <div className="zzt-thumb zzt-thumb-md"></div>
                    <div className="zzt-order-body">
                      <div className="zzt-order-line1">
                        <span className="zzt-order-name">{o.name}</span>
                        <span className="zzt-order-price">¥ {o.price.toLocaleString()}</span>
                      </div>
                      <div className="zzt-order-line2">
                        <span className="zzt-fg-muted">{o.id}</span>
                        <StatusTag tone={st.tone}>{st.label}</StatusTag>
                        {o.status === "to_ship" && <SLA hours={o.sla_hours} urgent={o.urgent}/>}
                      </div>
                      <div className="zzt-order-line3">
                        <span><i data-lucide="user"></i>{o.buyer} · {o.phone}</span>
                        <span><i data-lucide="clock"></i>下单 {o.placed}</span>
                      </div>
                    </div>
                    <i data-lucide="chevron-right" className="zzt-fg-muted"></i>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="zzt-col-5">
          <OrderDetail order={active} />
        </div>
      </div>
    </div>
  );
}

function SLA({ hours, urgent }) {
  const tone = urgent ? "danger" : hours <= 12 ? "warning" : "info";
  const text = hours < 1 ? `< 1h` : hours < 24 ? `${hours}h 内` : `${Math.round(hours/24)}d 内`;
  return (
    <span className={`zzt-sla zzt-tone-${tone}`}>
      <i data-lucide="alarm-clock"></i>履约 {text}
    </span>
  );
}

function OrderDetail({ order }) {
  if (!order) return null;
  const st = O_STATUS[order.status];
  const steps = [
    { key:"placed",   label:"下单",       time:order.placed,        done:true },
    { key:"paid",     label:"已支付",     time:order.placed,        done:true },
    { key:"qc",       label:"出库前抽检", time:"08-12 09:30",       done:order.status !== "to_ship" || order.status === "shipped" },
    { key:"ship",     label:"已发货",     time:order.status === "shipped" || order.status === "delivered" ? "08-12 11:02" : "—",
                      done:order.status === "shipped" || order.status === "delivered" },
    { key:"deliv",    label:"已签收",     time:order.status === "delivered" ? "08-14 10:40" : "—",
                      done:order.status === "delivered" },
  ];
  return (
    <Card>
      <div className="zzt-card-head">
        <div>
          <div className="zzt-caption">订单号 {order.id}</div>
          <h3 className="zzt-h3" style={{marginTop:4}}>{order.name}</h3>
        </div>
        <StatusTag tone={st.tone}>{st.label}</StatusTag>
      </div>

      <div className="zzt-kv">
        <div><span className="zzt-kv-l">买家</span><span className="zzt-kv-v">{order.buyer} · {order.phone}</span></div>
        <div><span className="zzt-kv-l">收货地址</span><span className="zzt-kv-v">广东省 · 深圳市 · 南山区科技园某座 1602</span></div>
        <div><span className="zzt-kv-l">支付金额</span><span className="zzt-kv-v zzt-metric" style={{fontSize:18}}>¥ {order.price.toLocaleString()}</span></div>
        <div><span className="zzt-kv-l">备注</span><span className="zzt-kv-v zzt-fg-muted">买家备注：希望尽快发货</span></div>
      </div>

      <div className="zzt-timeline-wrap">
        <div className="zzt-caption" style={{marginBottom:10}}>履约进度</div>
        <div className="zzt-timeline">
          {steps.map((s, i) => (
            <div key={s.key} className={"zzt-tl-step" + (s.done ? " is-done" : "")}>
              <span className="zzt-tl-dot">{s.done ? <i data-lucide="check"></i> : null}</span>
              <div className="zzt-tl-text">
                <div>{s.label}</div>
                <span className="zzt-caption">{s.time}</span>
              </div>
              {i < steps.length - 1 && <span className={"zzt-tl-line" + (steps[i+1].done ? " is-done" : "")}></span>}
            </div>
          ))}
        </div>
      </div>

      <div className="zzt-card-foot-row">
        <Button variant="ghost" icon="message-square">联系买家</Button>
        <span style={{flex:1}}></span>
        <Button variant="outline">打印面单</Button>
        <Button variant="primary" icon="truck">发货</Button>
      </div>
    </Card>
  );
}

window.Orders = Orders;
