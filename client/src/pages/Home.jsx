import Hero from '../components/Hero'
import Services from '../components/Services'
import Process from '../components/Process'
import Work from '../components/Work'
import CTA from '../components/CTA'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="pt-0">
      <Hero />
      <Services />
      <Process />
      <Work />
      <CTA />
      <WhyUs />
      <Testimonials />
      <Contact />
    </div>
  )
}
