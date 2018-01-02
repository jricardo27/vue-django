"""Django App Conf."""

from django.apps import AppConfig as DjangoAppConfig


class BaseConfig(DjangoAppConfig):
    """Django config for app `base`."""
    name = 'app.base'
