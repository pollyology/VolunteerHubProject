from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class ResendVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyEmailSerializer(serializers.Serializer):
    token = serializers.CharField()