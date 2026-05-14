from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode

from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.response import Response

from .permissions import IsSelfOrAdmin
from .serializers import (
    UserSerializer, 
    UserCreateSerializer, 
    UserUpdateSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)
from .emails import send_password_reset_email

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("date_joined")

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
        if self.action in ("update", "partial_update", "me"):
            return UserUpdateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == "list":
            return [IsAdminUser()]
        if self.action in ("retrieve", "update", "partial_update", "destroy"):
            return [IsAuthenticated(), IsSelfOrAdmin()]
        if self.action == "me":
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    @action(detail=False, methods=["get", "patch"])
    def me(self, request):
        if request.method == "GET":
            return Response(UserSerializer(request.user).data)
        ser = UserUpdateSerializer(request.user, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(UserSerializer(request.user).data)


class PasswordResetRequestView(views.APIView):
    permission_classes = [AllowAny] # Must be open to unauthenticated users

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        # Only send the email if the user exists
        if user:
            send_password_reset_email(user)

        # Always return a generic success message to prevent malicious actors from checking if an email exists
        return Response(
            {"detail": "If an account with that email exists, a password reset link has been sent."}, 
            status=status.HTTP_200_OK
        )


class PasswordResetConfirmView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uid = serializer.validated_data['uid']
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']

        try:
            # Decode the user ID and fetch the user
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        # Verify the token is valid for this specific user
        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "The reset link is invalid or has expired."}, status=status.HTTP_400_BAD_REQUEST)