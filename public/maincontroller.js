
PipelineMigrationApp.controller('MainController', ['$scope', '$window', 'MigrationService', '$timeout', function($scope, $window, MigrationService, $timeout) {
       $scope.data = {
    		   userName : null,
    		   password : null,
    		   pipelineUrl : null
       }
       $scope.displayValue = null;
       
       $scope.getYaml = function () {    	    
           MigrationService.getYaml($scope.data).then(
    			   function(value) {
    				   $scope.displayValue = value.data;
    				   $scope.createPipeline();
    			   },
    			   function(response) {
    				   //do nothing
    			   }
    	   );
       }
       
       $scope.createPipeline = function() {
    	   MigrationService.createPipeline().then(
    			   function(value) {
    				   $window.location.href = value.url; 
    			   },
    			   function(response) {
    				   //do nothing
    			   }
    	   );
       }
       
       
}]); 
  
