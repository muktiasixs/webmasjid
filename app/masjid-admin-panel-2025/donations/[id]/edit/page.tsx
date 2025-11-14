'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Target, Calendar, DollarSign } from 'lucide-react'

interface Donation {
  id: number
  title: string
  description: string
  goalAmount: number
  currentAmount: number
  deadline: string
  isActive: boolean
  category: string
}

export default function EditDonationPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [formData, setFormData] = useState<Donation>({
    id: 0,
    title: '',
    description: '',
    goalAmount: 0,
    currentAmount: 0,
    deadline: '',
    isActive: true,
    category: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDonation()
  }, [params.id])

  const fetchDonation = async () => {
    try {
      const response = await fetch(`/api/donations/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch donation')
      }
      const data = await response.json()
      setFormData(data)
    } catch (err) {
      setError('Gagal memuat data donasi')
      console.error('Error fetching donation:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/donations/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update donation')
      }

      router.push('/masjid-admin-panel-2025/donations')
    } catch (err) {
      setError('Gagal memperbarui program donasi')
      console.error('Error updating donation:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? Number(value) : value
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const progressPercentage = formData.goalAmount > 0 
    ? Math.round((formData.currentAmount / formData.goalAmount) * 100)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/masjid-admin-panel-2025/donations"
          className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium mb-2"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Daftar Donasi
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Program Donasi</h1>
        <p className="text-gray-600">Perbarui informasi program donasi/infaq</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Program *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Contoh: Renovasi Masjid, Beasiswa Hafidz, dll"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Jelaskan tujuan dan manfaat program donasi ini..."
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Pilih kategori</option>
                <option value="renovation">Renovasi Masjid</option>
                <option value="education">Pendidikan</option>
                <option value="scholarship">Beasiswa</option>
                <option value="social">Kemasyarakatan</option>
                <option value="charity">Bantuan Sosial</option>
                <option value="orphans">Bantuan Yatim</option>
                <option value="infrastructure">Infrastruktur</option>
                <option value="facilities">Fasilitas</option>
                <option value="other">Lainnya</option>
              </select>
            </div>

            {/* Amount Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Target Donasi (Rp) *
                </label>
                <input
                  type="number"
                  id="goalAmount"
                  name="goalAmount"
                  required
                  min="0"
                  step="1000"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="100000000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Target: {formatCurrency(formData.goalAmount)}
                </p>
              </div>

              <div>
                <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Donasi Terkumpul (Rp) *
                </label>
                <input
                  type="number"
                  id="currentAmount"
                  name="currentAmount"
                  required
                  min="0"
                  step="1000"
                  value={formData.currentAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="50000000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Terkumpul: {formatCurrency(formData.currentAmount)} ({progressPercentage}%)
                </p>
              </div>
            </div>

            {/* Progress Bar Preview */}
            {formData.goalAmount > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview Progress
                </label>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-red-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {progressPercentage}% dari target tercapai
                </p>
              </div>
            )}

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Batas Waktu
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Kosongkan jika tidak ada batas waktu
              </p>
            </div>

            {/* Is Active Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Program donasi aktif (tampil di website)
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              href="/masjid-admin-panel-2025/donations"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Menyimpan...' : 'Perbarui Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}