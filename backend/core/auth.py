from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(
            username=request.data['email'],
            email=request.data['email'],
            password=request.data['password'],
            first_name=request.data.get('firstName', ''),
            last_name=request.data.get('lastName', '')
        )
        return Response({
            'success': True,
            'message': 'Registration successful'
        })
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_user_profile(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=401)
        
    serializer = UserSerializer(request.user)
    return Response(serializer.data)