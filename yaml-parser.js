/**
 * http://usejsdoc.org/
 */

var jsyaml = require('js-yaml');
var fs = require('fs');

//module.exports = {	
//printYamlJson : function() {
//fs.readFile('C:\Users\IBM_ADMIN\Desktop\test.yaml', function(err,data) {
//	if(err) {
//		throw err;
//	}	
//	console.log(data.toString());
//	var obj = jsyaml.load(data.toString());
//	console.log(obj);
//});
//}
//};

var filename = "C:/Users/IBM_ADMIN/Desktop/test.yaml";
//var yamString = "Stages";

//function printYamlJson() {
//	fs.readFile(filename, function(err,data) {
//		if(err) {
//			throw err;
//		}	
//		console.log("Loading YAML String: \n" + data.toString());
//		
//		//$j.get(filename, function(body) { 
//		var obj = jsyaml.load(data);
//		console.log("Loading YAML JSON Object: \n" + obj);
//		//});
//	});
//	}

module.exports = {
printYaml : function() {
	contents= fs.readFileSync(filename, 'utf8');
	//console.log(fs.readFileSync('./app.js', 'utf8'));
	data = jsyaml.load(contents);
	JsonData = JSON.stringify(data);
	//console.dir(data);
	console.log(JsonData);
	console.log("\nJson object Length:" + data.stages.length);
	console.log("Name of 1st stage: " + data.stages[0].name);
	console.log("URL of the first stage input: " + data.stages[0].inputs[0].url);
	
	console.log("\nChanging the Name of 1st Stage\n");
	data.stages[0].name = "DEPLOY";
	console.log("Updated Name of 1st stage: " + data.stages[0].name);
	
	JsonData = JSON.stringify(data);
	console.log(JsonData);
	
	
	//Accepting YAML String
//	data = jsyaml.load(yamString);
//	Jsondata = JSON.stringify(data);
//	console.log("JSON in string:\n" + Jsondata);
	}
};