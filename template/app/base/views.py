"""Views."""

from django.views.generic import TemplateView


class IndexView(TemplateView):
    """Index view."""

    template_name = 'index.html'
