var assert = require('assert');

describe('narrate', function(){
   this.timeout(9999999);

    it('Home test', function(done){
        browser
        .url('https://prod-narrate.firebaseapp.com')
        .click('=Map')
        .call(done)

    });


});


