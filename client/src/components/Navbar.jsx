import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  
  const links = ['Services', 'Work', 'About', 'Contact']

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        {/* Desktop Pill Navigation */}
        <div className={`hidden md:flex justify-center w-full transition-all duration-500 ${scrolled ? 'mt-4' : 'mt-6'}`}>
          <div 
            className={`pointer-events-auto flex items-center gap-6 px-4 py-2.5 rounded-full border transition-all duration-500 ${
              scrolled 
                ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-[#333] shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
                : 'bg-[#1a1a1a]/60 backdrop-blur-md border-[#2a2a2a] shadow-lg'
            }`}
          >
            {/* Logo inside the pill */}
            <Link to="/">
              <motion.div
                className="text-xl font-bold text-gradient-orange tracking-tight cursor-pointer pl-4 font-display"
                whileHover={{ scale: 1.05 }}
              >
                AmeeraTech<span style={{ color: 'white' }}>.</span>
              </motion.div>
            </Link>

            {/* Links inside the pill */}
            <div className="flex items-center gap-8 px-6 border-l border-[#3a3a3a] ml-2 font-display">
              {links.map((link) => {
                const path = `/${link.toLowerCase()}`
                const isActive = pathname === path
                return (
                  <Link key={link} to={path}>
                    <motion.div
                      className={`text-sm font-medium transition-colors relative group ${isActive ? 'text-orange-400' : 'text-[#9ca3af] hover:text-white'}`}
                      whileHover={{ y: -1 }}
                    >
                      {link}
                      <span className={`absolute -bottom-1 left-0 h-px bg-gradient-orange transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Button inside the pill */}
            <Link to="/contact">
              <motion.button
                className="px-6 py-2.5 bg-gradient-orange text-white rounded-full text-sm font-semibold shadow-glow hover:opacity-90 transition-all font-display"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Building
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className={`md:hidden pointer-events-auto flex items-center justify-between px-6 transition-all duration-500 ${scrolled ? 'py-4 bg-[#050505]/95 backdrop-blur-xl border-b border-[#1a1a1a]' : 'py-6 bg-transparent'}`}>
          <Link to="/">
            <motion.div
              className="text-2xl font-bold text-gradient-orange tracking-tight cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              AmeeraTech<span style={{ color: 'white' }}>.</span>
            </motion.div>
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 flex flex-col justify-center items-center gap-1.5 bg-[#1a1a1a]/80 backdrop-blur-md rounded-full border border-[#2a2a2a] z-50 relative"
          >
            <span className={`w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl md:hidden pt-32 px-6"
          >
            <div className="flex flex-col gap-6">
              {links.map((link) => {
                const path = `/${link.toLowerCase()}`
                const isActive = pathname === path
                return (
                  <Link 
                    key={link} 
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-3xl font-bold border-b border-[#1a1a1a] pb-6 transition-colors ${isActive ? 'text-orange-400' : 'text-white'}`}
                  >
                    {link}
                  </Link>
                )
              })}
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                <button className="mt-8 w-full px-6 py-4 bg-gradient-orange text-white rounded-full text-lg font-semibold shadow-glow">
                  Start Building
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
