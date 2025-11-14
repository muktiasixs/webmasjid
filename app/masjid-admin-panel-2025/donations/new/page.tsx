'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Heart, Target, Calendar, Tag } from 'lucide-react'

export default function NewDonationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'umum',
    isActive: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          targetAmount: parseInt(formData.targetAmount),
          currentAmount: parseInt(formData.currentAmount) || 0
        }),
      })

      if (response.ok) {
        router.push('/masjid-admin-panel-2025/donations')
      } else {
        const error = await response.json()
        alert(`Gagal menambah program donasi: ${error.error}`)
      }
    } catch (error) {
      console.error('Failed to create donation:', error)
      alert('Terjadi kesalahan saat menambah program donasi')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/masjid-admin-panel-2025/donations"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Donasi
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Tambah Program Donasi Baru</h1>
        <p className="text-gray-600">Buat program donasi atau infaq baru untuk masjid</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Judul Program *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Contoh: Program Renovasi Masjid"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Jelaskan detail program donasi..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
                <Target className="inline h-4 w-4 mr-1" />
                Target Amount (Rp) *
              </label>
              <input
                type="number"
                id="targetAmount"
                name="targetAmount"
                required
                value={formData.targetAmount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="50000000"
              />
            </div>

            <div>
              <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                <Heart className="inline h-4 w-4 mr-1" />
                Amount Terkumpul (Rp)
              </label>
              <input
                type="number"
                id="currentAmount"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              Batas Waktu *
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              required
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              <Tag className="inline h-4 w-4 mr-1" />
              Kategori
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="umum">Umum</option>
              <option value="renovasi">Renovasi</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="sosial">Sosial</option>
            </select>
          </div>

          <div>
            <div className="flex items-center">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Program aktif
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Centang jika program donasi ini sedang berjalan dan dapat menerima donasi
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href="/masjid-admin-panel-2025/donations"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Program Donasi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}