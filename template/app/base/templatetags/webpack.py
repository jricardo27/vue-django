"""Template tags for webpack related resource loading."""
from django import template
from django.conf import settings
from django.templatetags.static import static


register = template.Library()


@register.simple_tag
def webpack_static(resource):
    """
    Template tag for returning correct URL.

    Prepends settings.WEBPACK_DEV_SERVER_URL to the `resource`. If not using
    webpack then it uses the regular `static` template tag.

    :param resource: String. Partial path.
    :return: String. Correct URL for the resource.
    """

    resource = "{}/{}".format(settings.UI_ROOT, resource)

    if settings.USE_WEBPACK_DEV_SERVER:
        return "{WEBPACK_SERVER}/{RESOURCE}".format(
            WEBPACK_SERVER=settings.WEBPACK_DEV_SERVER_URL,
            RESOURCE=resource,
        )

    return static(resource)
