import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'Fast Execution',
    desc: 'Agile methodologies for rapid delivery without sacrificing quality or detail.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: 'Secure & Scalable',
    desc: 'Enterprise-grade security architecture that grows with your business needs.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'Dedicated Team',
    desc: 'Expert developers, designers, and strategists dedicated to your project\'s success.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    title: '24/7 Support',
    desc: 'Round-the-clock support to ensure your digital products run without interruption.',
  },
]

const bars = [
  { label: 'POS Systems', value: 75 },
  { label: 'Web Apps', value: 90 },
  { label: 'Mobile Apps', value: 65 },
  { label: 'UI/UX Design', value: 82 },
]

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 px-6 bg-[#070707] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-5">
              Why AmeeraTech
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Built for <span className="text-gradient-orange italic-serif font-normal">Growth</span> &amp; Excellence
            </h2>
            <p className="text-[#9ca3af] mb-10 text-lg leading-relaxed">
              We don't just build products — we build partnerships. Our holistic approach ensures your digital solution is beautiful, functional, and built to last.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0 text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                    <p className="text-sm text-[#8a919e] leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — mock dashboard */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-orange opacity-10 blur-[80px] rounded-full pointer-events-none" />
            <div className="panel border border-[#2a2a2a] bg-[#0c0c0c] relative z-10 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 p-4 border-b border-[#1e1e1e] bg-[#111]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-3 text-xs text-[#555] font-mono">ameeratech.dashboard — live</div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-500">Connected</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-xs text-[#666] mb-1 uppercase tracking-wider">Total Revenue</div>
                    <motion.div
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      $124,563<span className="text-base text-[#666]">.00</span>
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +14.5%
                  </div>
                </div>

                <div className="space-y-5">
                  {bars.map((bar, i) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-[#666] mb-1.5">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-orange rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${bar.value}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[['48', 'Active Projects'], ['98%', 'Satisfaction'], ['< 24h', 'Response']].map(([v, l]) => (
                    <div key={l} className="bg-[#151515] rounded-lg p-3 text-center border border-[#222]">
                      <div className="text-lg font-bold text-orange-400">{v}</div>
                      <div className="text-xs text-[#666] mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
