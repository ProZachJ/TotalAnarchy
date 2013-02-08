//Initialize Application
var totalAnarchy = {};
var App = angular.module('totalAnarchy',['$strap.directives']);

App.value('socket', chrome.experimental.socket || chrome.socket );

App.run(['$rootScope',function($rootScope) {
  $rootScope.stringToUint8Array = function(string) {
    var buffer = new ArrayBuffer(string.length);
    var view = new Uint8Array(buffer);
    for(var i = 0; i < string.length; i++) {
      view[i] = string.charCodeAt(i);
    }
    return view;
  };

  $rootScope.arrayBufferToString = function(buffer) {
    var str = '';
    var uArrayVal = new Uint8Array(buffer);
    for(var s = 0; s < uArrayVal.length; s++) {
      str += String.fromCharCode(uArrayVal[s]);
    }
    return str;
  };
}]);