import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'We learn your business inside-out — workflows, pain points, goals, and constraints — before a single line of code is written.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design & Plan',
    desc: 'We map out every screen, data model, and API. You see the full blueprint and approve it before we start building.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build & Test',
    desc: 'Iterative development with demos every week. Every feature is tested and refined before it ships — no surprises at launch.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch & Support',
    desc: "We deploy, monitor, and maintain your product. As your business grows, we grow the software with it — permanently in your corner.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-[#070707] relative overflow-hidden">
      {/* Subtle top divider gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-5">
            How We Work
          </span>
          <h2 className="text-xl md:text-3xl font-bold mb-4 text-white">
            From Idea to{' '}
            <span className="text-gradient-orange italic-serif font-normal">Live Product</span>
          </h2>
          <p className="text-[#9ca3af] max-w-xl mx-auto text-sm md:text-base">
            A clear, transparent process — so you always know what's happening, what's next, and what it costs.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500/40 via-orange-500/20 to-orange-500/40"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step circle */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-2xl bg-[#0f0f0f] border border-[#252525] flex items-center justify-center text-[#555] relative z-10 group-hover:border-orange-500/40 group-hover:text-orange-400 transition-all duration-300"
                    whileHover={{ scale: 1.08 }}
                  >
                    {step.icon}
                  </motion.div>
                  {/* Number badge */}
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-gradient-orange rounded-full flex items-center justify-center shadow-glow z-20">
                    <span className="text-white text-[10px] font-bold">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed max-w-[220px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-[#6b7280] text-sm">
            Typical project timeline:{' '}
            <span className="text-white font-medium">2 – 8 weeks</span>
            {' '}depending on scope.{' '}
            <a href="/contact" className="text-orange-400 hover:text-orange-300 transition-colors">
              Get a free estimate →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
