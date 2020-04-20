# Create your views here.
from rest_framework import generics


from api.models import Course
from api.permissions import IsAnonymous
from api.serializer import CourseSerializer


class ListCourse(generics.ListCreateAPIView):
    permission_classes = [IsAnonymous]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class DetailCourse(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAnonymous]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


