from django.urls import path

from api import views

urlpatterns = [
    path('courses/', views.ListCourse.as_view(), name='main'),
    path('courses/<int:pk>/', views.DetailCourse.as_view()),
    path('courses/storage/<int:pk>', views.FilesPinnedToCourse.as_view()),
    path('courses/subscribe/', views.SubscriptionToCourses.as_view())
]