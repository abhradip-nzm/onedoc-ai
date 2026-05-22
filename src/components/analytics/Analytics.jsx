import React, { useState } from 'react';
import {
  BarChart, Bar, ScatterChart, Scatter, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ReferenceLine, ZAxis,
} from 'recharts';
import { Filter, TrendingUp } from 'lucide-react';
import { outletData, satisfactionScatter, weekHeatmap } from '../../data/simulationData';
import { useApp } from '../../contexts/AppContext';
import ChartTooltip from '../shared/ChartTooltip';

const DAYS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const HOURS = Array.from({length:12},(_,i)=>`${i+8}h`);

const heatColor = (v, max=115) => {
  const n = v / max;
  if (n < 0.15) return 'rgba(109,53,224,0.05)';
  if (n < 0.30) return 'rgba(109,53,224,0.15)';
  if (n < 0.50) return 'rgba(109,53,224,0.30)';
  if (n < 0.70) return 'rgba(109,53,224,0.55)';
  if (n < 0.85) return 'rgba(109,53,224,0.80)';
  return '#6d35e0';
};

const NPS_SEGS = [
  { label:'Promoters (9–10)', pct:58, color:'#34d399' },
  { label:'Passives (7–8)',   pct:28, color:'#a78bfa' },
  { label:'Detractors (0–6)',  pct:14, color:'#fb7185' },
];

const DEMO_AGE = [
  { age:'18–24', pct:22, color:'#8b5cf6' },
  { age:'25–34', pct:38, color:'#6d35e0' },
  { age:'35–44', pct:27, color:'#a855f7' },
  { age:'45+',   pct:13, color:'#d946ef' },
];

const SENTIMENT = [
  { label:'Very Positive', emoji:'😍', pct:62, color:'#34d399' },
  { label:'Positive',      emoji:'😊', pct:24, color:'#8b5cf6' },
  { label:'Neutral',       emoji:'😐', pct:9,  color:'#fbbf24' },
  { label:'Negative',      emoji:'😞', pct:3,  color:'#fb7185' },
  { label:'Very Negative', emoji:'😡', pct:2,  color:'#ef4444' },
];

