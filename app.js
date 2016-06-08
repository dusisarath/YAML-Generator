/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
//var express = require('express');
//
//// cfenv provides access to your Cloud Foundry environment
//// for more info, see: https://www.npmjs.com/package/cfenv
//var cfenv = require('cfenv');
//
var request = require('request');
//
//// create a new express server
//var app = express();
//
//// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
//
//// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
//app.listen(appEnv.port, '0.0.0.0', function() {
//  // print a message when the server starts listening
//  console.log("server starting on " + appEnv.url);
//});

//request('https://new-console.ng.bluemix.net/devops/pipelines/007f171e-6882-41aa-9400-0de574ae3052', function (error, response, body) {
//	  if (!error && response.statusCode == 200) {
//	    console.log(body) // Show the HTML for the Google homepage. 
//	  }
//	});
var agentOptions = {
	    securityOptions: 'SSL_OP_NO_SSLv3',
	    secureProtocol: 'TLSv1_2_method'
	};

var PIPELINE_API_URL = "https://new-console.ng.bluemix.net/devops";

request = request.defaults({
	strictSSL: false,
	maxSockets: 200,
	timeout: 60*1000 // 1 min
});
function printYaml(req, callback) {
	var options = {
		method: "GET",
		uri: PIPELINE_API_URL + "/pipelines/" + "007f171e-6882-41aa-9400-0de574ae3052",
//		headers: {
//            Authorization: req.headers["authorization"]
//        },
    	json: true,
        agentOptions: agentOptions
	};
	console.log(options.uri);
	request(options, function(error, res, body) {
		console.log("----------response code------------:\n", res);
		if (error != null) {
			callback(error, body);
		} else if (res.statusCode != 200) {
			var invalidResponseError = new Error();
			invalidResponseError.statusCode = res.statusCode;
			invalidResponseError.details = (res.body && res.body.message) || "Unexpected response code " + res.statusCode + " updating pipeline"
			callback(invalidResponseError, body);
		} else {
			console.log("from here");
			callback(null, body);
		}
	});
}

printYaml(function(error, response){
	console.log(response);
});