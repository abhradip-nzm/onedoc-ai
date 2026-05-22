import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider, useApp } from './contexts/AppContext';
import Sidebar from './components/shared/Sidebar';
import TopBar from './components/shared/TopBar';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/analytics/Analytics';
import PredictiveAI from './components/predictive/PredictiveAI';
import RCAEngine from './components/rca/RCAEngine';
import Chatbot from './components/chatbot/Chatbot';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import './index.css';

function AppShell() {
  const { appView, page, sideCollapsed } = useApp();

  if (appView === 'landing') return <LandingPage />;
  if (appView === 'login')   return <LoginPage />;

  const renderPage = () => {
    switch (page) {
      case 'dashboard':  return <Dashboard />;
      case 'analytics':  return <Analytics />;
      case 'predictive': return <PredictiveAI />;
      case 'rca':        return <RCAEngine />;
      case 'chatbot':    return <Chatbot />;
      default:           return <Dashboard />;
    }
  };

  return (
    <>
      <div className="ai-canvas" />
      <div className="grid-canvas" />
      <div className="app-shell">
        <Sidebar />
        <main className={`app-main ${sideCollapsed ? 'sidebar-collapsed' : ''}`}>
          <TopBar />
          {renderPage()}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </ThemeProvider>
  );
}
