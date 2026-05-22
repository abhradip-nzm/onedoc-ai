import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, Cpu, RefreshCw, Download, LogOut } from 'lucide-react';

const PAGE_META = {
  dashboard:  { en: 'AI Intelligence Dashboard',  zh: '智能仪表板',     sub: 'Real-time · 27 outlets · Live AI' },
  analytics:  { en: 'Analytics Hub',              zh: '数据分析中心',   sub: 'Historical trends · Behaviour · Performance' },
  predictive: { en: 'Predictive AI Engine',        zh: '预测智能引擎',   sub: 'ML forecasts · Demand · Risk scoring' },
  rca:        { en: 'Root Cause Analysis Engine',  zh: '根因分析引擎',   sub: 'AI investigation · Pattern detection · Resolution' },
  chatbot:    { en: 'AI Analytics Assistant',      zh: 'AI 智能助手',    sub: 'Multilingual NLP · EN + 中文' },
};

export default function TopBar() {
  const { page, lang, t, navigate } = useApp();
  const [searchVal, setSearchVal] = useState('');
  const meta = PAGE_META[page] || PAGE_META.dashboard;
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <header
      className="app-topbar"
      style={{
        background: 'var(--bg-raised)',
        borderBottom: '1px solid var(--border-faint)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: 16,
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Left: Page Title */}
      <div style={{ minWidth: 0 }}>
        <h1 style={{
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {lang === 'zh' ? meta.zh : meta.en}
        </h1>
        <div className="t-label" style={{ marginTop: 1 }}>
          {meta.sub}
        </div>
      </div>

      {/* Right: Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{
            position: 'absolute', left: 10, top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-tertiary)',
            pointerEvents: 'none',
          }} />
          <input
            className="input"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder={t('Search outlets, KPIs...', '搜索门店、指标...')}
            style={{ width: 200, paddingLeft: 30, height: 34, fontSize: 12 }}
          />
        </div>

        {/* Refresh */}
        <button
          className="btn btn-subtle btn-icon"
          onClick={handleRefresh}
          title={t('Refresh data', '刷新数据')}
        >
          <RefreshCw
            size={14}
            style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }}
          />
        </button>

        {/* Export */}
        <button
          className="btn btn-ghost"
          style={{ height: 34, fontSize: 12 }}
        >
          <Download size={13} />
          {t('Export', '导出')}
        </button>

        {/* AI Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '0 12px',
          height: 34,
          background: 'rgba(109,53,224,0.1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 9,
          fontSize: 11.5,
          fontWeight: 500,
          color: 'var(--violet-5)',
        }}>
          <Cpu size={12} />
          <span>{t('4 AI Models Live', '4个AI模型运行中')}</span>
          <div className="pulse pulse-green" style={{ width: 6, height: 6 }} />
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('landing')}
          className="btn btn-subtle btn-icon"
          title={t('Sign out', '退出登录')}
        >
          <LogOut size={14} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34,
          borderRadius: 10,
          background: 'var(--grad-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11,
          fontWeight: 800,
          color: 'white',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-glow-xs)',
          flexShrink: 0,
          letterSpacing: '-0.03em',
        }}>
          A.ai
        </div>
      </div>
    </header>
  );
}
