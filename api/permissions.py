from rest_framework import permissions
from rest_framework.request import Request


class IsAnonymous(permissions.BasePermission):
    def has_permission(self, request: Request, view):
        if not request.user.is_authenticated:
            return True
        else:
            return False


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.all().first().id == 3:
            return True
        else:
            return False


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.all().first().id == 4:
            return True
        else:
            return False