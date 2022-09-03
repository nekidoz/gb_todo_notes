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

## Клонирование проекта
Клонируйте проект из Git 

## Запуск
### Запуск сервера
Из папки сервера:

    python manage.py runserver
#### Доступ к API
http://127.0.0.1:8000/api

### Запуск клиента
Из папки клиента:

    npm run start
#### Доступ к UI
http://localhost:3000