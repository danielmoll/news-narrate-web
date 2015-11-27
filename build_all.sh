#!/bin/sh
npm install
./node_modules/gulp/bin/gulp.js build
pushd people-smuggler/ && . ./build.sh && popd
pushd queen-timeline/ && mkdir scripts && mkdir css && npm i && npm run dist && popd
pushd queen-feature/ && mkdir public/scripts && npm i && npm run dist && popd
pushd robot-revolution/ && mkdir scripts && mkdir css && npm i && npm run dist && popd
pushd migration-crisis/ && npm i && gulp build && popd
