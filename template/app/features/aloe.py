"""Aloe configuration."""

from django.conf import settings
from aloe_django import TestCase as AloeDjangoTestCase  # pylint: disable=ungrouped-imports


class TestCase(AloeDjangoTestCase):
    """Base test class for Django Gherkin tests."""

    def setUp(self):
        """Activate debug mode."""

        super(TestCase, self).setUp()
        settings.DEBUG = True
