App.controller('proxyCtrl', ['$scope', 'proxy', function($scope, proxy){
	'use strict';
	$scope.serverstate = 'Not Listening';
	$scope.data = proxy.data;


	$scope.listen = function (){
		if ($scope.serverstate === 'Not Listening'){
			proxy.start();
			//push state update from service after a check?
			$scope.serverstate = 'Listening';
		}
		else if ($scope.serverstate === 'Listening'){
			proxy.stop();
			//push state update from service after a check?
			$scope.serverstate = 'Not Listening';
		}
	};


	$scope.$on( 'Proxy.request', function( event, request ) {
		$scope.data = request.split("\n");
		//registers the change in data
		if(!$scope.$$phase) {
			$scope.$apply();
		}
        $scope.submitRequest =  function (){
            if ($scope.data.length > 0){
                proxy.getResponse();
                $scope.data = [];
            }
	    };
	});

    $scope.$on( 'Proxy.response', function( event, response ) {
		$scope.data = response.split("\n");
		//registers the change in data
		if(!$scope.$$phase) {
			$scope.$apply();
		}
		$scope.submitRequest = function (){
			if ($scope.data.length > 0){
				proxy.sendResponse();
				$scope.data = [];
			}
		};
	});
}]);