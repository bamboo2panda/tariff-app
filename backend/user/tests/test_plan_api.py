from django.test import TestCase
from django.urls import reverse

from core.models import Plan


GET_PLANS_LIST = reverse('user:get_plans_list')


class TestPlanAPI(TestCase):
    """Test the plan API"""
    def test_get_plans_list_success(self):
        """Test retrieve list of available plans"""
        Plan.objects.create(
            name='Plan1',
            price=10
        )
        Plan.objects.create(
            name='Plan2',
            price=23
        )
        res = self.client.get(GET_PLANS_LIST)
        self.assertEqual(len(res.data), 2)
