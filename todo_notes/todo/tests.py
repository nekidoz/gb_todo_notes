from django.test import TestCase

from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase, RequestsClient
from rest_framework import status

from mixer.backend.django import mixer

from .views import ProjectModelViewSet
from users.models import User
from .models import Project

# ******************************* APIRequestFactory *********************************
# Создание запросов для изолированного тестирования view без передачи запросов на сервер

class TestProjects(TestCase):

    def setUp(self) -> None:
        self.factory = APIRequestFactory()      # Фабрика для создания запросов
        self.url = '/api/projects/'             # url для запросов
        # Создание пользователей
        self.user_authorized_read = User.objects.create_user('junior', 'junior@somewhere.nownere', 'jun123456')
        self.user_authorized_all = User.objects.create_superuser('admin', 'admin@somewhere.nowhere', 'admin123456')
        # Шаблоны "плохой" и "хорошей" записей
        self.bad_record = {'repository_url': 'http://somesite.nowhere'}
        self.good_record = {'name': 'Что поделать?', 'repository_url': 'http://somesite.nowhere'}

    def tearDown(self) -> None:
        pass

    # Получить список проектов (анонимный пользователь)
    def test_get_project_list__anonymous__http_401_unauthorized(self):
        request = self.factory.get(self.url)    # Создание запроса для передачи во view, минуя сеть (не на сервер)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)                # Передача запроса непосредственно во view
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Получить список проектов (авторизованный пользователь)
    def test_get_project_list__authorized__http_200_ok(self):
        request = self.factory.get(self.url)
        force_authenticate(request, self.user_authorized_read)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)                # Передача запроса непосредственно во view
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Создать проект (неавторизованный пользователь)
    def test_create_project__unauthorized__http_403_forbidden(self):
        request = self.factory.post(self.url, self.good_record, format='json')
        force_authenticate(request, self.user_authorized_read)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # Создать проект (авторизованный пользователь, "плохая" запись)
    def test_create_project__authorized__http_400_bad_request(self):
        request = self.factory.post(self.url, self.bad_record, format='json')
        force_authenticate(request, self.user_authorized_all)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Создать проект (авторизованный пользователь, "хорошая" запись)
    def test_create_project__authorized__http_201_created(self):
        request = self.factory.post(self.url, self.good_record, format='json')
        force_authenticate(request, self.user_authorized_all)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


# *********************************** APIClient *************************************
# Отправка REST запросов на API

