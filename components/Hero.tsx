'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Hero() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      id="beranda"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/mosque-hero.jpg"
          alt="Masjid Al-Ikhlas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-pattern"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-heading font-semibold text-white leading-tight"
          >
            Selamat Datang di{' '}
            <span className="text-accent-400">Masjid Al-Ikhlas</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto leading-relaxed"
          >
            Pusat Iman, Komunitas, dan Ilmu Pengetahuan di Rawabadak Utara, Koja
          </motion.p>

          {/* Quranic Verse */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto border border-white/20"
          >
            <p className="text-2xl md:text-3xl font-heading text-accent-400 mb-3 leading-relaxed">
              "وَجَعَلْنِي رَبِّ مُصَلِّيًا"
            </p>
            <p className="text-base md:text-lg text-neutral-200 italic">
              "Dan jadikanlah aku orang yang melaksanakan salat"
            </p>
            <p className="text-sm text-neutral-300 mt-2">
              (QS. Maryam: 31)
            </p>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <button
              onClick={() => {
                const element = document.querySelector('#waktu-sholat')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus-ring"
            >
              Lihat Waktu Sholat
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#tentang')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 focus-ring"
            >
              Tentang Kami
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white/70 text-sm">Scroll ke bawah</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-12 h-12 border border-white/20 rounded-full hidden lg:block"
      />
    </section>
  )
}