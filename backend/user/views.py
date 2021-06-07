from dateutil.relativedelta import relativedelta
from django.utils import timezone
from rest_framework import generics, authentication, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response

from user.serializers import UserSerializer, AuthTokenSerializer


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retreive and return authenticated user"""
        return self.request.user


class UpdatePaydayView(generics.UpdateAPIView):
    """Update paydate of authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_update(self, serializer):
        """Update payday + 1 month"""
        new_date = timezone.now() + relativedelta(months=1)
        serializer.save(pay_day=new_date, partial=True)

    def get_object(self):
        """Retreive and return authenticated user"""
        return self.request.user


class DropPaydayView(generics.UpdateAPIView):
    """Drop paydate of authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_drop(self, serializer):
        """Drop payday to now"""
        new_date = timezone.now()
        serializer.save(pay_day=new_date, partial=True)

    def get_object(self):
        """Retreive and return authenticated user"""
        return self.request.user


class CheckPlanPaimentView(APIView):
    """Retutns true if plan is already paid"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        """Retreive and return paiment status"""
        payday = self.request.user.pay_day
        if payday < timezone.now():
            return Response({'paid': False})
        return Response({'paid': True})
