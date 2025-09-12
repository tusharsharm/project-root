from django.contrib import admin
from .models import (
    Contact, Project, Donation, Gallery, Event, 
    Impact, Testimonial, Career, Language, Translation, Newsletter
)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email', 'message')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status')
    list_filter = ('category', 'status')
    search_fields = ('title', 'description')

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email')

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('title', 'description')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'status')
    list_filter = ('status', 'date')
    search_fields = ('title', 'description')

@admin.register(Impact)
class ImpactAdmin(admin.ModelAdmin):
    list_display = ('title', 'number', 'created_at')
    search_fields = ('title', 'description')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'created_at')
    search_fields = ('name', 'content')

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'type', 'status')
    list_filter = ('type', 'status')
    search_fields = ('title', 'description')

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('email',)
