import { NextRequest, NextResponse } from 'next/server'
import { donationsDB } from '@/lib/database'

export async function GET() {
  try {
    const donations = donationsDB.getAll()
    return NextResponse.json({ 
      success: true, 
      data: donations 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.title || !body.description || !body.targetAmount || !body.deadline) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newDonation = donationsDB.create({
      title: body.title,
      description: body.description,
      targetAmount: parseInt(body.targetAmount) || 0,
      currentAmount: parseInt(body.currentAmount) || 0,
      deadline: body.deadline,
      category: body.category || 'umum',
      isActive: body.isActive !== undefined ? body.isActive : true
    })

    return NextResponse.json(
      { success: true, data: newDonation },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create donation' },
      { status: 500 }
    )
  }
}