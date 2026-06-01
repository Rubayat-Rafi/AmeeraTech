import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-[#0c0c0c]" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/12 via-transparent to-blue-600/8" />
          <div className="absolute inset-0 border border-orange-500/20 rounded-3xl pointer-events-none" />

          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

          {/* Top decorative line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left text */}
            <div className="text-center md:text-left max-w-xl">
              <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-5">
                Let's Build Together
              </span>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                Got a Product Idea?{' '}
                <span className="text-gradient-orange italic-serif font-normal">Let's Build It.</span>
              </h2>
              <p className="text-[#9ca3af] text-sm md:text-base leading-relaxed">
                Tell us what your business needs. We'll design, build, and launch a custom digital product — on time, on budget, and built to last.
              </p>
            </div>

            {/* Right CTAs */}
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link to="/contact">
                <motion.button
                  className="w-full px-10 py-4 bg-gradient-orange text-white rounded-full font-bold text-base shadow-glow flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Your Project
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </Link>
              <Link to="/work">
                <motion.button
                  className="w-full px-10 py-4 border border-[#3a3a3a] text-white rounded-full font-semibold text-base hover:bg-white/5 hover:border-[#555] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See Our Work First
                </motion.button>
              </Link>

              {/* Response time reassurance */}
              <p className="text-center text-[#555] text-xs mt-1">
                <svg className="w-3.5 h-3.5 inline-block mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                We respond within 24 hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
