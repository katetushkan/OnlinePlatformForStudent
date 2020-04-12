from django.contrib.auth.models import User
from knox.models import AuthToken

from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.response import Response

from authorization.serializer import CreateUserSerializer, UserSerializer, SignInUserSerializer


class UsersView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SignUpAPIView(GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        AuthToken.objects.create(user)

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
        })


class SignInAPIView(GenericAPIView):
    serializer_class = SignInUserSerializer

    def post(self, request):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            # 'token': AuthToken.objects.create(user)
        })