'use strict';

/**
 * @ngdoc overview
 * @name editorApp
 * @description
 * # editorApp
 *
 * Main module of the application.
 */
angular
.module('editorApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'textAngular',
		'angucomplete-alt'
	])
.config(function ($routeProvider, $provide) {
	$routeProvider
	.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl'
	})
	.when('/about', {
		templateUrl : 'views/about.html',
		controller : 'AboutCtrl'
	})
	.otherwise({
		redirectTo : '/'
	});
	// this demonstrates how to register a new tool and add it to the default toolbar
	$provide.decorator('taOptions', ['taRegisterTool', '$delegate', 'textAngularManager', 
		function (taRegisterTool, taOptions, textAngularManager) { // $delegate is the taOptions we are decorating
				taRegisterTool('test', {
					buttontext : 'Insert Ayah',
					action : function () {
						editor = textAngularManager.retrieveEditor('editor').scope;
						editor.wrapSelection('insertHTML', '<b>text</b>');
					}
				});
				//taOptions.toolbar[3].push('test');
				taRegisterTool('colourRed', {
					iconclass : "fa fa-square red",
					action : function () {
						this.$editor().wrapSelection('forecolor', 'red');
					}
				});
				// add the button to the default toolbar definition
				taOptions.toolbar[1].push('colourRed');
				return taOptions;
			}
		]);
});