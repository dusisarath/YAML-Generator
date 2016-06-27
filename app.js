///*eslint-env node*/
//
////------------------------------------------------------------------------------
//// node.js starter application for Bluemix
////------------------------------------------------------------------------------
//
//// This application uses express as its web server
//// for more info, see: http://expressjs.com
////var express = require('express');
////
////// cfenv provides access to your Cloud Foundry environment
////// for more info, see: https://www.npmjs.com/package/cfenv
////var cfenv = require('cfenv');
////
//var request = require('request');
//var yamlParser = require('./yaml-parser');
////var $j = require('jQuery');
//
//
//
//
////
////// create a new express server
////var app = express();
////
////// serve the files out of ./public as our main files
////app.use(express.static(__dirname + '/public'));
////
////// get the app environment from Cloud Foundry
////var appEnv = cfenv.getAppEnv();
//
//// start server on the specified port and binding host
////app.listen(appEnv.port, '0.0.0.0', function() {
////  // print a message when the server starts listening
////  console.log("server starting on " + appEnv.url);
////});
//
////request('https://new-console.ng.bluemix.net/devops/pipelines/007f171e-6882-41aa-9400-0de574ae3052', function (error, response, body) {
////	  if (!error && response.statusCode == 200) {
////	    console.log(body) // Show the HTML for the Google homepage. 
////	  }
////	});
//var agentOptions = {
//	    securityOptions: 'SSL_OP_NO_SSLv3',
//	    secureProtocol: 'TLSv1_2_method'
//	};
//
//var PIPELINE_API_URL = "https://new-console.ng.bluemix.net/devops";
//var cookieString = "LTPAToken_SSO_PSProd";
//
//request = request.defaults({
//	strictSSL: false,
//	maxSockets: 200,
//	timeout: 60*1000 // 1 min
//});
//function printYaml(req, callback) {
//	var options = {
//		method: "GET",
//		uri: PIPELINE_API_URL + "/pipelines/" + "007f171e-6882-41aa-9400-0de574ae3052",
//		cookie: cookieString,
////		headers: {
////            Authorization: req.headers["authorization"]
////        },
//    	json: true,
//        agentOptions: agentOptions
//	};
//	console.log(options.uri);	
//	request(options, function(error, res, body) {
//		console.log("----------response code------------:\n", res);
//		if (error != null) {
//			callback(error, body);
//		} else if (res.statusCode != 200) {
//			var invalidResponseError = new Error();
//			invalidResponseError.statusCode = res.statusCode;
//			invalidResponseError.details = (res.body && res.body.message) || "Unexpected response code " + res.statusCode + " updating pipeline"
//			callback(invalidResponseError, body);
//		} else {
//			console.log("from here");
//			callback(null, body);
//		}
//	});
//}
//
//yamlParser.printYaml();
////console.log(data);
////printYaml(function(error, response){
////	console.log(response);
////});
//
////yamlParser.printYamlJson;
////printYamlJson();

//--------------------------------------

/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// add request module
var request = require('request');

// add js-yaml module
var jsyaml = require('js-yaml');
var fs = require('fs');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Read the file contents
var yamlFileContent = fs.readFileSync('./test.yaml', 'utf8');
//var PIPELINE_API_URL = "https://new-console.ng.bluemix.net/devops";
var PIPELINE_API_URL = "https://hub.jazz.net";
var userName = 'username@example.com';
var passwd = 'password';
var auth = "Basic " + new Buffer(userName + ':' + passwd).toString('base64');
function printYaml(req, callback) {
	var options = {
		method: "GET",
		//uri: PIPELINE_API_URL + "/pipelines/" + "007f171e-6882-41aa-9400-0de574ae3052",
		uri: PIPELINE_API_URL + "/pipeline/username/Delivery-Pipeline-Testing-App/yaml",
		//cookie: "LTPAToken_SSO_PSProd",
		headers: {
			//base64 authorization
            'Authorization': auth
        },
        followAllRedirects : true,
    	//json: true,
        //agentOptions: agentOptions
	};
	console.log(options.uri);	
	request(options, function(error, res, body) {
		console.log("----------response code------------:\n");
		if (error != null) {
			console.log("******* got an error **********:\n");
			callback(error, body);
		} else if (res.statusCode != 200) {
			console.log("####### Status is not OK #########:\n")
			var invalidResponseError = new Error();
			invalidResponseError.statusCode = res.statusCode;
			invalidResponseError.details = (res.body && res.body.message) || "Unexpected response code " + res.statusCode + " updating pipeline";
			callback(invalidResponseError, body);
		} else {
//			status:200
//			body:"content"
//			heADERS: {"": "adasd", "Set-Cookie": {"": "". "LTPA_jasjdjasj":"hgiuagu7qewjqdiuyaudsu"}}
			console.log('------Response Headers------\n')
			console.log(res.headers);
			//var cookieKey = res.headers["set-cookie"]["LTPAToken_SSO_PSProd"];
			//console.log("\nCookie String: " + cookieKey + "\n");
			console.log("$$$$$$$$$$ No error $$$$$$$$$$$: \n");
			callback(null, body);
			
		}
	});
}

app.route('/yaml')
  .get(function(req, res) {
//  	var jsonData = jsyaml.load(yamlFileContent);
//  	var jsonDataString = JSON.stringify(jsonData);
//    //res.send('Get a random book');
//    res.send(jsonDataString);
    
    printYaml(req, function(error, Yaml) {
    	console.log("\nFrom here: \n");
    	var dataInJson = jsyaml.load(Yaml);
    	//var dataInJson2 = jsyaml.load(Yaml);
    	var dataInJsonString = JSON.stringify(dataInJson);
    	console.log(Yaml);
    	
    	//res.send(dataInJsonString);
    	res.status(200).type("application/json").send(dataInJson);
    	
    	// changing the IDSv1 Yaml we got through GET method, changing one of the stage names to DEPLOY and posting it back
//    	console.log("\nChanging the Name of 1st Stage\n");
//    	dataInJson2.stages[0].name = "DEPLOY";
//    	console.log("Updated Name of 1st stage: " + dataInJson2.stages[0].name);
//    	var dataInJson2String = JSON.stringify(dataInJson2);
//    	
//    	var options = {
//    			method: "PUT",
//    			//uri: PIPELINE_API_URL + "/pipelines/" + "007f171e-6882-41aa-9400-0de574ae3052",
//    			//uri: PIPELINE_API_URL + "/pipeline/username/Delivery-Pipeline-Testing-App/configuration",
//    			uri: PIPELINE_API_URL + "/pipeline/api/pipelines/Delivery-Pipeline-Testing-App/configuration",
//    			//cookie: "LTPAToken_SSO_PSProd",
//    			headers: {
//    				//base64 authorization
//    	            'Authorization': auth
//    	        },
//    	        'content-type': 'application/json',
//    	        followAllRedirects : true,
//    	    	//json: true,
//    	        //agentOptions: agentOptions
//    		};
//    		console.log(options.uri);	
//    		request(options, function(error, res, body) {
//    			console.log("----------response code------------:\n");
//    			if (error != null) {
//    				console.log("******* got an error **********:\n");
//    				callback(error, body);
//    			} else if (res.statusCode != 200) {
//    				console.log("####### Status is not OK #########:\n")
//    				var invalidResponseError = new Error();
//    				invalidResponseError.statusCode = res.statusCode;
//    				invalidResponseError.details = (res.body && res.body.message) || "Unexpected response code " + res.statusCode + " updating pipeline";
//    				//callback(invalidResponseError, body);
//    				console.log("----------invalid Response Status code ----:  \n" + invalidResponseError.statusCode + "\n");
//    				console.log("----------invalidResponseError------:\n" + invalidResponseError.details);
//    			} else {
////    				status:200
////    				body:"content"
////    				heADERS: {"": "adasd", "Set-Cookie": {"": "". "LTPA_jasjdjasj":"hgiuagu7qewjqdiuyaudsu"}}
//    				console.log('------Response Headers------\n')
//    				console.log(res.headers);
//    				//var cookieKey = res.headers["set-cookie"]["LTPAToken_SSO_PSProd"];
//    				//console.log("\nCookie String: " + cookieKey + "\n");
//    				console.log("$$$$$$$$$$ No error $$$$$$$$$$$: \n");
//    				//callback(null, body);
//    				
//    			}
//    		}).write(dataInJson2String);
    	
    });
  });
//  .post(function(req, res) {
//    res.send('Add a book');
//  })
//  .put(function(req, res) {
//    res.send('Update the book');
//  });

app.route('/user')
	.post(function(req, res) {
		res.send("This is from POST");
	});
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
