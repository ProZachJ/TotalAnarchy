App.factory('proxyparser', function($rootScope){
'use strict';

	return {

		parseRequest: function(reqstr){
				var reqarray = reqstr.split("\n");
				var host = reqarray[1].split("Host: ");
				var realhost = host[1].replace(/\s/, "");
				var reqobj = {
						'str': reqstr,
						'method': reqarray[0],
						'host': realhost
						//needs a .toString method
				};
				console.log(reqobj.host);
				return reqobj;				
		},

		parseResponse: function(respstr){
			var resparray = respstr.split("\n");
			var respobj = {
				'str': respstr
			};
		}
	};

	//proxy parser should return an object this is composed 
	//from a string dirived from a uint8arrary buffer of a request or response

	//parse.request(requeststring){return request object}
	//parse.response(responsestring){return response object}
});