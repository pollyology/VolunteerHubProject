from django.shortcuts import render
from django.db.models import Q
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .permissions import (
    IsStaffOrReadOnly,
    CanEditEvent,
    CanDeleteEvent,
    CanManageMembers,
)

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

    def get_permissions(self):
            # DELETE is stricter: admin-only
            if self.action == "destroy":
                return [IsAuthenticated(), CanDeleteEvent()]
            # Modification actions: update (PUT) and partial_update (PATCH)
            if self.action in ["update", "partial_update"]:
                return [IsAuthenticated(), CanEditEvent()]
            return [perm() for perm in self.permission_classes]

    def perform_create(self, serializer):
        user = self.request.user

        if not user.is_staff:
            raise PermissionDenied("You are not allowed to create events for this organizer.")

        serializer.save()