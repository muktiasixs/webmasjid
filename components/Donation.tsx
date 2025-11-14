'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

interface Donation {
  id: number
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const donationMethods = [
  {
    id: 'bank',
    name: 'Transfer Bank',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    details: {
      bank: 'Bank Syria Indonesia (BSI)',
      number: '1234567890',
      name: 'Masjid Al-Ikhlas',
    },
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    details: {
      banks: ['GoPay', 'Dana', 'OVO'],
      number: '0812-3456-7890',
      name: 'Masjid Al-Ikhlas',
    },
  },
  {
    id: 'direct',
    name: 'Ke Masjid',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    details: {
      location: 'Masjid Al-Ikhlas',
      address: 'Jl. Masjid Al-Ikhlas No. 45, Rawabadak Utara, Koja, Jakarta Utara',
      hours: 'Setiap hari, 04:00 - 22:00',
    },
  },
]

// Remove donationPrograms - will fetch from API

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function Donation() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [totalDonations, setTotalDonations] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedMethod, setSelectedMethod] = useState<string>('bank')

  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations')
      if (response.ok) {
        const data = await response.json()
        setDonations(data.data.filter((d: Donation) => d.isActive))
        
        // Calculate total donations
        const total = data.data
          .filter((d: Donation) => d.isActive)
          .reduce((sum: number, d: Donation) => sum + d.currentAmount, 0)
        setTotalDonations(total)
      }
    } catch (error) {
      console.error('Failed to fetch donations:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedMethodData = donationMethods.find(method => method.id === selectedMethod)

  return (
    <section id="donasi" className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6">
            Infaq & Sedekah
          </h2>
          <p className="text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
            Bantu kami memakmurkan masjid dan menjalankan program-program kebaikan untuk ummat. 
            Setiap kontribusi Anda sangat berarti.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Donation Methods & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Quranic Quote */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <blockquote className="text-center">
                <p className="text-2xl md:text-3xl font-heading text-accent-400 mb-4 leading-relaxed">
                  "مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً"
                </p>
                <cite className="text-lg text-neutral-200 italic">
                  "Siapa yang mau meminjamkan kepada Allah pinjaman yang baik, 
                  maka Allah akan melipatgandakan ganjaran untuknya dengan berlipat ganda"
                </cite>
                <p className="text-sm text-neutral-300 mt-3">
                  (QS. Al-Baqarah: 245)
                </p>
              </blockquote>
            </div>

            {/* Method Selection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-heading font-semibold mb-6 text-center">
                Pilih Metode Donasi
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {donationMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                      selectedMethod === method.id
                        ? 'bg-accent-500 text-white transform scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-neutral-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{method.name}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Method Details */}
              {selectedMethodData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 bg-white/10 rounded-lg"
                >
                  <div className="space-y-3">
                    {selectedMethodData.id === 'bank' && (
                      <div>
                        <p className="text-sm text-neutral-300 mb-2">Transfer ke:</p>
                        <p className="font-semibold">{selectedMethodData.details.bank}</p>
                        <p className="text-lg font-mono">{selectedMethodData.details.number}</p>
                        <p className="text-sm text-neutral-300">a.n. {selectedMethodData.details.name}</p>
                      </div>
                    )}
                    {selectedMethodData.id === 'ewallet' && (
                      <div>
                        <p className="text-sm text-neutral-300 mb-2">Transfer ke:</p>
                        <p className="font-semibold">E-Wallet ({selectedMethodData.details.banks.join(', ')})</p>
                        <p className="text-lg font-mono">{selectedMethodData.details.number}</p>
                        <p className="text-sm text-neutral-300">a.n. {selectedMethodData.details.name}</p>
                      </div>
                    )}
                    {selectedMethodData.id === 'direct' && (
                      <div>
                        <p className="text-sm text-neutral-300 mb-2">Kunjungi:</p>
                        <p className="font-semibold">{selectedMethodData.details.location}</p>
                        <p className="text-sm">{selectedMethodData.details.address}</p>
                        <p className="text-sm text-neutral-300">{selectedMethodData.details.hours}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Donation Programs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading font-semibold mb-6">
              Program Donasi Aktif
            </h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              </div>
            ) : donations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-300">Belum ada program donasi aktif</p>
              </div>
            ) : (
              donations.map((donation, index) => {
                const percentage = Math.min((donation.currentAmount / donation.targetAmount) * 100, 100)
                return (
                  <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <h4 className="text-lg font-semibold mb-2">{donation.title}</h4>
                    <p className="text-neutral-200 text-sm mb-4">{donation.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${percentage}%` } : {}}
                          transition={{ duration: 1, delay: 1 + index * 0.2 }}
                          className="h-full bg-gradient-to-r from-accent-400 to-accent-600 rounded-full"
                        />
                      </div>
                    </div>
                    
                    {/* Amount */}
                    <div className="text-sm text-neutral-300">
                      <p>
                        Terkumpul: {formatRupiah(donation.currentAmount)}
                      </p>
                      <p>
                        Target: {formatRupiah(donation.targetAmount)}
                      </p>
                    </div>
                  </motion.div>
                )
              })
            )}

            {/* Total Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-accent-500 rounded-xl p-6 text-center"
            >
              <h4 className="text-xl font-heading font-semibold mb-2">
                Total Donasi Terkumpul 2025
              </h4>
              <p className="text-3xl font-bold">
                {formatRupiah(totalDonations)}
              </p>
              <p className="text-sm text-neutral-200 mt-2">
                {donations.length} program donasi aktif
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16"
        >
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus-ring">
            Donasi Sekarang
          </button>
          <p className="text-neutral-300 mt-4 text-sm">
            Atau hubungi secretary: 0812-3456-7890
          </p>
        </motion.div>
      </div>
    </section>
  )
}