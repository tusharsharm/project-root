import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const response = await fetch(`${API_URL}/api/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    const result = await response.json();
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
