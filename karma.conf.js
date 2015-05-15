module.exports = function(config) {
	config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			// angular
			'bower_components/angular/angular.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-material/angular-material.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-aria/angular-aria.js',
			'bower_components/angular-bootstrap/ui-bootstrap.js',
			'client/js/sortable.js',
			'client/js/ui-bootstrap-tpls-0.9.0.min.js',

			'client/app/**/*.js',

			'specs/client/**/*.js'
		],

		exclude: [
			'karma.conf.js'
		],

		reporters: ['nyan'],

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: false,

		browsers: ['Chrome'],

		singleRun: true
	});
};