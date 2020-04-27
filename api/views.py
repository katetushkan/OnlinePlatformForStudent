# Create your views here.
import datetime
import os
from wsgiref.util import FileWrapper

from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.generic.base import View

from rest_framework import generics, status
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView

from CourseWork.settings import MEDIA_ROOT
from api.models import Course, FilesToCourse
from api.permissions import IsAnonymous, IsStudent, IsTeacher
from api.serializer import CourseSerializer, FilesToCourseSerializer


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

    def perform_create(self, serializer):
        week = str(((datetime.date.today() - Course.objects.filter(id=self.kwargs.get('pk')).first().date)/7).days)

        course_id = Course.objects.filter(id=self.kwargs.get('pk')).first()
        filename = self.request.FILES['file']
        serializer.save(week=week, filename=filename, course_id=course_id)


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


class FileDownloadView(View):

    def get(self, request):
        file = FilesToCourse.objects.filter(id=self.request.GET['id']).first().filename.name
        print(file)
        file_name = os.path.join(MEDIA_ROOT, file)
        print(file_name)
        if os.path.exists(file_name):

            readfile = open(file_name, 'rb')
            response = HttpResponse(FileWrapper(readfile), content_type="application/pdf")
            response['Content-Length'] = os.path.getsize(file_name)
            response['Content-Disposition'] = f'attachments; filename=\'{file_name}\''

            return response

        else:
            return Response(data={'no': False})


class DeleteFileView(generics.DestroyAPIView):
    queryset = FilesToCourse.objects.all()
    serializer_class = FilesToCourseSerializer

