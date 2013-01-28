function serverCtrl($scope, server){
	$scope.serverstate = 'Not Listening';

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
	$scope.request = server.request();
}