#! /bin/bash
echo '-----------------------------------'
echo 'Browserifying queen-timeline'
browserify scripts/main.js --debug | uglifyjs > scripts/bundle.js
echo 'Browserify complete'
echo '-----------------------------------'
echo 'Generating template queen-timeline'
node render-templates.js > index.html
echo 'Generating template complete'
echo '-----------------------------------'

