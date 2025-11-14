'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Moon, Clock } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const RamadanCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Calculate next Ramadan (2025-03-01 - approximate start date)
  const ramadanStartDate = new Date('2025-03-01T18:00:00')
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = ramadanStartDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        // If Ramadan has started, show countdown to next Ramadan
        const nextRamadan = new Date('2026-02-18T18:00:00')
        const distance = nextRamadan.getTime() - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm text-gray-200 uppercase tracking-wide">
        {label}
      </div>
    </div>
  )

  return (
    <section className="py-16 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Moon className="w-8 h-8 text-yellow-300 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Hitung Mundur Ramadan
            </h2>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Menyongsong bulan suci Ramadan yang penuh berkah dan rahmat
          </p>
        </div>

        <div ref={ref} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <TimeUnit value={timeLeft.days} label="Hari" />
            <TimeUnit value={timeLeft.hours} label="Jam" />
            <TimeUnit value={timeLeft.minutes} label="Menit" />
            <TimeUnit value={timeLeft.seconds} label="Detik" />
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Calendar className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Ramadan 1446 H
              </h3>
              <p className="text-gray-200 mb-4">
                "Bulan Ramadan yang dalamnya diturunkan Al-Qur'an, sebagai petunjuk bagi manusia dan penjelasan-penjelasan mengenai petunjuk itu dan Firqan (pembeda antara yang hak dan yang bathil)"
              </p>
              <div className="text-sm text-gray-300">
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Perkiraan berdasarkan kalender Hijriyah</span>
                </div>
              </div>
            </div>
          </div>

          {/* Islamic Pattern */}
          <div className="text-center mt-8">
            <div className="text-4xl text-yellow-300/30 font-arabic">
              بارك الله فيكم
            </div>
            <p className="text-gray-200 mt-2 italic">
              "Barakallahu fikum" - Semoga Allah memberkati kalian
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RamadanCountdown