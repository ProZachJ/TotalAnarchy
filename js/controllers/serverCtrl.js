function serverCtrl($scope, server){
	server.start();

	$scope.request = server.request();
}