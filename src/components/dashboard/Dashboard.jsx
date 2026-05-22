import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts';
import {
  DollarSign, Users, Star, Activity, Zap, TrendingUp,
  ArrowUpRight, Building2, RefreshCw,
} from 'lucide-react';
import KPICard from '../shared/KPICard';
import ChartTooltip from '../shared/ChartTooltip';
import {
  kpis, revenueTimeline, clientVolume, treatmentMix,
  skinConcernTrend, outletData,
} from '../../data/simulationData';
import { useApp } from '../../contexts/AppContext';

const fmtRM = (v) => v ? `RM ${(v / 1000).toFixed(0)}K` : '—';

export default function Dashboard() {
  const { t } = useApp();
  const [region, setRegion] = useState('all');

  const filteredOutlets = region === 'all'
    ? outletData
    : outletData.filter(o => o.region.toLowerCase() === region);

  return (
    <div className="page-body">
      {/* ── PAGE HEADER ── */}
      <div style={{ marginBottom: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="badge badge-live" style={{ marginBottom: 8, display: 'inline-flex', gap: 5 }}>
            <div className="pulse pulse-green" style={{ width: 6, height: 6 }} />
            {t('LIVE DATA · AUTO-REFRESH', '实时数据 · 自动刷新')}
          </div>
          <h2 className="t-display" style={{ fontSize: 24, marginBottom: 4 }}>
            {t('Operational Intelligence', '运营智能概览')}
          </h2>
          <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
            {t('Real-time analytics across all 27 outlets with AI-powered insights', '27家门店实时分析与AI洞察')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            className="input"
            value={region}
            onChange={e => setRegion(e.target.value)}
            style={{ width: 130, height: 34, fontSize: 12 }}
          >
            <option value="all">{t('All Regions', '全部地区')}</option>
            <option value="kv">{t('Klang Valley', '巴生谷')}</option>
            <option value="penang">{t('Penang', '槟城')}</option>
            <option value="jb">{t('Johor Bahru', '新山')}</option>
          </select>
          <button className="btn btn-primary" style={{ height: 34, fontSize: 12 }}>
            <Zap size={13} />
            {t('AI Report', 'AI报告')}
          </button>
        </div>
      </div>

      {/* ── KPI ROW 1 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }}>
        <KPICard label={t('Total Revenue (YTD)','年初至今收入')} value={kpis.revenue.val} change={kpis.revenue.chg} fmt="large" icon={DollarSign} color="violet" delay={0} />
        <KPICard label={t('Clients Served','已服务客户')} value={kpis.clients.val} change={kpis.clients.chg} fmt="large" icon={Users} color="cyan" delay={60} />
        <KPICard label={t('Avg Satisfaction','平均满意度')} value={kpis.sat.val} change={kpis.sat.chg} fmt="score" icon={Star} color="emerald" delay={120} />
        <KPICard label={t('Client Retention','客户留存率')} value={kpis.retention.val} change={kpis.retention.chg} fmt="percent" icon={Activity} color="fuchsia" delay={180} />
      </div>

      {/* ── KPI ROW 2 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <KPICard label={t('Session Completion','疗程完成率')} value={kpis.completion.val} change={kpis.completion.chg} fmt="percent" icon={TrendingUp} color="amber" delay={0} />
        <KPICard label={t('Revenue Per Visit (RM)','每次访问收入')} value={kpis.rpv.val} change={kpis.rpv.chg} fmt="score" icon={ArrowUpRight} color="violet" delay={60} />
        <KPICard label="Net Promoter Score" value={kpis.nps.val} change={kpis.nps.chg} fmt="int" icon={Zap} color="emerald" delay={120} />
        <KPICard label={t('Active Outlets','活跃门店')} value={kpis.outlets.val} change={kpis.outlets.chg} fmt="int" icon={Building2} color="cyan" delay={180} />
      </div>

      {/* ── CHARTS ROW 1 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Revenue Timeline */}
        <div className="card" style={{ padding: 22 }}>
          <div className="section-header">
            <div>
              <div className="section-title">{t('Revenue Timeline & AI Forecast','收入走势与AI预测')}</div>
              <div className="section-sub">{t('Dashed = AI forecast · Shaded = past months','虚线 = AI预测 · 有色 = 历史月份')}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="badge badge-violet">Actual</span>
              <span className="badge badge-cyan">Forecast</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueTimeline} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6d35e0" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#6d35e0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
              <Tooltip content={<ChartTooltip formatter={fmtRM} />} />
              <ReferenceLine x="Oct 24" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 3" />
              <Area type="monotone" dataKey="actual"   name="Actual"   stroke="#6d35e0" strokeWidth={2.5} fill="url(#gradActual)"   connectNulls={false} />
              <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#22d3ee" strokeWidth={2}   fill="url(#gradForecast)" strokeDasharray="6 3" connectNulls />
              <Line type="monotone" dataKey="target"   name="Target"   stroke="rgba(251,191,36,0.5)" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment Mix */}
        <div className="card" style={{ padding: 22 }}>
          <div className="section-title" style={{ marginBottom: 4 }}>{t('Treatment Mix','疗程分布')}</div>
          <div className="section-sub" style={{ marginBottom: 14 }}>{t('by session type · YTD','按疗程类型 · 年初至今')}</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={treatmentMix}
                cx="50%" cy="50%"
                innerRadius={40} outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {treatmentMix.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v}%`]}
                contentStyle={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-medium)', borderRadius: 10, fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {treatmentMix.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 9, height: 9, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', flex: 1 }}>{d.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700, color: d.color }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CHARTS ROW 2 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Client Volume */}
        <div className="card" style={{ padding: 22 }}>
          <div className="section-title" style={{ marginBottom: 4 }}>{t('Client Volume Trends','客户量趋势')}</div>
          <div className="section-sub" style={{ marginBottom: 14 }}>{t('New · Returning · Churned','新客户 · 回头客 · 流失')}</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={clientVolume} barGap={3} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="returning" name="Returning" fill="#6d35e0" radius={[3,3,0,0]} />
              <Bar dataKey="new"       name="New"       fill="#22d3ee" radius={[3,3,0,0]} />
              <Bar dataKey="churned"   name="Churned"   fill="#fb7185" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skin Concern Trends */}
        <div className="card" style={{ padding: 22 }}>
          <div className="section-title" style={{ marginBottom: 4 }}>{t('Skin Concern Trends','皮肤问题趋势')}</div>
          <div className="section-sub" style={{ marginBottom: 14 }}>{t('by diagnosis type (%)','按诊断类型 (%)')}</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={skinConcernTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="Pigmentation"   stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
              <Line type="monotone" dataKey="PimpleScars"    stroke="#22d3ee" strokeWidth={2}   dot={{ r: 3, fill: '#22d3ee' }} />
              <Line type="monotone" dataKey="ActivePimples"  stroke="#e879f9" strokeWidth={2}   dot={{ r: 3, fill: '#e879f9' }} />
              <Line type="monotone" dataKey="Sunspots"       stroke="#fbbf24" strokeWidth={1.5} dot={{ r: 3, fill: '#fbbf24' }} />
              <Line type="monotone" dataKey="UnevenTone"     stroke="#34d399" strokeWidth={1.5} dot={{ r: 3, fill: '#34d399' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── OUTLET TABLE ── */}
      <div className="card" style={{ padding: 22 }}>
        <div className="section-header">
          <div>
            <div className="section-title">{t('Outlet Performance Rankings','门店绩效排名')}</div>
            <div className="section-sub">{t('AI-ranked by composite score · MTD','AI综合评分排名 · 本月至今')}</div>
          </div>
          <span className="badge badge-violet">
            <Zap size={10} />
            AI RANKED
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('Outlet','门店')}</th>
                <th>{t('Region','地区')}</th>
                <th>{t('Revenue MTD','本月收入')}</th>
                <th>{t('Clients','客户')}</th>
                <th>{t('Satisfaction','满意度')}</th>
                <th>{t('Growth MoM','环比增长')}</th>
                <th>NPS</th>
                <th>{t('Status','状态')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOutlets.map((o, i) => (
                <tr key={o.name}>
                  <td>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: i < 3 ? 'var(--grad-primary)' : 'var(--bg-elevated)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: i < 3 ? 'white' : 'var(--text-tertiary)',
                    }}>
                      {i + 1}
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600 }}>{o.name}</span></td>
                  <td><span className="badge badge-violet" style={{ fontSize: 9.5 }}>{o.region}</span></td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--violet-5)' }}>
                      {fmtRM(o.rev)}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                      {o.clients.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontWeight: 700,
                      color: o.sat >= 4.7 ? 'var(--emerald-4)' : o.sat >= 4.5 ? 'var(--amber-4)' : 'var(--rose-4)',
                    }}>
                      {o.sat} ★
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
                      color: o.growth >= 0 ? 'var(--emerald-4)' : 'var(--rose-4)',
                    }}>
                      {o.growth >= 0 ? '+' : ''}{o.growth}%
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{o.nps}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      o.status === 'top' ? 'badge-emerald' :
                      o.status === 'good' ? 'badge-cyan' :
                      o.status === 'watch' ? 'badge-amber' : 'badge-rose'
                    }`}>
                      {o.status === 'top' ? '🏆 Top' : o.status === 'good' ? '✓ Good' : o.status === 'watch' ? '⚠ Watch' : '🔴 Alert'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
