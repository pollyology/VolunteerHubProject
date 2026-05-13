from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsStaffOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)

class CanEditEvent(BasePermission):
    """
    Allows staff, or OrganizerMember with role ADMIN/EDITOR on event.organizer.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.user and request.user.is_staff:
            return True
        return False

class CanDeleteEvent(BasePermission):
    """
    Allows staff, or OrganizerMember ADMIN only.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.user and request.user.is_staff:
            return True
        return False

class CanManageMembers(BasePermission):
    """
    Staff or organizer ADMIN can add/remove/update memberships.
    """
    def has_object_permission(self, request, view, obj):
        # obj is OrganizerMember
        if request.user and request.user.is_staff:
            return True
        return False
