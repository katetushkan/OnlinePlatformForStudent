# Create your views here.
from rest_framework import generics

from api.models import Course
from api.serializer import CourseSerializer


class ListCourse(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class DetailCourse(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer