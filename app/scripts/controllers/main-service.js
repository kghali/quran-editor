'use strict';

/**
 * @ngdoc function
 * @name editorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the editorApp
 */
angular.module('editorApp')
.factory('Quran', function ($rootScope, $http, $q) {
	return {
		get : function (soura, aya) {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : 'http://api.globalquran.com/all/ayah/' + soura + ':' + aya + '/quran-uthmani?key=b5c91a60a34caf4c306885e6a0b4f7c4&jsoncallback=?',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})

			.catch (function (e) {
				console.error("got an error in initial processing", e);
				//console.error('error: ', e.data.error);
				//console.error('exception: ', e.data.exception);
				//throw e; // rethrow to not marked as handled,
				// in $q it's better to `return $q.reject(e)` here
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						//console.log("data ="+response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
})
.factory('CompleteQuran', function ($rootScope, $http, $q) {
	return {
		get : function () {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				//url : 'http://api.globalquran.com/complete/quran-simple-clean?key=b5c91a60a34caf4c306885e6a0b4f7c4&format=json',
				url : 'data/quran-simple-clean.json',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})

			.catch (function (e) {
				console.error("got an error in initial processing", e);
				//console.error('error: ', e.data.error);
				//console.error('exception: ', e.data.exception);
				//throw e; // rethrow to not marked as handled,
				// in $q it's better to `return $q.reject(e)` here
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						//console.log("data ="+response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
})
.factory('SouarQuran', function ($rootScope, $http, $q) {
	return {
		get : function () {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : 'data/souar.json',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})

			.catch (function (e) {
				//console.error("got an error in initial processing",e);
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
})
.factory('CompleteQuran', function ($rootScope, $http, $q) {
	return {
		get : function () {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				//url : 'http://api.globalquran.com/complete/quran-simple-clean?key=b5c91a60a34caf4c306885e6a0b4f7c4&format=json',
				url : 'data/quran-simple-clean.json',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})

			.catch (function (e) {
				console.error("got an error in initial processing", e);
				//console.error('error: ', e.data.error);
				//console.error('exception: ', e.data.exception);
				//throw e; // rethrow to not marked as handled,
				// in $q it's better to `return $q.reject(e)` here
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						//console.log("data ="+response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
})
.factory('CompleteQuranUthmani', function ($rootScope, $http, $q) {
	return {
		get : function () {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : 'data/quran-uthmani.json',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})

			.catch (function (e) {
				//console.error("got an error in initial processing",e);
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
})
.factory('CompleteBook', function ($rootScope, $http, $q) {
	return {
		get : function (book) {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : 'data/'+book+'.json',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})
			.catch (function (e) {
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
})
.factory('Books', function ($rootScope, $http, $q) {
	return {
		get : function () {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : 'data/books.json',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})

			.catch (function (e) {
				//console.error("got an error in initial processing",e);
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
})
.factory('SpecialText', function ($rootScope, $http, $q) {
	return {
		get : function () {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : 'data/special.json',
				params : {},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			})

			.catch (function (e) {
				//console.error("got an error in initial processing",e);
				return deferred.reject(e);
			})
				.then(function (response) {
					if (response.status === 200) {
						deferred.resolve(response.data);
						return response.data;
					} else {
						deferred.reject('Error executing query');
					}
				});
			return deferred.promise;
		}
	};
});