"""Django models related with a user."""

from django.contrib.auth.models import AbstractUser


class AppUser(AbstractUser):
    """Custom User model."""

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
