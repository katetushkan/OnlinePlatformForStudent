from django.conf.urls.static import static
from django.urls import path

from CourseWork import settings
from api import views

urlpatterns = [
    path('courses/', views.ListCourse.as_view(), name='main'),
    path('courses/<int:pk>/', views.DetailCourse.as_view()),
    path('courses/storage/<int:pk>/', views.FilesPinnedToCourse.as_view()),
    path('courses/subscribe/', views.SubscriptionToCourses.as_view()),
    path('downloads/', views.FileDownloadView.as_view()),
    path('delete/<int:pk>/', views.DeleteFileView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)