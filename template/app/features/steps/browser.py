"""Link a browser to Selenium."""

import os
import subprocess

from contextlib import contextmanager

from aloe import around, world
from selenium import webdriver
from xvfbwrapper import Xvfb


def current_git_branch():
    """Get the current Git branch."""

    status = subprocess.check_output(
        ['git', 'status', '-b', '--porcelain'],
    ).decode('utf-8')
    first_line = status.split('\n')[0]
    branch = first_line.split('## ')[1]

    return branch


@around.all
@contextmanager
def with_browser():
    """Start a browser for the tests."""

    if 'XVFB' in os.environ:
        world.vdisplay = Xvfb(width=1200, height=800)
        world.vdisplay.start()

    world.browser = create_browser()

    yield

    world.browser.quit()
    delattr(world, 'browser')

    if hasattr(world, 'vdisplay'):
        world.vdisplay.stop()


def browser_type():
    """Browser type selected for the tests."""

    return os.environ.get('BROWSER_TYPE', 'firefox')


def custom_chrome():
    """Start Chrome with custom options."""

    options = webdriver.ChromeOptions()
    options.add_experimental_option('prefs', {
        'credentials_enable_service': False,
        'profile': {
            'password_manager_enabled': False,
        },
    })

    return webdriver.Chrome(chrome_options=options)


def create_browser():
    """Create a Selenium browser for tests."""

    if 'SELENIUM_ADDRESS' in os.environ:
        address = 'http://{}/wd/hub'.format(os.environ['SELENIUM_ADDRESS'])

        capabilities = {
            'chrome': webdriver.DesiredCapabilities.CHROME,
            'firefox': webdriver.DesiredCapabilities.FIREFOX,
            'edge': webdriver.DesiredCapabilities.EDGE,
            'ie': webdriver.DesiredCapabilities.INTERNETEXPLORER,
            'phantomjs': webdriver.DesiredCapabilities.PHANTOMJS,
        }
        try:
            browser = capabilities[browser_type()]
        except KeyError:
            raise ValueError("Invalid BROWSER_TYPE.")

        if os.environ.get('USE_BROWSERSTACK'):
            browser.update({
                'browserstack.user': os.environ['BROWSERSTACK_USER'],
                'browserstack.key': os.environ['BROWSERSTACK_ACCESSKEY'],
                'browserstack.local': True,
                'build': '{{ name }}',
                'project': current_git_branch(),
                'os': 'Windows',
                'os_version': '10',
                'resolution': '1280x800',
            })

        return webdriver.Remote(
            address,
            desired_capabilities=browser,
        )
    else:
        browsers = {
            'chrome': custom_chrome,
            'firefox': webdriver.Firefox,
            'phantomjs': webdriver.PhantomJS,
        }
        driver = browsers[browser_type()]

        # Explicitly specify the browser locale for the date input tests to work
        # regardless of the user's settings.
        old_lc_all = os.environ.get('LC_ALL', '')
        try:
            os.environ['LC_ALL'] = 'en_US'
            return driver()
        finally:
            os.environ['LC_ALL'] = old_lc_all
