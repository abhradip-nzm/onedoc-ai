import React from 'react';

export default function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{label}</div>
      {payload.map((p, i) => (
        p.value !== null && p.value !== undefined && (
          <div key={i} className="chart-tooltip-row">
            <div
              className="chart-tooltip-dot"
              style={{ background: p.color || p.stroke }}
            />
            <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{p.name}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontSize: 11.5,
            }}>
              {formatter ? formatter(p.value, p.name) : p.value}
            </span>
          </div>
        )
      ))}
    </div>
  );
}
