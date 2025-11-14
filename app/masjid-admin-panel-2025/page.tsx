'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Heart, TrendingUp, Users } from 'lucide-react'

interface DashboardStats {
  totalActivities: number
  activeDonations: number
  totalDonations: number
  upcomingEvents: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalActivities: 0,
    activeDonations: 0,
    totalDonations: 0,
    upcomingEvents: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch activities
      const activitiesRes = await fetch('/api/activities')
      const activities = activitiesRes.ok ? (await activitiesRes.json()).data : []

      // Fetch donations
      const donationsRes = await fetch('/api/donations')
      const donations = donationsRes.ok ? (await donationsRes.json()).data : []

      // Calculate stats
      const totalActivities = activities.length
      const activeDonations = donations.filter((d: any) => d.isActive).length
      const totalDonations = donations.reduce((sum: number, d: any) => sum + d.currentAmount, 0)
      
      // Count upcoming events (next 7 days)
      const now = new Date()
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      const upcomingEvents = activities.filter((activity: any) => {
        const activityDate = new Date(activity.date)
        return activityDate >= now && activityDate <= nextWeek
      }).length

      setStats({
        totalActivities,
        activeDonations,
        totalDonations,
        upcomingEvents,
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600">Kelola kegiatan dan donasi Masjid Al-Ikhlas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-teal-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Kegiatan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Donasi Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeDonations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Donasi</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalDonations)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Event Mendatang</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/masjid-admin-panel-2025/activities/new"
              className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-teal-600" />
                <div>
                  <p className="font-medium text-gray-900">Tambah Kegiatan Baru</p>
                  <p className="text-sm text-gray-600">Buat kegiatan atau acara baru</p>
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/masjid-admin-panel-2025/donations/new"
              className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Heart className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Tambah Program Donasi</p>
                  <p className="text-sm text-gray-600">Buat program donasi/infaq baru</p>
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <Link href="/masjid-admin-panel-2025/activities" className="font-medium hover:text-teal-600">
                    Kelola kegiatan masjid
                  </Link>
                </p>
                <p className="text-sm text-gray-600">Lihat dan edit semua kegiatan</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <Link href="/masjid-admin-panel-2025/donations" className="font-medium hover:text-red-600">
                    Kelola program donasi
                  </Link>
                </p>
                <p className="text-sm text-gray-600">Atur program donasi dan infaq</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}