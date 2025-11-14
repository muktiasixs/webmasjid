'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Sholat Berjamaah',
    description: 'Menyediakan fasilitas lengkap untuk kelima salat wajib dengan imam yang berpengalaman.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Kajian Rutin',
    description: 'Program kajian Al-Quran, hadits, dan ilmu pengetahuan Islam setiap minggu.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Kegiatan Sosial',
    description: 'Program bakti sosial, santunan yatim, dan Gerakan help ummat.',
  },
]

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="tentang" className="py-20 bg-neutral-50 bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-neutral-900 mb-6">
            Tentang Masjid Al-Ikhlas
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Kami adalah komunitas Muslim yang berkomitmen untuk membina ummat melalui ibadah, 
            pendidikan, dan kegiatan sosial di wilayah Rawabadak Utara, Koja, Jakarta Utara.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl blur opacity-25"></div>
              <img
                src="/images/mosque-interior.jpg"
                alt="Interior Masjid Al-Ikhlas"
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div>
              <h3 className="text-3xl font-heading font-semibold text-neutral-900 mb-4">
                Sejarah & Visi
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Masjid Al-Ikhlas didirikan pada tahun 1987 oleh sekelompok tokoк masyarakat Muslim 
                yang bercita-cita untuk menyediakan pusat ibadah yang nyaman dan berkualitas di 
                kawasan Rawabadak Utara, Koja.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Visi kami adalah menjadi pusat pembelajaran Islam yang unggulan, membina ummat 
                Muslim yang berilmu, beriman, dan berakhlak mulia, serta berkontribusi positif 
                bagi kemajuan masyarakat.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex-shrink-0 text-primary-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '36', label: 'Tahun Berdiri', suffix: '+' },
            { number: '500', label: 'Jamaah', suffix: '+' },
            { number: '50', label: 'Pengurus', suffix: '' },
            { number: '12', label: 'Program Bulanan', suffix: '+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-neutral-600 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
            Misi Kami
          </h3>
          <p className="text-lg md:text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
            "Membangun ummat Muslim yang beriman, berilmu, dan berakhlak mulia melalui 
            program-program berkualitas dalam bidang ibadah, pendidikan, dan sosial kemasyarakatan."
          </p>
        </motion.div>
      </div>
    </section>
  )
}