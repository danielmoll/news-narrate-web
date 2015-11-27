#!/bin/sh
npm install
$WORKSPACE/node_modules/gulp/bin/gulp.js build
pushd $WORKSPACE/people-smuggler/ && . ./build.sh && popd
pushd $WORKSPACE/queen-timeline/ && mkdir -p scripts && mkdir -p css && npm i && npm run dist && popd
pushd $WORKSPACE/queen-feature/ && mkdir -p public/scripts && npm i && npm run dist && popd
pushd $WORKSPACE/robot-revolution/ && mkdir -p scripts && mkdir -p css && npm i && npm run dist && popd
pushd $WORKSPACE/migration-crisis/ && npm i && gulp build && popd
cd $WORKSPACE
