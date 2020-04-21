from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Course, FilesToCourse


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Course


class CustomUserSerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'groups', 'courses')

    def get_courses(self, obj):
        return [course.id for course in obj.subscribers.all()]


class FilesToCourseSerializer(serializers.ModelSerializer):
    filename_to_display = serializers.SerializerMethodField()

    class Meta:
        model = FilesToCourse
        exclude = ('id', )

    @staticmethod
    def get_filename_to_display(obj):
        return obj.filename.name.split('/')[-1]


class SubscriptionToCoursesSerializer(serializers.ModelSerializer):
    subscribers = CourseSerializer(many=True)

    class Meta:
        model = User
        fields = ('subscribers', )

