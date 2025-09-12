from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, DonationViewSet, GalleryViewSet, EventViewSet,
    ImpactViewSet, TestimonialViewSet, CareerViewSet, NewsletterViewSet,
    ContactViewSet, LanguageViewSet, TranslationViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'gallery', GalleryViewSet, basename="gallery")
router.register(r'events', EventViewSet)
router.register(r'impact', ImpactViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'careers', CareerViewSet)
router.register(r'newsletter', NewsletterViewSet)
router.register(r'contact', ContactViewSet)
router.register(r'languages', LanguageViewSet)
router.register(r'translations', TranslationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
