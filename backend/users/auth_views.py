from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .auth_serializers import RegisterSerializer, LoginSerializer

from .models import EmailVerification
from .email_verification import send_verification_email
from .verify_serializers import VerifyEmailSerializer, ResendVerificationSerializer
from .email_verification import send_verification_email

User = get_user_model()

def issue_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "is_staff": user.is_staff
    }

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user = ser.save()
        send_verification_email(user)

        return Response({"id": str(user.id)}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        ser = LoginSerializer(data=request.data)
        ser.is_valid(raise_exception=True)

        email = ser.validated_data["email"].strip().lower()
        password = ser.validated_data["password"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(password):
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({"detail": "Account disabled."}, status=status.HTTP_403_FORBIDDEN)

        # Enforce verification before issuing tokens (except staff)
        if not user.is_verified_student and not user.is_staff:
            return Response({"detail": "Email not verified."}, status=status.HTTP_403_FORBIDDEN)

        return Response(issue_tokens(user), status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            return Response({"detail": "refresh is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh)
            token.blacklist()
        except Exception:
            return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def _verify(self, token: str):
        try:
            ev = EmailVerification.objects.select_related("user").get(token=token)
        except EmailVerification.DoesNotExist:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        if not ev.is_valid():
            return Response({"detail": "Token expired or already used."}, status=status.HTTP_400_BAD_REQUEST)

        user = ev.user
        user.is_verified_student = True
        user.save(update_fields=["is_verified_student"])
        ev.mark_used()

        return Response({"detail": "Email verified."}, status=status.HTTP_200_OK)

    def get(self, request):
        token = request.query_params.get("token", "")
        if not token:
            return Response({"detail": "token is required"}, status=status.HTTP_400_BAD_REQUEST)
        return self._verify(token)

    def post(self, request):
        token = request.data.get("token", "")
        if not token:
            return Response({"detail": "token is required"}, status=status.HTTP_400_BAD_REQUEST)
        return self._verify(token)


class ResendVerificationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        ser = ResendVerificationSerializer(data=request.data)
        ser.is_valid(raise_exception=True)

        email = ser.validated_data["email"].strip().lower()

        # Do not leak whether an email exists: always return 200
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "If the account exists, a verification email was sent."}, status=status.HTTP_200_OK)

        if user.is_verified_student:
            return Response({"detail": "Email already verified."}, status=status.HTTP_200_OK)

        send_verification_email(user)
        return Response({"detail": "If the account exists, a verification email was sent."}, status=status.HTTP_200_OK)