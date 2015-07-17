#! /bin/bash
browserify scripts/main.js --debug | uglifyjs > scripts/bundle.js