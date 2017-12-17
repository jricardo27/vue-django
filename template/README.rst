{{ name }}
==========

{{ description }}


Getting Started
---------------

1. Clone repository::

    git clone git clone URL_TO_REPO
    cd REPO_DIR

#. Initialise virtual environment, it will:

   - Create a virtualenv in `./python_env` based on Python 3.6.1.
   - Execute `./refreshenv` which will:

     - Upgrade `pip` and `setuptools`.
     - Install Python's dev requirements.
     - Upgrade `npm` if the current version is lower than 5.
     - Install `npm` packages.
   - Add `npm`'s binary directory to the `$PATH`

     .. code:: bash

        . ./startenv

# Install Gulp globally:

    .. code:: bash
        npm install gulp-cli -g

#. Configure PostGIS:

    See http://postgis.net/install/

#. Copy ``env-sample.env`` to ``.env`` and modify accordingly::

    cp ./env_files/env-sample.env .env

#. Initialise the tables in the database::

    ./manage.py migrate

#. Run development server, it will run on http://localhost:9000 :

   .. code:: bash

      gulp run-dev

    It will start up the django web server and webpack dev server.


Running UI tests
---------------------
#. Run all unit tests on karma::

    .. code:: bash
        gulp run-tests-ui


Running Python Tests
--------------------
#. Run tests::

    .. code:: bash
        pytest

   Or

    .. code:: bash
        ./manage.py test

#. Run tests and generate coverage reports::

    .. code:: bash
        pytest --cov-report term --cov-report html --cov=coverage

Alternatively there is a gulp task called ``run-tests-python`` for running the
tests.

- Run all tests AND linting::

    .. code:: bash
        gulp run-tests-python

- Run just the feature tests::

    .. code:: bash
        gulp run-tests-python --harvest

- Run a particular feature file::

    .. code:: bash
        gulp run-tests-python --harvest path/to/test.feature

- Run a test within a specified feature file::

    .. code:: bash
        gulp run-tests-python --harvest path/to/test.feature -n # (# is the scenario index starting from 1)

- Run pycodestyle and pylint over the relevant files::

    .. code:: bash
        gulp run-tests-python --lint


Running all tests
-----------------
#. Run all tests::

    .. code:: bash
        gulp run-tests-all


Running Tests on Browsers
-------------------------
It is possible to test on web browsers, by default Chrome is used.

Requirements:

- ``Chrome``
- ``Firefox``
- ``npm``.

The following are installed by ``npm``

- ``chromedriver``. For interacting with ``Chrome``
- ``geckodriver``. For interacting with ``Firefox``
- ``PhantomJS``. Headless browser.

Procedure:

#. Install ``npm`` dependencies::

    .. code:: bash
        npm install

#. Make sure the ``geckodriver`` executable is in the path::

    .. code:: bash
        export PATH=node_modules/geckodriver/bin/:$PATH

#. Run ``harvest`` (specifying the verbosity is optional)::

    .. code:: bash
        ./manage.py harvest -v 3

#. It is possible to use browsers running in a container::

    .. code:: bash
        ./app/features/tools/with_docker_browser chrome ./manage.py harvest -v 3
        ./app/features/tools/with_docker_browser firefox ./manage.py harvest -v 3
        ./app/features/tools/with_docker_browser phantomjs ./manage.py harvest -v 3


Running Tests on Browsers using BrowserStack
--------------------------------------------
It is possible to run test using remote browsers provided by BrowserStack.

In order to do so, it is necessary to install the BrowserStack binary::

    https://www.browserstack.com/local-testing

Alternatively you can move the binary file to your local bin directory::

    .. code:: bash
        mv BrowserStackLocal /usr/local/bin/

Set the following environment variables::

    .. code:: bash
        USE_BROWSERSTACK=true
        BROWSERSTACK_USER=username
        BROWSERSTACK_ACCESSKEY=ACCESSKEY

Start local BrowserStack process in the background and wait for around 10
seconds for it to start::

    .. code:: bash
        ./BrowserStackLocal ${BROWSERSTACK_ACCESSKEY} &

Run tests (on Microsoft Edge for example)::

    .. code:: bash
        BROWSER_TYPE=edge ./scripts/tests/run --harvest


Continuous Integration
----------------------
In order to keep high coding standard and verify that changes do not introduce
regressions a battery of tests is provided. Run it with::

    ./scripts/tests/run

Selenium tests can be executed against dockerized browsers::

    ./scripts/tests/run --use-docker

For more options::

    ./scripts/tests/run --help