export default function Analytics() {
  const { t } = useApp();
  const [tab, setTab] = useState('overview');
  const [range, setRange] = useState('3m');

  return (
    <div className="page-body">
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
        <div>
          <div className="badge badge-violet" style={{ marginBottom:8, display:'inline-flex' }}>
            <TrendingUp size={10} />
            {t('DEEP ANALYTICS','深度分析')}
          </div>
          <h2 className="t-display" style={{ fontSize:24 }}>
            {t('Analytics Hub','数据分析中心')}
          </h2>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {['1m','3m','6m','1y'].map(r=>(
            <button
              key={r}
              onClick={()=>setRange(r)}
              className={`btn ${range===r?'btn-primary':'btn-subtle'}`}
              style={{ height:32, fontSize:11, padding:'0 12px' }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-bar">
        {[
          { id:'overview',     en:'Overview',        zh:'概览'       },
          { id:'clients',      en:'Client Analytics', zh:'客户分析'  },
          { id:'outlets',      en:'Outlet Deep-Dive', zh:'门店分析'  },
          { id:'satisfaction', en:'Satisfaction',     zh:'满意度'    },
        ].map(tb => (
          <button
            key={tb.id}
            className={`tab-btn ${tab===tb.id?'active':''}`}
            onClick={()=>setTab(tb.id)}
          >
            {t(tb.en, tb.zh)}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab==='overview' && (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
            {/* Revenue by outlet bar */}
            <div className="card" style={{ padding:22 }}>
              <div className="section-title" style={{ marginBottom:4 }}>{t('Top Outlet Revenue','门店收入对比')}</div>
              <div className="section-sub" style={{ marginBottom:14 }}>MTD · RM</div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={outletData.slice(0,8)} layout="vertical" barSize={14} margin={{ left:10, right:10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" horizontal={false} />
                  <XAxis type="number" tick={{ fill:'var(--text-tertiary)', fontSize:10 }} axisLine={false} tickLine={false}
                    tickFormatter={v=>`${(v/1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" tick={{ fill:'var(--text-secondary)', fontSize:10.5 }}
                    axisLine={false} tickLine={false} width={95} />
                  <Tooltip
                    formatter={v=>[`RM ${(v/1000).toFixed(1)}K`,'Revenue']}
                    contentStyle={{ background:'var(--bg-overlay)', border:'1px solid var(--border-medium)', borderRadius:10, fontSize:11 }}
                  />
                  <Bar dataKey="rev" name="Revenue" radius={[0,4,4,0]}>
                    {outletData.slice(0,8).map((o,i)=>(
                      <Cell key={i} fill={
                        i===0?'#6d35e0':i===1?'#8b5cf6':i===2?'#a855f7':'rgba(109,53,224,0.35)'
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* NPS */}
            <div className="card" style={{ padding:22 }}>
              <div className="section-title" style={{ marginBottom:4 }}>NPS Distribution</div>
              <div className="section-sub" style={{ marginBottom:18 }}>{t('Net Promoter Score breakdown','净推荐值分布')}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {NPS_SEGS.map(s => (
                  <div key={s.label}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontSize:12, fontWeight:500 }}>{s.label}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontWeight:700, color:s.color, fontSize:13 }}>{s.pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width:`${s.pct}%`, background:s.color, boxShadow:`0 0 8px ${s.color}` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop:20, padding:14,
                background:'rgba(109,53,224,0.08)', borderRadius:10,
                textAlign:'center',
              }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:48, fontWeight:900, color:'var(--violet-4)', lineHeight:1 }}>72</div>
                <div style={{ fontSize:11.5, color:'var(--text-tertiary)', marginTop:4 }}>
                  Overall NPS · <span style={{ color:'var(--emerald-4)' }}>+5 vs Q3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Heatmap */}
          <div className="card" style={{ padding:22, marginBottom:16 }}>
            <div className="section-header">
              <div>
                <div className="section-title">{t('Session Volume Heatmap','会话密度热力图')}</div>
                <div className="section-sub">{t('Bookings per hour by day-of-week · darker = more sessions','每小时预约量 · 颜色越深代表越多')}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10, color:'var(--text-tertiary)' }}>
                <span>Low</span>
                {[0.1,0.3,0.5,0.7,0.9].map(v=>(
                  <div key={v} style={{ width:18, height:12, borderRadius:3, background:heatColor(v*115) }} />
                ))}
                <span>High</span>
              </div>
            </div>
            <div style={{ overflowX:'auto' }}>
              <div style={{ minWidth:580 }}>
                {/* Hour labels */}
                <div style={{ display:'flex', marginLeft:44, marginBottom:4 }}>
                  {HOURS.map(h=>(
                    <div key={h} style={{ width:'8.33%', textAlign:'center', fontSize:9, color:'var(--text-tertiary)', fontFamily:'var(--font-mono)' }}>{h}</div>
                  ))}
                </div>
                {weekHeatmap.map((row, di) => (
                  <div key={di} style={{ display:'flex', alignItems:'center', marginBottom:4 }}>
                    <div style={{ width:40, fontSize:10.5, color:'var(--text-secondary)', fontWeight:500, flexShrink:0 }}>{DAYS[di]}</div>
                    {row.map((cell,hi)=>(
                      <div
                        key={hi}
                        title={`${DAYS[di]} ${HOURS[hi]}: ${cell.val} sessions`}
                        style={{
                          width:'8.33%', height:26,
                          background:heatColor(cell.val),
                          borderRadius:4, marginRight:3,
                          border:'1px solid rgba(109,53,224,0.06)',
                          cursor:'pointer',
                          transition:'transform 0.12s',
                          flexShrink:0,
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.18)'; e.currentTarget.style.zIndex=10;}}
                        onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.zIndex=1;}}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scatter */}
          <div className="card" style={{ padding:22 }}>
            <div className="section-title" style={{ marginBottom:4 }}>{t('Revenue vs Satisfaction Correlation','收入与满意度相关分析')}</div>
            <div className="section-sub" style={{ marginBottom:16 }}>{t('each bubble = one outlet · size = session volume','每个气泡=一家门店 · 大小=会话量')}</div>
            <ResponsiveContainer width="100%" height={230}>
              <ScatterChart margin={{ top:10, right:10, bottom:10, left:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" />
                <XAxis type="number" dataKey="x" name="Satisfaction" domain={[4.2,5]} tick={{ fill:'var(--text-tertiary)',fontSize:10 }} axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="y" name="Revenue(K)" tick={{ fill:'var(--text-tertiary)',fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}K`} />
                <ZAxis type="number" dataKey="z" range={[40,400]} />
                <Tooltip
                  cursor={{ strokeDasharray:'3 3' }}
                  content={({payload})=>{
                    if(!payload?.[0]) return null;
                    const d=payload[0].payload;
                    return (
                      <div className="chart-tooltip">
                        <div className="chart-tooltip-title">{d.name}</div>
                        <div className="chart-tooltip-row"><span style={{color:'var(--text-secondary)'}}>Revenue</span><span style={{fontFamily:'var(--font-mono)',fontWeight:700}}>RM {d.y}K</span></div>
                        <div className="chart-tooltip-row"><span style={{color:'var(--text-secondary)'}}>Satisfaction</span><span style={{fontFamily:'var(--font-mono)',fontWeight:700}}>{d.x} ★</span></div>
                      </div>
                    );
                  }}
                />
                <Scatter data={satisfactionScatter} fill="#8b5cf6">
                  {satisfactionScatter.map((s,i)=>(
                    <Cell key={i} fill={
                      s.status==='top'?'#6d35e0':s.status==='good'?'#22d3ee':s.status==='watch'?'#fbbf24':'#fb7185'
                    } fillOpacity={0.85} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ── CLIENTS ── */}
      {tab==='clients' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="card" style={{ padding:22 }}>
            <div className="section-title" style={{ marginBottom:16 }}>{t('Skin Concern Distribution','皮肤问题分布')}</div>
            {[
              { c:'Pigmentation',  pct:42, col:'#6d35e0', trend:'+4%' },
              { c:'Pimple Scars',  pct:26, col:'#8b5cf6', trend:'-3%' },
              { c:'Active Pimples',pct:20, col:'#a855f7', trend:'+2%' },
              { c:'Sunspots',      pct:7,  col:'#d946ef', trend:'-1%' },
              { c:'Uneven Tone',   pct:5,  col:'#f0abfc', trend:'—'   },
            ].map(row=>(
              <div key={row.c} style={{ marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:12.5, fontWeight:500 }}>{row.c}</span>
                  <div style={{ display:'flex', gap:10 }}>
                    <span style={{ fontSize:10.5, color:row.trend.startsWith('+')?'var(--emerald-4)':row.trend.startsWith('-')?'var(--rose-4)':'var(--text-tertiary)', fontFamily:'var(--font-mono)' }}>{row.trend}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontWeight:700, color:row.col, fontSize:12.5 }}>{row.pct}%</span>
                  </div>
                </div>
                <div className="progress-track" style={{ height:5 }}>
                  <div className="progress-fill" style={{ width:`${row.pct}%`, background:row.col, boxShadow:`0 0 6px ${row.col}` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding:22 }}>
            <div className="section-title" style={{ marginBottom:16 }}>{t('Client Demographics','客户人口统计')}</div>
            <div style={{ display:'flex', gap:12, marginBottom:20 }}>
              {[{l:'Female',pct:74,col:'#e879f9'},{l:'Male',pct:26,col:'#8b5cf6'}].map(g=>(
                <div key={g.l} style={{ flex:1, padding:14, background:'var(--bg-elevated)', borderRadius:10, textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:g.col }}>{g.pct}%</div>
                  <div style={{ fontSize:11, color:'var(--text-tertiary)', marginTop:2 }}>{g.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {DEMO_AGE.map(a=>(
                <div key={a.age} style={{ padding:'12px 10px', background:'var(--bg-elevated)', borderRadius:10, textAlign:'center', border:'1px solid var(--border-faint)' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:a.color }}>{a.pct}%</div>
                  <div style={{ fontSize:10.5, color:'var(--text-tertiary)', marginTop:2 }}>{a.age}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── OUTLETS ── */}
      {tab==='outlets' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {outletData.map((o,i)=>(
            <div
              key={o.name}
              className="card"
              style={{ padding:18, cursor:'pointer' }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:13 }}>#{i+1} {o.name}</div>
                  <div style={{ fontSize:10.5, color:'var(--text-tertiary)' }}>{o.region} · {o.sessions.toLocaleString()} sessions</div>
                </div>
                <span className={`badge ${o.status==='top'?'badge-emerald':o.status==='good'?'badge-cyan':o.status==='watch'?'badge-amber':'badge-rose'}`}>
                  {o.status}
                </span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                {[
                  { l:'Revenue', v:`RM ${(o.rev/1000).toFixed(0)}K`, col:'var(--violet-5)' },
                  { l:'Rating',  v:`${o.sat} ★`, col:o.sat>=4.7?'var(--emerald-4)':o.sat>=4.5?'var(--amber-4)':'var(--rose-4)' },
                  { l:'Growth',  v:`${o.growth>0?'+':''}${o.growth}%`, col:o.growth>=0?'var(--emerald-4)':'var(--rose-4)' },
                ].map(m=>(
                  <div key={m.l} style={{ textAlign:'center', padding:'8px 4px', background:'var(--bg-elevated)', borderRadius:8 }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:m.col }}>{m.v}</div>
                    <div style={{ fontSize:9.5, color:'var(--text-tertiary)', marginTop:2 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SATISFACTION ── */}
      {tab==='satisfaction' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="card" style={{ padding:22 }}>
            <div className="section-title" style={{ marginBottom:16 }}>{t('Satisfaction by Outlet','门店满意度对比')}</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={outletData.slice(0,8)} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" />
                <XAxis dataKey="name" tick={{ fill:'var(--text-tertiary)',fontSize:9.5 }} axisLine={false} tickLine={false} />
                <YAxis domain={[4,5]} tick={{ fill:'var(--text-tertiary)',fontSize:10 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={v=>[v,'Satisfaction']} contentStyle={{ background:'var(--bg-overlay)', border:'1px solid var(--border-medium)', borderRadius:10, fontSize:11 }} />
                <ReferenceLine y={4.73} stroke="rgba(109,53,224,0.5)" strokeDasharray="3 3" />
                <Bar dataKey="sat" name="Score" radius={[5,5,0,0]}>
                  {outletData.slice(0,8).map((o,i)=>(
                    <Cell key={i} fill={o.sat>=4.7?'#34d399':o.sat>=4.5?'#6d35e0':'#fbbf24'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding:22 }}>
            <div className="section-title" style={{ marginBottom:16 }}>{t('AI Sentiment Analysis','AI情感分析')}</div>
            {SENTIMENT.map(s=>(
              <div key={s.label} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <span style={{ fontSize:20 }}>{s.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:12 }}>{s.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', color:s.color, fontWeight:700, fontSize:12 }}>{s.pct}%</span>
                  </div>
                  <div className="progress-track" style={{ height:5 }}>
                    <div className="progress-fill" style={{ width:`${s.pct}%`, background:s.color }} />
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:14, padding:'12px 14px', background:'rgba(52,211,153,0.06)', border:'1px solid rgba(52,211,153,0.15)', borderRadius:9, fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.6 }}>
              🤖 <strong>AI Key Themes:</strong> Positive — <em>smooth skin</em>, <em>professional therapist</em>, <em>visible results</em>. Negative — <em>wait time</em>, <em>price</em>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
