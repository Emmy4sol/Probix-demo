import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function HeroParallax({ className = '' }: { className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateY = useTransform(x, [-80, 80], [16, -16]);
  const rotateX = useTransform(y, [-55, 55], [-10, 10]);

  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      x.set(clamp(px * 80, -80, 80));
      y.set(clamp(py * 60, -60, 60));
    },
    [x, y]
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1200
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_34%)]" />
      </motion.div>
      <div className="relative grid gap-6 p-8 sm:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Forecast Intelligence</div>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            The future is not guessed. It is forecasted.
          </h1>
          <p className="max-w-2xl text-slate-300">
            Probix is the enterprise-grade forecast intelligence platform for politics, finance, crypto, weather, sports, and daily living.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.28em] text-slate-400">Forecast Confidence</div>
            <div className="mt-4 text-4xl font-semibold text-emerald-300">74%</div>
            <div className="text-sm text-slate-400 mt-2">Dynamic intelligence layer updating in real-time.</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.28em] text-slate-400">Market Pulse</div>
            <div className="mt-4 text-4xl font-semibold text-cyan-300">₦1.92M</div>
            <div className="text-sm text-slate-400 mt-2">Live forecasting volume from enterprise markets.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
