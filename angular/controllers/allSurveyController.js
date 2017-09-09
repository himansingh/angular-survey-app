app.controller('allSurveyController',['getAndPostService','$route', function(getAndPostService , $route ){

	var main = this ;
	this.surveys = [] ;

	// function to load all surveys
	this.loadAllSurveys = function(){

		getAndPostService.getAllSurvey()
		.then(function successCallback(response){

			//console.log(response);
			main.surveys = response.data.data ;
			console.log(main.surveys);

		}, function errorCallback(response){

			alert("Error occured! Check console.");
			console.log(response);

		});

	}(); // end of self-invoking loadAllSurveys function


	// function to make http request to delete a survey
	this.deleteRequest = function(surveyId){

		getAndPostService.deleteSurvey(surveyId)
			.then(function(response){

				console.log("This is success Response \n",response);

			}, function(response){

				alert("Error occured. Check console.");
				console.log(response);

		});

	}// end of delete request


	// function to get user confirmation to delete survey	
	this.delete = function(surveyId){

		var confirmation = confirm("Do you really want to delete this survey? \n It can't be undone later.");

		if(confirmation){
			main.deleteRequest(surveyId);
			main.surveys.splice(index , 1);
		} // end of if statement

	}; // end of delete function


}]); // end of controller