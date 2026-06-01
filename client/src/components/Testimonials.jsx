import { motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

const testimonials = [
  { name: 'Arif Hossain', role: 'Owner, Hossain Trading Co.', stars: 5, quote: '"AmeeraTech built our entire inventory and invoicing system from scratch. What used to take our team hours every day now takes minutes. The ROI was immediate."' },
  { name: 'Sarah Johnson', role: 'Founder, RetailPlus', stars: 5, quote: '"Professional, responsive, and incredibly talented. They transformed our retail operations with a custom POS system that fits exactly how we work."' },
  { name: 'Nadia Rahman', role: 'CEO, StyleHouse BD', stars: 5, quote: '"Their lead generation platform brought us 3x more qualified enquiries in the first month. We finally have a pipeline that fills itself — it changed how we do sales."' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <section id="testimonials" className="py-28 px-6 bg-[#070707] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(234,88,12,0.06), transparent)'
      }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-5">
            Client Stories
          </span>
          <h2 className="text-xl md:text-3xl font-bold mb-4 text-white">
            What Our <span className="text-gradient-orange italic-serif font-normal">Clients Say</span>
          </h2>
          <p className="text-[#9ca3af] max-w-xl mx-auto">
            Don't just take our word for it — hear directly from the businesses we've helped grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="panel p-8 relative overflow-hidden group"
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Quote mark */}
              <div className="text-6xl text-orange-500/20 font-serif leading-none mb-2 select-none">"</div>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <motion.span
                    key={j}
                    className="text-orange-400 text-lg"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + j * 0.05 + 0.4 }}
                  >★</motion.span>
                ))}
              </div>
              <p className="text-[#9ca3af] leading-relaxed mb-6 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-orange flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-[#6b7280]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
