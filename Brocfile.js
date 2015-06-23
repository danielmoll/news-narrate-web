var pickFiles = require('broccoli-static-compiler');
var fastBrowserify = require('broccoli-fast-browserify');
var babelTranspiler = require('broccoli-babel-transpiler');
var mergeTrees = require('broccoli-merge-trees');

var libTree = pickFiles('src', {

    files: ['**/*.js'],

    srcDir: './',
    destDir: './assets'

});

var babelTree = babelTranspiler(libTree, { sourceMap: 'inline' });

var browserifyTree = fastBrowserify(babelTree, {

    bundles: {
        'narrate.js': {
            entryPoints: ['./assets/index.js']
        }
    },

    browserify: {
        debug: true
    }

});

module.exports = browserifyTree;


