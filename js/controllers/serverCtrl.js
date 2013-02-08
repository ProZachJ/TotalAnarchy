var serverCtrl = function($scope, server, socket){
	$scope.serverstate = 'Not Listening';
	$scope.data = server.data;


	$scope.listen = function (){
		if ($scope.serverstate === 'Not Listening'){
			server.start();
			$scope.serverstate = 'Listening';
		}
		else if ($scope.serverstate === 'Listening'){
			server.stop();
			$scope.serverstate = 'Not Listening';
		}
	};

	$scope.sendResponse =  function(){
		if ($scope.data.length > 0){
			server.sendResponse($scope.acceptInfo);
			$scope.data = [];
		}
	};

	$scope.$on( 'Server.request', function( event, acceptInfo, request ) {
		console.log(acceptInfo, request);
		$scope.acceptInfo = acceptInfo;
		$scope.data = request;
		//registers the change in data
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	});
};

serverCtrl.$inject = ['$scope', 'server', 'socket'];