var concat = require('concat-files');
  concat([
    'a.css',
    'b.css'
  ], 'c.css', function(err) {
    console.log('done');
    console.log(err);
  });