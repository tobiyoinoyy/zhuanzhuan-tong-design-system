// ui_kits/pc_console/QCDrawer.jsx
// 质检结果详情抽屉 — structured reject reasons.

function QCDrawer({ product, onClose }) {
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
  if (!product) return null;
  return (
    <div className="zzt-drawer-root" data-screen-label="03 QC Drawer">
      <div className="zzt-drawer-scrim" onClick={onClose}></div>
      <aside className="zzt-drawer">
        <header className="zzt-drawer-head">
          <div>
            <div className="zzt-overline" style={{color:"var(--zzt-fg-muted)"}}>质检结果</div>
            <h3 className="zzt-h3" style={{marginTop:4}}>{product.name}</h3>
            <div className="zzt-caption" style={{marginTop:4}}>{product.id} · 入仓批次 IB-220812-04 · 质检员 张工</div>
          </div>
          <button className="zzt-icon-btn" onClick={onClose}><i data-lucide="x"></i></button>
        </header>

        <div className="zzt-drawer-summary">
          <div>
            <div className="zzt-caption">总体结论</div>
            <div style={{display:"flex", alignItems:"center", gap:8, marginTop:4}}>
              <StatusTag tone="danger">质检退回</StatusTag>
              <span className="zzt-fg-muted">建议调价 ¥ 2,899 → ¥ 2,499</span>
            </div>
          </div>
          <div>
            <div className="zzt-caption">综合等级</div>
            <div className="zzt-grade zzt-grade-c" style={{marginTop:4}}>C</div>
          </div>
          <div>
            <div className="zzt-caption">扣分项</div>
            <div className="zzt-h3" style={{marginTop:4}}>3 项</div>
          </div>
        </div>

        <div className="zzt-drawer-body">
          <h4 className="zzt-h4">分项检查结果</h4>
          <QCItem tone="success"  label="开机 / 系统" reason="正常开机，系统版本 iOS 17.5，已抹除账户" />
          <QCItem tone="success"  label="电池健康" reason="电池效率 92%，可销售" />
          <QCItem tone="warning"  label="外观成色"
                  reason="后盖左下角划痕 0.8mm × 2 处；边框 6 点钟方向轻微磕碰"
                  score="-15 分" />
          <QCItem tone="danger"   label="屏幕"
                  reason="左上角液晶轻微漏液（< 5mm²），不影响使用但需向用户披露"
                  score="-25 分" />
          <QCItem tone="danger"   label="原厂件认定"
                  reason="电池为副厂替换件 · 检测时间 08-12 16:22"
                  score="-30 分" />
          <QCItem tone="success"  label="功能性测试" reason="通话 / 听筒 / 扬声器 / 触控 / WiFi / 蓝牙均正常" />

          <h4 className="zzt-h4" style={{marginTop:24}}>处置建议</h4>
          <div className="zzt-suggestions">
            <button className="zzt-sugg"><b>调价上架</b><span>系统建议 ¥ 2,499（B 级价位）</span></button>
            <button className="zzt-sugg"><b>退回商户</b><span>本批次发起退回 · 已生成回单</span></button>
            <button className="zzt-sugg"><b>转入翻新</b><span>原厂件更换 · 预估周期 5 天</span></button>
          </div>
        </div>

        <footer className="zzt-drawer-foot">
          <Button variant="ghost">查看完整报告</Button>
          <span style={{flex:1}}></span>
          <Button variant="secondary" onClick={onClose}>稍后处理</Button>
          <Button variant="danger">确认退回</Button>
          <Button variant="primary">采纳并调价</Button>
        </footer>
      </aside>
    </div>
  );
}

function QCItem({ tone, label, reason, score }) {
  return (
    <div className="zzt-qc-item">
      <span className={`zzt-qc-dot zzt-tone-${tone}`}>
        <i data-lucide={tone === "danger" ? "x" : tone === "warning" ? "alert-triangle" : "check"}></i>
      </span>
      <div className="zzt-qc-body">
        <div className="zzt-qc-row">
          <span className="zzt-qc-label">{label}</span>
          {score && <span className="zzt-qc-score">{score}</span>}
        </div>
        <div className="zzt-qc-reason">{reason}</div>
      </div>
    </div>
  );
}

window.QCDrawer = QCDrawer;
