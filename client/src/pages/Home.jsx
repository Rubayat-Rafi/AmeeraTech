import Hero from '../components/Hero'
import Services from '../components/Services'
import Work from '../components/Work'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="pt-0">
      <Hero />
      <Services />
      <Work />
      <WhyUs />
      <Testimonials />
      <Contact />
    </div>
  )
}
