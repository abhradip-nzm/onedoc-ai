import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext({});

export const PAGES = [
  { id: 'dashboard',  label: 'AI Dashboard',    labelZh: '智能仪表板' },
  { id: 'analytics',  label: 'Analytics Hub',   labelZh: '分析中心'   },
  { id: 'predictive', label: 'Predictive AI',    labelZh: '预测智能'   },
  { id: 'rca',        label: 'RCA Engine',       labelZh: '根因分析'   },
  { id: 'chatbot',    label: 'AI Assistant',     labelZh: 'AI 助手'    },
];

const INITIAL_NOTIFS = [
  { id: 1, type: 'alert',   read: false, time: '2m',  msg: 'Data anomaly detected — Revenue spike (+3.2×)' },
  { id: 2, type: 'insight', read: false, time: '14m', msg: 'Revenue forecast upgraded: +12.3% YTD' },
  { id: 3, type: 'rca',     read: false, time: '1h',  msg: 'New RCA resolved: Satisfaction drop case' },
  { id: 4, type: 'model',   read: true,  time: '3h',  msg: 'Predictive model retrained — accuracy 87%' },
];

export function AppProvider({ children }) {
  const [appView, setAppView]   = useState('landing'); // 'landing' | 'login' | 'app'
  const [page, setPage]         = useState('dashboard');
  const [lang, setLang]         = useState('en');
  const [notifs, setNotifs]     = useState(INITIAL_NOTIFS);
  const [sideCollapsed, setSideCollapsed] = useState(false);

  const markAllRead = useCallback(() =>
    setNotifs(n => n.map(x => ({ ...x, read: true }))), []);

  const unread = notifs.filter(n => !n.read).length;

  const t = useCallback((en, zh) => lang === 'zh' ? zh : en, [lang]);

  const navigate = useCallback((view) => setAppView(view), []);

  return (
    <AppContext.Provider value={{
      appView, setAppView, navigate,
      page, setPage,
      lang, setLang,
      notifs, markAllRead, unread,
      sideCollapsed, setSideCollapsed,
      t,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
