from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

import datetime as dt

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


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


class PriveteUserApiTests(TestCase):
    """Test the user API (private)"""

    def setUp(self):
        self.user = create_user(
            username='test_username',
            password='testpassword',
            name='Test name'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged user"""
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'username': self.user.username,
            'name': self.user.name,
            'plan': None
        })

    def test_update_user_profile(self):
        """Test updating user profile for authenticated user"""
        payload = {'name': 'New name', 'password': 'new_password'}
        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def user_pay_day_is_valid(self):
        """Test that pay day has valid datetime tipe"""
        u1 = self.user
        u2 = self.user.pay_day(dt.datetime.now() + dt.timedelta(months=1))
        u3 = self.user.pay_day('123123')

        payload = {'pay_day': dt.datetime.now() + dt.timedelta(months=1)}
        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.pay_day, payload['pay_day'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)
