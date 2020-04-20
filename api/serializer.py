from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Course


class CustomUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'groups')
