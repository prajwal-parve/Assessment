module.exports = function(config) {
  config.set({
    basePath: 'src',  
    frameworks: ['jasmine', '@angular-devkit/build-angular'],  
    plugins: [
      require('karma-jasmine'),  
      require('karma-chrome-launcher'),  
      require('karma-jasmine-html-reporter'),  
      require('karma-coverage'),  
      require('@angular-devkit/build-angular/plugins/karma')  
    ],
    client: {
      jasmine: {
        random: false,  
        seed: '4321'  
      },
      clearContext: false  
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']  
    },
    jasmineHtmlReporter: {
      suppressAll: true  
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/todolistapp'),  
      subdir: '.',  
      reporters: [
        { type: 'html' },  
        { type: 'text-summary' }  
      ]
    },
    reporters: ['progress', 'kjhtml'],  
    port: 9876, 
    colors: true,  
    logLevel: config.LOG_INFO,  
    autoWatch: true,  
    browsers: ['Chrome'],  
    singleRun: false,  
    restartOnFileChange: true, 
    browserNoActivityTimeout: 100000,  
    concurrency: Infinity  
  });
};
