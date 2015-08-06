'use strict';

require('./common.js')('fs');

var nunjucks = require('nunjucks'),
	env = new nunjucks.Environment(new nunjucks.FileSystemLoader('src/templates')),
	output = env.render('index.nunjucks');

fs.writeFileSync('index.html', output);
console.log('index.html rendered from templates');

process.exit();