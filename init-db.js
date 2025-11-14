const fs = require('fs')
const path = require('path')

const dbPath = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true })
}

// Activities database
const activitiesFile = path.join(dbPath, 'activities.json')
if (!fs.existsSync(activitiesFile)) {
  fs.writeFileSync(activitiesFile, JSON.stringify([
    {
      id: 1,
      title: "Kajian Rutin Mingguan",
      description: "Kajian al-Quran dan hadist setiap hari Jumat untuk menambah ilmu dan spiritualitas.",
      date: "2025-11-15",
      time: "19:00",
      location: "Balai Pengajian Masjid Al-Ikhlas",
      category: "kajian",
      image: "/images/kajian.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Pengajian Anak-Anak",
      description: "Program pengajian untuk anak-anak usia 7-15 tahun setiap Sabtu sore.",
      date: "2025-11-16",
      time: "16:00",
      location: "Ruang Kelas Masjid Al-Ikhlas",
      category: "pendidikan",
      image: "/images/anak.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Santunan Yatim & Dhuafa",
      description: "Program bakti sosial memberikan bantuan kepada anak yatim dan keluarga kurang mampu.",
      date: "2025-11-20",
      time: "08:00",
      location: "Halaman Masjid Al-Ikhlas",
      category: "sosial",
      image: "/images/santunan.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], null, 2))
  console.log('Activities database initialized')
}

// Donations database
const donationsFile = path.join(dbPath, 'donations.json')
if (!fs.existsSync(donationsFile)) {
  fs.writeFileSync(donationsFile, JSON.stringify([
    {
      id: 1,
      title: "Program Renovasi Masjid",
      description: "Dana untuk renovasi dan perbaikan masjid，包括 места wudhu dan toilet",
      targetAmount: 50000000,
      currentAmount: 32500000,
      deadline: "2025-12-31",
      category: "renovasi",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Beasiswa Hafidz Qur'an",
      description: "Beasiswa untuk anak hafidz 30 juz yang kurang mampu",
      targetAmount: 30000000,
      currentAmount: 18000000,
      deadline: "2026-06-30",
      category: "pendidikan",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Program Santunan Bulanan",
      description: "Santunan bulanan untuk janda dan yatim di sekitar kompleks",
      targetAmount: 24000000,
      currentAmount: 14400000,
      deadline: "2026-01-31",
      category: "sosial",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], null, 2))
  console.log('Donations database initialized')
}

console.log('Database initialization complete!')