import Hero from '@/components/Hero'
import RamadanCountdown from '@/components/RamadanCountdown'
import PrayerTimes from '@/components/PrayerTimes'
import About from '@/components/About'
import Events from '@/components/Events'
import Donation from '@/components/Donation'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <RamadanCountdown />
      <PrayerTimes />
      <About />
      <Events />
      <Donation />
      <Contact />
    </>
  )
}