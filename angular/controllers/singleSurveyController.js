app.controller('singleSurveyController',['getAndPostService','$routeParams','$route','$location', function (getAndPostService, $routeParams, $route, $location){
	
	var surveyId = $routeParams.surveyId ;
	var main = this;

	// used to show or hide optionform
	this.show = [] ;

	//used to show and hide stats
	this.showHide = false;
	// to store option value
	this.option = [];

	this.statsResult = [] ;
	var result = [] ;

	// to show or hide questionForm
	this.showQuestionInput = [] ;
	

	// loading survey based on surveyId
	this.loadSingleSurvey = function(){

		getAndPostService.getSingleSurvey(surveyId)
		.then( function successCallback(response){
			
			console.log(response.data.data);
			main.singleSurvey = response.data.data ;

		}, function errorCallback(response){
			
			alert("Error occured");
			console.log(response);

		});

	}(); // end of loadSingleSurvey function



	// loading all questions of the survey
	this.loadQuestions = function(){

		getAndPostService.getAllQuestions(surveyId)
		.then(function(response){

			console.log('Loaded questions.\n',response.data.data);
			main.questions = response.data.data ;
			main.calculateStats();
		}, function(response){

			alert("Error occured!");
			console.log(response);
		}) ;

	} ();// end of loadQuestions function



	// function to make http request after user confirmation to delete survey
	this.deleteRequest = function(){

		getAndPostService.deleteSurvey(surveyId)
			.then(function(response){

				console.log("success", response);

			}, function(response){

				alert("Error occured");
				console.log(response);
		});

	} // end of deleteRequest


	// function to get confirmation to delete a survey	
	this.delete = function(surveyId){

		var confirmation = confirm("Do you really want to delete this survey? \n It can't be undone later.");
		console.log("surveyId");

		if(confirmation){

			main.deleteRequest();
			$location.path('/survey/viewAll');
		} 

	}; // end of delete function


	// function to show form to add an option when admin wants it
	this.showForm = function(id){

		main.show[id] = true;
	} ;// showForm ends here


	// function to create an option
	this.createOption = function(questionId , id){

		// using main.option as array , to solve ambiguity if user enters data in two option forms
		data = { optionText : main.option[id] };

		getAndPostService.postOption(data , questionId)
		.then( function(response){

			console.log('success response of option posted\n' , response);
			$route.reload(); // reloading view so that admin can see the changes

		}, function(response){

			alert("Some error occured!");
			console.log(response);
		}) ;

	}; // createOption function ends


	// function to make http request to delete options. Called only after user's confirmation
	this.removeOptionRequest = function(questionId , id){

		getAndPostService.deleteOptions(questionId )
		.then( function(response){

			console.log(response);
			main.removeAnswers(questionId , id);

		}, function(response){

			alert('Error occured!');
			console.log(response);
		});

	} ; // end of removeOptionRequest



	// function to get user's confirmation before deleting options
	this.removeOptions = function(questionId , id){

		if( confirm("Do you really want to delete all options for question No."+(id+1)) ){

			main.removeOptionRequest(questionId ,id) ;
			$route.reload();
		}
	}; // end of removeOptions function


	//function to make http request to delete answers. Called only after user's confirmation
	this.removeAnswersRequest = function(questionId ){

		getAndPostService.deleteAnswers(questionId)
		.then(function(response){

			alert('Answers deleted!');
			console.log(response);

		}, function(response){

			alert("Error occured!");
			console.log(response);

		}) ;
	
	}; //end of removeAnswersRequest function


	// function to get user's confirmation before deleting answers
	this.removeAnswers = function(questionId , id){

		if( confirm("Do you want to delete answers for question No."+(id+1)+"\n\nYou might want to have a look at stats before proceeding.") ){

			main.removeAnswersRequest(questionId) ;
			$route.reload();
		}

	} ; // end of removeAnswers function



	// function to delete question. It is called after getting user's confirmation only.
	this.removeQuestionRequest = function(questionId){

		getAndPostService.deleteQuestion(questionId)
		.then( function(response){

			alert('Question removed!');
			console.log(response);

		}, function(response){
			
			alert('Error occured!');
			console.log(response);
		});

	} ; // end of removeQuestionRequest function



	// function to get confirmation before deleting a question
	this.removeQuestion = function(questionId , id){

		if( confirm("Do you really want to delete question No."+(id+1)+"?") ){

			main.removeQuestionRequest(questionId) ;
			$route.reload();
		}

	} ; // removeQuestion function ends here


	
	// function for simple stats calculation 
	this.calculateStats = function(){

		var questions = main.questions ;
		//console.log("main.questions",questions);
		for( var i in questions){

			var  skipped = 0 ; // this avoids skipped value of one question to be passed to next if option's length is 0
			for( var j=1 ; j <= questions[i].questionOptions.length ; j++){

				var count = 0 ;
				for( var k in questions[i].answers){

					if( questions[i].answers[k] == j )
						count ++ ;

					else if( j == 1 && questions[i].answers[k] == 0) // skipped value is calculated only once
						skipped ++ ;
				} // end of questions[i].answers loop

				result.push(count);
			} // end of questions[i].questionOptions loop 

			result.unshift(skipped);
			main.statsResult.push(result);
			//assigning result to empty array so that it can be used again in next loop
			result=[];

		} // end of first loop

	}; // calculateStats function ends here


	var countForShowHideStats = 0;


	// Used to toggle stats section
	this.showHideStats = function(){
		countForShowHideStats++;

		if(countForShowHideStats % 2 == 0){
			main.showHide = false;
		}

		else{
			main.showHide = true;
			
		}

		main.isSurveyTaken();
	} // end of showHideStats function


	// function to test if the survey has been taken before or not
	// if survey is not taken then a message " no submission yet" is shown instead of stats data
	this.isSurveyTaken = function(){

		var test;
		main.statsResult.forEach(function( ele){

			ele.forEach(function(element){

				if( element != 0)
					test = 1;
			});

		}); // end of forEach

		if(test == 1)
			main.surveyTaken = true ;
		else
			main.surveyTaken = false ;

	} ; // end of isSurveyTaken


	// function to send http request to update a question
	this.updateQuestionRequest = function(questionId , data){

		getAndPostService.editQuestion(questionId , data)
		.then(function(response){

			console.log('updateQuestion response\n', response);
			$route.reload();

		} , function(response){

			console.log('updateQuestion response\n', response);
		}) ;

	} // end of update question request


	// function to get user's confirmation before updating a question
	this.updateQuestion = function(questionId , question , id){

		if( confirm('Do you really want to update question?')){

			var data = { questionText : question };

			main.updateQuestionRequest(questionId , data) ;
		} 

		else{
			$route.reload();
		}

	} ; // end of update question function


	// to show input box when user clicks on edit question button
	this.showQuestionForm = function(questionId, question, id){

		main.showQuestionInput[id] = true ;
		
	} // end of showQuestionForm function


}]); // end of controller