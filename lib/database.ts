import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true })
}

// Initialize database files if they don't exist
const initializeDatabase = () => {
  // Activities database
  const activitiesFile = path.join(dbPath, 'activities.json')
  if (!fs.existsSync(activitiesFile)) {
    fs.writeFileSync(activitiesFile, JSON.stringify([
      {
        id: 1,
        title: "Kajian Rutin Mingguan",
        description: "Kajian al-Quran dan hadist setiap hari Jumat",
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
        description: "Program pengajian untuk anak-anak usia 7-15 tahun",
        date: "2025-11-17",
        time: "16:00",
        location: "Ruang Kelas Masjid Al-Ikhlas",
        category: "pendidikan",
        image: "/images/anak.jpg",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ], null, 2))
  }

  // Donations database
  const donationsFile = path.join(dbPath, 'donations.json')
  if (!fs.existsSync(donationsFile)) {
    fs.writeFileSync(donationsFile, JSON.stringify([
      {
        id: 1,
        title: "Program Renovasi Masjid",
        description: "Dana untuk renovasi dan perbaikan masjid",
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
        description: "Beasiswa untuk anak hafidz 30 juz",
        targetAmount: 30000000,
        currentAmount: 18000000,
        deadline: "2026-06-30",
        category: "pendidikan",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ], null, 2))
  }
}

initializeDatabase()

export interface Activity {
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

export interface Donation {
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

// Generic database operations
export class Database<T> {
  private filePath: string

  constructor(fileName: string) {
    this.filePath = path.join(dbPath, fileName)
  }

  read(): T[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      console.error(`Error reading ${this.filePath}:`, error)
      return []
    }
  }

  write(data: T[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error(`Error writing ${this.filePath}:`, error)
    }
  }

  getAll(): T[] {
    return this.read()
  }

  getById(id: number): T | undefined {
    const data = this.read()
    return data.find((item: any) => item.id === id)
  }

  create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const data = this.read()
    const newId = data.length > 0 ? Math.max(...data.map((item: any) => item.id)) + 1 : 1
    
    const newItem = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as T

    data.push(newItem)
    this.write(data)
    return newItem
  }

  update(id: number, updates: Partial<Omit<T, 'id' | 'createdAt'>>): T | null {
    const data = this.read()
    const index = data.findIndex((item: any) => item.id === id)
    
    if (index === -1) return null

    data[index] = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    this.write(data)
    return data[index]
  }

  delete(id: number): boolean {
    const data = this.read()
    const index = data.findIndex((item: any) => item.id === id)
    
    if (index === -1) return false

    data.splice(index, 1)
    this.write(data)
    return true
  }
}

// Create instances for activities and donations
export const activitiesDB = new Database<Activity>('activities.json')
export const donationsDB = new Database<Donation>('donations.json')