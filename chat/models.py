from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone

from api.models import Course

User = get_user_model()


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message')
    message = models.TextField()
    room = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='classroom')
    timestamp = models.DateTimeField(null=False, default=timezone.now)