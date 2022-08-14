# Установка и запуск

## Установка библиотек сервера на Python/DRF (Django Rest Framework)
- Django


    pip install django

- DRF


    pip install djangorestframework
    pip install markdown
    pip install django-filter

- Политика CORS


    pip install django-cors-headers

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

    npm install axios
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