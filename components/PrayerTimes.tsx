'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const prayerTimes = [
  {
    name: 'Subuh',
    time: '04:45',
    icon: (
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-primary-600 text-lg font-bold">🌅</span>
      </div>
    ),
  },
  {
    name: 'Dzuhur',
    time: '12:15',
    icon: (
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-primary-600 text-lg font-bold">☀️</span>
      </div>
    ),
  },
  {
    name: 'Ashar',
    time: '15:30',
    icon: (
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-primary-600 text-lg font-bold">🌇</span>
      </div>
    ),
  },
  {
    name: 'Maghrib',
    time: '18:10',
    icon: (
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-primary-600 text-lg font-bold">🌆</span>
      </div>
    ),
  },
  {
    name: 'Isya',
    time: '19:30',
    icon: (
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-primary-600 text-lg font-bold">🌙</span>
      </div>
    ),
  },
]

export default function PrayerTimes() {
  const [currentDate, setCurrentDate] = useState('')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    setCurrentDate(today.toLocaleDateString('id-ID', options))
  }, [])

  return (
    <section id="waktu-sholat" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-neutral-900 mb-4">
            Jadwal Waktu Sholat
          </h2>
          <p className="text-xl text-neutral-600 mb-2">{currentDate}</p>
          <p className="text-lg text-neutral-500">Rawabadak Utara, Koja, Jakarta Utara</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {prayerTimes.map((prayer, index) => (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
                    {/* Icon */}
                    <div className="text-primary-600 mb-4 flex justify-center">
                      {prayer.icon}
                    </div>
                    
                    {/* Prayer Name */}
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 uppercase tracking-wide">
                      {prayer.name}
                    </h3>
                    
                    {/* Prayer Time */}
                    <div className="text-3xl font-heading font-bold text-primary-700">
                      {prayer.time}
                    </div>
                    
                    {/* Divider for larger screens */}
                    {index < prayerTimes.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-px h-16 bg-neutral-200" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Bottom Info */}
          <div className="bg-primary-600 text-white px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                <span>Waktu berdasarkan metode ISNA (Indonesia)</span>
              </div>
              <div>
                <span>Diperbarui otomatis setiap hari</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informasi Sholat
            </h4>
            <ul className="text-sm text-neutral-600 space-y-1">
              <li>• Sholat berjamaah dimulai 10 menit sebelum waktu utama</li>
              <li>• KhutbahDzuhur dan Ashar pada hari Jumat</li>
              <li>• Imam Shift bergilir setiap minggu</li>
            </ul>
          </div>
          
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lokasi Masjid
            </h4>
            <p className="text-sm text-neutral-600 mb-2">
              Jl. Janur Kuning No.1, RT.5/RW.10<br />
              Rawabadak Utara, Kec. Koja, Jkt Utara 14230
            </p>
            <p className="text-xs text-neutral-500">
              Berada di kompleks perumahan Rawabadak, mudah diakses dengan kendaraan umum
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}