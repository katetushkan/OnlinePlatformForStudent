from django.db import models
from django.contrib.auth.models import AbstractUser, Group

# Create your models here.
from django.utils import timezone


class Course(models.Model):

    name = models.CharField(max_length=70)
    date = models.DateField(default=timezone.now)
    description = models.TextField()

