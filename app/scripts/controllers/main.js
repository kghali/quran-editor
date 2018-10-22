'use strict';

/**
 * @ngdoc function
 * @name editorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the editorApp
 */
angular.module('editorApp')
.controller('MainCtrl', ['$scope', 'taSelection', 'textAngularManager', 'Quran', 'CompleteQuran', 'CompleteQuranUthmani', 'SouarQuran', 'CompleteBook', 'Books', 'SpecialText', '$q', function wysiwygeditor($scope, taSelection, textAngularManager, Quran, CompleteQuran, CompleteQuranUthmani, SouarQuran, CompleteBook, Books, SpecialText, $q) {
			$scope.orightml = '&rlm;';
			$scope.htmlcontent = $scope.orightml;
			$scope.disabled = false;
			$scope.specialText = "my special text";
			$scope.ayahExist = true;
			$scope.showResult = false;
			//$scope.book.prefix = "bukhari";
			$scope.hadithExist = true;
			$scope.showResultHadith = false;
			$scope.isCollapsed = true;
			$scope.isCollapsed2 = true;
			
			//get souar names
			SouarQuran.get()
			.catch (function (e) {
				console.error('error: ', e.data.error);
				console.error('exception: ', e.data.exception);
				throw e;
			})
				.then(function (result) {
					$scope.souarQuran = result;
					//console.log($scope.souarQuran);
				})
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
				.finally (function () {
					console.log("finally finished");
				});
			//getr special texts
			SpecialText.get()
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
				.then(function (result) {
					$scope.specialTexts = result;
					console.log($scope.specialTexts);
				})
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
				.finally (function () {
					console.log("finally finished");
				});
			//convert complete Quran to array of String
			CompleteQuran.get()
			.catch (function (e) {
				console.error('error: ', e.data.error);
				console.error('exception: ', e.data.exception);
				throw e;
			})
				.then(function (result) {
					//console.log(result);
					//$scope.completeQuran = result.split('\n');
					$scope.completeQuran = [];
					var quran = result["quran-simple-clean"];
					for (var i = 0; i <= 6235; i++) {
						var ayah = quran[Object.keys(quran)[i]];

						$scope.completeQuran.push(quran[Object.keys(quran)[i]]);
						//console.log(quran[Object.keys(quran)[i]])
					}

					//console.log($scope.completeQuran);
				})
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
					.finally (function () {
							console.log("finally finished");
				});
			//convert complete Quran Uthmani to array of String
			CompleteQuranUthmani.get()
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
				.then(function (result) {
					$scope.completeQuranUthmani = [];
					var quran = result["quran-uthmani"];
					for (var i = 0; i <= 6235; i++) {
						var ayah = quran[Object.keys(quran)[i]];
						$scope.completeQuranUthmani.push(quran[Object.keys(quran)[i]]);
					}

				})
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
					.finally (function () {
							console.log("finally finished");
				});

			$scope.findByValue = function (source, property, value) {
				for (var i = 0; i < source.length; i++) {
							if (source[i][property] === value) {
								return source[i];
							}
						}
				throw "Couldn't find surah with "+property+" = "+value;
			}
			$scope.findVerse = function(quran, soura, aya){
				for (var i = 0; i < quran.length; i++) {
							if ((quran[i]["surah"] === soura) && (quran[i]["ayah"] === aya)) {
								return quran[i]["verse"];
							}
						}
				throw "Couldn't find ayah "+aya+" from surah "+soura;
			}
			
			$scope.searchAya = function(){
				for(var i=0; i < $scope.completeQuranUthmani.length; i++){
					if(($scope.completeQuranUthmani[i]["surah"] === Number($scope.soura)) && ($scope.completeQuranUthmani[i]["ayah"] === Number($scope.aya))){
						console.log($scope.completeQuranUthmani[i]);
						$scope.selectedAyah = {};
						$scope.selectedAyah.title = $scope.completeQuranUthmani[i]["verse"];
						$scope.selectedAyah.description = $scope.completeQuranUthmani[i];
						//get aya image
						$scope.ayaImage = "data/ayat/"+$scope.selectedAyah.description.surah+"_"+$scope.selectedAyah.description.ayah+".png";
						$scope.ayahExist = true;
						$scope.showResult = true;
						return true;
					}
				}
				$scope.ayahExist = false;
				$scope.showResult = false;
				return false;
			}

			$scope.insert = function () {
				console.log("selected ayah")
				console.log($scope.selectedAyah);
				$scope.soura = $scope.selectedAyah.description.surah;
				$scope.aya = $scope.selectedAyah.description.ayah;
				$scope.searchAya();
				if(typeof($scope.selectedAyah)!== "undefined"){
					$scope.ayahExist = true;
					$scope.showResult = true;
					var souraDetail = $scope.findByValue($scope.souarQuran, "number", Number($scope.selectedAyah.description.surah));
					var editor = textAngularManager.retrieveEditor('editor').scope;
					console.log(typeof(editor));
					editor.wrapSelection('insertHTML', 
							'<span class="aaya">'
								+'<strong>'+$scope.selectedAyah.title
								+'</strong>'
							+'</span>'
							+' [' + souraDetail.arabic_name + ':' + $scope.selectedAyah.description.ayah + ']'
							
						);
				}
			}
			
			$scope.jumpToAyah = function(i){
				
				var souraDetail = $scope.findByValue($scope.souarQuran, "number", Number($scope.soura));
				if(souraDetail.ayahs < Number($scope.aya)+i){
					if(Number($scope.soura)+1 <= 114){
						$scope.aya = 1;
						$scope.soura = Number($scope.soura)+1;
						$scope.searchAya();
					}
				}
				else if(Number($scope.aya)+i < 1){
					if(Number($scope.soura)-1 > 0){
						souraDetail = $scope.findByValue($scope.souarQuran, "number", Number($scope.soura)-1);
						$scope.aya = souraDetail.ayahs;
						$scope.soura = Number($scope.soura)-1;
						$scope.searchAya();
					}
				}
				else {
					$scope.aya = Number($scope.aya) + i;
					$scope.searchAya();
				}
			}
			
			//get books
			Books.get()
			.catch (function (e) {
				console.error('error: ', e.data.error);
				console.error('exception: ', e.data.exception);
				throw e;
			})
				.then(function (result) {
					$scope.books = result;
				})
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
				.finally (function () {
					console.log("finally finished");
				});
				
			
			$scope.getBook = function(){
				console.log($scope.book);
				//console.log(JSON.parse($scope.book));
				console.log($scope.book["prefix"]);
				//initialize CompleteBook to []
				$scope.CompleteBook = [];
				CompleteBook.get($scope.book["prefix"])
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
				.then(function (result) {
					
					for (var i = 0; i < 1; i++) {
						var chapters = result[Object.keys(result)[i]]["chapters"];
						for(var j = 0; j < chapters.length; j++){
							var hadiths = chapters[j]["hadiths"];
							for(var k = 0; k < hadiths.length; k++){
								$scope.CompleteBook.push(hadiths[k]);
							}
						}
					}
					console.log("complete book");
					console.log($scope.CompleteBook);
				})
				.catch (function (e) {
					console.error('error: ', e.data.error);
					console.error('exception: ', e.data.exception);
					throw e;
				})
					.finally (function () {
							console.log("finally finished");
				});
			}
			$scope.$watch('book', function() {
				if(typeof($scope.book) !== "undefined"){
					$scope.getBook();
				}
		    });
			
			$scope.searchHadith = function(){
				for(var i=0; i < $scope.CompleteBook.length; i++){
					if($scope.CompleteBook[i]["rank"] === Number($scope.hadithNumber)){
						console.log($scope.CompleteBook[i]);
						$scope.selectedHadith = {};
						$scope.selectedHadith.title = $scope.CompleteBook[i]["arabic_text"];
						$scope.selectedHadith.description = $scope.CompleteBook[i];
						$scope.hadithExist = true;
						$scope.showResultHadith = true;
						return true;
					}
				}
				$scope.hadithExist = false;
				$scope.showResultHadith = false;
				return false;
			}
			
			$scope.insertHadith = function () {
				console.log("selected hadith")
				console.log($scope.selectedHadith);
				if(typeof($scope.selectedHadith)!== "undefined"){
					$scope.hadithExist = true;
					$scope.showResultHadith = true;
					var editor = textAngularManager.retrieveEditor('editor').scope;
					editor.wrapSelection('insertHTML', '<span class="hadith">' + $scope.selectedHadith.title + '</span> [' + $scope.book.arabic_name + ':' + $scope.selectedHadith.description.rank + ']');
				}
				
			}
			
			$scope.jumpToHadith = function(i){
			}
			
			$scope.insertSpecialText = function(i){
				var editor = textAngularManager.retrieveEditor('editor').scope;
				editor.wrapSelection('insertHTML',  $scope.specialTexts[i].text );
			}
			
						
			$scope.transcrire = function() {
				var element = angular.element($scope.htmlcontent);
				var plainText = element[0].innerText || element[0].textContent
				//$scope.htmlcontent.indexOf("&#8207;")
				var car = plainText.substring(plainText.length-1, plainText.length);
				console.log(plainText);
				console.log("before: "+car);
				car  = car.replace(/’/g, "\'")
				car  = car.replace(/[aâàā]/g, "ا");
				car  = car.replace(/اا/g, "آ");  
				car  = car.replace(/b/g, "ب");
				car  = car.replace(/ب'/g, "پ");
				car  = car.replace(/p/g, "پ");
				car  = car.replace(/t/g, "ت");
				car  = car.replace(/ت'/g, "ث");
				car  = car.replace(/ṯ/g, "ث");
				car  = car.replace(/[jǧ]/g, "ج");
				car  = car.replace(/ج'/g, "چ");
				car  = car.replace(/c/g, "چ");
				car  = car.replace(/[HḥḤ]/g, "ح");
				car  = car.replace(/ح'/g, "خ");
				car  = car.replace(/[xẖK]/g, "خ");
				car  = car.replace(/d/g, "د");
				car  = car.replace(/د'/g, "ذ");
				car  = car.replace(/ḏ/g, "ذ");
				car  = car.replace(/r/g, "ر");
				car  = car.replace(/ر'/g, "ز");
				car  = car.replace(/z/g, "ز");
				car  = car.replace(/s/g, "س");
				car  = car.replace(/س'/g, "ش");
				car  = car.replace(/š/g, "ش");
				car  = car.replace(/[Sṣ]/g, "ص");
				car  = car.replace(/ص'/g, "ض");
				car  = car.replace(/[Dḍ]/g, "ض");
				car  = car.replace(/[Tṭ]/g, "ط");
				car  = car.replace(/ط'/g, "ظ");
				car  = car.replace(/[Zẓ]/g, "ظ");
				car  = car.replace(/[gʿ]/g, "ع");
				car  = car.replace(/ع'/g, "غ");
				car  = car.replace(/ġ/g, "غ");
				car  = car.replace(/f/g, "ف");
				car  = car.replace(/ف'/g, "ڤ");
				car  = car.replace(/v/g, "ڢ");
				car  = car.replace(/q/g, "ق");
				car  = car.replace(/ق'/g, "ڨ");
				car  = car.replace(/k/g, "ك");
				car  = car.replace(/ك'/g, "ڭ");
				car  = car.replace(/l/g, "ل");
				car  = car.replace(/m/g, "م");
				car  = car.replace(/n/g, "ن");
				car  = car.replace(/h/g, "ه");
				car  = car.replace(/ه'/g, "ة");
				car  = car.replace(/[wouôûōū]/g, "و");
				car  = car.replace(/[yieîī]/g, "ي");
				car  = car.replace(/[YIE]/g, "ى");
				car  = car.replace(/-/g, "ء");
				car  = car.replace(/ʾ/g, "ء");
				car  = car.replace(/وءء/g, "ؤ");
				car  = car.replace(/يءء/g, "ئ");
				car  = car.replace(/اءء/g, "إ");
				car  = car.replace(/I/g, "إ");
				car  = car.replace(/A/g, "إ");
				car  = car.replace(/ءا/g, "أ");
				car  = car.replace(/_/g, "ـ");
				car  = car.replace(/\?/g, "؟");
				car  = car.replace(/\;/g, "؛");
				car  = car.replace(/\,/g, "،");
				console.log("after: "+car);
				$scope.htmlcontent = plainText.concat(car);
			}

		}
	]);