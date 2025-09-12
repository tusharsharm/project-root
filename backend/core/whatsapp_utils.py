from twilio.rest import Client
from django.conf import settings

client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

def send_whatsapp_message(to_number, message):
    try:
        message = client.messages.create(
            from_=f'whatsapp:{settings.TWILIO_WHATSAPP_NUMBER}',
            body=message,
            to=f'whatsapp:{to_number}'
        )
        return True, message.sid
    except Exception as e:
        return False, str(e)

def send_donation_confirmation_whatsapp(donation):
    message = f"""Thank you for your donation of ₹{donation.amount}!
Your support helps us make a difference.
Receipt ID: {donation.payment_id}"""
    return send_whatsapp_message(donation.phone, message)

def send_volunteer_confirmation_whatsapp(volunteer):
    message = f"""Thank you for registering as a volunteer, {volunteer.name}!
We'll contact you soon about opportunities."""
    return send_whatsapp_message(volunteer.phone, message)