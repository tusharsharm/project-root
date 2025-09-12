'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    Razorpay: any;
    Stripe: any;
  }
}

export function PaymentForm() {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, paymentMethod }),
      });

      const data = await response.json();

      if (paymentMethod === 'razorpay') {
        handleRazorpayPayment(data.order);
      } else if (paymentMethod === 'stripe') {
        handleStripePayment(data.clientSecret);
      } else if (paymentMethod === 'upi') {
        handleUPIPayment(data.upiDetails);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Payment initialization failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        min="1"
      />
      
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="razorpay" id="razorpay" />
          <Label htmlFor="razorpay">Razorpay</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="stripe" id="stripe" />
          <Label htmlFor="stripe">Stripe</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi">UPI</Label>
        </div>
      </RadioGroup>

      <Button 
        onClick={handlePayment} 
        disabled={loading || !amount}
        className="w-full"
      >
        {loading ? 'Processing...' : 'Proceed to Pay'}
      </Button>
    </div>
  );
}