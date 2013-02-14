App.factory('proxy', ['$rootScope', 'socket', 'proxyparser', function($rootScope, socket, proxyparser){
  'use strict';
  var socketInfo;

  var proxy = {
    
    req: {},
    resp: {},
    respdata: [],
    acceptInfo: {},

    getResponse: function(){
      socket.create("tcp", {}, function(createInfo){
        var socketId = createInfo.socketId;
        socket.connect(socketId, proxy.req.host, 80, function(result){
          var reqdata = $rootScope.stringToUint8Array(proxy.req.str);
          var outputBuffer = new ArrayBuffer(reqdata.byteLength);
          var view = new Uint8Array(outputBuffer);
          view.set(reqdata, 0);
          socket.write(createInfo.socketId, outputBuffer, function(writeInfo){
            socket.read(createInfo.socketId, function(readInfo){
              proxy.respdata = readInfo.data;
              var response = $rootScope.arrayBufferToString(readInfo.data);
              proxy.resp = proxyparser.parseResponse(response);
              console.log(response);
              $rootScope.$broadcast( 'Proxy.response', response );
            });
          });
        });
      });
    },

    sendResponse: function (){
      var header = proxy.respdata;
      var outputBuffer = proxy.respdata;
      var view = new Uint8Array(outputBuffer);
      view.set(header, 0);
      socket.write(proxy.acceptInfo.socketId, outputBuffer, function(writeInfo) {
        socket.destroy(proxy.acceptInfo.socketId);
        socket.accept(socketInfo.socketId, proxy.onAccept);
      });
    },

    onAccept: function(_acceptInfo) {
      proxy.acceptInfo = _acceptInfo;
      //  Read in the data
      socket.read(proxy.acceptInfo.socketId, function(readInfo) {
        // Parse the request.
        var reqstr = $rootScope.arrayBufferToString(readInfo.data);
        proxy.req = proxyparser.parseRequest(reqstr);
        //parse request into object
        $rootScope.$broadcast( 'Proxy.request', reqstr );
        //do more stuff
      });
    },
    
    start: function() {
      socket.create("tcp", {}, function(_socketInfo) {
        socketInfo = _socketInfo;
        socket.listen(socketInfo.socketId, '127.0.0.1', 8080, 20, function(result) {
          socket.accept(socketInfo.socketId, proxy.onAccept);
        });
      });
    },

    stop: function() {
      socket.destroy(socketInfo.socketId);
    }
  };
  return proxy;
}]);