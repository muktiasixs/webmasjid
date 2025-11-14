import { NextRequest, NextResponse } from 'next/server'
import { activitiesDB } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const activity = activitiesDB.getById(id)
    
    if (!activity) {
      return NextResponse.json(
        { success: false, error: 'Activity not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: activity 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    
    const updatedActivity = activitiesDB.update(id, body)
    
    if (!updatedActivity) {
      return NextResponse.json(
        { success: false, error: 'Activity not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedActivity 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update activity' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const deleted = activitiesDB.delete(id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Activity not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Activity deleted successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete activity' },
      { status: 500 }
    )
  }
}