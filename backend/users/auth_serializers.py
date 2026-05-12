from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()

def is_edu(email: str) -> bool:
    return email.lower().endswith(".edu")

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate_email(self, value):
        email = value.strip().lower()
        # Strict .edu rule (admins are created out-of-band; users cannot self-exempt)
        if not is_edu(email):
            raise serializers.ValidationError("Email must end in .edu.")
        return email

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            is_verified_student=True,
            is_active=True,
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)