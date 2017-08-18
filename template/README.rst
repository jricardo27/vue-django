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

#. Run development server, it will run on http://localhost:9000 :

   .. code:: bash

      gulp run-dev




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test

# deploy
.deploy.sh
```

For detailed explanation on how things work, checkout the [guide](https://github.com/vuejs-templates/webpack#vue-webpack-boilerplate) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
