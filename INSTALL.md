# Установка и запуск

## Установка библиотек сервера на Python/DRF (Django Rest Framework)
- Django


    pip install django

- DRF


    pip install djangorestframework
    pip install markdown
    pip install django-filter

- Политика CORS (безопасность)


    pip install django-cors-headers

- DRF Camel Case (camel case в сторону фронтэнда) (https://github.com/vbabiy/djangorestframework-camel-case)


    pip install djangorestframework-camel-case

- JWT (JSON Web Token) authentication (https://github.com/jazzband/djangorestframework-simplejwt)


    pip install djangorestframework-simplejwt

- Mixer - библиотека генерации тестовых данных


    pip install mixer

- requests - посылка http-запросов скриптом todo_notes/authtest.py


    pip install requests

- drf-yasg - для динамического создания документации OpenAPI на основе API


    pip install drf-yasg

- зависимости (dependencies) для генерации динамической схемы OpenAPI средствами DRF
  (https://www.django-rest-framework.org/api-guide/schemas/#generating-an-openapi-schema)


    pip install pyyaml uritemplate

- GraphQL - Graphene-Django


    pip install graphene-django

- PostgreSQL - for Docker deployment


    pip install psycopg2-binary

## Клиент на JavaScript/React
### Установка node.js 
Установить node.js с https://nodejs.org/en/ .
Установить модуль npx, если не установлен:

    npm install -g npx
### Инициализация приложения
Создать приложение frontend в корневой папке проекта:

    npx create-react-app frontend
### Установка библиотек
В папке приложения frontend:
- http-запросы:


    npm install axios

- bootstrap:


    npm install bootstrap@5.2.0

- client-side routing


    npm install react-router-dom@5.2.0

- работа с cookies


    npm install universal-cookie

## Клонирование проекта
Клонируйте проект из Git 

# Размещение проекта в Docker

Проект подготовлен для размещения в Docker и проверен на локальной инсталляции Docker.
Конфигурационные файлы и изменения в проекте, необходимые для размещения его в Docker,
описаны в файле **_DOCKER.md_**.