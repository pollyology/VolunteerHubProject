from rest_framework.permissions import BasePermission

class IsSelfOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_authenticated and (request.user.is_staff or obj.pk == request.user.pk))