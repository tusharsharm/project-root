'use client';

import QRCode from 'qrcode.react';

interface QRCodeProps {
  amount?: number;
  upiId: string;
  merchantName: string;
}

export function DonationQRCode({ amount, upiId, merchantName }: QRCodeProps) {
  const upiUrl = `upi://pay?pa=${upiId}&pn=${merchantName}${amount ? `&am=${amount}` : ''}`;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <QRCode value={upiUrl} size={200} level="H" />
      <p className="mt-4 text-sm text-gray-600">Scan to donate via UPI</p>
    </div>
  );
}