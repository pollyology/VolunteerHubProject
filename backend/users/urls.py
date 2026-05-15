from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import UserViewSet, PasswordResetRequestView, PasswordResetConfirmView, AdminOnlyView, VolunteerOnlyView
from .auth_views import RegisterView, LoginView, LogoutView
from .auth_views import VerifyEmailView, ResendVerificationView

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", LoginView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path("auth/logout/", LogoutView.as_view()),
    path("auth/verify-email/", VerifyEmailView.as_view()),
    path("auth/resend-verification/", ResendVerificationView.as_view()),
    path('auth/password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('auth/password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('admin-only/', AdminOnlyView.as_view(), name='admin-only'),
    path('volunteer-only/', VolunteerOnlyView.as_view(), name='volunteer-only'),

]