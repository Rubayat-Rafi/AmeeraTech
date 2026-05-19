import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'POS Systems',
    desc: 'Modern Point of Sale solutions for retail & restaurants — inventory, sales tracking, and seamless checkout.',
    features: ['Cloud-based syncing', 'Real-time analytics', 'Multi-store support'],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Websites & Web Apps',
    desc: 'Stunning, high-performance websites and complex web applications built with modern frameworks.',
    features: ['Responsive Design', 'SEO Optimized', 'CMS Integration'],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile Apps',
    desc: 'Native and cross-platform mobile apps for iOS & Android with engaging user experiences.',
    features: ['iOS & Android', 'Cross-platform', 'App Store Deployment'],
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
