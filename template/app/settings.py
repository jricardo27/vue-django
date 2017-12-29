"""Django settings for {{ name }} project."""

import os
import sys
import textwrap

import environ
from unipath import Path


# ----------------------------------------------------------
# Directory Structure
# ----------------------------------------------------------

PROJECT_ROOT = Path(__file__).ancestor(1)
REPOSITORY_ROOT = Path(__file__).ancestor(2)
PROJECT_CONTAINER = Path(__file__).ancestor(3)


# ----------------------------------------------------------
# Environment Variables
# ----------------------------------------------------------

environ.Env.read_env(REPOSITORY_ROOT.child('.env'))

env = environ.Env(  # pylint: disable=invalid-name
    SECRET_KEY=str,
    DEBUG=(bool, False),
    ALLOWED_HOSTS=list,
    EMAIL_FROM=str,
    EMAIL_DESTINATARIES=list,
    STATIC_DIRNAME=(str, 'static'),
    STATIC_ROOT=(str, PROJECT_ROOT.child('staticfiles')),
    COMMIT=(str, None),
    DEPLOY_VERSION=(str, None),
    DJANGO_LOG_LEVEL=(str, 'INFO'),
    SENTRY_DSN=(str, None),
    GOOGLE_API_KEY=(str, None),
    WEBPACK_DEV_SERVER_URL=(str, None),
    UI_ROOT=(str, 'ui'),
    USE_WEBPACK_DEV_SERVER=(bool, False),
)

# ----------------------------------------------------------
# Security Keys
# ----------------------------------------------------------

SECRET_KEY = env('SECRET_KEY')


# ----------------------------------------------------------
# Development Debugging
# ----------------------------------------------------------

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG')


# ----------------------------------------------------------
# Allowed Hosts Configuration
# ----------------------------------------------------------

ALLOWED_HOSTS = env('ALLOWED_HOSTS')


# ----------------------------------------------------------
# Webpack Configuration
# ----------------------------------------------------------

# Flag to serve the resources from webpack-dev-server.
if DEBUG:
    USE_WEBPACK_DEV_SERVER = env.bool('USE_WEBPACK_DEV_SERVER')
else:
    USE_WEBPACK_DEV_SERVER = False

# Webpack dev server serving js, css etc.
WEBPACK_DEV_SERVER_URL = env('WEBPACK_DEV_SERVER_URL')

# Subdirectory name in webpack public path.
UI_ROOT = env('UI_ROOT')

# The build path of javascript project.
UI_BUILD_PATH = REPOSITORY_ROOT.child(UI_ROOT).child('dist')


# ----------------------------------------------------------
# Application Definition
# ----------------------------------------------------------

INSTALLED_APPS = [
    'django-extensions',
    'raven.contrib.django.raven_compat',
    'rest_framework',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

PROJECT_APPS = [
    'app.base.apps.BaseConfig',
]

TESTING_APPS = [
    'aloe_django',
]

INSTALLED_APPS = PROJECT_APPS + INSTALLED_APPS


# pylint:disable=line-too-long
MIDDLEWARE_CLASSES = [
    'raven.contrib.django.raven_compat.middleware.SentryResponseErrorIdMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# pylint:enable=line-too-long

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            PROJECT_ROOT.child('templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'debug': DEBUG,
        },
    },
]

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'app.wsgi.application'


# ----------------------------------------------------------
# Database Configuration
# ----------------------------------------------------------

DATABASES = {
    'default': env.db()
}
DATABASES['default']['ATOMIC_REQUESTS'] = True


CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators
# pylint:disable=line-too-long
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
# pylint:enable=line-too-long


# ----------------------------------------------------------
# Internationalization
# ----------------------------------------------------------

LANGUAGE_CODE = 'en-us'

TIME_ZONE = env('TIME_ZONE', default='UTC')

USE_I18N = True

USE_L10N = True

USE_TZ = True


# ----------------------------------------------------------
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/
# ----------------------------------------------------------

STATICFILES_DIRS = [
    (UI_ROOT, UI_BUILD_PATH),
]

# Where files are being served from.
STATIC_ROOT = env('STATIC_ROOT')

STATIC_URL = '/static/'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# ----------------------------------------------------------
# Google Maps Configuration
# ----------------------------------------------------------
if env('GOOGLE_API_KEY'):
    GOOGLE_API_KEY = env('GOOGLE_API_KEY')


# ----------------------------------------------------------
# Email Configuration
# ----------------------------------------------------------
EMAIL_CONFIG = env.email_url('EMAIL_URL', 'memorymail://')
vars().update(EMAIL_CONFIG)

DEFAULT_FROM_EMAIL = env('EMAIL_FROM')


# ----------------------------------------------------------
# Version numbers
# ----------------------------------------------------------

COMMIT = env("COMMIT")
DEPLOY_VERSION = env("DEPLOY_VERSION")


# ----------------------------------------------------------
# Logging
# ----------------------------------------------------------
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '[%(asctime)s: %(levelname)s/%(name)s] %(message)s',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'default',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}

if env('SENTRY_DSN'):
    LOGGING['handlers']['sentry'] = {
        'level': 'ERROR',
        'class': 'raven.contrib.django.raven_compat.handlers.SentryHandler'
    }

    LOGGING['loggers']['']['handlers'].append('sentry')


if env('SENTRY_DSN'):
    RAVEN_CONFIG = {
        'dsn': env('SENTRY_DSN'),
        'release': COMMIT,
    }


# ----------------------------------------------------------
# Testing
# ----------------------------------------------------------

GHERKIN_TEST_CLASS = 'app.features.aloe.TestCase'

TEST_COMMANDS = ['test', 'harvest']

# Only make these changes if we know we're running tests
if len(sys.argv) > 1 and sys.argv[1] in TEST_COMMANDS:
    INSTALLED_APPS += TESTING_APPS

    class DisableMigrations(object):
        """Disable all migrations by mocking a list of applications."""
        def __contains__(self, item):
            return True

        def __getitem__(self, item):
            return None

    MIGRATION_MODULES = DisableMigrations()

    # Make sure debug is on within all template handlers.
    for template_block in TEMPLATES:
        template_block['OPTIONS']['debug'] = True

    # Disable loggers output when running tests.
    HELPERS = [
        'aloe_webdriver',
        'factory',
        'raven',
        'selenium',
    ]

    for helper in HELPERS:
        LOGGING['loggers'][helper] = {
            'propagate': False,
        }


# ----------------------------------------------------------
# Override settings locally.
# ----------------------------------------------------------

try:
    if os.path.isfile('.settings_local'):
        # pylint:disable=import-error,unused-wildcard-import,wildcard-import
        from .settings_local import *
        # pylint:enable=import-error,unused-wildcard-import,wildcard-import
except Exception as exc:  # pylint:disable=broad-except
    print(textwrap.dedent("""\

    It was not possible to load `settings_local.py`:
    {exception}

    """.format(
        exception=exc,
    )))
