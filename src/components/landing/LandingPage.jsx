import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import {
  BarChart3, Brain, AlertTriangle, MessageSquare,
  ChevronRight, Globe, Zap, TrendingUp, Shield,
  Building2, Heart, Landmark, Home, Factory,
  ShoppingBag, GraduationCap, Wifi, ArrowRight,
  CheckCircle, Star, Users, Activity,
} from 'lucide-react';

const INDUSTRIES = [
  { icon: ShoppingBag, key: 'fmcg',      en: 'FMCG',           zh: '快消品',       desc: { en: 'Shelf performance, demand forecasting & distributor analytics', zh: '货架表现、需求预测与经销商分析' }, color: '#8b5cf6' },
  { icon: Heart,       key: 'health',    en: 'Healthcare',      zh: '医疗健康',     desc: { en: 'Patient outcomes, clinical analytics & resource optimization', zh: '患者结果、临床分析与资源优化' }, color: '#fb7185' },
  { icon: Landmark,    key: 'bfsi',      en: 'BFSI',            zh: '银行金融',     desc: { en: 'Risk scoring, fraud detection & portfolio intelligence', zh: '风险评分、欺诈检测与投资组合智能' }, color: '#22d3ee' },
  { icon: Home,        key: 'realestate',en: 'Real Estate',     zh: '房地产',       desc: { en: 'Market trends, property valuation & investment analytics', zh: '市场趋势、物业估值与投资分析' }, color: '#34d399' },
  { icon: Factory,     key: 'mfg',       en: 'Manufacturing',   zh: '制造业',       desc: { en: 'OEE tracking, quality control & supply chain intelligence', zh: '设备效率、质量控制与供应链智能' }, color: '#fbbf24' },
  { icon: ShoppingBag, key: 'retail',    en: 'Retail',          zh: '零售',         desc: { en: 'Customer behaviour, inventory optimization & store analytics', zh: '客户行为、库存优化与门店分析' }, color: '#f0abfc' },
  { icon: GraduationCap, key: 'edu',     en: 'Education',       zh: '教育',         desc: { en: 'Student performance, enrollment trends & campus analytics', zh: '学生成绩、招生趋势与校园分析' }, color: '#fb923c' },
  { icon: Wifi,        key: 'telecom',   en: 'Telecom',         zh: '电信',         desc: { en: 'Churn prediction, network analytics & subscriber insights', zh: '流失预测、网络分析与用户洞察' }, color: '#a78bfa' },
];

const FEATURES = [
  { icon: BarChart3,     color: '#8b5cf6', en: 'AI Intelligence Dashboard', zh: 'AI 智能仪表板', desc: { en: 'Real-time KPIs, interactive charts and live outlet performance across your entire operation.', zh: '实时KPI、交互式图表与全业务门店实时表现。' } },
  { icon: Brain,         color: '#22d3ee', en: 'Predictive Analytics',      zh: '预测分析',     desc: { en: 'ML-powered forecasting with scenario planning, churn risk and demand modelling.', zh: '机器学习驱动的预测，包含情景规划、流失风险与需求建模。' } },
  { icon: AlertTriangle, color: '#fb7185', en: 'Root Cause Analysis',        zh: '根因分析',     desc: { en: 'AI-driven incident investigation with fishbone diagrams, timelines and resolution tracking.', zh: 'AI驱动的事件调查，包含鱼骨图、时间轴与解决追踪。' } },
  { icon: MessageSquare, color: '#34d399', en: 'Multilingual AI Chatbot',    zh: '多语言AI聊天', desc: { en: 'Conversational analytics in English and 中文 — ask anything about your data instantly.', zh: '支持中英文对话分析，即时询问您的数据任何问题。' } },
];

