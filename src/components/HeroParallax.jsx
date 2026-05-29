const framer = window['framer-motion'] || window.framerMotion || window.FramerMotion || window.motion || {};
const { motion, useMotionValue, useTransform, useSpring } = framer;
const React = window.React;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

window.HeroParallax = function HeroParallax({ className = '' }) {
  if (!React || !motion || !useMotionValue || !useTransform || !useSpring) {
    return null;
  }

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateY = useTransform(x, [-80, 80], [16, -16]);
  const rotateX = useTransform(y, [-55, 55], [-10, 10]);
  const tiltX = useTransform(x, [-80, 80], [-30, 30]);
  const tiltY = useTransform(y, [-55, 55], [-18, 18]);

  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  const handlePointerMove = React.useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(clamp(px * 80, -80, 80));
    y.set(clamp(py * 60, -60, 60));
  }, [x, y]);

  const handlePointerLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_34%)] shadow-[0_40px_90px_rgba(15,23,42,0.28)]"
        style={{
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1200,
          willChange: 'transform',
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      />

      <motion.div
        className="absolute top-10 left-10 w-64 h-32 rounded-[1.8rem] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-2xl"
        style={{
          x: useTransform(x, [-80, 80], [24, -24]),
          y: useTransform(y, [-60, 60], [-14, 14]),
          rotateZ: useTransform(x, [-80, 80], [3, -3]),
          willChange: 'transform',
        }}
        transition={{ type: 'spring', stiffness: 95, damping: 20 }}
      >
        <div className="h-full p-5 text-white">
          <div className="text-sm uppercase tracking-[0.28em] text-slate-300">Market Pulse</div>
          <div className="mt-4 text-3xl font-semibold text-cyan-200">₦1.92M</div>
          <div className="text-xs text-slate-400 mt-2">Projected growth over next 24h</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 w-72 h-28 rounded-[1.8rem] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-2xl"
        style={{
          x: useTransform(x, [-80, 80], [-28, 28]),
          y: useTransform(y, [-60, 60], [16, -16]),
          rotateZ: useTransform(x, [-80, 80], [-2, 2]),
          willChange: 'transform',
        }}
        transition={{ type: 'spring', stiffness: 95, damping: 20 }}
      >
        <div className="h-full p-5 text-white">
          <div className="text-sm uppercase tracking-[0.28em] text-slate-300">Forecast Confidence</div>
          <div className="mt-4 text-3xl font-semibold text-emerald-300">74%</div>
          <div className="text-xs text-slate-400 mt-2">Dynamic layer motion with GPU acceleration</div>
        </div>
      </motion.div>
    </div>
  );
};
