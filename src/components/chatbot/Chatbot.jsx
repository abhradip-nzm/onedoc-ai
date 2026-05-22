import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Mic, Paperclip, RefreshCw, Brain, Sparkles } from 'lucide-react';
import { chatResponses, suggestedQ, detectIntent } from '../../data/simulationData';
import { useApp } from '../../contexts/AppContext';

const WELCOME = {
  en: "Hello! I'm **OneDoc AI**, your intelligent analytics companion.\n\nI have real-time access to data across **27 outlets, 106K+ clients** and all revenue, satisfaction and predictive metrics.\n\nAsk me anything — in English or 中文.",
  zh: "您好！我是 **OneDoc AI**，您的智能分析助手。\n\n我可以实时访问 **27家门店、10.6万+客户** 以及所有收入、满意度和预测指标的数据。\n\n请用中文或英文提问。",
};

const INTENT_CHIPS = {
  revenue:     [{ l:'YTD Revenue', v:'RM 3.54M', col:'#8b5cf6' }, { l:'Nov Forecast', v:'RM 447K', col:'#22d3ee' }, { l:'Growth', v:'+12.3%', col:'#34d399' }],
  clients:     [{ l:'Total Clients', v:'106,420', col:'#22d3ee' }, { l:'Churn Risk', v:'142', col:'#fb7185' }, { l:'Retention', v:'78.4%', col:'#34d399' }],
  satisfaction:[{ l:'NPS Score', v:'72', col:'#a78bfa' }, { l:'Avg Rating', v:'4.73/5', col:'#34d399' }, { l:'Best Outlet', v:'Mid Valley', col:'#6d35e0' }],
  rca:         [{ l:'Open Cases', v:'2', col:'#fb7185' }, { l:'Monitoring', v:'1', col:'#22d3ee' }, { l:'Resolved', v:'8', col:'#34d399' }],
  prediction:  [{ l:'Nov Forecast', v:'RM 447K', col:'#8b5cf6' }, { l:'Confidence', v:'87%', col:'#34d399' }, { l:'Q4 Total', v:'RM 1.37M', col:'#22d3ee' }],
  outlets:     [{ l:'Top Outlet', v:'Mid Valley', col:'#6d35e0' }, { l:'Fastest Growth', v:'Eco Botanic', col:'#34d399' }, { l:'Alert Outlets', v:'2', col:'#fb7185' }],
  skin:        [{ l:'Top Concern', v:'Pigmentation', col:'#8b5cf6' }, { l:'Share', v:'42%', col:'#a855f7' }, { l:'Trend', v:'↑ +4pp', col:'#fb7185' }],
};

function renderText(text) {
  const lines = text.split('\n');
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={li} style={{ margin: li === 0 ? 0 : '4px 0 0', lineHeight: 1.7, fontSize: 13 }}>
        {parts.map((part, pi) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={pi} style={{ color: 'var(--violet-5)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>
            : part.startsWith('- ')
              ? <span key={pi}>{'→ '}{part.slice(2)}</span>
              : part
        )}
      </p>
    );
  });
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '12px 16px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--violet-4)',
          animation: 'breathe 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

function DataChip({ l, v, col }) {
  return (
    <div style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
      padding: '8px 13px',
      background: `${col}14`,
      border: `1px solid ${col}28`,
      borderRadius: 10,
      marginRight: 6, marginTop: 6,
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: col }}>{v}</span>
      <span style={{ fontSize: 9.5, color: 'var(--text-tertiary)', marginTop: 2 }}>{l}</span>
    </div>
  );
}

