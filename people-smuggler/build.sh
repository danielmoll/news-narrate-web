#! /bin/bash
echo '-----------------------------------'
echo 'Browserifying people-smuggler'
browserify scripts/main.js --debug | uglifyjs > scripts/bundle.js
echo 'Browserify complete'
echo '-----------------------------------'
echo 'Rendering templates'
node_modules/swig/bin/swig.js render templates/main.swig > index.html
echo 'Template render complete'
echo '-----------------------------------'