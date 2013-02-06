//Initialize Application
var totalAnarchy = {};
var App = angular.module('totalAnarchy',['$strap.directives']);

App.value('socket', chrome.experimental.socket || chrome.socket );