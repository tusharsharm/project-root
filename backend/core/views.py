from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (
    Contact, Project, Donation, Gallery, Event, 
    Impact, Testimonial, Career, Language, Translation, Newsletter
)
from .serializers import (
    ContactSerializer, ProjectSerializer, DonationSerializer,
    GallerySerializer, EventSerializer, ImpactSerializer,
    TestimonialSerializer, CareerSerializer, LanguageSerializer,
    TranslationSerializer, NewsletterSerializer
)
from django.conf import settings
from .utils_email import send_email_async  # simple helper
from .payments import create_payment_order  # optional razorpay helper

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

class DonationViewSet(viewsets.ModelViewSet):
    # use the model's 'date' field for ordering (was using non-existent 'created_at')
    queryset = Donation.objects.all().order_by("-date")
    serializer_class = DonationSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def create_payment(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class GalleryViewSet(viewsets.ModelViewSet):
    serializer_class = GallerySerializer
    filterset_fields = ['category', 'is_featured']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Gallery.objects.all()
        params = getattr(self.request, 'query_params', getattr(self.request, 'GET', {}))
        category = params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset.order_by('-created_at')

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("-date")
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

class ImpactViewSet(viewsets.ModelViewSet):
    queryset = Impact.objects.all()
    serializer_class = ImpactSerializer
    permission_classes = [permissions.IsAdminUser]

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by("-created_at")
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.IsAdminUser]

class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all().order_by("-created_at")
    serializer_class = CareerSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'apply']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
            return Response(
                {'message': 'Successfully subscribed to newsletter'},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by("-created_at")
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Message sent successfully'},
            status=status.HTTP_201_CREATED
        )

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [permissions.IsAdminUser]

class TranslationViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    permission_classes = [permissions.IsAdminUser]

@api_view(['POST'])
def send_email(request):
    try:
        # Email sending logic here
        return Response({'status': 'success'})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})
