""" Shared components for DB models for all Django apps. """
from django.conf import settings
from django.db import models


class TimeStampedModel(models.Model):
    """Base DB model to add created and modified fields to all tables."""

    class Meta:
        abstract = True

    created = models.DateTimeField(
        verbose_name="Date created",
        auto_now_add=True,
        help_text=(
            "The date and time at which the object was entered into the system"
        ),
    )
    modified = models.DateTimeField(
        verbose_name="Date last modified",
        auto_now=True,
        help_text="The date and time at which the object was last modified",
    )


class CreatedByModel(TimeStampedModel):
    """A model that store the user that created the object."""

    class Meta:
        abstract = True

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="Created By",
        help_text='User that created the object.',
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        default=None,
    )
