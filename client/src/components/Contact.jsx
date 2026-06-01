import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email Us',
    details: 'hello@ameeratech.com',
    desc: 'Our friendly team is here to help.'
  },
]

const INITIAL = { firstName: '', lastName: '', email: '', projectType: 'Website / Web App', details: '' }

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState(INITIAL)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-orange opacity-5 blur-[150px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-6 w-max">
              Connect With Us
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Let's Build Something <br/>
              <span className="text-gradient-orange italic-serif font-normal">Extraordinary</span>
            </h2>
            <p className="text-[#9ca3af] text-lg mb-12 max-w-md leading-relaxed">
              Whether you have a wild idea or a detailed spec, we'd love to hear about it. Drop us a message and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center text-[#888] group-hover:text-orange-400 group-hover:border-orange-500/30 group-hover:bg-orange-500/5 transition-all duration-300 shrink-0 shadow-lg">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">{info.title}</h4>
                    <p className="text-orange-400 font-medium mb-1">{info.details}</p>
                    <p className="text-[#666] text-sm">{info.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="panel p-8 md:p-10 backdrop-blur-2xl bg-[#0c0c0c]/80 border border-[#222] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-[#9ca3af] text-lg">Thank you for reaching out. We will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form className="relative z-10 flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#888] uppercase tracking-wider">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-orange-500 focus:bg-[#151515] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-orange-500 focus:bg-[#151515] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-orange-500 focus:bg-[#151515] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Project Type</label>
                    <div className="relative">
                      <select
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-white focus:outline-none focus:border-orange-500 focus:bg-[#151515] transition-all appearance-none cursor-pointer"
                      >
                        <option>Website / Web App</option>
                        <option>POS / Invoice System</option>
                        <option>Inventory Management System</option>
                        <option>Lead Generation Platform</option>
                        <option>Other Business System</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Project Details</label>
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your goals, timeline, and budget..."
                      required
                      className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-orange-500 focus:bg-[#151515] transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 px-8 py-4 bg-gradient-orange text-white rounded-xl font-bold text-lg shadow-glow flex items-center justify-center gap-2 group/btn disabled:opacity-60"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? 'Sending…' : 'Send Message'}
                    {!loading && (
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
