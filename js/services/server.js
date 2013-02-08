App.factory('server', function($rootScope, socket){
    //need to add helper functions for dealing with responses etc maybe should be another service.
  var socketInfo;

  var stringToUint8Array = function(string) {
    var buffer = new ArrayBuffer(string.length);
    var view = new Uint8Array(buffer);
    for(var i = 0; i < string.length; i++) {
      view[i] = string.charCodeAt(i);
    }
    return view;
  };

  var arrayBufferToString = function(buffer) {
  var str = '';
  var uArrayVal = new Uint8Array(buffer);
  for(var s = 0; s < uArrayVal.length; s++) {
    str += String.fromCharCode(uArrayVal[s]);
  }
  return str;
  };

  var server = {
    
    data: [],

    acceptInfo: {},

    sendResponse: function (acceptInfo){
    var header = stringToUint8Array("HTTP/1.0 200 OK"+
          "\nContent-length:5 \nContent-type:text/html \n\ntest1");
        var outputBuffer = new ArrayBuffer(header.byteLength);
        var view = new Uint8Array(outputBuffer);
        view.set(header, 0);
        socket.write(acceptInfo.socketId, outputBuffer, function(writeInfo) {
         console.log("WRITE", writeInfo);
         socket.destroy(acceptInfo.socketId);
         socket.accept(socketInfo.socketId, server.onAccept);
        });
    },

    onAccept: function(acceptInfo) {
      
      console.log("ACCEPT", acceptInfo);
      //  Read in the data
      socket.read(acceptInfo.socketId, function(readInfo) {
        console.log("READ", readInfo);
        // Parse the request.
        
        var request = arrayBufferToString(readInfo.data);
        console.log(request);
        $rootScope.$broadcast( 'Server.request', acceptInfo, request );
        //parse data

        //send response
      });
    },
    
    start: function() {
      socket.create("tcp", {}, function(_socketInfo) {
        socketInfo = _socketInfo;
        socket.listen(socketInfo.socketId, '127.0.0.1', 8080, 20, function(result) {
          console.log("LISTENING:", result);
          socket.accept(socketInfo.socketId, server.onAccept);
        });
      });
    },

    stop: function() {
      socket.destroy(socketInfo.socketId);
      console.log("Stop");
    }
  };
  return server;
});