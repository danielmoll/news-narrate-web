#! /bin/bash
echo '-----------------------------------'
echo 'Browserifying people-smuggler'
browserify scripts/main.js --debug | uglifyjs > scripts/bundle.js
echo 'Browserify complete'
echo '-----------------------------------'