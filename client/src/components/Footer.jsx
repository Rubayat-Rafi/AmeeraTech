import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const footerLinks = {
  Services: [
    { label: 'POS Systems', path: '/services' },
    { label: 'Web Development', path: '/services' },
    { label: 'Mobile Apps', path: '/services' },
    { label: 'UI/UX Design', path: '/services' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Work', path: '/work' },
    { label: 'Contact', path: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#141414] bg-[#050505] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <Link to="/">
              <div className="text-2xl font-bold text-gradient-orange mb-4 cursor-pointer inline-block">
                AmeeraTech<span style={{ color: 'white' }}>.</span>
              </div>
            </Link>
            <p className="text-[#666] max-w-sm leading-relaxed mb-6">
              Transforming ideas into exceptional digital products. POS systems, websites, and mobile apps — built to last.
            </p>
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'github'].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center text-[#666] hover:text-orange-400 hover:border-orange-500/40 transition-colors"
                  whileHover={{ y: -2, scale: 1.1 }}
                >
                  <span className="text-xs capitalize">{s[0].toUpperCase()}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>
                      <motion.div
                        className="text-[#666] text-sm hover:text-orange-400 transition-colors inline-block"
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#141414] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#555]">
          <p>© 2026 AmeeraTech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
