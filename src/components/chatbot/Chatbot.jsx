import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Mic, Paperclip, RefreshCw, Brain, Sparkles, Zap } from 'lucide-react';
import { chatResponses, suggestedQ, detectIntent } from '../../data/simulationData';
import { useApp } from '../../contexts/AppContext';

// ── PLATFORM CONTEXT injected into every Groq call ──────────────────────────
const SYSTEM_PROMPT = `You are Aryabhatta AI, an intelligent analytics assistant embedded inside Aryabhatta.ai — an enterprise AI-powered data analytics platform.

Platform context (current live data):
- 27 outlets across Malaysia (Klang Valley, Penang, Johor Bahru, and other regions)
- Revenue YTD: RM 3.54M (+12.3% YoY) | November forecast: RM 447K (87% confidence)
- Clients served: 106,420 (+8.7%) | Retention: 78.4% | NPS: 72 | Avg satisfaction: 4.73/5
- Churn risk: 142 high-risk clients predicted to churn within 30 days
- 4 active ML models: Revenue Forecaster (XGBoost, 87% accuracy), Churn Predictor (Random Forest, 82%), Demand Modeller (LSTM, 79%), Sentiment Analyser (mBERT, 91%)
- Top outlet: Mid Valley | Fastest growing: Eco Botanic | 2 outlets on alert
- Active RCA cases: 2 open, 1 monitoring, 8 resolved (30 days)
- Industries served: FMCG, Healthcare, BFSI, Real Estate, Manufacturing, Retail, Education, Telecom
- Treatment mix: Full Protocol (38%), Ultra Pico X (24%), Deep Cleansing (18%), UltraBoost™ (12%), Hydration Mask (8%)
- Top skin concern: Pigmentation (42%, trending up +4pp)

Your role:
- Answer analytics, business intelligence, AI/ML, and industry-specific questions with confidence
- Reference the platform metrics above when relevant
- For topics outside analytics/business, briefly answer then connect back to analytics value
- Always be concise (3-5 sentences). Use bullet points only for lists of 3+.
- Respond in the same language as the user — English or Chinese (中文).
- Never refuse a question. If unsure, give a thoughtful best-effort answer.`;

const WELCOME = {
  en: "Hello! I'm **Aryabhatta AI**, your intelligent analytics companion.\n\nI have real-time access to data across **27 outlets, 106K+ clients** and all revenue, satisfaction and predictive metrics.\n\nAsk me anything — in English or 中文. For questions outside my built-in knowledge, I'll use extended AI reasoning automatically.",
  zh: "您好！我是 **Aryabhatta AI**，您的智能分析助手。\n\n我可以实时访问 **27家门店、10.6万+客户** 以及所有收入、满意度和预测指标的数据。\n\n请用中文或英文提问。对于内置知识范围之外的问题，我将自动使用扩展AI推理。",
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

// ── GROQ API CALL ────────────────────────────────────────────────────────────
async function callGroqLLM(userMessage, history) {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;

  if (!apiKey) {
    return {
      text: "**Extended AI not configured.**\n\nTo answer open-ended questions, add your free Groq API key:\n1. Visit [console.groq.com](https://console.groq.com) — free, no credit card\n2. Create an API key\n3. Add `REACT_APP_GROQ_API_KEY=your_key` to `.env.local`\n4. Restart the dev server\n\nI can still answer questions about revenue, clients, satisfaction, predictions, outlets, RCA and skin concerns using my built-in knowledge.",
      source: 'no-key',
    };
  }

  // Build conversation history for context (last 8 messages max)
  const historyMessages = history
    .slice(-8)
    .filter(m => m.role === 'user' || (m.role === 'ai' && m.text))
    .map(m => ({
      role: m.role === 'ai' ? 'assistant' : 'user',
      content: m.text,
    }));

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...historyMessages,
          { role: 'user', content: userMessage },
        ],
        temperature: 0.65,
        max_tokens: 512,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim() || 'No response received.';
    return { text, source: 'groq' };

  } catch (err) {
    console.error('Groq API error:', err);
    return {
      text: `**AI reasoning temporarily unavailable.**\n\n${err.message}\n\nPlease try again or ask about revenue, clients, satisfaction, predictions, outlets, RCA, or skin trends using my built-in knowledge.`,
      source: 'error',
    };
  }
}

