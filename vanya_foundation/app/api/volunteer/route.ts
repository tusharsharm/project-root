import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Transform frontend data to match backend model
    const backendData = {
      name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.name,
      email: data.email,
      phone: data.phone,
      area: Array.isArray(data.areas) ? data.areas.join(', ') : (data.areas || data.area || ''),
      status: 'Pending'
    };
    
    const response = await fetch(`${API_URL}/api/volunteers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Backend error:', errorData);
      throw new Error('Failed to submit volunteer application');
    }

    const result = await response.json();
    
    // Send confirmation email
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'volunteer-application',
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            areas: data.areas,
            availability: data.availability
          }
        })
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('Volunteer submission error:', error);
    return Response.json(
      { success: false, error: 'Failed to submit volunteer application' },
      { status: 500 }
    );
  }
}
