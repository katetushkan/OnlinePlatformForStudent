# Create your views here.
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Course, FilesToCourse
from api.permissions import IsAnonymous, IsStudent, IsTeacher
from api.serializer import CourseSerializer, FilesToCourseSerializer, SubscriptionToCoursesSerializer


class ListCourse(generics.ListCreateAPIView):
    permission_classes = [IsAnonymous]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class DetailCourse(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAnonymous]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class FilesPinnedToCourse(generics.ListCreateAPIView):
    permission_classes = [IsStudent | IsTeacher]
    serializer_class = FilesToCourseSerializer

    def get_queryset(self):
        return FilesToCourse.objects.filter(course_id=self.kwargs.get('pk')).order_by('week')


class SubscriptionToCourses(APIView):
    permission_classes = [IsStudent | IsTeacher]

    def get(self, request):
        user = User.objects.filter(id=self.request.user.id).first()
        serializer = CourseSerializer(user.subscribers.all(), many=True)

        return Response(serializer.data)

    def post(self, request):
        user = User.objects.filter(id=self.request.user.id).first()
        course = self.request.data['course']

        user.subscribers.add(course)

        return Response(status=status.HTTP_200_OK)