const STATS = [
  { value: '500+', en: 'Enterprise Clients', zh: '企业客户' },
  { value: '50M+', en: 'Data Points Daily',  zh: '每日数据点' },
  { value: '99.9%', en: 'Uptime SLA',         zh: '可用性SLA' },
  { value: '40+',  en: 'Industries Served',  zh: '服务行业' },
];

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: { en: 'VP Analytics, MegaMart Asia', zh: '亚洲大卖场分析副总裁' }, quote: { en: 'Aryabhatta.ai cut our reporting time by 70% and surfaced insights we never knew existed.', zh: 'Aryabhatta.ai将我们的报告时间缩短了70%，并发现了我们以前从未知道的洞察。' }, stars: 5 },
  { name: 'Rajiv Mehta', role: { en: 'CTO, FinServ Holdings', zh: '金融服务集团CTO' }, quote: { en: 'The RCA engine alone saved us millions in compliance costs. Truly enterprise-grade AI.', zh: '仅RCA引擎就为我们节省了数百万的合规成本。真正的企业级AI。' }, stars: 5 },
  { name: 'Dr. Lim Wei', role: { en: 'Director, HealthNet Group', zh: '健康网集团总监' }, quote: { en: 'Patient outcome prediction accuracy jumped 34% after deploying Aryabhatta across our hospitals.', zh: '在我们的医院部署Aryabhatta后，患者预后预测准确率提升了34%。' }, stars: 5 },
];

