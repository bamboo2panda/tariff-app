from django.utils import timezone
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from dateutil.relativedelta import relativedelta
from datetime import timedelta, datetime

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')
UPDATE_PAYDAY_URL = reverse('user:update_payday')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def date_in_period_now_plus_minus_minute(date: datetime) -> bool:
    """Check if given date in period of -1 minute of now"""
    if timezone.now() - relativedelta(minutes=1) < date < timezone.now():
        return True
    return False


class PublicUserApiTests(TestCase):
    """Test the users API (public)"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""
        payload = {
            'username': 'test user',
            'password': '12sdaw4123',
            'name': 'test Name',
            'pay_day': timezone.now()
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password((payload['password'])))
        self.assertNotIn(payload['password'], res.data)

    def test_user_exists(self):
        """Test creating user that already exist faiuls"""
        payload = {
            'username': 'test_user',
            'password': '12sdaw4123',
            'name': 'test Name',
        }
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_for_user(self):
        """Test that a token is created for the user"""
        payload = {'username': 'testName', 'password': 'testpassword'}
        create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)


class PrivateUserApiTests(TestCase):
    """Test the user API (private)"""

    def setUp(self):
        self.user = create_user(
            username='test_username',
            password='testpassword',
            name='Test name',
            pay_day=timezone.now()
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged user"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.user.username)
        self.assertEqual(res.data['name'], self.user.name)
        self.assertEqual(res.data['plan'], self.user.plan)

    def test_update_user_profile(self):
        """Test updating user profile for authenticated user"""
        payload = {'name': 'New name', 'password': 'new_password'}
        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_pay_day_is_valid(self):
        """Test that pay day has valid datetime tipe"""
        payload = {
                'pay_day': timezone.now()
            }
        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.pay_day - payload['pay_day'], timedelta(0))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_update_pay_day_successful(self):
        """Test that pay_day updates seccessfull"""
        res = self.client.patch(UPDATE_PAYDAY_URL)
        res_dt = datetime.strptime(res.data['pay_day'],
                                   '%Y-%m-%dT%H:%M:%S.%f%z')
        dt_delta = res_dt - relativedelta(months=1)

        self.assertTrue(date_in_period_now_plus_minus_minute(dt_delta))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
