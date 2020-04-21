from django.db import models
from django.contrib.auth.models import AbstractUser, Group, User

# Create your models here.
from django.utils import timezone


class Course(models.Model):
    name = models.CharField(max_length=70)
    date = models.DateField(default=timezone.now)
    description = models.TextField()
    subscribers = models.ManyToManyField(User, related_name='subscribers')

    def __str__(self):
        return self.name


class FilesToCourse(models.Model):
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='file')
    week = models.CharField(max_length=10)
    filename = models.FileField(null=True, upload_to='attachments/')