export default function LandingPage() {
  const { lang, setLang, navigate } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = (en, zh) => lang === 'zh' ? zh : en;

  return (
    <div className="landing-page" style={{ fontFamily: "'Inter','Noto Sans JP',sans-serif" }}>
      {/* ── BACKGROUND ── */}
      <div className="ai-canvas" />
      <div className="grid-canvas" />

      {/* ══════════ NAV ══════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 300,
        background: 'rgba(7,5,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139,92,246,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#5327b5 0%,#7c28d4 40%,#e879f9 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(109,53,224,0.4)',
          }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.03em', color: '#f0ebff' }}>
            Aryabhatta<span style={{ color: '#a78bfa' }}>.ai</span>
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14, color: 'rgba(240,235,255,0.7)' }}>
          {[
            { en: 'Solutions', zh: '解决方案' },
            { en: 'Industries', zh: '行业' },
            { en: 'Pricing', zh: '定价' },
            { en: 'About', zh: '关于我们' },
          ].map(item => (
            <a key={item.en} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}
              onMouseEnter={e => e.target.style.color = '#a78bfa'}
              onMouseLeave={e => e.target.style.color = 'rgba(240,235,255,0.7)'}
            >
              {t(item.en, item.zh)}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.25)',
              background: 'transparent', color: 'rgba(240,235,255,0.7)',
              cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; e.currentTarget.style.color = '#a78bfa'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)'; e.currentTarget.style.color = 'rgba(240,235,255,0.7)'; }}
          >
            <Globe size={13} />
            {lang === 'en' ? '中文' : 'EN'}
          </button>
          <button
            onClick={() => navigate('login')}
            style={{
              padding: '8px 20px', borderRadius: 9, border: '1px solid rgba(139,92,246,0.35)',
              background: 'transparent', color: '#a78bfa',
              cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(109,53,224,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {t('Login', '登录')}
          </button>
          <button
            onClick={() => navigate('login')}
            style={{
              padding: '8px 20px', borderRadius: 9, border: 'none',
              background: 'linear-gradient(135deg,#5327b5 0%,#7c28d4 50%,#e879f9 100%)',
              color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 700,
              fontFamily: 'inherit', boxShadow: '0 0 16px rgba(109,53,224,0.4)',
              transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 5,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(109,53,224,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 16px rgba(109,53,224,0.4)'; }}
          >
            {t('Get Demo', '免费演示')} <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section style={{ padding: '100px 40px 80px', maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '6px 16px', borderRadius: 99,
          border: '1px solid rgba(139,92,246,0.3)',
          background: 'rgba(109,53,224,0.1)',
          fontSize: 12, fontWeight: 600, color: '#a78bfa',
          marginBottom: 28, letterSpacing: '0.04em',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'breathe 2s ease-in-out infinite' }} />
          {t('ENTERPRISE AI ANALYTICS PLATFORM', '企业级AI数据分析平台')}
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.08,
          color: '#f0ebff',
          marginBottom: 24,
        }}>
          {t('Transform Data', '数据赋能')}
          <br />
          <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('Into Intelligence', '驱动智能')}
          </span>
        </h1>

        <p style={{ fontSize: 18, color: 'rgba(240,235,255,0.65)', maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 400 }}>
          {t(
            'Aryabhatta.ai delivers real-time AI-powered analytics, predictive insights, and root cause analysis — built for every industry.',
            'Aryabhatta.ai 为每个行业提供实时AI驱动的分析、预测洞察与根因分析。'
          )}
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('login')}
            style={{
              padding: '14px 32px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg,#5327b5 0%,#7c28d4 50%,#e879f9 100%)',
              color: 'white', cursor: 'pointer', fontSize: 15, fontWeight: 700,
              fontFamily: 'inherit', boxShadow: '0 0 32px rgba(109,53,224,0.5)',
              display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(109,53,224,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 32px rgba(109,53,224,0.5)'; }}
          >
            {t('Start Free Trial', '开始免费试用')} <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('login')}
            style={{
              padding: '14px 32px', borderRadius: 12,
              border: '1px solid rgba(139,92,246,0.35)',
              background: 'rgba(109,53,224,0.08)',
              color: '#a78bfa', cursor: 'pointer', fontSize: 15, fontWeight: 600,
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(109,53,224,0.15)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(109,53,224,0.08)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'; }}
          >
            {t('View Live Demo', '查看演示')}
          </button>
        </div>

        {/* Hero visual — dashboard preview card */}
        <div style={{
          marginTop: 64,
          background: 'linear-gradient(145deg,rgba(19,15,42,0.95) 0%,rgba(13,10,30,0.98) 100%)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 20,
          padding: '24px',
          boxShadow: '0 8px 80px rgba(109,53,224,0.25), 0 0 0 1px rgba(139,92,246,0.1)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#8b5cf6,#e879f9,transparent)' }} />
          {/* Fake dashboard header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['#fb7185','#fbbf24','#34d399'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(168,139,250,0.7)', fontWeight: 600, letterSpacing: '0.08em' }}>ARYABHATTA.AI — LIVE DASHBOARD</div>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 10, color: '#34d399', fontWeight: 600 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', animation: 'breathe 2s ease-in-out infinite' }} />
              LIVE
            </div>
          </div>
          {/* Fake KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: t('Revenue YTD', '年度收入'), value: '$12.4M', change: '+14.2%', color: '#8b5cf6' },
              { label: t('Active Users', '活跃用户'), value: '248K',   change: '+8.7%',  color: '#22d3ee' },
              { label: t('NPS Score', 'NPS评分'),   value: '74',      change: '+6',      color: '#34d399' },
              { label: t('AI Accuracy', 'AI准确率'), value: '91%',     change: '+3.2%',  color: '#f0abfc' },
            ].map(kpi => (
              <div key={kpi.label} style={{
                padding: '14px 16px', borderRadius: 12,
                background: `linear-gradient(145deg,${kpi.color}12,${kpi.color}06)`,
                border: `1px solid ${kpi.color}22`,
              }}>
                <div style={{ fontSize: 10, color: 'rgba(240,235,255,0.5)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{kpi.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#f0ebff', letterSpacing: '-0.03em' }}>{kpi.value}</div>
                <div style={{ fontSize: 11, color: '#34d399', fontWeight: 600, marginTop: 4 }}>{kpi.change}</div>
              </div>
            ))}
          </div>
          {/* Fake chart bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, padding: '0 4px' }}>
            {[45,62,38,70,55,88,75,92,68,80,95,72].map((h,i) => (
              <div key={i} style={{
                flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0',
                background: i === 10
                  ? 'linear-gradient(180deg,#e879f9,#8b5cf6)'
                  : `rgba(139,92,246,${0.2 + h/250})`,
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: 'rgba(168,139,250,0.4)', fontWeight: 600 }}>
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section style={{ borderTop: '1px solid rgba(139,92,246,0.1)', borderBottom: '1px solid rgba(139,92,246,0.1)', background: 'rgba(109,53,224,0.04)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {STATS.map((s, i) => (
            <div key={s.value} style={{
              textAlign: 'center', padding: '16px 0',
              borderRight: i < 3 ? '1px solid rgba(139,92,246,0.15)' : 'none',
            }}>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', color: '#a78bfa', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(240,235,255,0.55)', marginTop: 6, fontWeight: 500 }}>{t(s.en, s.zh)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ INDUSTRIES ══════════ */}
      <section style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', letterSpacing: '0.12em', marginBottom: 12, textTransform: 'uppercase' }}>
            {t('INDUSTRIES WE SERVE', '服务行业')}
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0ebff', lineHeight: 1.15, marginBottom: 16 }}>
            {t('Built for Every Industry', '为每个行业而建')}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(240,235,255,0.55)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            {t('From FMCG to BFSI, Aryabhatta.ai adapts its AI models to your industry\'s unique data patterns and KPIs.', 'Aryabhatta.ai 将AI模型自适应于您行业的独特数据模式与KPI指标。')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {INDUSTRIES.map(ind => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.key}
                style={{
                  padding: '24px', borderRadius: 16,
                  background: 'linear-gradient(145deg,rgba(19,15,42,0.95),rgba(13,10,30,0.98))',
                  border: '1px solid rgba(139,92,246,0.12)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${ind.color}40`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 32px ${ind.color}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.12)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${ind.color}18`,
                    border: `1px solid ${ind.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color={ind.color} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#f0ebff' }}>
                    {t(ind.en, ind.zh)}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(240,235,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                  {t(ind.desc.en, ind.desc.zh)}
                </p>
                <div style={{
                  position: 'absolute', bottom: 16, right: 16,
                  width: 24, height: 24, borderRadius: '50%',
                  background: `${ind.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={12} color={ind.color} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section style={{ padding: '80px 40px', background: 'rgba(109,53,224,0.03)', borderTop: '1px solid rgba(139,92,246,0.08)', borderBottom: '1px solid rgba(139,92,246,0.08)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', letterSpacing: '0.12em', marginBottom: 12, textTransform: 'uppercase' }}>
              {t('PLATFORM CAPABILITIES', '平台功能')}
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0ebff', lineHeight: 1.15 }}>
              {t('Everything You Need to Win', '赢得竞争所需的一切')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {FEATURES.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.en} style={{
                  padding: '28px', borderRadius: 18,
                  background: 'linear-gradient(145deg,rgba(19,15,42,0.95),rgba(13,10,30,0.98))',
                  border: '1px solid rgba(139,92,246,0.12)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}35`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.12)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${f.color}15`,
                    border: `1px solid ${f.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                    <Icon size={24} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f0ebff', marginBottom: 10, letterSpacing: '-0.02em' }}>
                    {t(f.en, f.zh)}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'rgba(240,235,255,0.55)', lineHeight: 1.65, margin: 0 }}>
                    {t(f.desc.en, f.desc.zh)}
                  </p>
                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 5, color: f.color, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    {t('Learn more', '了解更多')} <ChevronRight size={13} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', letterSpacing: '0.12em', marginBottom: 12, textTransform: 'uppercase' }}>
            {t('HOW IT WORKS', '工作原理')}
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0ebff', lineHeight: 1.15 }}>
            {t('Up and Running in Minutes', '数分钟即可上线')}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
          {[
            { step: '01', icon: Activity, en: 'Connect Your Data', zh: '连接数据', desc: { en: 'Plug in your existing data sources — databases, APIs, spreadsheets or cloud warehouses.', zh: '接入您现有的数据源——数据库、API、电子表格或云数据仓库。' } },
            { step: '02', icon: Brain,    en: 'AI Learns Your KPIs', zh: 'AI学习您的KPI', desc: { en: 'Our models auto-configure to your industry, data shape and business objectives.', zh: '我们的模型自动适配您的行业、数据结构与业务目标。' } },
            { step: '03', icon: TrendingUp, en: 'Get Instant Insights', zh: '获取即时洞察', desc: { en: 'Access real-time dashboards, predictive alerts and AI-generated recommendations.', zh: '访问实时仪表板、预测告警与AI生成的建议。' } },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.step} style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 18, background: 'linear-gradient(145deg,rgba(19,15,42,0.8),rgba(13,10,30,0.85))', border: '1px solid rgba(139,92,246,0.1)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(83,39,181,0.3),rgba(232,121,249,0.15))', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Icon size={24} color="#a78bfa" />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6d35e0', letterSpacing: '0.1em', marginBottom: 10 }}>STEP {step.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0ebff', marginBottom: 12, letterSpacing: '-0.02em' }}>{t(step.en, step.zh)}</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(240,235,255,0.5)', lineHeight: 1.65, margin: 0 }}>{t(step.desc.en, step.desc.zh)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section style={{ padding: '80px 40px', background: 'rgba(109,53,224,0.03)', borderTop: '1px solid rgba(139,92,246,0.08)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0ebff', lineHeight: 1.15 }}>
              {t('Trusted by Industry Leaders', '受行业领袖信赖')}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {TESTIMONIALS.map(tm => (
              <div key={tm.name} style={{ padding: '28px', borderRadius: 18, background: 'linear-gradient(145deg,rgba(19,15,42,0.95),rgba(13,10,30,0.98))', border: '1px solid rgba(139,92,246,0.12)' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: tm.stars }).map((_, i) => <Star key={i} size={14} color="#fbbf24" fill="#fbbf24" />)}
                </div>
                <p style={{ fontSize: 14, color: 'rgba(240,235,255,0.75)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                  "{t(tm.quote.en, tm.quote.zh)}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#f0ebff' }}>{tm.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(168,139,250,0.7)', marginTop: 3 }}>{t(tm.role.en, tm.role.zh)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section style={{ padding: '80px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
          padding: '64px 40px', borderRadius: 24,
          background: 'linear-gradient(135deg,rgba(83,39,181,0.25) 0%,rgba(124,40,212,0.15) 50%,rgba(232,121,249,0.1) 100%)',
          border: '1px solid rgba(139,92,246,0.25)',
          boxShadow: '0 0 80px rgba(109,53,224,0.15)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#8b5cf6,#e879f9,transparent)' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { icon: CheckCircle, en: 'No credit card required', zh: '无需信用卡' },
              { icon: Shield,      en: 'Enterprise-grade security', zh: '企业级安全' },
              { icon: Users,       en: '500+ enterprises trust us', zh: '500+企业信任' },
            ].map(item => (
              <div key={item.en} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(240,235,255,0.65)', fontWeight: 500 }}>
                <item.icon size={14} color="#34d399" />
                {t(item.en, item.zh)}
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0ebff', marginBottom: 16, lineHeight: 1.15 }}>
            {t('Ready to Unlock Your Data?', '准备好释放数据潜力了吗？')}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(240,235,255,0.55)', marginBottom: 36, lineHeight: 1.7 }}>
            {t('Join 500+ enterprises already using Aryabhatta.ai to make faster, smarter decisions.', '加入已使用 Aryabhatta.ai 做出更快、更智能决策的500+企业行列。')}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('login')}
              style={{
                padding: '14px 36px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg,#5327b5 0%,#7c28d4 50%,#e879f9 100%)',
                color: 'white', cursor: 'pointer', fontSize: 15, fontWeight: 700,
                fontFamily: 'inherit', boxShadow: '0 0 32px rgba(109,53,224,0.5)',
                display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
            >
              {t('Get Started Free', '免费开始')} <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('login')}
              style={{
                padding: '14px 32px', borderRadius: 12,
                border: '1px solid rgba(139,92,246,0.35)',
                background: 'transparent',
                color: '#a78bfa', cursor: 'pointer', fontSize: 15, fontWeight: 600,
                fontFamily: 'inherit', transition: 'all 0.15s',
              }}
            >
              {t('Login to Dashboard', '登录仪表板')}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{
        borderTop: '1px solid rgba(139,92,246,0.1)',
        padding: '32px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#5327b5,#e879f9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={13} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#f0ebff' }}>
            Aryabhatta<span style={{ color: '#a78bfa' }}>.ai</span>
          </span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(240,235,255,0.35)' }}>
          {t('© 2025 Aryabhatta.ai. All rights reserved.', '© 2025 Aryabhatta.ai 版权所有。')}
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'rgba(240,235,255,0.5)' }}>
          {[{ en: 'Privacy', zh: '隐私政策' }, { en: 'Terms', zh: '服务条款' }, { en: 'Support', zh: '支持' }].map(link => (
            <a key={link.en} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#a78bfa'}
              onMouseLeave={e => e.target.style.color = 'rgba(240,235,255,0.5)'}
            >
              {t(link.en, link.zh)}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
