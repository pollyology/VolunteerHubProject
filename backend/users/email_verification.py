from django.conf import settings
from django.core.mail import send_mail
from .models import EmailVerification

def send_verification_email(user) -> None:
    ev = EmailVerification.create_for_user(user, ttl_minutes=30)

    verify_link = f"{settings.SEENIT_PUBLIC_BASE_URL}/api/auth/verify-email/?token={ev.token}"
    subject = "Verify your SeenIt email"
    body = (
        f"Hi {user.username},\n\n"
        f"Verify your email by opening this link:\n{verify_link}\n\n"
        "If you did not create this account, you can ignore this email.\n"
        "This link expires in 30 minutes.\n"
    )

    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )