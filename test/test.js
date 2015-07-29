var assert = require('assert');

describe('narrate', function(){
   this.timeout(9999999);

    it('Home test', function(done){
        browser
        .url('http://staging.narrate-web.divshot.io/london7-7')
        .click('=Map')
        .call(done);
    });
});


