# Запуск проекта 

Для установки необходимого окружения смотрите файл INSTALL.md

## Сервер

Запустите сервер из папки todo_notes/ командой

    python manage.py runserver

### Доступ к REST web API

Для доступа к основному API введите:

    http://127.0.0.1:8000/api

Для доступа к демонстрации системы версий (API v2) введите:

    http://127.0.0.1:8000/api/v2

На момент написания данного руководства для модели User в версии API v2 доступно дополнительное поле - 
isStaff (is_staff в модели Django)

### Пользователи

| Админ? | Логин         | Пароль           | Назначение                                                                                                                        |
|--------|---------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| да     | superuser     | superpassword    | Админ                                                                                                                             |
| нет    | developer1    | dev1password     | Урок 6 - член группы Developers (разработчики, имеют все права на модель ToDo, могут просматривать модели Project и User)         |
| нет    | developer2    | dev2password     | Урок 6 - член группы Developers (см. выше)                                                                                        |
| нет    | projectowner1 | projown1password | Урок 6 - член группы Project Owners (владельцы проектов имеют права на просмотр модели User и все права на модель Project и ToDo) |
| нет    | projectowner2 | projown2password | Урок 6 - член группы Project Owners (см. выше)                                                                                    |

### Тесты

Запустите тесты backend'а из папки todo_notes/ командой

    python manage.py test

### Документация REST интерфейса - drf-yasg

Для приложения доступна документация REST интерфейса, сгенерированная с использованием библиотеки drf-yasg.

Для отображения документации в формате JSON для машинной обработки:

    http://127.0.0.1:8000/drf-yasg/swagger.json

Для отображения документации в формате YAML для машинной обработки:

    http://127.0.0.1:8000/drf-yasg/swagger.yaml

Для отображения документации, сгенерированной Swagger:

    http://127.0.0.1:8000/drf-yasg/swagger

Для отображения документации, сгенерированной Redoc:

    http://127.0.0.1:8000/drf-yasg/redoc

### Документация REST интерфейса - DRF

Для приложения доступна документация REST интерфейса, сгенерированная с использованием собственных средств DRF.

Для отображения документации в формате YAML для машинной обработки:

    http://127.0.0.1:8000/drf/openapi

Для отображения документации, сгенерированной Swagger:

    http://127.0.0.1:8000/drf/swagger

Для отображения документации, сгенерированной Redoc:

    http://127.0.0.1:8000/drf/redoc

### Web-интерфейс GraphQL

Доступен web-интерфейс GraphQL по адресу:

    http://127.0.0.1:8000/graphql

## Клиент

Запустите клиент из папки frontend/ командой

    npm run start

### Доступ к UI

Для доступа к интерфейсу пользователя на React наберите:

    http://localhost:3000

# Служебные утилиты

## Скрипт генерации пользователей

Запустите скрипт генерации пользователей из папки todo_notes/ командой 

    python manage.py createtestusers 

В качестве аргументов передайте имена пользователей

Чтобы создать супервизора, начните имя пользователя с префикса 'super'

## Проверка функциональности Урока 6

### Postman

В корне проекта помещен файл экспорта Postman

    lesson6.postman_collection.json
с тестовыми запросами к backend'у для проверки функционирования базовой авторизации, авторизации по токену DRF, 
а также JWT (задание со *).

### Скрипт

В файле 

    todo_notes/authtest.py 

размещен тестовый код всех видов авторизации.

# Дополнительная информация

## Примеры запросов GraphQL

### Запросы к данным (Query)

Ниже даны примеры запросов GraphQL к данным в существующей схеме данных.

    {
      allUsers {
        id
        firstName
        lastName
        username
        email
      }

      allProjects {
        id
        name
        memberUsers {
          firstName
          lastName
          username
          email      
        }
      }

      allTodos {
        id
        text
        isActive
        dateCreated
        dateUpdated
        creatorUser {
          firstName
          lastName
          username
          email            
        }
        project {
          id
          name
          memberUsers {
            firstName
            lastName
            username
            email      
          }      
        }
      }

      projectById(id: 1) {
        name
        memberUsers {
          firstName
          lastName
        }
      }

      todosByUserLastName(lastName: "1") {
        text
        project {
          name
        }
      }

      todosByUserLastName {
        text
        project {
          name
        }
      }
    }

### Запросы на изменение данных (Mutation)

Ниже даны примеры запросов GraphQL на изменение данных в существующей схеме данных.

    mutation create_todo {
      createTodo(user: 1, project: 1, text: "Давайте уже поработаем над этим") {
        todo {
          id
          text
          project {
            name
          }
          creatorUser {
            firstName
            lastName
          }
          isActive
          dateCreated
          dateUpdated
        }
      }
    }
    
    mutation update_todo {
      updateTodo(id: 4, text: "Давайте уже поработаем над этим как следует") {
        todo {
          id
          text
          isActive
          dateCreated
          dateUpdated
        }
      }
    }
    
    mutation delete_todo {
      deleteTodo(id: 4) {
        todo {
          id
          text
          project {
            name
          }
          creatorUser {
            firstName
            lastName
          }
          isActive
          dateCreated
          dateUpdated
        }
      }
    }

