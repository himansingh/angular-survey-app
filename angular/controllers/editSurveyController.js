app.controller('editSurveyController',['getAndPostService','$location','$routeParams', function(getAndPostService , $location , $routeParams){

	var main = this ;
	this.surveyId = $routeParams.surveyId ;


	// function to make http request to fill input with all existing data
	this.getSurvey = function(){

		getAndPostService.getSingleSurvey(main.surveyId)
		.then( function(response){

			main.title = response.data.data.surveyTitle ;
			main.subtitle = response.data.data.surveySubtitle ;
			main.instructions = response.data.data.instructions ;

		}, function(response){

			alert("Error! Check console");
			console.log(response);
		});

	}(); // end of getSurvey function

	
	// function to get confirmation from user before updating the survey
	this.update = function(){

		var data = {

			surveyTitle : main.title ,
			surveySubtitle : main.subtitle ,
			instructions : main.instructions
		};

		if(confirm(" You are about to update this survey.")){

			main.putRequest(data);
		}
		

	} ; // end of update function


	// function to update the survey 
	this.putRequest = function(data){

		getAndPostService.updateSurvey(main.surveyId , data)
		.then( function(response){

			console.log('Success of edit survey \n',response);
			$location.path('/survey/'+ main.surveyId);

		}, function(response){

			alert("Error! Check console.");
			console.log(response);

		});
	}; // end of putRequest function

	
	// getting confirmation from user when back button is pressed
	this.goBack = function(){

		if(confirm("Do you want to go back? Changes will not be saved!"))
			$location.path('/survey/viewAll');

	};


}]);