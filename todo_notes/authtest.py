# Тест средств аутентификации к Уроку 7
# Необходимо запускать при работающем backend'е
import requests
import time

BASE_URL = 'http://127.0.0.1:8000/'


def sleep():
    # time.sleep(2)
    pass


def get_url(url):
    return f'{BASE_URL}{url}/'


# * не авторизован
print("Тест доступа без авторизации...")
response = requests.get(get_url('api/projects'))
assert response.status_code == 401
sleep()

# * базовая авторизация
print("Тест базовой авторизации...")
response = requests.get(get_url('api/projects'), auth=('superuser', 'superpassword'))
assert response.status_code == 200
sleep()

# * авторизация по токену
# сгенерировать или получить токен
print("Тест авторизации по токену...")
response = requests.post(get_url('api-token-auth'), data={'username': 'superuser', 'password': 'superpassword'})
assert response.status_code == 200
result = response.json()
token = result['token']
# отправить запрос
headers = {'Authorization': f'Token {token}'}
response = requests.get(get_url('api/projects'), headers=headers)
assert response.status_code == 200
sleep()

# * авторизация по JWT
# сгенерировать или получить токен
print("Тест авторизации по JWT - access...")
response = requests.post(get_url('api/token'), data={'username': 'superuser', 'password': 'superpassword'})
assert response.status_code == 200
result = response.json()
access = result['access']
refresh = result['refresh']
# отправить запрос
headers = {'Authorization': f'Bearer {access}'}
response = requests.get(get_url('api/projects'), headers=headers)
assert response.status_code == 200
sleep()
# обновление токена
print("Тест авторизации по JWT - refresh...")
response = requests.post(get_url('api/token/refresh'), data={'refresh': refresh})
assert response.status_code == 200
result = response.json()
access = result['access']
# отправить запрос
headers = {'Authorization': f'Bearer {access}'}
response = requests.get(get_url('api/projects'), headers=headers)
assert response.status_code == 200
