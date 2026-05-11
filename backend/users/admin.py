from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # This adds your custom fields to the "User Change" page
    fieldsets = UserAdmin.fieldsets + (
        ('Extra Profile Info', {'fields': ('campus_id', 'bio', 'profile_photo_url', 'is_verified_student', 'blocked_users')}),
    )
    
    # This adds your custom fields to the "Add User" page
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Extra Profile Info', {'fields': ('campus_id', 'bio', 'profile_photo_url', 'is_verified_student')}),
    )

    # This shows the fields in the list view (the table of users)
    list_display = ('username', 'email', 'campus_id', 'is_verified_student', 'is_staff')

admin.site.register(User, CustomUserAdmin)