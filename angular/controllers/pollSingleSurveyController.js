app.controller('pollSingleSurveyController',['getAndPostService','$routeParams', function (getAndPostService, $routeParams) {
	
	var surveyId = $routeParams.surveyId ;
	var main = this ;
	var i = 0 , data ; 	// i is used to keep track of question displayed in the view
	this.disableValue ; // used to enable and disable next button 
	this.buttonValue = 'Next' ;

	//load a survey
	this.loadSingleSurvey = function(){

		getAndPostService.getSingleSurvey(surveyId)
		.then( function successCallback(response){
			
			console.log('response of load single survey \n');
			console.log(response.data.data);
			main.singleSurvey = response.data.data ;

		}, function errorCallback(response){
			
			alert("Error occured. Check console.");
			console.log(response);

		});

	}(); // end of self-invoking loadSingleSurvey function


	// function to create an answer.
	this.createAnswer = function(questionId , answer){

		data = { selectedOptionNumber : answer };

		getAndPostService.postAnswer(questionId , data)
		.then( function(response){

				console.log('Response of createAnswer\n', answer);
				console.log(response);

			}, function(response){
	
				alert("Error occured! Check console.");
				console.log(response);

			}); // end of http post request

	} // end of createAnswer function


	// function to load next question in the view when next button is pressed
	this.loadNextQuestion = function(questionId){

		// to send actual option number as response, like change 0 to 1
		main.answer++ ;
		//checking response

		// questionId is undefined when this function is called first time
		if( questionId !== undefined && questionId !== null){  
			main.createAnswer(questionId , main.answer);

		} 	// end of if statement

		// main.question gets value of next question and thus updated in view.
		main.question = main.questionData[i];

		// change Next button value to Finish for last question.
		if( i == main.questionData.length-1 )
			main.buttonValue = 'Finish';

			// to load next question, when this function is called again
			i++ ;
			// to avoid pre-selection of an option when next button is clicked
			main.answer = undefined ;
			// disable next button again
			main.disableValue = true ;			
			
	} ; // end of loadNextQuestion function



	// function to load all questions of a survey
	this.loadQuestions = function(){

		getAndPostService.getAllQuestions(surveyId)
		.then( function (response){

			main.questionData = response.data.data ;
			console.log('response of loadQuestions');
			console.log(main.questionData);
			main.loadNextQuestion(); 

		} , function(response){

			alert('Error');
			console.log(response);
		});

	}(); // end of loadQuestions function

	
	// this function is called when user presses skip button
	this.skipQuestion = function(questionId){

		// -1 becomes 0 when answer is incremented in loadNextQuestion() by 1
		main.answer = -1 ; 
		main.loadNextQuestion(questionId) ;

	};//end of skipQuestion function


	// this function is called when user selects an option
	// it enables next button
	this.changeDisableValue = function(){

		main.disableValue = false ;
	} ; // end of changeDisabledValue function


}]); // controller ends here