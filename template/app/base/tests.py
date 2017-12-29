"""Tests."""
from django.test import TestCase


class TestView(TestCase):
    """Test the views of the application"""

    def setUp(self):
        """Setup required before running tests."""
        pass

    def tearDown(self):
        """Clean up after tests."""
        pass

    def test_index_view(self):
        """Test the index is rendered."""

        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
