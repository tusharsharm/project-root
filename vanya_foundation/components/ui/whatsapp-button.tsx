'use client';

import { Button } from '@/components/ui/button';
import { PhoneIcon } from 'lucide-react';

export function WhatsAppButton() {
  const handleClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <Button 
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-lg"
    >
      <PhoneIcon className="w-6 h-6" />
      <span className="ml-2">Chat with us</span>
    </Button>
  );
}