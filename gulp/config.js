'use strict';

module.exports = {
  'serverport': 1337,
  'scripts': {
    'src': './app/js/**/*.js',
    'dest': './public/js/'
  },
  'images': {
    'src': './app/images/**/*.{jpeg,jpg,png}',
    'dest': './public/images/'
  },
  'styles': {
    'src': './app/scss/**/*.scss',
    'dest': './public/css/'
  },
  'sourceDir': './app/',
  'buildDir': './public/'
};