class TestToDosRead(TestCase):

    def setUp(self) -> None:
        self.client = APIClient()       # Инициализация клиента API
        self.url = '/api/todos/'        # url для запросов
        # Данные авторизованного пользователя и его создание
        self.user_authorized_read_data = {'username': 'junior', 'password': 'jun123456'}
        self.user_authorized_read = User.objects.create_user(**self.user_authorized_read_data)

    # Получить список напоминаний (анонимный пользователь)
    def test_get_todo_list__anonymous__http_401_unauthorized(self):
        response = self.client.get(f'{self.url}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Получить список напоминаний (анонимный пользователь)
    def test_get_todo_list__authorized__http_200_ok(self):
        self.client.login(**self.user_authorized_read_data)
        response = self.client.get(f'{self.url}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# **************************** APITestCase with mixer *******************************
# APITestCase уже содержит в себе экземпляр класса APIClient
# mixer используется для создания (псевдо)случайных тестовых данных

class TestToDosWrite(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/todos/'      # url для запросов
        # Данные авторизованных пользователей и их создание
        self.user_authorized_read_data = {'username': 'junior', 'password': 'jun123456'}
        self.user_authorized_read = User.objects.create_user(email=f"[{self.user_authorized_read_data['username']}@somewhere.nowhere",
                                                             **self.user_authorized_read_data)
        self.user_authorized_all_data = {'username': 'admin', 'password': 'admin123456'}
        self.user_authorized_all = User.objects.create_superuser(email=f"[{self.user_authorized_all_data['username']}@somewhere.nowhere",
                                                                 **self.user_authorized_all_data)
        # Создание тестовых данных с помощью mixer
        user = mixer.blend(User)
        project = mixer.blend(Project)
        # Шаблоны "плохой" и "хорошей" записей
        self.bad_record = {'text': 'Надо уже приступать, однако'}
        self.good_record = {'project': project.id, 'text': 'Ну что ж, приступим', 'creator_user': user.id}

    # Создать заметку (неавторизованный пользователь)
    def test_create_todo__unauthorized__http_403_forbidden(self):
        self.client.login(**self.user_authorized_read_data)
        response = self.client.put(f'{self.url}', self.good_record)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # Создать заметку (авторизованный пользователь, "плохая" запись)
    def test_create_todo__authorized__http_400_bad_request(self):
        self.client.login(**self.user_authorized_all_data)
        response = self.client.post(f'{self.url}', self.bad_record)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Создать заметку (авторизованный пользователь, "хорошая" запись)
    def test_create_todo__authorized__http_201_created(self):
        self.client.login(**self.user_authorized_all_data)
        response = self.client.post(f'{self.url}', self.good_record)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


# *************************** RequestClient - LIVE TESTS ****************************
# Отправка запросов на тестовый или production сервер с использованием библиотеки requests

class TestAuthorization(TestCase):

    def setUp(self) -> None:
        self.client = RequestsClient()              # Инициализация клиента
        self.base_url = 'http://127.0.0.1:8000/'    # Базовый url для запросов
        self.json_api_url = 'api/projects'          # url для тестирования JSON API
        self.token_url = 'api-token-auth'           # url API для получения токена
        self.jwt_get_url = 'api/token'              # url API для получения токена JWT
        self.jwt_refresh_url = 'api/token/refresh'  # url API для обновления токена JWT
        # Данные авторизованных пользователей и их создание
        self.user_authorized_all_data = {'username': 'admin', 'password': 'admin123456'}
        self.user_authorized_all = User.objects.create_superuser(**self.user_authorized_all_data)

    def get_url(self, url):
        return f'{self.base_url}{url}/'

    # Тест доступа без авторизации
    def test_auth__anonymous__http_401_unauthorized(self):
        response = self.client.get(self.get_url(self.json_api_url))
        assert response.status_code == 401

    # Тест базовой авторизации
    def test_auth__base__http_200_ok(self):
        response = self.client.get(self.get_url(self.json_api_url), auth=tuple(self.user_authorized_all_data.values()))
        assert response.status_code == 200

    # Тест авторизации по токену
    def test_auth__token__http_200_ok(self):
        # сгенерировать или получить токен
        response = self.client.post(self.get_url(self.token_url), data=self.user_authorized_all_data)
        assert response.status_code == 200
        result = response.json()
        token = result['token']

        # отправить запрос
        headers = {'Authorization': f'Token {token}'}
        response = self.client.get(self.get_url(self.json_api_url), headers=headers)
        assert response.status_code == 200

    # Тест авторизации по JWT
    def test_auth__jwt__http_200_ok(self):
        # сгенерировать или получить токены доступа и обновления
        response = self.client.post(self.get_url(self.jwt_get_url), data=self.user_authorized_all_data)
        assert response.status_code == 200
        result = response.json()
        access = result['access']
        refresh = result['refresh']

        # отправить запрос
        headers = {'Authorization': f'Bearer {access}'}
        response = self.client.get(self.get_url(self.json_api_url), headers=headers)
        assert response.status_code == 200

        # обновление токена
        response = self.client.post(self.get_url(self.jwt_refresh_url), data={'refresh': refresh})
        assert response.status_code == 200
        result = response.json()
        access = result['access']

        # отправить запрос
        headers = {'Authorization': f'Bearer {access}'}
        response = self.client.get(self.get_url(self.json_api_url), headers=headers)
        assert response.status_code == 200
