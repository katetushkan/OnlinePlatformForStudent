from django.urls import path

from authorization import views

urlpatterns = [
    path('sign_up/', views.SignUpAPIView.as_view()),
    path('sign_in/', views.SignInAPIView.as_view()),
    # path('logout/'),
    path('', views.UsersView.as_view())
]