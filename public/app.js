'use strict';

/* App Module */

var PipelineMigrationApp = angular.module('PipelineMigrationApp', ['restangular']);
  
PipelineMigrationApp.config(['RestangularProvider',
             function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/rest');
}])

PipelineMigrationApp.factory('MigrationService', ['Restangular', 
       function(Restangular) {
	
	
	
    var getYaml = function(data) {
    	var migration = Restangular.one('service','yaml');
    	return migration.get(data);
    };
    
    var createPipeline = function() {
    	var session = Restangular.one('service','redirect');
    	return session.get();
    };
    
    return {
    	getYaml : getYaml,
    	createPipeline : createPipeline
    };
}])
