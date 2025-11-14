'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Activity {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image?: string
  createdAt: string
  updatedAt: string
}

const categoryColors: { [key: string]: string } = {
  'kajian': 'bg-primary-100 text-primary-800',
  'pendidikan': 'bg-accent-100 text-accent-800',
  'sosial': 'bg-neutral-100 text-neutral-800',
  'ibadah': 'bg-primary-600 text-white',
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return date.toLocaleDateString('id-ID')
  } else if (diffDays === 0) {
    return 'Hari ini'
  } else if (diffDays === 1) {
    return 'Besok'
  } else if (diffDays <= 7) {
    return `${diffDays} hari lagi`
  } else {
    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }
}

export default function Events() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities')
      if (response.ok) {
        const data = await response.json()
        setActivities(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setLoading(false)
    }
  }

  // Default events if API fails or no data
  const defaultEvents = [
    {
      id: 1,
      title: 'Kajian Rutin Mingguan',
      description: 'Kajian al-Quran dan hadist setiap hari Jumat',
      date: '2025-11-15',
      time: '19:00',
      location: 'Balai Pengajian Masjid Al-Ikhlas',
      category: 'kajian'
    }
  ]

  const eventsToShow = activities.length > 0 ? activities : defaultEvents

  if (loading) {
    return (
      <section id="kegiatan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="kegiatan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-neutral-900 mb-6">
            Kegiatan & Pengumuman
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Ikuti berbagai kegiatan dan program kami untuk mengembangkan spiritualitas dan wawasan Islam Anda.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {eventsToShow.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image || '/images/default-event.jpg'}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/default-event.jpg'
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    categoryColors[event.category] || 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Baru
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-neutral-600">
                    <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 focus-ring">
                  Info Selengkapnya
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-6 text-center">
            Pengumuman Penting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Perubahan Jadwal Sholat</h4>
                  <p className="text-sm text-neutral-600">
                    Tanggal 15-20 November 2025, waktu salat berubah 5 menit lebih awal karena invierno.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Khusus pemuda</h4>
                  <p className="text-sm text-neutral-600">
                    Rangkaian kegiatan pemuda - kajian berani, olahraga sehat, dan sholawatan massal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-4">
            Ingin tahu kegiatan terbaru atau ingin mengirim pengumuman?
          </p>
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus-ring">
            Hubungi Secretario
          </button>
        </motion.div>
      </div>
    </section>
  )
}