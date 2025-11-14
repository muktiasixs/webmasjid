import { NextRequest, NextResponse } from 'next/server'
import { activitiesDB } from '@/lib/database'

export async function GET() {
  try {
    const activities = activitiesDB.getAll()
    return NextResponse.json({ 
      success: true, 
      data: activities 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.title || !body.description || !body.date || !body.time || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newActivity = activitiesDB.create({
      title: body.title,
      description: body.description,
      date: body.date,
      time: body.time,
      location: body.location,
      category: body.category || 'kajian',
      image: body.image || '/images/default-event.jpg'
    })

    return NextResponse.json(
      { success: true, data: newActivity },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create activity' },
      { status: 500 }
    )
  }
}