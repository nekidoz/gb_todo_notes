"""todo_notes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
# OpenAPI - DRF - view для рендеринга swagger и redoc
from django.views.generic import TemplateView

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework.permissions import AllowAny
# JWT
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
# OpenAPI - DRF - get_schema_view - Helper для маршрутизации SchemaView - средства динамического создания схемы OpenAPI
# https://www.django-rest-framework.org/api-guide/schemas/#generating-an-openapi-schema
import rest_framework.schemas

# OpenAPI - drf_yasg
import drf_yasg.views
from drf_yasg import openapi

from users.views import UserModelViewSet
from todo.views import ProjectModelViewSet, ToDoModelViewSet


# OpenAPI - drf_yasg - представление для схемы OpenAPI
schema_view = drf_yasg.views.get_schema_view(
    openapi.Info(
        title="ToDo Notes",
        default_version='v1',
        description="ToDo Notes project documentation - drf-yasg",
        contact=openapi.Contact(email="nekidoz@yandex.ru"),
        license=openapi.License(name="MIT License"),
    ),
    # Права доступа к документации
    public=True,
    permission_classes=[AllowAny],
)


router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # To obtain user authentication token
    path('api-token-auth/', views.obtain_auth_token),
    # Versioning
    #       NamespaceVersioning (namespace (version) will be in request.version)
    path('api/', include((router.urls, 'api_v1'), namespace='v1')),
    path('api/v2/', include((router.urls, 'api_v2'), namespace='v2')),
    # Without versioning:
    #path('api/', include(router.urls)),
    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # OpenAPI - drf_yasg - разные виды документации
    #       Отображает документацию в формате JSON или YAML для машинной обработки документации
    re_path(r'^drf-yasg/swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    #       Формирует документацию с помощью Swagger для отображения в браузере
    path('drf-yasg/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('drf-yasg/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # OpenAPI - DRF
    # https://www.django-rest-framework.org/api-guide/schemas/#generating-an-openapi-schema
    # * Use the `get_schema_view()` helper to add a `SchemaView` to project URLs.
    #   * `title` and `description` parameters are passed to `SchemaGenerator`.
    #   * Provide view name for use with `reverse()`.
    path('drf/openapi', rest_framework.schemas.get_schema_view(
        title="ToDo Notes",
        description="ToDo Notes project documentation - DRF",
        version="v1"
        #,urlconf=router.urls      # Сгенерируем документацию для API основного приложения (если опустить - для всего API)
    ), name='openapi-schema'),
    # * Route TemplateView to serve Swagger UI template.
    # * https://www.django-rest-framework.org/topics/documenting-your-api/#a-minimal-example-with-swagger-ui
    #   * Provide `extra_context` with view name of `SchemaView`.
    path('drf/swagger/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger'),
    # * Route TemplateView to serve the ReDoc template.
    # * https://www.django-rest-framework.org/topics/documenting-your-api/#a-minimal-example-with-redoc
    #   * Provide `extra_context` with view name of `SchemaView`.
    path('drf/redoc/', TemplateView.as_view(
        template_name='redoc.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='redoc'),
]
