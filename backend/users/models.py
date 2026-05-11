from django.db import models

# Create your models here.
import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
import secrets
from datetime import timedelta
from django.conf import settings
from django.utils import timezone

class User(AbstractUser):
    """
    Custom User model extending Django's standard auth.
    Uses UUIDs for scalability and security (harder to guess IDs).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    email = models.EmailField(unique=True)  # add this

    campus_id = models.CharField(max_length=50, null=True, blank=True, unique=True)
    bio = models.TextField(null=True, blank=True)
    profile_photo_url = models.URLField(max_length=500, null=True, blank=True)
    is_verified_student = models.BooleanField(default=False)

    blocked_users = models.ManyToManyField(
        "self",
        symmetrical=False,
        blank=True,
        related_name="blocked_by",
    )


    def __str__(self):
        return self.username



class EmailVerification(models.Model):
    """
    One active verification token per user at a time (we invalidate old ones on resend).
    Token is random and stored server-side so we can revoke/rotate.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="email_verifications",
    )
    token = models.CharField(max_length=128, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used_at = models.DateTimeField(null=True, blank=True)

    @classmethod
    def create_for_user(cls, user, ttl_minutes: int = 30):
        # Invalidate any previous unused tokens
        cls.objects.filter(user=user, used_at__isnull=True).delete()

        token = secrets.token_urlsafe(48)
        return cls.objects.create(
            user=user,
            token=token,
            expires_at=timezone.now() + timedelta(minutes=ttl_minutes),
        )

    def is_valid(self) -> bool:
        return self.used_at is None and timezone.now() <= self.expires_at

    def mark_used(self):
        self.used_at = timezone.now()
        self.save(update_fields=["used_at"])
