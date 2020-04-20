from rest_framework import permissions
from rest_framework.request import Request


class IsAnonymous(permissions.BasePermission):
    def has_permission(self, request: Request, view):
        if not request.user.is_authenticated:
            return True
        else:
            return False
