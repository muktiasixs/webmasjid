'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react'

interface Activity {
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

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities')
      if (response.ok) {
        const data = await response.json()
        setActivities(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setActivities(activities.filter(activity => activity.id !== id))
      } else {
        alert('Gagal menghapus kegiatan')
      }
    } catch (error) {
      console.error('Failed to delete activity:', error)
      alert('Gagal menghapus kegiatan')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      kajian: 'bg-blue-100 text-blue-800',
      pendidikan: 'bg-green-100 text-green-800',
      sosial: 'bg-purple-100 text-purple-800',
      ibadah: 'bg-yellow-100 text-yellow-800',
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
            <h1 className="text-2xl font-bold text-gray-900">Kelola Kegiatan</h1>
            <p className="text-gray-600">Atur semua kegiatan dan acara masjid</p>
          </div>
          <Link
            href="/masjid-admin-panel-2025/activities/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Kegiatan
          </Link>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada kegiatan</h3>
          <p className="text-gray-600 mb-4">Mulai dengan menambahkan kegiatan pertama Anda</p>
          <Link
            href="/masjid-admin-panel-2025/activities/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Kegiatan
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <div className="flex-1 sm:pr-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {activity.description}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 sm:mt-0 ${getCategoryColor(activity.category)}`}>
                          {activity.category}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{formatDate(activity.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{activity.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-4">
                      <Link
                        href={`/masjid-admin-panel-2025/activities/${activity.id}/edit`}
                        className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        disabled={deletingId === activity.id}
                        className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}