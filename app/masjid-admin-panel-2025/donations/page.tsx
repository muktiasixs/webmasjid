'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Heart, Target, Calendar } from 'lucide-react'

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

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations')
      if (response.ok) {
        const data = await response.json()
        setDonations(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch donations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus program donasi ini?')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/donations/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDonations(donations.filter(donation => donation.id !== id))
      } else {
        alert('Gagal menghapus program donasi')
      }
    } catch (error) {
      console.error('Failed to delete donation:', error)
      alert('Gagal menghapus program donasi')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/donations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (response.ok) {
        const updatedDonation = await response.json()
        setDonations(donations.map(donation => 
          donation.id === id ? updatedDonation.data : donation
        ))
      } else {
        alert('Gagal mengubah status program donasi')
      }
    } catch (error) {
      console.error('Failed to toggle donation status:', error)
      alert('Gagal mengubah status program donasi')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      renovasi: 'bg-blue-100 text-blue-800',
      pendidikan: 'bg-green-100 text-green-800',
      sosial: 'bg-purple-100 text-purple-800',
      umum: 'bg-gray-100 text-gray-800',
      default: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || colors.default
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Donasi & Infaq</h1>
            <p className="text-gray-600">Atur semua program donasi dan infaq masjid</p>
          </div>
          <Link
            href="/masjid-admin-panel-2025/donations/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Program Donasi
          </Link>
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada program donasi</h3>
          <p className="text-gray-600 mb-4">Mulai dengan membuat program donasi pertama</p>
          <Link
            href="/masjid-admin-panel-2025/donations/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Program Donasi
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {donations.map((donation) => (
            <div key={donation.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex-1 sm:pr-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {donation.title}
                        </h3>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(donation.category)}`}>
                          {donation.category}
                        </span>
                        <button
                          onClick={() => handleToggleActive(donation.id, donation.isActive)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            donation.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {donation.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {donation.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Target className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>Target: {formatCurrency(donation.targetAmount)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Heart className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>Terkumpul: {formatCurrency(donation.currentAmount)}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Batas: {formatDate(donation.deadline)}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(getProgressPercentage(donation.currentAmount, donation.targetAmount))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${getProgressPercentage(donation.currentAmount, donation.targetAmount)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-4">
                    <Link
                      href={`/masjid-admin-panel-2025/donations/${donation.id}/edit`}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(donation.id)}
                      disabled={deletingId === donation.id}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}