export default function Chatbot() {
  const { lang, setLang, t } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: WELCOME[lang], chips: null, intent: null, ts: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sessionLang, setSessionLang] = useState(lang);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput('');

    setMessages(prev => [...prev, {
      id: Date.now(), role: 'user', text: msg, ts: new Date()
    }]);
    setTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const intent = detectIntent(msg);
    const responseBank = chatResponses[sessionLang] || chatResponses.en;
    const responseText = responseBank[intent] || responseBank.default;
    const chips = INTENT_CHIPS[intent] || null;

    setMessages(prev => [...prev, {
      id: Date.now() + 1, role: 'ai',
      text: responseText, chips, intent,
      ts: new Date()
    }]);
    setTyping(false);
  }, [input, typing, sessionLang]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const switchLang = (l) => {
    setSessionLang(l);
    setLang(l);
    const m = {
      id: Date.now(), role: 'ai', ts: new Date(),
      text: l === 'zh'
        ? '已切换为中文模式。请用中文提问，我会用中文回复您。'
        : 'Switched to English mode. I\'ll respond in English from here.',
      chips: null, intent: null,
    };
    setMessages(prev => [...prev, m]);
  };

  const clearChat = () => {
    setMessages([{
      id: 1, role: 'ai', text: WELCOME[sessionLang], chips: null, intent: null, ts: new Date()
    }]);
  };

  return (
    <div className="page-body" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--topbar-h))' }}>
      {/* Header */}
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <div className="badge badge-violet" style={{ marginBottom: 8, display: 'inline-flex', gap: 5 }}>
          <Brain size={10} />
          {t('MULTILINGUAL NLP · EN + 中文', '多语言NLP · 英文 + 中文')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="t-display" style={{ fontSize: 24 }}>
            {t('AI Analytics Assistant', 'AI 智能助手')}
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Language toggle */}
            <div style={{ display: 'flex', padding: 3, background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              {[{ c:'en', l:'🇬🇧 EN' }, { c:'zh', l:'🇨🇳 中文' }].map(lang => (
                <button
                  key={lang.c}
                  onClick={() => switchLang(lang.c)}
                  style={{
                    padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: sessionLang === lang.c ? 'var(--grad-primary)' : 'transparent',
                    color: sessionLang === lang.c ? 'white' : 'var(--text-tertiary)',
                    fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
                  }}
                >
                  {lang.l}
                </button>
              ))}
            </div>
            <button className="btn btn-subtle btn-icon" onClick={clearChat} title="Clear chat">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--bg-overlay)', borderRadius: 16, border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', minHeight: 0 }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex', gap: 10, marginBottom: 20,
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                animation: 'fadeSlideUp 0.3s var(--ease-out)',
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                background: msg.role === 'ai' ? 'var(--grad-primary)' : 'var(--bg-elevated)',
                border: msg.role === 'user' ? '1px solid var(--border-medium)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: msg.role === 'ai' ? 'var(--shadow-glow-xs)' : 'none',
              }}>
                {msg.role === 'ai'
                  ? <Bot size={14} color="white" />
                  : <User size={13} style={{ color: 'var(--violet-5)' }} />
                }
              </div>

              <div style={{ maxWidth: '76%' }}>
                {/* Meta */}
                <div style={{
                  fontSize: 9.5, color: 'var(--text-tertiary)', marginBottom: 4,
                  fontFamily: 'var(--font-mono)', textAlign: msg.role === 'user' ? 'right' : 'left',
                }}>
                  {msg.role === 'ai' ? `ONEDOC AI${msg.intent ? ` · ${msg.intent.toUpperCase()}` : ''}` : 'YOU'}
                  {' · '}{msg.ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Bubble */}
                <div style={{
                  padding: '12px 15px',
                  background: msg.role === 'ai'
                    ? 'var(--bg-elevated)'
                    : 'linear-gradient(135deg, rgba(109,53,224,0.25) 0%, rgba(124,58,237,0.15) 100%)',
                  border: `1px solid ${msg.role === 'ai' ? 'var(--border-faint)' : 'var(--border-medium)'}`,
                  borderRadius: msg.role === 'ai' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                  color: 'var(--text-primary)',
                }}>
                  {renderText(msg.text)}
                </div>

                {/* Data Chips */}
                {msg.chips && (
                  <div style={{ marginTop: 2, display: 'flex', flexWrap: 'wrap' }}>
                    {msg.chips.map((chip, i) => <DataChip key={i} {...chip} />)}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, animation: 'fadeIn 0.2s' }}>
              <div style={{ width:30, height:30, borderRadius:9, background:'var(--grad-primary)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'var(--shadow-glow-xs)' }}>
                <Bot size={14} color="white" />
              </div>
              <div style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-faint)', borderRadius:'4px 14px 14px 14px' }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggested Questions */}
        <div style={{ padding: '0 18px 10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {(suggestedQ[sessionLang] || suggestedQ.en).map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                style={{
                  padding: '5px 11px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 99,
                  cursor: 'pointer',
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--violet-5)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '10px 18px 16px',
          borderTop: '1px solid var(--border-faint)',
          display: 'flex', gap: 8, alignItems: 'flex-end',
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t('Ask in English or 中文... (Enter to send)', '用英文或中文提问... (Enter发送)')}
              className="input"
              rows={1}
              style={{ resize: 'none', paddingRight: 80, minHeight: 42, maxHeight: 110, lineHeight: 1.55, fontSize: 13 }}
            />
            <div style={{ position: 'absolute', right: 8, bottom: 8, display: 'flex', gap: 4 }}>
              <button className="btn btn-subtle btn-icon" style={{ width:28, height:28, borderRadius:7 }} title="Voice input">
                <Mic size={13} />
              </button>
              <button className="btn btn-subtle btn-icon" style={{ width:28, height:28, borderRadius:7 }} title="Attach">
                <Paperclip size={13} />
              </button>
            </div>
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            style={{
              width: 42, height: 42, borderRadius: 11, border: 'none',
              background: input.trim() && !typing ? 'var(--grad-primary)' : 'var(--bg-elevated)',
              cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
              color: input.trim() && !typing ? 'white' : 'var(--text-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: input.trim() && !typing ? 'var(--shadow-glow-sm)' : 'none',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
