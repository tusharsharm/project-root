import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Transform frontend data to match backend model
    const backendData = {
      name: data.name,
      email: data.email,
      message: data.message
    };
    
    const response = await fetch(`${API_URL}/api/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Backend error:', errorData);
      throw new Error('Failed to submit contact form');
    }

    const result = await response.json();
    
    // Send confirmation emails
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact-form',
          data: {
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ').slice(1).join(' '),
            email: data.email,
            subject: 'Contact Form Submission',
            message: data.message
          }
        })
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
