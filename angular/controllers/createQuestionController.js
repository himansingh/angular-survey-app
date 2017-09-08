app.controller('createQuestionController',['getAndPostService', '$location', '$routeParams', function( getAndPostService , $location , $routeParams){

	var main = this ;
	var surveyId = $routeParams.surveyId ;
	var data ;

	this.create = function(){

		data = {questionText : main.questionText };

		getAndPostService.postQuestion(surveyId , data)
		.then( function(response){

			console.log("Success response of create question\n", response);
			$location.path('/survey/' + surveyId);

		}, function(response){

			alert('Error has occured. Check console');
			console.log(response);
		}) ;

	} ;	// end of create function

}]); // end of controller