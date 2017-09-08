app.controller('createSurveyController' , ['getAndPostService' ,'$location' , function (getAndPostService , $location) {

	var main = this ;


	// function to create a survey
	this.create = function(){
		
		var data = {

			surveyTitle : main.title ,
			surveySubtitle : main.subtitle ,
			instructions : main.instructions
		};

		getAndPostService.postSurvey(data)
		.then(function(response){

			console.log("Success response of create survey");
			console.log(response);
			$location.path('/survey/viewAll')

		}, function(response){

			alert('Error! Check Console.');
			console.log(response);

		});

	} ; // end of create function

	

	// to get user confirmation when user presses back button.
	// If all the fields are empty then user will not get any confirmation.
	this.goBack = function(){

		if( main.title || main.subtitle || main.instructions){

			if(confirm("Do you want to continue? Data will not be saved!")){
				$location.path('/');
			}
		}

		else {
			$location.path('/');
		}

		
	} // end of goBack function

}]); // end of controller