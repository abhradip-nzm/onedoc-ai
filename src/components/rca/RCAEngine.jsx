import React, { useState } from 'react';
import { AlertTriangle, Brain, CheckCircle, Clock, Eye, Zap, Plus, ChevronRight, Cpu } from 'lucide-react';
import { rcaIncidents } from '../../data/simulationData';
import { useApp } from '../../contexts/AppContext';

const SEV = {
  high:   { cls:'badge-rose',    en:'HIGH',        zh:'高',   icon:'🔴' },
  medium: { cls:'badge-amber',   en:'MEDIUM',      zh:'中',   icon:'🟡' },
  low:    { cls:'badge-emerald', en:'LOW',          zh:'低',   icon:'🟢' },
};
const STAT = {
  'resolved':    { cls:'badge-emerald', icon:CheckCircle, en:'Resolved',    zh:'已解决' },
  'in-progress': { cls:'badge-amber',   icon:Clock,       en:'In Progress', zh:'进行中' },
  'monitoring':  { cls:'badge-cyan',    icon:Eye,         en:'Monitoring',  zh:'监控中' },
};

function IncidentCard({ inc, active, onClick, t }) {
  const sev = SEV[inc.severity];
  const stat = STAT[inc.status];
  const StatIcon = stat.icon;
  return (
    <div
      onClick={onClick}
      className={`card ${active ? 'card-glow' : ''}`}
      style={{ padding:17, marginBottom:10, cursor:'pointer', transition:'all 0.2s' }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:9 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4, flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-tertiary)' }}>{inc.id}</span>
            <span className={`badge ${sev.cls}`} style={{ fontSize:9.5 }}>{sev.icon} {t(sev.en, sev.zh)}</span>
          </div>
          <div style={{ fontWeight:700, fontSize:13, lineHeight:1.35 }}>{inc.title}</div>
          <div style={{ fontSize:10.5, color:'var(--text-tertiary)', marginTop:2 }}>📍 {inc.outlet} · {inc.date}</div>
        </div>
        <span className={`badge ${stat.cls}`} style={{ flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:4 }}>
          <StatIcon size={10} />{t(stat.en, stat.zh)}
        </span>
      </div>
      <div style={{ display:'flex', gap:14 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--rose-4)', lineHeight:1 }}>{inc.affectedClients}</div>
          <div style={{ fontSize:9.5, color:'var(--text-tertiary)' }}>{t('affected','受影响')}</div>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--violet-5)', lineHeight:1 }}>{inc.rootCauses.length}</div>
          <div style={{ fontSize:9.5, color:'var(--text-tertiary)' }}>{t('root causes','根因')}</div>
        </div>
        {inc.resolvedIn && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--emerald-4)', lineHeight:1 }}>{inc.resolvedIn}</div>
            <div style={{ fontSize:9.5, color:'var(--text-tertiary)' }}>{t('resolved in','解决耗时')}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RCAEngine() {
  const { t, lang } = useApp();
  const [sel, setSel] = useState(rcaIncidents[0]);
  const [tab, setTab] = useState('analysis');
  const [newForm, setNewForm] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setNewForm(false); setNewTitle(''); }, 2200);
  };

  return (
    <div className="page-body">
      {/* Header */}
      <div style={{ marginBottom:22 }}>
        <div className="badge badge-rose" style={{ marginBottom:8, display:'inline-flex', gap:5 }}>
          <AlertTriangle size={10} />
          {t('RCA ENGINE · AI-POWERED','根因分析引擎 · AI驱动')}
        </div>
        <h2 className="t-display" style={{ fontSize:24, marginBottom:4 }}>
          {t('Root Cause Analysis','根本原因分析')}
        </h2>
        <p style={{ fontSize:12.5, color:'var(--text-tertiary)' }}>
          {t('AI pattern detection · Fishbone analysis · Resolution tracking','AI模式检测 · 鱼骨分析 · 解决方案追踪')}
        </p>
      </div>

      {/* Summary Strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:22 }}>
        {[
          { emoji:'🔴', v:2, l:t('Open Incidents','未解决事件'), col:'var(--rose-4)' },
          { emoji:'🔵', v:1, l:t('Monitoring','监控中'),         col:'var(--cyan-4)' },
          { emoji:'🟢', v:8, l:t('Resolved (30d)','已解决(30天)'), col:'var(--emerald-4)' },
          { emoji:'⏱', v:'52h', l:t('Avg Resolution','平均解决时间'), col:'var(--violet-5)' },
        ].map((s,i)=>(
          <div key={i} className="card" style={{ padding:16, textAlign:'center' }}>
            <div style={{ fontSize:22, marginBottom:4 }}>{s.emoji}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:900, color:s.col, lineHeight:1 }}>{s.v}</div>
            <div style={{ fontSize:10.5, color:'var(--text-tertiary)', marginTop:4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:18 }}>
        {/* Left: Incident List */}
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <div className="t-label">{t('INCIDENTS','事件列表')}</div>
            <button className="btn btn-primary" style={{ height:30, fontSize:11, padding:'0 10px', gap:4 }} onClick={()=>setNewForm(f=>!f)}>
              <Plus size={12} />{t('New','新建')}
            </button>
          </div>

          {/* New Incident Form */}
          {newForm && (
            <div className="card" style={{ padding:14, marginBottom:12, animation:'fadeSlideUp 0.3s var(--ease-out)' }}>
              <div style={{ fontWeight:700, fontSize:12.5, marginBottom:10 }}>{t('Report Incident','报告事件')}</div>
              <input
                className="input"
                style={{ marginBottom:8, fontSize:12 }}
                placeholder={t('Incident title...','事件标题...')}
                value={newTitle}
                onChange={e=>setNewTitle(e.target.value)}
              />
              <select className="input" style={{ marginBottom:8, fontSize:12 }}>
                <option>Mid Valley</option><option>Cheras</option><option>Uptown PJ</option>
                <option>Icon City</option><option>Bukit Jalil</option>
              </select>
              <select className="input" style={{ marginBottom:10, fontSize:12 }}>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
              <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:12 }} onClick={runAnalysis}>
                {analyzing
                  ? <><Cpu size={13} style={{ animation:'spin 1s linear infinite' }} />{t(' Analysing...','分析中...')}</>
                  : <><Brain size={13} />{t(' Run AI Analysis','运行AI分析')}</>
                }
              </button>
            </div>
          )}

          {rcaIncidents.map(inc => (
            <IncidentCard
              key={inc.id}
              inc={inc}
              active={sel?.id === inc.id}
              onClick={()=>{setSel(inc); setTab('analysis');}}
              t={t}
            />
          ))}
        </div>

        {/* Right: Detail */}
        {sel && (
          <div>
            {/* Tabs */}
            <div className="tabs-bar">
              {[
                { id:'analysis',   en:'🔍 Analysis',   zh:'🔍 分析'   },
                { id:'fishbone',   en:'🐟 Fishbone',   zh:'🐟 鱼骨图' },
                { id:'timeline',   en:'📅 Timeline',   zh:'📅 时间线' },
                { id:'resolution', en:'✅ Resolution',  zh:'✅ 解决方案' },
              ].map(tb=>(
                <button key={tb.id} className={`tab-btn ${tab===tb.id?'active':''}`} onClick={()=>setTab(tb.id)}>
                  {t(tb.en, tb.zh)}
                </button>
              ))}
            </div>

            {/* ── ANALYSIS ── */}
            {tab==='analysis' && (
              <div>
                {/* AI Insight */}
                <div style={{ display:'flex', gap:12, padding:'13px 17px', background:'linear-gradient(135deg,rgba(109,53,224,0.14) 0%,rgba(232,121,249,0.07) 100%)', border:'1px solid var(--border-medium)', borderRadius:13, marginBottom:16, animation:'fadeSlideUp 0.3s var(--ease-out)' }}>
                  <div style={{ width:32,height:32,borderRadius:9,background:'var(--grad-primary)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'var(--shadow-glow-sm)' }}>
                    <Brain size={15} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:11.5, color:'var(--violet-5)', marginBottom:3, fontFamily:'var(--font-mono)' }}>{t('AI ROOT CAUSE ANALYSIS','AI根因分析')}</div>
                    <div style={{ fontSize:12.5, color:'var(--text-secondary)', lineHeight:1.65 }}>
                      {lang==='zh' ? sel.aiInsightZh : sel.aiInsight}
                    </div>
                  </div>
                </div>

                {/* Root Causes */}
                <div className="card" style={{ padding:20, marginBottom:14 }}>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>{t('AI-Identified Root Causes','AI识别的根本原因')}</div>
                  {sel.rootCauses.map((rc,i)=>(
                    <div key={i} style={{ marginBottom:14 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ width:22,height:22,borderRadius:6,background:i===0?'rgba(251,113,133,0.15)':i===1?'rgba(251,191,36,0.12)':'rgba(109,53,224,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:i===0?'var(--rose-4)':i===1?'var(--amber-4)':'var(--violet-5)' }}>
                            {i+1}
                          </div>
                          <span style={{ fontSize:12.5, fontWeight:500 }}>{rc.factor}</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                          <span className={`badge ${rc.type==='People'?'badge-rose':rc.type==='Equipment'?'badge-amber':rc.type==='Sales'?'badge-fuchsia':'badge-cyan'}`} style={{ fontSize:9.5 }}>
                            {rc.type}
                          </span>
                          <span style={{ fontFamily:'var(--font-mono)', fontWeight:800, fontSize:13, color:rc.impact>40?'var(--rose-4)':'var(--amber-4)' }}>
                            {rc.impact}%
                          </span>
                        </div>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width:`${rc.impact}%`, background:rc.impact>40?'var(--rose-4)':rc.impact>20?'var(--amber-4)':'var(--violet-4)', boxShadow:`0 0 8px ${rc.impact>40?'rgba(251,113,133,0.4)':'rgba(251,191,36,0.3)'}` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendation */}
                <div className="card" style={{ padding:20, borderColor:'rgba(52,211,153,0.2)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
                    <Zap size={15} style={{ color:'var(--emerald-4)' }} />
                    <div style={{ fontWeight:700, fontSize:14, color:'var(--emerald-4)' }}>{t('AI Recommendations','AI推荐方案')}</div>
                  </div>
                  <div style={{ fontSize:12.5, color:'var(--text-secondary)', lineHeight:1.8 }}>
                    {sel.recommendations.map((r,i)=>(
                      <div key={i} style={{ display:'flex', gap:7, marginBottom:5 }}>
                        <span style={{ color:'var(--emerald-4)', fontWeight:700 }}>→</span>
                        <span>{r.action}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:8, marginTop:14 }}>
                    <button className="btn btn-primary" style={{ fontSize:12 }}>
                      <CheckCircle size={13} />{t('Mark Resolved','标记已解决')}
                    </button>
                    <button className="btn btn-ghost" style={{ fontSize:12 }}>
                      {t('Assign Manager','分配负责人')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── FISHBONE ── */}
            {tab==='fishbone' && (
              <div className="card" style={{ padding:22 }}>
                <div style={{ fontWeight:700, fontSize:15, marginBottom:3 }}>{t('Ishikawa Fishbone Diagram','石川鱼骨图')}</div>
                <div style={{ fontSize:11.5, color:'var(--text-tertiary)', marginBottom:20 }}>
                  {t('AI-generated cause-effect analysis','AI生成因果分析')} · {sel.title}
                </div>

                {/* Effect box */}
                <div style={{ textAlign:'center', marginBottom:22 }}>
                  <div style={{ display:'inline-block', padding:'11px 22px', background:'rgba(251,113,133,0.1)', border:'1px solid rgba(251,113,133,0.25)', borderRadius:10, fontSize:13, fontWeight:700, color:'var(--rose-4)' }}>
                    ⚠️ {t('Effect: ','结果：')}{sel.title}
                  </div>
                </div>

                {/* Fishbone grid */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[
                    { cat:'People',       col:'#fb7185', icon:'👥' },
                    { cat:'Equipment',    col:'#fbbf24', icon:'🔧' },
                    { cat:'Process',      col:'#8b5cf6', icon:'⚙️' },
                    { cat:'Environment',  col:'#22d3ee', icon:'🌐' },
                  ].map(({ cat, col, icon }) => {
                    const causes = sel.rootCauses.filter(r => r.type === cat);
                    const extra = sel.rootCauses.filter(r => r.type !== cat && r.impact < 15).slice(0, 1);
                    const allCauses = causes.length > 0 ? causes : [{ factor:`No major ${cat} causes identified`, impact:0, confirmed:false }];
                    return (
                      <div key={cat} style={{ padding:'14px 16px', background:`${col}0d`, border:`1px solid ${col}22`, borderRadius:11 }}>
                        <div style={{ fontWeight:700, fontSize:12.5, color:col, marginBottom:10 }}>
                          {icon} {cat}
                        </div>
                        {allCauses.map((c,i)=>(
                          <div key={i} style={{ marginBottom:c.impact > 0 ? 10 : 0 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:c.impact > 0 ? 4 : 0 }}>
                              <div style={{ width:7,height:7,borderRadius:'50%',background:c.confirmed?'var(--emerald-4)':'var(--text-tertiary)',flexShrink:0 }} />
                              <span style={{ fontSize:11.5, color:c.confirmed?'var(--text-primary)':'var(--text-tertiary)' }}>{c.factor}</span>
                            </div>
                            {c.impact > 0 && (
                              <div style={{ marginLeft:13 }}>
                                <div className="progress-track" style={{ height:3 }}>
                                  <div className="progress-fill" style={{ width:`${c.impact}%`, background:col }} />
                                </div>
                                <div style={{ fontSize:9.5, color:'var(--text-tertiary)', marginTop:1, fontFamily:'var(--font-mono)' }}>{c.impact}% impact</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display:'flex', gap:16, justifyContent:'center', marginTop:14, fontSize:11, color:'var(--text-tertiary)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--emerald-4)' }} /> {t('AI Confirmed','AI已确认')}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--text-tertiary)' }} /> {t('Suspected','疑似')}
                  </div>
                </div>
              </div>
            )}

            {/* ── TIMELINE ── */}
            {tab==='timeline' && (
              <div className="card" style={{ padding:22 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:18 }}>{t('Incident Timeline','事件时间线')}</div>
                {sel.timeline.map((ev,i)=>(
                  <div key={i} style={{ display:'flex', gap:14, marginBottom:18 }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                      <div style={{ width:30,height:30,borderRadius:'50%',flexShrink:0,background:i===0?'rgba(251,113,133,0.15)':i===sel.timeline.length-1&&sel.status==='resolved'?'rgba(52,211,153,0.15)':'rgba(109,53,224,0.12)',border:`1px solid ${i===0?'rgba(251,113,133,0.3)':i===sel.timeline.length-1&&sel.status==='resolved'?'rgba(52,211,153,0.3)':'rgba(109,53,224,0.2)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12 }}>
                        {i===0?'⚡':i===sel.timeline.length-1&&sel.status==='resolved'?'✅':'→'}
                      </div>
                      {i < sel.timeline.length-1 && <div style={{ width:1,flex:1,background:'var(--border-faint)',marginTop:4 }} />}
                    </div>
                    <div style={{ paddingBottom:8 }}>
                      <div style={{ fontSize:10, color:'var(--text-tertiary)', fontFamily:'var(--font-mono)', marginBottom:3 }}>
                        {ev.t} · {ev.actor}
                      </div>
                      <div style={{ fontSize:12.5, color:'var(--text-primary)', lineHeight:1.5 }}>{ev.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── RESOLUTION ── */}
            {tab==='resolution' && (
              <div className="card" style={{ padding:22 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:16 }}>{t('Resolution Action Plan','解决方案行动计划')}</div>
                {sel.recommendations.map((r,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'11px 13px', marginBottom:8, background:'var(--bg-elevated)', borderRadius:10, border:'1px solid var(--border-faint)' }}>
                    <div style={{ width:22,height:22,borderRadius:'50%',flexShrink:0,background:r.done?'rgba(52,211,153,0.15)':'var(--bg-float)',border:`1px solid ${r.done?'rgba(52,211,153,0.35)':'var(--border-subtle)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12 }}>
                      {r.done?'✓':'○'}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12.5, fontWeight:500, textDecoration:r.done?'line-through':'none', color:r.done?'var(--text-tertiary)':'var(--text-primary)', marginBottom:3 }}>
                        {r.action}
                      </div>
                      <div style={{ fontSize:10.5, color:'var(--text-tertiary)' }}>
                        👤 {r.owner} · 📅 {r.deadline}
                      </div>
                    </div>
                    <span className={`badge ${r.done?'badge-emerald':'badge-amber'}`} style={{ fontSize:9.5, flexShrink:0 }}>
                      {r.done ? t('Done','完成') : t('Pending','待处理')}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop:14, display:'flex', gap:8 }}>
                  <button className="btn btn-primary" style={{ fontSize:12 }}>
                    <Zap size={13} />
                    {t('Auto-assign All','自动分配全部')}
                  </button>
                  <button className="btn btn-ghost" style={{ fontSize:12 }}>
                    {t('Export Report','导出报告')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
