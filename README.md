# tariff-app

## Установка и первый запуск

- Заполните или измените поля в backend/.env.dist и frontend/.env.dist
- Переименуйте файлы в .env.dist в .env
- Запустите ```docker-compose up``` из корневой директории проекта
- ```docker-compose -f docker-compose-dev.yml build backend```
- ```docker-compose run --rm backend sh -c "python manage.py createsuperuser"``` чтобы создать первого админа
- Если адрес в .env не менялся, то приложение доступно по адресу 0.0.0.0
- Админка для управления пользователями и тарифами по 0.0.0.0:8000/admin

## Тесты

Для тестирования backend:
- ```docker-compose -f docker-compose-dev.yml build backend```
- ```docker-compose run --rm backend sh -c "python manage.py test"```

## Демо-версия

do.2dpo.ru:81  
Админка do.2dpo.ru:8001/admin/ (admin|admin)  
API do.2dpo.ru:8001/api/user/  