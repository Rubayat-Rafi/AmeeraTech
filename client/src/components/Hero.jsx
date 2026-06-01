import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function Counter({ from = 0, to, suffix = "", duration = 3.5 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (inView) {
      const c = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(v) { if (ref.current) ref.current.textContent = Math.round(v) + suffix; },
      });
      return () => c.stop();
    }
  }, [inView, from, to, duration, suffix]);
  return <span ref={ref}>{from}{suffix}</span>;
}

const stats = [
  { to: 150, suffix: "+", label: "Products Built" },
  { to: 50,  suffix: "+", label: "Businesses Served" },
  { to: 5,   suffix: "+", label: "Years Experience" },
  { staticText: "24/7", label: "Support" },
];

function DashboardVisual() {
  return (
    <div className="relative">
      {/* Glow behind */}
      <div className="absolute inset-0 bg-orange-500/10 blur-[80px] rounded-full scale-75 pointer-events-none" />

      {/* Main browser window */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 bg-[#0c0c0c] border border-[#252525] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
      >
        {/* Browser chrome */}
        <div className="h-10 bg-[#111] border-b border-[#1e1e1e] flex items-center gap-2 px-4">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="ml-3 flex-1 h-5 bg-[#1a1a1a] rounded-md max-w-[180px] border border-[#2a2a2a]" />
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-500 font-mono">live</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-5 flex gap-4" style={{ height: 260 }}>
          {/* Sidebar */}
          <div className="w-11 bg-[#0f0f0f] rounded-xl border border-[#1e1e1e] flex flex-col gap-3 items-center py-4 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-orange mb-2" />
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-6 h-6 rounded-lg ${i === 1 ? 'bg-orange-500/20' : 'bg-[#1a1a1a]'}`} />
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Top metrics row */}
            <div className="grid grid-cols-3 gap-3">
              {[['$48.2k', 'Revenue', 'text-orange-400'], ['142', 'Orders', 'text-blue-400'], ['98%', 'Uptime', 'text-emerald-400']].map(([v, l, c]) => (
                <div key={l} className="bg-[#0f0f0f] rounded-xl p-3 border border-[#1e1e1e]">
                  <div className={`text-lg font-bold ${c}`}>{v}</div>
                  <div className="text-[10px] text-[#555] uppercase tracking-wider mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="flex-1 bg-[#0f0f0f] rounded-xl border border-[#1e1e1e] p-4 relative overflow-hidden">
              <div className="text-xs text-[#555] mb-2 uppercase tracking-wider">Revenue (6mo)</div>
              <svg className="absolute inset-x-0 bottom-0 w-full h-3/4" preserveAspectRatio="none" viewBox="0 0 100 60">
                <defs>
                  <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(234,88,12,0.3)" />
                    <stop offset="100%" stopColor="rgba(234,88,12,0)" />
                  </linearGradient>
                </defs>
                <path d="M0,60 L0,40 L17,45 L33,25 L50,35 L67,15 L83,22 L100,8 L100,60 Z" fill="url(#hg)" />
                <path d="M0,40 L17,45 L33,25 L50,35 L67,15 L83,22 L100,8" fill="none" stroke="rgba(234,88,12,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="100" cy="8" r="2.5" fill="#ea580c" />
              </svg>
            </div>

            {/* Invoice rows */}
            <div className="space-y-2">
              {[['INV-042', 'Completed', 'text-emerald-400 bg-emerald-500/10'], ['INV-043', 'Pending', 'text-orange-400 bg-orange-500/10']].map(([id, s, cls]) => (
                <div key={id} className="flex items-center gap-3 bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg px-3 py-2">
                  <div className="w-6 h-6 rounded-md bg-[#1a1a1a] shrink-0" />
                  <div className="flex-1 h-2.5 bg-[#1a1a1a] rounded" />
                  <div className="w-14 h-2.5 bg-[#222] rounded" />
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating card — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute -bottom-5 -left-6 z-20 bg-[#0f0f0f] border border-[#2a2a2a] rounded-2xl px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-3"
      >
        <div className="w-9 h-9 bg-gradient-orange rounded-xl flex items-center justify-center shadow-glow shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-white text-sm font-semibold leading-tight">InvoiceFlow Deployed</div>
          <div className="text-[#555] text-xs">v2.4 · just now</div>
        </div>
      </motion.div>

      {/* Floating card — top right */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute -top-5 -right-6 z-20 bg-[#0f0f0f] border border-[#2a2a2a] rounded-2xl px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] text-center"
      >
        <div className="text-lg font-bold text-gradient-orange">150+</div>
        <div className="text-[#555] text-xs uppercase tracking-wider">Products Built</div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-24 pb-12">
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <motion.div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-orange-500/6 rounded-full blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          {/* Left — text content */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/8 text-orange-400 text-xs md:text-sm font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block" />
                Building Digital Products Since 2020
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-2xl md:text-4xl lg:text-5xl font-normal mb-5 text-white leading-[1.15] tracking-tight"
            >
              We Build the Software<br />
              <span className="italic text-gradient-orange">Your Business Runs On</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base text-[#9ca3af] mb-8 max-w-lg leading-relaxed"
            >
              From{" "}
              <strong className="text-white font-medium">custom websites</strong>{" "}
              and{" "}
              <strong className="text-white font-medium">POS & inventory systems</strong>{" "}
              to{" "}
              <strong className="text-white font-medium">lead generation platforms</strong>{" "}
              — purpose-built digital products that keep your business running and growing.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <motion.button
                  className="px-6 py-3 md:px-8 md:py-4 bg-gradient-orange text-white rounded-full font-semibold text-sm md:text-base shadow-glow flex items-center gap-2 w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Your Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </Link>
              <Link to="/work">
                <motion.button
                  className="px-6 py-3 md:px-8 md:py-4 border border-[#3a3a3a] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#1a1a1a] transition-all w-full sm:w-auto"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust micro-badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mt-6">
              {['Custom-built, not templates', 'Ongoing maintenance', '5+ years experience'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-xs md:text-sm text-[#6b7280]">
                  <svg className="w-4 h-4 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — dashboard visual */}
          <div className="hidden lg:block">
            <DashboardVisual />
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#1e1e1e] pt-10"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-orange">
                {s.staticText ? <span>{s.staticText}</span> : <Counter to={s.to} suffix={s.suffix} />}
              </div>
              <div className="text-sm text-[#6b7280] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#3a3a3a] flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-3 bg-orange-500 rounded-full"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
