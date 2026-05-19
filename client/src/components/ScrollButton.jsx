import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollButton() {
  const [scrollDirection, setScrollDirection] = useState('down')

  useEffect(() => {
    const handleScroll = () => {
      // If we scroll down past 300px, button points UP. Otherwise, DOWN.
      if (window.scrollY > 300) {
        setScrollDirection('up')
      } else {
        setScrollDirection('down')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const target = scrollDirection === 'up' ? 0 : document.body.scrollHeight
    
    if (window.lenis) {
      // Use Lenis for a beautifully slow, controlled scroll (2.5 seconds)
      window.lenis.scrollTo(target, { duration: 2.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      // Fallback
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-gradient-orange text-white rounded-full flex items-center justify-center shadow-glow border border-orange-400/50 backdrop-blur-md"
    >
      <motion.svg
        animate={{ rotate: scrollDirection === 'up' ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </motion.svg>
    </motion.button>
  )
}
