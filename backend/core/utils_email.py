import threading
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings

def _send(subject, message, recipient_list, from_email=None):
    send_mail(subject, message, from_email or settings.EMAIL_HOST_USER, recipient_list, fail_silently=False)

def send_email_async(subject, message, recipient_list):
    thread = threading.Thread(target=_send, args=(subject, message, recipient_list))
    thread.start()

def send_donation_confirmation(donation):
    subject = 'Thank you for your donation'
    html_message = render_to_string('emails/donation_confirmation.html', {
        'name': donation.name,
        'amount': donation.amount,
        'payment_id': donation.payment_id
    })
    
    send_mail(
        subject=subject,
        message='',
        html_message=html_message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[donation.email],
        fail_silently=False,
    )

def send_volunteer_confirmation(volunteer):
    subject = 'Thank you for volunteering'
    html_message = render_to_string('emails/volunteer_confirmation.html', {
        'name': volunteer.name
    })
    
    send_mail(
        subject=subject,
        message='',
        html_message=html_message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[volunteer.email],
        fail_silently=False,
    )

def send_contact_confirmation(contact):
    subject = 'We received your message'
    html_message = render_to_string('emails/contact_confirmation.html', {
        'name': contact.name
    })
    
    send_mail(
        subject=subject,
        message='',
        html_message=html_message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[contact.email],
        fail_silently=False,
    )
