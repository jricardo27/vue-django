#!/usr/bin/env bash

EXTENSIONS=".js,.vue"
TARGET_FILES="gulpfile.js \
    ui/build \
    ui/config \
    ui/src/ \
    ui/test/unit"

eslint \
    --format 'node_modules/eslint-friendly-formatter' \
    --ext ${EXTENSIONS} \
    ${TARGET_FILES} $@
