import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Zap, Eye, EyeOff, ArrowLeft, Globe, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const { lang, setLang, navigate } = useApp();
  const t = (en, zh) => lang === 'zh' ? zh : en;

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('Please enter your email and password.', '请输入您的邮箱和密码。'));
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('app');
  };

  return (
    <div className="auth-page" style={{ fontFamily: "'Inter','Noto Sans JP',sans-serif", minHeight: '100vh', display: 'flex' }}>
      <div className="ai-canvas" />
      <div className="grid-canvas" />

      {/* ── LEFT PANEL ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 64px', position: 'relative', zIndex: 1,
        background: 'rgba(7,5,15,0.6)',
        borderRight: '1px solid rgba(139,92,246,0.1)',
      }}>
        {/* Back to landing */}
        <button
          onClick={() => navigate('landing')}
          style={{
            position: 'absolute', top: 32, left: 40,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: 'none',
            color: 'rgba(240,235,255,0.5)', cursor: 'pointer',
            fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,255,0.5)'}
        >
          <ArrowLeft size={14} /> {t('Back to Home', '返回首页')}
        </button>

        {/* Logo */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 13,
              background: 'linear-gradient(135deg,#5327b5 0%,#7c28d4 40%,#e879f9 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(109,53,224,0.5)',
            }}>
              <Zap size={20} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', color: '#f0ebff' }}>
              Aryabhatta<span style={{ color: '#a78bfa' }}>.ai</span>
            </span>
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', color: '#f0ebff', lineHeight: 1.1, marginBottom: 14 }}>
            {t('Welcome back', '欢迎回来')}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(240,235,255,0.5)', lineHeight: 1.6 }}>
            {t('Sign in to access your analytics dashboard.', '登录以访问您的分析仪表板。')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ maxWidth: 400 }}>
          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(240,235,255,0.6)', marginBottom: 8, letterSpacing: '0.03em' }}>
              {t('EMAIL ADDRESS', '邮箱地址')}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(168,139,250,0.5)', pointerEvents: 'none' }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('you@company.com', '您@公司.com')}
                style={{
                  width: '100%', padding: '12px 14px 12px 38px',
                  borderRadius: 11, border: '1px solid rgba(139,92,246,0.2)',
                  background: 'rgba(13,10,30,0.8)',
                  color: '#f0ebff', fontSize: 14, fontFamily: 'inherit',
                  outline: 'none', transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.2)'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(240,235,255,0.6)', marginBottom: 8, letterSpacing: '0.03em' }}>
              {t('PASSWORD', '密码')}
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(168,139,250,0.5)', pointerEvents: 'none' }} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('Your password', '您的密码')}
                style={{
                  width: '100%', padding: '12px 44px 12px 38px',
                  borderRadius: 11, border: '1px solid rgba(139,92,246,0.2)',
                  background: 'rgba(13,10,30,0.8)',
                  color: '#f0ebff', fontSize: 14, fontFamily: 'inherit',
                  outline: 'none', transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.2)'}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(168,139,250,0.5)', padding: 2, display: 'flex',
                }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <a href="#" style={{ fontSize: 12, color: '#8b5cf6', textDecoration: 'none', fontWeight: 500 }}>
              {t('Forgot password?', '忘记密码？')}
            </a>
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 9, background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.25)', fontSize: 13, color: '#fb7185' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', borderRadius: 11, border: 'none',
              background: loading ? 'rgba(109,53,224,0.4)' : 'linear-gradient(135deg,#5327b5 0%,#7c28d4 50%,#e879f9 100%)',
              color: 'white', cursor: loading ? 'wait' : 'pointer',
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              boxShadow: loading ? 'none' : '0 0 24px rgba(109,53,224,0.4)',
              transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? (
              <>
                <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                {t('Signing in...', '登录中...')}
              </>
            ) : (
              t('Sign In', '登录')
            )}
          </button>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'rgba(240,235,255,0.4)' }}>
            {t("Don't have an account? ", '没有账号？')}
            <a href="#" style={{ color: '#8b5cf6', fontWeight: 600, textDecoration: 'none' }}>
              {t('Contact Sales', '联系销售')}
            </a>
          </div>
        </form>

        {/* Language toggle */}
        <button
          onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
          style={{
            position: 'absolute', bottom: 32, left: 40,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: '1px solid rgba(139,92,246,0.2)',
            color: 'rgba(240,235,255,0.5)', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
            padding: '6px 12px', borderRadius: 8, transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,235,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; }}
        >
          <Globe size={12} />
          {lang === 'en' ? '中文' : 'English'}
        </button>
      </div>

      {/* ── RIGHT PANEL (Brand visual) ── */}
      <div style={{
        width: 480, flexShrink: 0, position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 48px',
        background: 'linear-gradient(160deg,rgba(83,39,181,0.12) 0%,rgba(124,40,212,0.07) 50%,rgba(232,121,249,0.06) 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(109,53,224,0.06),transparent)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6d35e0', letterSpacing: '0.1em', marginBottom: 14, textTransform: 'uppercase' }}>
              {t('WHY ARYABHATTA.AI', '为什么选择 ARYABHATTA.AI')}
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#f0ebff', lineHeight: 1.2, marginBottom: 12 }}>
              {t('Smarter decisions, faster growth', '更明智的决策，更快速的增长')}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(240,235,255,0.5)', lineHeight: 1.7 }}>
              {t('Join 500+ enterprises that trust Aryabhatta.ai for mission-critical analytics.', '加入信任Aryabhatta.ai进行关键业务分析的500+企业。')}
            </p>
          </div>

          {[
            { en: 'Real-time AI dashboards across all your outlets', zh: '所有门店的实时AI仪表板', color: '#8b5cf6' },
            { en: 'Predictive models with 87%+ accuracy', zh: '准确率87%以上的预测模型', color: '#22d3ee' },
            { en: 'Multilingual support — EN, 中文 & more', zh: '多语言支持——英文、中文及更多', color: '#34d399' },
            { en: 'Enterprise-grade security & compliance', zh: '企业级安全与合规', color: '#fbbf24' },
            { en: 'No-code setup, live in minutes', zh: '无代码配置，数分钟即可上线', color: '#f0abfc' },
          ].map(item => (
            <div key={item.en} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${item.color}20`, border: `1px solid ${item.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
              </div>
              <span style={{ fontSize: 13.5, color: 'rgba(240,235,255,0.7)', lineHeight: 1.5, fontWeight: 500 }}>
                {t(item.en, item.zh)}
              </span>
            </div>
          ))}

          {/* Mini stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 36 }}>
            {[
              { value: '91%', label: { en: 'AI Accuracy', zh: 'AI准确率' }, color: '#8b5cf6' },
              { value: '42ms', label: { en: 'Avg Latency', zh: '平均延迟' }, color: '#22d3ee' },
              { value: '500+', label: { en: 'Enterprises', zh: '企业客户' }, color: '#34d399' },
              { value: '99.9%', label: { en: 'Uptime SLA', zh: '可用性SLA' }, color: '#fbbf24' },
            ].map(s => (
              <div key={s.value} style={{
                padding: '16px', borderRadius: 12,
                background: `${s.color}10`, border: `1px solid ${s.color}20`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(240,235,255,0.45)', marginTop: 4, fontWeight: 500 }}>{t(s.label.en, s.label.zh)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
