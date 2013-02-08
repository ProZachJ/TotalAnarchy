App.controller('serverCtrl', ['$scope', 'socket', 'server', function($scope, socket, server){
	'use strict';
	$scope.serverstate = 'Not Listening';
	$scope.data = server.data;


	$scope.listen = function (){
		if ($scope.serverstate === 'Not Listening'){
			server.start();
			//push state update from service after a check?
			$scope.serverstate = 'Listening';
		}
		else if ($scope.serverstate === 'Listening'){
			server.stop();
			//push state update from service after a check?
			$scope.serverstate = 'Not Listening';
		}
	};

	$scope.sendResponse =  function(){
		if ($scope.data.length > 0){
			server.sendResponse();
			$scope.data = [];
		}
	};

	$scope.$on( 'Server.request', function( event, request ) {
		console.log(request);
		$scope.data = request;
		//registers the change in data
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	});
}]);