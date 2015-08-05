var nunjucks = require('nunjucks');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

console.log(env.render('index.nunjucks'));

process.exit();