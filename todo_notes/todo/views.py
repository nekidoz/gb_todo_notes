from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from .filters import ProjectFilter, ToDoFilter


# Устанавливает лимит записей по умолчанию, если ек указан в параметрах URL
class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


# Собственные установки постраничного вывода
# фильтрация по части имени проекта
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


# Устанавливает лимит записей по умолчанию, если ек указан в параметрах URL
class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


# Запрос на удаление записи устанавливает статус данной записи в неактивный
# Фильтрация по проекту и дате создания (https://django-filter.readthedocs.io/en/latest/guide/usage.html)
# Собственные установки постраничного вывода
class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, *args, pk=None, **kwargs):
        todo = get_object_or_404(ToDo, pk=pk)
        todo.is_active = False
        todo.save()
        serializer = self.get_serializer(todo)
        return Response(serializer.data)