// ── RENDER HELPERS ───────────────────────────────────────────────────────────
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

function TypingDots({ groq }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '12px 16px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: groq ? 'var(--cyan-4)' : 'var(--violet-4)',
          animation: 'breathe 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
      {groq && (
        <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--cyan-4)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
          GROQ AI
        </span>
      )}
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

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Chatbot() {
  const { lang, setLang, t } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: WELCOME[lang], chips: null, intent: null, source: 'local', ts: new Date() }
  ]);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [usingGroq, setUsingGroq] = useState(false);
  const [sessionLang, setSessionLang] = useState(lang);
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput('');

    const userMsg = { id: Date.now(), role: 'user', text: msg, ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const intent = detectIntent(msg);

    if (intent !== 'default') {
      // ── FAST PATH: known intent → instant local response ──────────────────
      setUsingGroq(false);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

      const responseBank = chatResponses[sessionLang] || chatResponses.en;
      const responseText = responseBank[intent];
      const chips = INTENT_CHIPS[intent] || null;

      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'ai',
        text: responseText, chips, intent, source: 'local',
        ts: new Date(),
      }]);
    } else {
      // ── EXTENDED PATH: unknown question → Groq LLM ───────────────────────
      setUsingGroq(true);

      // Pass message history for conversational context
      setMessages(prev => {
        const history = prev;
        (async () => {
          const { text: aiText, source } = await callGroqLLM(msg, history);
          setMessages(p => [...p, {
            id: Date.now() + 1, role: 'ai',
            text: aiText, chips: null, intent: 'extended', source,
            ts: new Date(),
          }]);
          setTyping(false);
          setUsingGroq(false);
        })();
        return prev;
      });
      return; // typing/groq state cleared inside async above
    }

    setTyping(false);
    setUsingGroq(false);
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
    setMessages(prev => [...prev, {
      id: Date.now(), role: 'ai', ts: new Date(), source: 'local',
      text: l === 'zh'
        ? '已切换为中文模式。请用中文提问，我会用中文回复您。'
        : "Switched to English mode. I'll respond in English from here.",
      chips: null, intent: null,
    }]);
  };

  const clearChat = () => {
    setMessages([{
      id: 1, role: 'ai', text: WELCOME[sessionLang],
      chips: null, intent: null, source: 'local', ts: new Date(),
    }]);
  };

  const hasGroqKey = !!process.env.REACT_APP_GROQ_API_KEY;

  return (
    <div className="chat-page">
      {/* ── HEADER ── */}
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <div className="badge badge-violet" style={{ display: 'inline-flex', gap: 5 }}>
            <Brain size={10} />
            {t('MULTILINGUAL NLP · EN + 中文', '多语言NLP · 英文 + 中文')}
          </div>
          <div className={`badge ${hasGroqKey ? 'badge-cyan' : 'badge-amber'}`} style={{ display: 'inline-flex', gap: 5 }}>
            <Zap size={10} />
            {hasGroqKey
              ? t('GROQ AI · EXTENDED REASONING', 'GROQ AI · 扩展推理')
              : t('GROQ AI · KEY REQUIRED', 'GROQ AI · 需要配置密钥')
            }
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="t-display" style={{ fontSize: 24 }}>
            {t('AI Analytics Assistant', 'AI 智能助手')}
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Language toggle */}
            <div style={{ display: 'flex', padding: 3, background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              {[{ c:'en', l:'🇬🇧 EN' }, { c:'zh', l:'🇨🇳 中文' }].map(lx => (
                <button
                  key={lx.c}
                  onClick={() => switchLang(lx.c)}
                  style={{
                    padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: sessionLang === lx.c ? 'var(--grad-primary)' : 'transparent',
                    color: sessionLang === lx.c ? 'white' : 'var(--text-tertiary)',
                    fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
                  }}
                >
                  {lx.l}
                </button>
              ))}
            </div>
            <button className="btn btn-subtle btn-icon" onClick={clearChat} title={t('Clear chat', '清除对话')}>
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── CHAT WINDOW ── */}
      <div style={{
        flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        background: 'var(--bg-overlay)', borderRadius: 16,
        border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', minHeight: 0,
      }}>
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
                background: msg.role === 'ai'
                  ? (msg.source === 'groq' ? 'linear-gradient(135deg,#0891b2,#22d3ee)' : 'var(--grad-primary)')
                  : 'var(--bg-elevated)',
                border: msg.role === 'user' ? '1px solid var(--border-medium)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: msg.role === 'ai'
                  ? (msg.source === 'groq' ? '0 0 8px rgba(34,211,238,0.4)' : 'var(--shadow-glow-xs)')
                  : 'none',
              }}>
                {msg.role === 'ai'
                  ? (msg.source === 'groq'
                      ? <Sparkles size={13} color="white" />
                      : <Bot size={14} color="white" />)
                  : <User size={13} style={{ color: 'var(--violet-5)' }} />
                }
              </div>

              <div style={{ maxWidth: '76%' }}>
                {/* Meta */}
                <div style={{
                  fontSize: 9.5, color: 'var(--text-tertiary)', marginBottom: 4,
                  fontFamily: 'var(--font-mono)', textAlign: msg.role === 'user' ? 'right' : 'left',
                }}>
                  {msg.role === 'ai'
                    ? (msg.source === 'groq'
                        ? 'GROQ AI · LLAMA 3.1'
                        : `ARYABHATTA AI${msg.intent && msg.intent !== 'extended' ? ` · ${msg.intent.toUpperCase()}` : ''}`)
                    : t('YOU', '您')
                  }
                  {' · '}{msg.ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Bubble */}
                <div style={{
                  padding: '12px 15px',
                  background: msg.role === 'ai'
                    ? (msg.source === 'groq'
                        ? 'linear-gradient(135deg,rgba(8,145,178,0.08),rgba(34,211,238,0.04))'
                        : 'var(--bg-elevated)')
                    : 'linear-gradient(135deg, rgba(109,53,224,0.25) 0%, rgba(124,58,237,0.15) 100%)',
                  border: `1px solid ${
                    msg.role === 'ai'
                      ? (msg.source === 'groq' ? 'rgba(34,211,238,0.18)' : 'var(--border-faint)')
                      : 'var(--border-medium)'
                  }`,
                  borderRadius: msg.role === 'ai' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                  color: 'var(--text-primary)',
                }}>
                  {renderText(msg.text)}
                </div>

                {/* Groq source badge */}
                {msg.source === 'groq' && (
                  <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Sparkles size={9} color="var(--cyan-4)" />
                    <span style={{ fontSize: 9, color: 'var(--cyan-4)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {t('Generated by Groq · llama-3.1-8b-instant', '由 Groq 生成 · llama-3.1-8b-instant')}
                    </span>
                  </div>
                )}

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
              <div style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                background: usingGroq
                  ? 'linear-gradient(135deg,#0891b2,#22d3ee)'
                  : 'var(--grad-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: usingGroq ? '0 0 8px rgba(34,211,238,0.4)' : 'var(--shadow-glow-xs)',
              }}>
                {usingGroq ? <Sparkles size={13} color="white" /> : <Bot size={14} color="white" />}
              </div>
              <div style={{
                background: usingGroq ? 'rgba(8,145,178,0.08)' : 'var(--bg-elevated)',
                border: `1px solid ${usingGroq ? 'rgba(34,211,238,0.2)' : 'var(--border-faint)'}`,
                borderRadius: '4px 14px 14px 14px',
              }}>
                <TypingDots groq={usingGroq} />
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
              placeholder={t('Ask anything — built-in or extended AI (Enter to send)', '随意提问，内置或扩展AI均可（Enter发送）')}
              className="input"
              rows={1}
              style={{ resize: 'none', paddingRight: 80, minHeight: 42, maxHeight: 110, lineHeight: 1.55, fontSize: 13 }}
            />
            <div style={{ position: 'absolute', right: 8, bottom: 8, display: 'flex', gap: 4 }}>
              <button className="btn btn-subtle btn-icon" style={{ width:28, height:28, borderRadius:7 }} title={t('Voice input','语音输入')}>
                <Mic size={13} />
              </button>
              <button className="btn btn-subtle btn-icon" style={{ width:28, height:28, borderRadius:7 }} title={t('Attach','附件')}>
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
