import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Data Powered Solutions',
    desc: 'Extract deep, actionable insights from raw data. We build intelligence systems that power smarter decisions and unlock business acceleration.',
    features: ['Advanced Analytics Dashboards', 'Customer Behavior Mapping', 'Real-time Event Tracking'],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'Data Management',
    desc: 'Sleek, bulletproof data piping and cloud warehousing. We architect secure pipelines to store, clean, organize, and govern complex data sets.',
    features: ['Custom Data Pipelines', 'Cloud Data Warehousing', 'Data Cleansing & Integrity'],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI Powered Applications',
    desc: 'Inject cutting-edge intelligence into your systems. We deploy custom machine learning algorithms, NLP, and LLM automation systems built to scale.',
    features: ['Predictive Modeling Solutions', 'Generative AI & LLM APIs', 'Automated Decision Engines'],
  },
]

const CheckIcon = () => (
  <svg className="w-4 h-4 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="panel p-8 group relative overflow-hidden cursor-default"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Glow corner */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-bl-[80px] -mr-10 -mt-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        className="w-14 h-14 bg-gradient-orange rounded-xl mb-6 flex items-center justify-center text-white shadow-glow relative z-10"
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
      >
        {service.icon}
      </motion.div>

      <h3 className="text-2xl font-bold mb-3 text-white relative z-10">{service.title}</h3>
      <p className="text-[#9ca3af] leading-relaxed relative z-10 mb-6">{service.desc}</p>

      <ul className="space-y-2.5 relative z-10">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-[#8a919e]">
            <CheckIcon /> {f}
          </li>
        ))}
      </ul>

      <motion.button
        className="mt-8 text-sm font-semibold text-orange-400 flex items-center gap-1.5 group/btn relative z-10"
        whileHover={{ x: 4 }}
      >
        Learn more
        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-5">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Core <span className="text-gradient-orange italic-serif font-normal">Services</span>
          </h2>
          <p className="text-[#9ca3af] max-w-xl mx-auto text-lg">
            Comprehensive digital solutions tailored for your business growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
