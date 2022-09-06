from django.shortcuts import render

from rest_framework import viewsets, mixins
from .models import User
from .serializers import UserModelSerializer, UserModelSerializer_v2


# Можно только смотреть список и детали объекта и обновлять его, но не создавать или удалять объекты
class UserModelViewSet(viewsets.GenericViewSet,
                       mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    # Versioning
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializer_v2
        else:
            return UserModelSerializer
