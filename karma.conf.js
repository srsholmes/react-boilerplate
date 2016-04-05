module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'tap'],
    files: [
      'test/unit/**/*.js',
      'test/unit/**/*.spec.js?(x)'
    ],
    preprocessors: {
      'src/**/*.js': ['babel', 'browserify'],
      'test/**/*.js': ['babel', 'browserify']
    },
    babelPreprocessor: {
      options: {
        presets: ['airbnb', 'es2015', 'react', 'stage-0'],
        plugins: ["transform-decorators-legacy"]
      }
    },
    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          presets: ['airbnb', 'es2015', 'react', 'stage-0'],
          plugins: ["transform-decorators-legacy"]
        }]
      ],
      plugin: ['proxyquireify/plugin'],
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
        });
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false
  })
};
