# Схема GraphQL

import graphene
from graphene_django import DjangoObjectType
from users.models import User
from todo.models import Project, ToDo


class UserType(DjangoObjectType):
    """
    Наследование от DjangoObjectType позволяет автоматически создать в данном классе поля
    из указанной модели Django
    """
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_superuser', 'is_staff']


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


# ****************************** ЗАПРОСЫ ******************************

class Query(graphene.ObjectType):
    # Список объектов модели
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    # Один объект модели
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    # Фильтрация по параметру объекта связанной модели
    todos_by_user_last_name = graphene.List(ToDoType, last_name=graphene.String(required=False))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todos_by_user_last_name(self, info, last_name=None):
        if last_name:
            return ToDo.objects.filter(creator_user__last_name=last_name)
        else:
            return ToDo.objects.all()


# ************************ ИЗМЕНЕНИЯ (мутации) ************************

# class AuthorMutation(graphene.Mutation):
#     class Arguments:
#         birthday_year = graphene.Int(required=True)
#         id = graphene.ID()
#
#     author = graphene.Field(AuthorType)
#
#     @classmethod
#     def mutate(cls, root, info, birthday_year, id):
#         author = Author.objects.get(pk=id)
#         author.birthday_year = birthday_year
#         author.save()
#         return AuthorMutation(author=author)
#
#
# class Mutation(graphene.ObjectType):
#     update_author = AuthorMutation.Field()
#
# Схема данных
# schema = graphene.Schema(query=Query, mutation=Mutation)
schema = graphene.Schema(query=Query)
