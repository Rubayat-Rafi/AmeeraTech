import { useEffect } from 'react'
import Work from '../components/Work'

export default function WorkPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="pt-32 min-h-screen">
      <Work />
    </div>
  )
}
