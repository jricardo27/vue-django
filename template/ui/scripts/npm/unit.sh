#!/usr/bin/env bash
cross-env BABEL_ENV=test karma start ui/test/unit/karma.conf.js --single-run $@
