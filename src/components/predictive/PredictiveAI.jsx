import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Cpu, Zap, CheckCircle, ChevronRight } from 'lucide-react';
import { predictiveKPIs, forecastData, churnSegments, outletRadar, mlModels, clientVolume } from '../../data/simulationData';
import { useApp } from '../../contexts/AppContext';
import ChartTooltip from '../shared/ChartTooltip';

const fmtRM = v => v ? `RM ${(v/1000).toFixed(0)}K` : '—';

function ConfidenceBar({ value, color = 'var(--violet-4)' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <div style={{ flex:1, height:5, background:'var(--bg-float)', borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${value}%`, background:color, boxShadow:`0 0 8px ${color}`, borderRadius:3, transition:'width 1.4s var(--ease-out)' }} />
      </div>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700, color, minWidth:30 }}>{value}%</span>
    </div>
  );
}

function MLModelCard({ model }) {
  return (
    <div className="card" style={{ padding:18 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:13, marginBottom:2 }}>{model.name}</div>
          <div style={{ fontSize:10.5, color:'var(--text-tertiary)', lineHeight:1.4 }}>{model.type}</div>
        </div>
        <span className={`badge ${model.status==='live'?'badge-emerald':'badge-amber'}`} style={{ flexShrink:0 }}>
          <div className={`pulse ${model.status==='live'?'pulse-green':'pulse-amber'}`} style={{ width:6,height:6 }} />
          {model.status==='live'?'LIVE':'TRAINING'}
        </span>
      </div>

      <div style={{ marginBottom:10 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:5, color:'var(--text-tertiary)' }}>
          <span>Accuracy</span>
          <span style={{ fontFamily:'var(--font-mono)', color:'var(--violet-5)', fontWeight:700 }}>{model.accuracy}%</span>
        </div>
        <ConfidenceBar value={model.accuracy} />
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:10 }}>
        {model.features.map(f=>(
          <span key={f} className="badge badge-violet" style={{ fontSize:9.5 }}>{f}</span>
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, fontSize:10.5, color:'var(--text-tertiary)' }}>
        <span>Last trained: {model.lastTrained}</span>
        <span style={{ fontFamily:'var(--font-mono)' }}>⚡ {model.latency}</span>
      </div>
    </div>
  );
}

const SCENARIOS = [
  { id:'base',         label:'📊 Base',         labelZh:'基准情景',    mult:1.00 },
  { id:'optimistic',   label:'🚀 Optimistic',    labelZh:'乐观情景',    mult:1.12 },
  { id:'conservative', label:'🔻 Conservative',  labelZh:'保守情景',    mult:0.88 },
  { id:'campaign',     label:'📣 Campaign',      labelZh:'营销活动',    mult:1.18 },
];

export default function PredictiveAI() {
  const { t } = useApp();
  const [scenario, setScenario] = useState('base');
  const [running, setRunning] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  const mult = SCENARIOS.find(s => s.id === scenario)?.mult || 1;

  useEffect(() => {
    const timer = setTimeout(() => setShowInsight(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleScenario = (s) => {
    setRunning(true);
    setScenario(s);
    setTimeout(() => setRunning(false), 1400);
  };

  const scenarioForecast = forecastData.map(d => ({
    ...d,
    forecast: d.forecast ? Math.round(d.forecast * mult) : null,
    lower: d.lower ? Math.round(d.lower * mult) : null,
    upper: d.upper ? Math.round(d.upper * mult) : null,
  }));

  const DEMAND_FORECAST = [
    ...clientVolume.slice(6),
    { month:'Nov', new:Math.round(1950*mult), returning:Math.round(5280*mult), churned:Math.round(98*(2-mult)), type:'f' },
    { month:'Dec', new:Math.round(2120*mult), returning:Math.round(5640*mult), churned:Math.round(88*(2-mult)), type:'f' },
    { month:'Jan', new:Math.round(1680*mult), returning:Math.round(4820*mult), churned:Math.round(145*(2-mult)), type:'f' },
  ];

  return (
    <div className="page-body">
      {/* Header */}
      <div style={{ marginBottom:22 }}>
        <div className="badge badge-violet" style={{ marginBottom:8, display:'inline-flex', gap:5 }}>
          <Brain size={10} />
          {t('ML ENGINE · LIVE PREDICTIONS','机器学习引擎 · 实时预测')}
        </div>
        <h2 className="t-display" style={{ fontSize:24, marginBottom:4 }}>
          {t('Predictive AI Engine','预测智能引擎')}
        </h2>
        <p style={{ fontSize:12.5, color:'var(--text-tertiary)' }}>
          {t('4-model ensemble · 87% avg accuracy · Retrained daily','4模型集成 · 平均精度87% · 每日重训')}
        </p>
      </div>

      {/* AI Insight Banner */}
      {showInsight && (
        <div style={{
          display:'flex', gap:12, padding:'14px 18px',
          background:'linear-gradient(135deg, rgba(109,53,224,0.14) 0%, rgba(232,121,249,0.07) 100%)',
          border:'1px solid var(--border-medium)', borderRadius:14, marginBottom:22,
          animation:'fadeSlideUp 0.4s var(--ease-out)',
        }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'var(--grad-primary)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'var(--shadow-glow-sm)' }}>
            <Brain size={16} color="white" />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:12, color:'var(--violet-5)', marginBottom:3 }}>AI FORECAST INSIGHT</div>
            <div style={{ fontSize:12.5, color:'var(--text-secondary)', lineHeight:1.65 }}>
              {t(
                'November revenue forecast: RM 447K (87% confidence). Key drivers: year-end festive season (+18%), 3 new outlet openings (+7%). ⚠️ Alert: January 2025 seasonal dip predicted (−12%) — recommend loyalty campaign deployment in December to sustain momentum.',
                '11月收入预测：RM 44.7万（置信度87%）。主要驱动因素：年末节庆需求（+18%）、3家新门店开业（+7%）。⚠️ 警报：预测2025年1月出现季节性下滑（-12%）——建议12月启动忠诚度活动以维持增长势头。'
              )}
            </div>
          </div>
          <ChevronRight size={16} style={{ color:'var(--text-tertiary)', flexShrink:0, marginTop:8 }} />
        </div>
      )}

      {/* Predictive KPI Strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:22 }}>
        {predictiveKPIs.map((kpi,i) => (
          <div key={i} className="card" style={{ padding:16, textAlign:'center' }}>
            <div style={{ fontSize:10, color:'var(--text-tertiary)', marginBottom:7, fontFamily:'var(--font-mono)' }}>
              {t(kpi.label, kpi.labelZh)}
            </div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:kpi.color, marginBottom:8, lineHeight:1 }}>
              {kpi.val}
            </div>
            <div style={{ fontSize:9.5, color:'var(--text-tertiary)', marginBottom:6, fontFamily:'var(--font-mono)' }}>CONFIDENCE</div>
            <ConfidenceBar value={kpi.conf} color={kpi.color} />
            {kpi.delta && (
              <div style={{ marginTop:6, fontSize:10.5, fontFamily:'var(--font-mono)', color:kpi.trend==='up'?'var(--emerald-4)':'var(--rose-4)', fontWeight:700 }}>
                {kpi.trend==='up'?'↑':'↓'} {kpi.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scenario Controls */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, flexWrap:'wrap' }}>
        <span className="t-label">{t('SCENARIO:','情景模式:')}</span>
        {SCENARIOS.map(s=>(
          <button
            key={s.id}
            onClick={()=>handleScenario(s.id)}
            className={`btn ${scenario===s.id?'btn-primary':'btn-ghost'}`}
            style={{ fontSize:12, height:34 }}
          >
            {t(s.label, s.labelZh)}
          </button>
        ))}
        {running && (
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11.5, color:'var(--violet-5)' }}>
            <Cpu size={12} style={{ animation:'spin 0.8s linear infinite' }} />
            {t('Recalculating models...','重新计算中...')}
          </div>
        )}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16, marginBottom:16 }}>
        {/* Revenue Forecast */}
        <div className="card" style={{ padding:22 }}>
          <div className="section-header">
            <div>
              <div className="section-title">{t('Revenue Forecast — 6 Month Outlook','收入预测 — 6个月展望')}</div>
              <div className="section-sub">
                {t('Scenario: ','情景: ')}<span style={{ color:'var(--violet-5)', fontWeight:700 }}>{scenario.toUpperCase()}</span>
                {t(' · Shaded = confidence interval',' · 阴影=置信区间')}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={scenarioForecast} margin={{ top:5, right:5, left:-10, bottom:0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6d35e0" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#6d35e0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" />
              <XAxis dataKey="month" tick={{ fill:'var(--text-tertiary)',fontSize:10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'var(--text-tertiary)',fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}K`} />
              <Tooltip content={<ChartTooltip formatter={fmtRM} />} />
              <ReferenceLine x="Oct 24" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 3" />
              <Area type="monotone" dataKey="actual"   name="Actual"   stroke="#6d35e0" strokeWidth={2.5} fill="url(#g1)"  connectNulls={false} />
              <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#22d3ee" strokeWidth={2}   fill="url(#g2)"  strokeDasharray="6 3" />
              <Area type="monotone" dataKey="upper"    name="Upper"    stroke="rgba(34,211,238,0.2)" strokeWidth={1} fill="rgba(34,211,238,0.05)" />
              <Area type="monotone" dataKey="lower"    name="Lower"    stroke="rgba(34,211,238,0.2)" strokeWidth={1} fill="rgba(34,211,238,0.03)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Churn Risk */}
        <div className="card" style={{ padding:22 }}>
          <div className="section-title" style={{ marginBottom:4 }}>{t('Churn Risk Segments','流失风险分层')}</div>
          <div className="section-sub" style={{ marginBottom:18 }}>{t('AI risk scoring · live','AI风险评分 · 实时')}</div>
          {churnSegments.map(seg => (
            <div key={seg.label} style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                <div>
                  <span style={{ fontWeight:600, fontSize:12.5, color:seg.color }}>{t(seg.label, seg.labelZh)}</span>
                  <div style={{ fontSize:10, color:'var(--text-tertiary)', marginTop:1 }}>{seg.desc}</div>
                </div>
                <span style={{ fontFamily:'var(--font-mono)', fontWeight:800, fontSize:16, color:seg.color }}>
                  {seg.n.toLocaleString()}
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width:`${seg.pct}%`, background:seg.color, boxShadow:`0 0 6px ${seg.color}` }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop:10, padding:'10px 12px', background:'rgba(251,113,133,0.07)', border:'1px solid rgba(251,113,133,0.15)', borderRadius:9, fontSize:11, color:'var(--rose-4)', display:'flex', gap:6 }}>
            <AlertTriangle size={12} style={{ flexShrink:0, marginTop:1 }} />
            <span>{t('142 high-risk clients predicted to churn within 30 days. Launch WhatsApp campaign by Dec 15.','预计142名高风险客户将在30天内流失。请在12月15日前启动WhatsApp活动。')}</span>
          </div>
        </div>
      </div>

      {/* ML Models + Radar */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <div>
          <div className="section-title" style={{ marginBottom:12 }}>{t('Active ML Models','活跃ML模型')}</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {mlModels.map(m => <MLModelCard key={m.name} model={m} />)}
          </div>
        </div>

        <div className="card" style={{ padding:22 }}>
          <div className="section-title" style={{ marginBottom:4 }}>{t('Outlet Capability Radar','门店能力雷达图')}</div>
          <div className="section-sub" style={{ marginBottom:12 }}>{t('Top 3 outlets comparison','前三门店对比')}</div>
          <ResponsiveContainer width="100%" height={290}>
            <RadarChart data={outletRadar}>
              <PolarGrid stroke="rgba(109,53,224,0.18)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill:'var(--text-tertiary)', fontSize:10.5 }} />
              <Radar name="Mid Valley" dataKey="midval" stroke="#6d35e0" fill="#6d35e0" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Uptown PJ"  dataKey="uptown" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.1} strokeWidth={1.5} />
              <Radar name="Cheras"     dataKey="cheras" stroke="#fb7185" fill="#fb7185" fillOpacity={0.1} strokeWidth={1.5} />
              <Legend wrapperStyle={{ fontSize:11 }} />
              <Tooltip contentStyle={{ background:'var(--bg-overlay)', border:'1px solid var(--border-medium)', borderRadius:10, fontSize:11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demand Forecast */}
      <div className="card" style={{ padding:22 }}>
        <div className="section-title" style={{ marginBottom:4 }}>{t('Client Demand Forecast — 3 Month','客户需求预测 — 3个月')}</div>
        <div className="section-sub" style={{ marginBottom:16 }}>{t('Scenario: ','情景: ')}<span style={{ color:'var(--violet-5)', fontWeight:700 }}>{scenario}</span></div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={DEMAND_FORECAST}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" />
            <XAxis dataKey="month" tick={{ fill:'var(--text-tertiary)',fontSize:10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'var(--text-tertiary)',fontSize:10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <ReferenceLine x="Oct" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 3" />
            <Line type="monotone" dataKey="returning" name="Returning" stroke="#6d35e0" strokeWidth={2.5} dot={{ r:4 }} />
            <Line type="monotone" dataKey="new"       name="New"       stroke="#22d3ee" strokeWidth={2}   dot={{ r:3 }} />
            <Line type="monotone" dataKey="churned"   name="Churned"   stroke="#fb7185" strokeWidth={1.5} dot={{ r:3 }} strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
