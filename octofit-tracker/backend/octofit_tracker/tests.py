from rest_framework.test import APITestCase
from django.urls import reverse


class ApiEndpointsTest(APITestCase):
    def test_api_root_and_collections(self):
        # root should be available
        resp = self.client.get('/')
        self.assertIn(resp.status_code, (200, 302))

        # collections
        endpoints = ['/teams/', '/users/', '/activities/', '/workouts/', '/leaderboards/']
        for ep in endpoints:
            r = self.client.get(ep)
            self.assertIn(r.status_code, (200, 401, 403, 302))
