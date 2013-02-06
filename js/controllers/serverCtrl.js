var serverCtrl = function($scope, server, socket){
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

	$scope.sendResponse =  function(){
		if ($scope.data.length > 0){
			server.sendResponse($scope.acceptInfo);
		}
	};
	
};
serverCtrl.$inject = ['$scope', 'server', 'socket'];