import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import { useEffect } from 'react'

export default function AboutPage() {

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="pt-32 min-h-screen">
      <WhyUs />
      <Testimonials />
    </div>
  )
}
