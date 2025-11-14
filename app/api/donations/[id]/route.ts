import { NextRequest, NextResponse } from 'next/server'
import { donationsDB } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const donation = donationsDB.getById(id)
    
    if (!donation) {
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: donation 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation' },
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
    
    const updatedDonation = donationsDB.update(id, body)
    
    if (!updatedDonation) {
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedDonation 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update donation' },
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
    const deleted = donationsDB.delete(id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Donation deleted successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete donation' },
      { status: 500 }
    )
  }
}