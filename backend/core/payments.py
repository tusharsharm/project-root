import os
import razorpay
import stripe
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Donation

razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
stripe.api_key = settings.STRIPE_SECRET_KEY

def create_payment_order(donation):
    """
    Return a dict that the frontend payment widget expects.
    Replace with real Razorpay/Stripe integration.
    For Razorpay you'd do: client.order.create(...)
    """
    # Dummy:
    return {
        "id": f"order_dummy_{donation.id}",
        "amount": int(float(donation.amount)*100),
        "currency": "INR",
        "status": "created",
    }

@api_view(['POST'])
def create_payment(request):
    try:
        amount = request.data.get('amount')
        currency = "INR"
        
        payment = razorpay_client.order.create({
            'amount': int(float(amount) * 100),
            'currency': currency,
            'payment_capture': 1
        })
        
        return Response({
            'id': payment['id'],
            'amount': amount,
            'currency': currency
        })
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
def payment_callback(request):
    try:
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        signature = request.data.get('razorpay_signature')
        
        # Verify signature
        razorpay_client.utility.verify_payment_signature({
            'razorpay_payment_id': payment_id,
            'razorpay_order_id': order_id,
            'razorpay_signature': signature
        })
        
        # Update donation status
        donation = Donation.objects.get(payment_id=order_id)
        donation.status = 'completed'
        donation.save()
        
        return Response({'status': 'success'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)

def create_stripe_payment(amount, currency="inr"):
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency=currency
        )
        return True, intent
    except Exception as e:
        return False, str(e)

def verify_upi_payment(upi_id, transaction_ref):
    # Implement UPI verification logic here
    # This would typically involve checking with a UPI service provider
    try:
        # Placeholder for UPI verification
        return True, transaction_ref
    except Exception as e:
        return False, str(e)

def verify_razorpay_payment(payment_id, order_id, signature):
    try:
        razorpay_client.utility.verify_payment_signature({
            'razorpay_payment_id': payment_id,
            'razorpay_order_id': order_id,
            'razorpay_signature': signature
        })
        return True, payment_id
    except Exception as e:
        return False, str(e)
