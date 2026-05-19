import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
}

function Counter({ from = 0, to, suffix = "", duration = 3.5 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "0px" })
  
  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value) + suffix
          }
        }
      })
      return () => controls.stop()
    }
  }, [inView, from, to, duration, suffix])

  return <span ref={ref}>{from}{suffix}</span>
}

const stats = [
  { to: 150, suffix: '+', label: 'Projects Delivered' },
  { to: 50, suffix: '+', label: 'Happy Clients' },
  { to: 5, suffix: '+', label: 'Years Experience' },
  { staticText: '24/7', label: 'Support' }
]

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block" />
          Elevating Digital Experiences Since 2020
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-[1.1] tracking-tight">
          We Build Premium<br />
          <span className="text-gradient-orange italic-serif font-normal">Digital Products</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#9ca3af] mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          From advanced <strong className="text-white font-medium">Data Powered Solutions</strong> and secure{' '}
          <strong className="text-white font-medium">Data Management</strong> to cutting-edge{' '}
          <strong className="text-white font-medium">AI Powered Applications</strong> — we transform your vision into reality.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/contact" className="w-full sm:w-auto">
            <motion.button
              className="px-9 py-4 w-full bg-gradient-orange text-white rounded-full font-semibold text-base shadow-glow flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Your Project
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
          <Link to="/work" className="w-full sm:w-auto">
            <motion.button
              className="px-9 py-4 w-full border border-[#3a3a3a] text-white rounded-full font-semibold text-base hover:bg-[#1a1a1a] transition-all"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View Our Work
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#1e1e1e] pt-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-orange">
                {stat.staticText ? (
                  <span>{stat.staticText}</span>
                ) : (
                  <Counter to={stat.to} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-sm text-[#6b7280] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
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
  )
}
