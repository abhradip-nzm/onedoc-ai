import React, { useState, useRef, useEffect } from 'react';
import { useApp, PAGES } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  LayoutDashboard, BarChart3, Brain, AlertTriangle,
  MessageSquare, Sun, Moon, Bell, ChevronLeft, Zap,
  ChevronRight, Settings, HelpCircle, Globe
} from 'lucide-react';

const PAGE_ICONS = {
  dashboard:  LayoutDashboard,
  analytics:  BarChart3,
  predictive: Brain,
  rca:        AlertTriangle,
  chatbot:    MessageSquare,
};

const PAGE_BADGES = {
  predictive: { text: 'NEW', color: '#8b5cf6' },
  rca:        { text: '3',   color: '#fb7185'  },
};

export default function Sidebar() {
  const { page, setPage, lang, setLang, notifs, markAllRead, unread, sideCollapsed, setSideCollapsed, t } = useApp();
  const { theme, toggle } = useTheme();
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const c = sideCollapsed;

  return (
    <aside
      className={`app-sidebar ${c ? 'collapsed' : ''}`}
      style={{
        background: 'var(--bg-raised)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.35s var(--ease-out)',
      }}
    >
      {/* ── LOGO ── */}
      <div style={{
        height: 'var(--topbar-h)',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: c ? '0 17px' : '0 20px',
        borderBottom: '1px solid var(--border-faint)',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          width: 34, height: 34,
          borderRadius: 10,
          background: 'var(--grad-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: 'var(--shadow-glow-sm)',
        }}>
          <Zap size={17} color="white" />
        </div>
        {!c && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              Aryabhatta<span style={{ color: 'var(--violet-5)' }}>.ai</span>
            </div>
            <div className="t-label" style={{ lineHeight: 1, whiteSpace: 'nowrap' }}>
              {t('AI ANALYTICS', 'AI 数据分析')}
            </div>
          </div>
        )}
      </div>

      {/* ── AI STATUS ── */}
      {!c && (
        <div style={{
          margin: '12px 14px 4px',
          padding: '9px 12px',
          background: 'rgba(52,211,153,0.07)',
          border: '1px solid rgba(52,211,153,0.14)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div className="pulse pulse-green" />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--emerald-4)', lineHeight: 1.2 }}>
              {t('4 AI Models Active', '4个AI模型运行中')}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 1 }}>
              {t('Avg latency 42ms · Live', '平均延迟 42ms · 实时')}
            </div>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{ flex: 1, padding: c ? '8px 8px' : '8px 10px', overflowY: 'auto' }}>
        {!c && (
          <div className="t-label" style={{ padding: '6px 8px 4px' }}>
            {t('NAVIGATION','导航')}
          </div>
        )}

        {PAGES.map((item) => {
          const Icon = PAGE_ICONS[item.id];
          const badge = PAGE_BADGES[item.id];
          const active = page === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              title={c ? (lang === 'zh' ? item.labelZh : item.label) : undefined}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: c ? '11px 13px' : '10px 12px',
                marginBottom: 3,
                borderRadius: 10,
                border: 'none',
                background: active
                  ? 'linear-gradient(135deg, rgba(109,53,224,0.22) 0%, rgba(124,58,237,0.12) 100%)'
                  : 'transparent',
                borderLeft: `2px solid ${active ? 'var(--violet-4)' : 'transparent'}`,
                color: active ? 'var(--violet-5)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s var(--ease-out)',
                justifyContent: c ? 'center' : 'flex-start',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(109,53,224,0.07)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon
                size={17}
                style={{
                  flexShrink: 0,
                  color: active ? 'var(--violet-4)' : 'inherit',
                  filter: active ? 'drop-shadow(0 0 6px rgba(109,53,224,0.5))' : 'none',
                }}
              />
              {!c && (
                <>
                  <span style={{
                    flex: 1,
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    whiteSpace: 'nowrap',
                  }}>
                    {lang === 'zh' ? item.labelZh : item.label}
                  </span>
                  {badge && (
                    <span style={{
                      padding: '2px 7px',
                      borderRadius: 99,
                      fontSize: 10,
                      fontWeight: 700,
                      background: badge.text === 'NEW'
                        ? 'var(--grad-primary)'
                        : 'rgba(251,113,133,0.15)',
                      color: badge.text === 'NEW' ? 'white' : 'var(--rose-4)',
                      border: badge.text !== 'NEW' ? '1px solid rgba(251,113,133,0.25)' : 'none',
                    }}>
                      {badge.text}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── BOTTOM CONTROLS ── */}
      <div style={{
        padding: c ? '12px 8px' : '12px 14px',
        borderTop: '1px solid var(--border-faint)',
        flexShrink: 0,
      }}>
        {/* Controls row */}
        <div style={{
          display: 'flex',
          gap: 6,
          justifyContent: c ? 'center' : 'space-between',
          marginBottom: 8,
          flexWrap: c ? 'wrap' : 'nowrap',
        }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="btn btn-subtle btn-icon"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark'
              ? <Sun size={15} />
              : <Moon size={15} />
            }
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              className="btn btn-subtle btn-icon"
              onClick={() => { setShowNotif(s => !s); if (!showNotif) markAllRead(); }}
              style={{ position: 'relative' }}
              title="Notifications"
            >
              <Bell size={15} />
              {unread > 0 && <span className="notif-dot" />}
            </button>

            {showNotif && (
              <div style={{
                position: 'absolute',
                bottom: '110%',
                left: c ? 0 : 'auto',
                right: c ? 'auto' : 0,
                width: 300,
                background: 'var(--bg-overlay)',
                border: '1px solid var(--border-medium)',
                borderRadius: 14,
                boxShadow: 'var(--shadow-lg)',
                padding: 14,
                zIndex: 500,
                animation: 'scaleIn 0.2s var(--ease-out)',
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
                  {t('AI Alerts', 'AI 警报')} · {notifs.length}
                </div>
                {notifs.map(n => (
                  <div key={n.id} style={{
                    padding: '9px 11px',
                    borderRadius: 9,
                    marginBottom: 6,
                    background: n.read ? 'transparent' : 'rgba(109,53,224,0.09)',
                    border: '1px solid var(--border-faint)',
                  }}>
                    <div style={{ fontSize: 11.5, color: 'var(--text-primary)', lineHeight: 1.5 }}>{n.msg}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 3 }}>{n.time} ago</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language */}
          <button
            className="btn btn-subtle btn-icon"
            onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
            title="Switch language / 切换语言"
            style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', width: c ? 34 : 'auto', padding: c ? 0 : '0 8px' }}
          >
            {c ? <Globe size={15} /> : (lang === 'en' ? '中文' : 'EN')}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSideCollapsed(s => !s)}
          className="btn btn-subtle"
          style={{ width: '100%', justifyContent: 'center', fontSize: 11, gap: 5 }}
        >
          {c
            ? <ChevronRight size={14} />
            : <><ChevronLeft size={14} /> {t('Collapse','收起')}</>
          }
        </button>
      </div>
    </aside>
  );
}
