import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

const COLOR_MAP = {
  violet:  { bg: 'rgba(109,53,224,0.12)', border: 'rgba(109,53,224,0.2)',  icon: 'var(--violet-4)',  value: 'var(--violet-5)'  },
  cyan:    { bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.18)', icon: 'var(--cyan-4)',    value: 'var(--cyan-4)'    },
  emerald: { bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.18)', icon: 'var(--emerald-4)', value: 'var(--emerald-4)' },
  amber:   { bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.18)', icon: 'var(--amber-4)',   value: 'var(--amber-4)'   },
  fuchsia: { bg: 'rgba(232,121,249,0.1)', border: 'rgba(232,121,249,0.18)',icon: 'var(--fuchsia-4)', value: 'var(--fuchsia-4)' },
  rose:    { bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.18)',icon: 'var(--rose-4)',    value: 'var(--rose-4)'    },
};

function format(val, fmt) {
  switch (fmt) {
    case 'currency': return `RM ${(val / 1000000).toFixed(2)}M`;
    case 'large':    return val >= 1000000 ? `${(val/1000000).toFixed(2)}M` : `${(val/1000).toFixed(1)}K`;
    case 'percent':  return `${val.toFixed(1)}%`;
    case 'score':    return val.toFixed(2);
    case 'int':      return Math.round(val).toLocaleString();
    default:         return Math.round(val).toString();
  }
}

export default function KPICard({
  label, value, change, fmt = 'int',
  icon: Icon, color = 'violet',
  delay = 0, subtitle,
}) {
  const animated = useCountUp(typeof value === 'number' ? value : 0, 1400);
  const c = COLOR_MAP[color] || COLOR_MAP.violet;
  const positive = change >= 0;

  return (
    <div
      className="card anim-fade-up"
      style={{ padding: 20, position: 'relative', animationDelay: `${delay}ms` }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -10, right: -10,
        width: 90, height: 90,
        background: c.bg,
        borderRadius: '50%',
        filter: 'blur(22px)',
        pointerEvents: 'none',
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        {/* Icon */}
        <div style={{
          width: 36, height: 36,
          borderRadius: 10,
          background: c.bg,
          border: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {Icon && <Icon size={16} style={{ color: c.icon }} />}
        </div>

        {/* Change badge */}
        {change !== undefined && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            padding: '3px 8px',
            borderRadius: 99,
            fontSize: 10.5,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            background: positive ? 'rgba(52,211,153,0.1)' : 'rgba(251,113,133,0.1)',
            border: `1px solid ${positive ? 'rgba(52,211,153,0.2)' : 'rgba(251,113,133,0.2)'}`,
            color: positive ? 'var(--emerald-4)' : 'var(--rose-4)',
          }}>
            {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {positive ? '+' : ''}{change}%
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{
        fontSize: 26,
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
        color: c.value,
        marginBottom: 5,
      }}>
        {format(animated, fmt)}
      </div>

      {/* Label */}
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.3 }}>
        {label}
      </div>
      {subtitle && (
        <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
          {subtitle}
        </div>
      )}

      {/* Bottom progress */}
      <div style={{ marginTop: 14, height: 3, borderRadius: 2, background: 'var(--border-faint)' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          background: c.icon,
          width: `${Math.min(Math.abs(change || 5) * 6, 100)}%`,
          boxShadow: `0 0 6px ${c.icon}`,
          transition: 'width 1.6s var(--ease-out)',
        }} />
      </div>
    </div>
  );
}
