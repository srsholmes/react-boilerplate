'use strict';

var notify = require('gulp-notify');

module.exports = function(error) {
  if( !global.isProd ) {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
  } else {
    // Log the error and stop the process
    // to prevent broken code from building
    console.log(error);
    process.exit(1);
  }
};