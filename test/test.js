var webdriverio = require('webdriverio');
var assert = require('assert');

describe('narrate', function(){
   this.timeout(9999999);
    var client = {};

    var options = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };

    before(function(done){
        client = webdriverio.remote(options)
        client.init(done);
    });


    it('Home test', function(done){
        client
        .url('http://localhost:3002')
        .click('=Map')
    });


});


