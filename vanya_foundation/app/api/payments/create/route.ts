import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  try {
    const { amount, paymentMethod } = await request.json();

    const response = await fetch(`${API_URL}/api/payments/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, payment_method: paymentMethod }),
    });

    if (!response.ok) {
      throw new Error('Payment initialization failed');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment initialization failed' },
      { status: 500 }
    );
  }
}