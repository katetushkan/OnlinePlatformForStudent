from rest_framework import serializers

from api.models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Course