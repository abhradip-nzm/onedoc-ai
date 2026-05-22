import { useState, useEffect, useRef } from 'react';

export function useCountUp(target, duration = 1400, start = 0) {
  const [value, setValue] = useState(start);
  const raf = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    const startVal = start;
    const endVal = target;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(startVal + (endVal - startVal) * eased);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);

  return value;
}
