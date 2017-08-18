#!/usr/bin/env bash

EXTENSIONS=".js,.vue"
TARGET_FILES="gulpfile.js \
    ui/build \
    ui/config \
    ui/src/js \
    ui/src/entries \
    ui/test/unit"

eslint \
    --format 'node_modules/eslint-friendly-formatter' \
    --ext ${EXTENSIONS} \
    ${TARGET_FILES} $@
