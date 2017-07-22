"""Django App Conf."""

from django.apps import AppConfig as DjangoAppConfig


class AppConfig(DjangoAppConfig):
    """Django conf for App."""
    name = 'app'
