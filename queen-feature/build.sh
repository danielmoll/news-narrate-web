#! /bin/bash
echo '-----------------------------------'
echo 'Browserifying Queen Feature'
browserify scripts/src/main.js --debug | uglifyjs > scripts/bundle.js
echo 'Browserify complete'
echo '-----------------------------------'
