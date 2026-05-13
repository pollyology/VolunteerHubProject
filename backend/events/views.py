from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Event
from .serializers import EventSerializer
# from .permissions import (
#     IsStaffOrReadOnly,
#     CanEditEvent,
#     CanDeleteEvent,
#     CanManageMembers,
# )

# Create your views here.
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("-start_datetime")
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        return self.queryset