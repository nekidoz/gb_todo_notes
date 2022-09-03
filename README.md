# Запуск проекта 

Для установки необходимого окружения смотрите файл INSTALL.md

## Сервер

Запустите сервер из папки todo_notes/ командой

    python manage.py runserver

### Пользователи

| Админ? | Логин         | Пароль           | Назначение                                                                                                                        |
|--------|---------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| да     | superuser     | superpassword    | Админ                                                                                                                             |
| нет    | developer1    | dev1password     | Урок 6 - член группы Developers (разработчики, имеют все права на модель ToDo, могут просматривать модели Project и User)         |
| нет    | developer2    | dev2password     | Урок 6 - член группы Developers (см. выше)                                                                                        |
| нет    | projectowner1 | projown1password | Урок 6 - член группы Project Owners (владельцы проектов имеют права на просмотр модели User и все права на модель Project и ToDo) |
| нет    | projectowner2 | projown2password | Урок 6 - член группы Project Owners (см. выше)                                                                                    |

## Клиент

Запустите клиент из папки frontend/ командой

    npm run start

# Служебные утилиты

## Скрипт генерации пользователей

Запустите скрипт генерации пользователей из папки todo_notes/ командой 

    python manage.py createtestusers 

В качестве аргументов передайте имена пользователей

Чтобы создать супервизора, начните имя пользователя с префикса 'super'

## Проверка функциональности Урока 6

В корне проекта помещен файл экспорта Postman

    lesson6.postman_collection.json
с тестовыми запросами к backend'у для проверки функционирования базовой авторизации, авторизации по токену DRF, 
а также JWT (задание со *).