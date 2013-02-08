App.factory('proxy', function($rootScope, socket){
  'use strict';
  var socketInfo;

  var proxy = {
    
    data: [],

    acceptInfo: {},

    sendResponse: function (){
      var header = $rootScope.stringToUint8Array("HTTP/1.0 200 OK"+
          "\nContent-length:5 \nContent-type:text/html \n\ntest1");
      var outputBuffer = new ArrayBuffer(header.byteLength);
      var view = new Uint8Array(outputBuffer);
      view.set(header, 0);
      socket.write(proxy.acceptInfo.socketId, outputBuffer, function(writeInfo) {
        console.log("WRITE", writeInfo);
        socket.destroy(proxy.acceptInfo.socketId);
        socket.accept(socketInfo.socketId, proxy.onAccept);
      });
    },

    onAccept: function(_acceptInfo) {
      proxy.acceptInfo = _acceptInfo;
      console.log("ACCEPT", proxy.acceptInfo);
      //  Read in the data
      socket.read(proxy.acceptInfo.socketId, function(readInfo) {
        console.log("READ", readInfo);
        // Parse the request.
        var request = $rootScope.arrayBufferToString(readInfo.data);
        console.log(request);
        $rootScope.$broadcast( 'Proxy.request', request );
        //parse data
        //do more stuff
      });
    },
    
    start: function() {
      socket.create("tcp", {}, function(_socketInfo) {
        socketInfo = _socketInfo;
        socket.listen(socketInfo.socketId, '127.0.0.1', 8080, 20, function(result) {
          console.log("LISTENING:", result);
          socket.accept(socketInfo.socketId, proxy.onAccept);
        });
      });
    },

    stop: function() {
      socket.destroy(socketInfo.socketId);
      console.log("Stop");
    }
  };
  return proxy;
});