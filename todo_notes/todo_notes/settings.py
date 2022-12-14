"""
Django settings for todo_notes project.

Generated by 'django-admin startproject' using Django 4.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os

from pathlib import Path


# !!!! IMPORTANT! Necessary got graphene_django to work with Django 4
# GraphQL - as force_text is called force_str in Django 4, but force_text is necessary for graphene_django
# Solution is based on this post:
# https://stackoverflow.com/questions/70382084/import-error-force-text-from-django-utils-encoding
import django
from django.utils.encoding import force_str
django.utils.encoding.force_text = force_str
# !!!! IMPORTANT!


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-r9jl9p=l-7vb@v@&blcf7q=xr95p4jn9z2fr+q5^6z=wudax&a'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Django REST
    'rest_framework',
    # CORS
    'corsheaders',
    # Библиотека django-filter
    'django_filters',
    # Required for rest_framework.authentication.TokenAuthentication
    'rest_framework.authtoken',
    # JWT - приложение для просмотра токенов?
    #'rest_framework_simplejwt.token_blacklist'
    # drf-yasg - OpenAPI documentation
    'drf_yasg',
    # GraphQL - graphene_django
    'graphene_django',
    # ToDo_notes apps
    'users',
    'todo',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # CORS
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

# CORS: Library - React server address
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

# DRF CamelCase (djangorestframework-camel-case): Library
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'djangorestframework_camel_case.render.CamelCaseJSONRenderer',
        'djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer',
        # Any other renderers
    ),
    'DEFAULT_PARSER_CLASSES': (
        # If you use MultiPartFormParser or FormParser, we also have a camel case version
        # (note from the developers)
        'djangorestframework_camel_case.parser.CamelCaseFormParser',
        'djangorestframework_camel_case.parser.CamelCaseMultiPartParser',
        'djangorestframework_camel_case.parser.CamelCaseJSONParser',
        # Any other parsers
    ),
    # Библиотека django-filter
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    # Pagination - класс и размер страницы по умолчанию для всех view, где это явно не указано
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100,
    # Permissions - default if not specified for individual views
    'DEFAULT_PERMISSION_CLASSES': [
        # use Django model permissions
        'rest_framework.permissions.DjangoModelPermissions',
    ],
    # Authentication - available authentication methods
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',  # can be used right away
        'rest_framework.authentication.TokenAuthentication',  # requires rest_framework.authtoken app
        'rest_framework.authentication.SessionAuthentication',  # нужен для работы web-интерфейса DRF
        'rest_framework_simplejwt.authentication.JWTAuthentication', # Урок 6 - задание со *
    ],
    # Versioning (version will be in request.version)
    #       Version hard-coded in URL, e.g. http://localhost/api/0.2/users/, but passed in namespace parameter
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
}

ROOT_URLCONF = 'todo_notes.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'todo_notes.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ToDo_notes - replace default user model
AUTH_USER_MODEL = 'users.User'

# GraphQL - graphene_django
GRAPHENE = {
    "SCHEMA": "todo_notes.schema.schema"       # путь до объекта с описанием схемы
}
