from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

def send_password_reset_email(user) -> None:
    # Generate the secure token and encode the user's ID
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    # This link points to the page on your frontend where the user types their new password
    reset_link = f"http://localhost:5173/reset-password?uid={uid}&token={token}"
    
    subject = "Reset your Volunteer Hub Password"
    body = (
        f"Hi {user.username},\n\n"
        f"You requested a password reset. Click the link below to securely set a new password:\n{reset_link}\n\n"
        "If you did not request this, you can safely ignore this email.\n"
    )

    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )