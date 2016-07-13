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

var github = require('octonode');
// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// add request module
var request = require('request');

// add js-yaml module
var jsyaml = require('js-yaml');
var fs = require('fs');

// create a new express server
var app = express();



var bodyParser = require('body-parser');

var port = (process.env.VCAP_APP_PORT || 6001);
var host = (process.env.VCAP_APP_HOST || 'localhost');

//serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// --------------- git related code --------------------
var client = github.client({
	  username: 'dusisarath',
	  password: 's@i1123ram'
	}, {
		//hostname: "github.stage1.ng.bluemix.net"
	});

var gitMe = client.me();
var gitUser = client.user('dusisarath');
var gitRepo  = client.repo('dusisarath/simple-toolchain');


//---------------- git related code ends ----------------
// Read the file contents
//var yamlFileContent = fs.readFileSync('./test.yaml', 'utf8');
////var PIPELINE_API_URL = "https://new-console.ng.bluemix.net/devops";
//var PIPELINE_API_URL = "https://hub.jazz.net";
//var userName = 'dusisarath@in.ibm.com';
//var passwd = 's@i1123ram';

function printYaml(req, callback) {
	var auth = "Basic " + new Buffer(req.userName + ':' + req.password).toString('base64');
	var options = {
		method: "GET",
		//uri: PIPELINE_API_URL + "/pipelines/" + "007f171e-6882-41aa-9400-0de574ae3052",
		//uri: PIPELINE_API_URL + "/pipeline/dusisarath/Delivery-Pipeline-Testing-App/yaml",
		uri: req.pipelineUrl + "/yaml",
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

app.post('/rest/service/yaml',function(req, res) {
//  	var jsonData = jsyaml.load(yamlFileContent);
//  	var jsonDataString = JSON.stringify(jsonData);
//    //res.send('Get a random book');
//    res.send(jsonDataString);
	  var reqBody = {
			  userName : req.body.userName,
			  password : req.body.password,
	          pipelineUrl : req.body.pipelineUrl
	  };
	  
	  console.log(JSON.stringify(reqBody));
    printYaml(reqBody, function(error, Yaml) {
    	console.log("\nFrom here: \n");
    	var dataInJson = jsyaml.load(Yaml);
    	//var yamlcontent;
    	//var dataInJson2 = jsyaml.load(Yaml);
//    	var dataInJsonString = JSON.stringify(dataInJson);
//    	console.log("In JSON Format: \n" + dataInJsonString);
    	var sampleRepo = {service: "${SAMPLE_REPO}"};
    	//console.log(dataInJson.stages[0].inputs[0]);
    	dataInJson.stages[0].inputs[0].service = "${SAMPLE_REPO2}";
    	var content = jsyaml.dump(dataInJson);
    	console.log("##########Changed File: #########\n" + content);
    	var dataInJsonString = JSON.stringify(dataInJson);
    	console.log("In JSON Format: \n" + dataInJsonString);
    	
    	gitRepo.contents('.bluemix/pipeline.yml', function(err, data, headers) {
    		//var sha = data.sha;
    		console.log("sha: " +data.sha);
    		gitRepo.updateContents(".bluemix/pipeline.yml", 'This is just a commit message', content, data.sha , 'master', function(err, data, headers) {
    			console.log("----- Error ------ :" + error);
    			//console.log("Git Repo Updated content");
    			console.log(data);
    			console.log("Dumped YAML: \n" + dataInJson.stages);
    	    	//console.log("Dumped YAML: \n" + dataInJsonString2);
    	    	console.log(Yaml);
    	    	console.log(dataInJson.stages[0].inputs);
    	    	//console.log(dataInJsonString);
    	    	
    	    	//res.send(dataInJsonString);
    	    	var userData = {data : dataInJson};
    	    	res.status(200).type("application/json").send(userData);
    		});
    		
    	});
    	
    	//dataInJson.stages[0].inputs.push(sampleRepo);
    	//var dataInJsonString2 = JSON.stringify(dataInJson);
    	
//    	console.log("Dumped YAML: \n" + dataInJson.stages);
//    	//console.log("Dumped YAML: \n" + dataInJsonString2);
//    	console.log(Yaml);
//    	console.log(dataInJson.stages[0].inputs);
//    	//console.log(dataInJsonString);
//    	
//    	//res.send(dataInJsonString);
//    	res.status(200).type("application/json").send(dataInJson);
    	
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

app.route('/rest/service/redirect')
.get(function(req,res){
	var redirectLink = {url : "https://new-console.ng.bluemix.net/devops/setup/deploy?repository=https%3A%2F%2Fgithub.com%2Fdusisarath%2Fsimple-toolchain"};
	res.send(redirectLink);
	//https://new-console.ng.bluemix.net/devops/pipelines/91cf2d31-1e52-4647-9838-8f9c6e92a1a5/yaml
});
//	.post(function(req, res) {
//		res.send("This is from POST");

//	});
// start server on the specified port and binding host
app.listen(port, function() {
  // print a message when the server starts listening
  console.log("server starting on " + port);
});

