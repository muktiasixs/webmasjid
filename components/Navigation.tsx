'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Beranda', href: '#beranda' },
  { name: 'Waktu Sholat', href: '#waktu-sholat' },
  { name: 'Tentang', href: '#tentang' },
  { name: 'Kegiatan', href: '#kegiatan' },
  { name: 'Donasi', href: '#donasi' },
  { name: 'Kontak', href: '#kontak' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const navbarHeight = 80
      const targetPosition = element.offsetTop - navbarHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="#beranda" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7V11C2 16.55 6.84 21.74 12 23C17.16 21.74 22 16.55 22 11V7L12 2Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-semibold text-neutral-900">
                Masjid Al-Ikhlas
              </h1>
              <p className="text-xs text-neutral-600">Rawabadak Utara, Koja</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200 focus-ring rounded-lg"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-700 hover:text-primary-600 focus-ring p-2"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white border-t border-neutral-200 overflow-hidden"
      >
        <div className="px-4 py-6 space-y-4">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-neutral-700 hover:text-primary-600 py-2 text-base font-medium focus-ring rounded-lg px-2"
            >
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}