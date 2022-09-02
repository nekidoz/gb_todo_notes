from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


# Lookup по связанному полю
def projects_list(request):
    return Project.objects.all() if request else Project.objects.none()


class ToDoFilter(filters.FilterSet):
    # Lookup по связанному полю
    project = filters.ModelChoiceFilter(field_name="project", queryset=projects_list)
    date_created = filters.DateFromToRangeFilter(field_name="date_created")

    class Meta:
        model = ToDo
        fields = ['project', 'date_created']
