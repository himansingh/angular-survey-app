app.service('getAndPostService',['$http', function($http){


	var baseUrl = "https://projectsapi.edwisor.com/api/surveys/" ;


	this.getSingleSurvey = function(surveyId){

		return $http({	method : 'GET' , url : baseUrl + surveyId 	});
	} ;



	this.getAllQuestions = function(surveyId){

		return $http({	method : 'GET' , url : baseUrl + surveyId +'/questions/all' });
	} ;



	this.getAllSurvey = function(){

		return $http({	method : 'GET' , url : baseUrl });
	} ;



	this.deleteSurvey = function(surveyId){

		return $http({ method : 'POST' , url : baseUrl + surveyId + '/delete' });
	} ;



	this.postAnswer = function( questionId , answer){

		return $http({

			method 	: 'POST' ,
			url 	: baseUrl + "questions/" + questionId + "/answer/create" ,
			data 	: answer  
		});

	} ;



	this.postSurvey = function(data){

		return $http({

			method  : 'POST',
			url 	: baseUrl + '/create' ,
			data 	: data
		});

	} ;



	this.updateSurvey = function(surveyId , data){

		return $http({

			method : 'PUT' ,
			url : baseUrl + surveyId + '/edit' ,
			data : data 
		});
	};



	this.postQuestion = function(surveyId , data){

		return $http({

			method : 'POST',
			url : baseUrl + surveyId + '/question/create',
			data : data
		}) ;
	} ;


	this.postOption = function(data , questionId){

		return $http({

			method : 'POST',
			url : baseUrl +'questions/' + questionId + '/options/create' ,
			data : data
		});
	} ;


	this.deleteOptions = function(questionId){

		return $http({ method : 'POST', url : baseUrl + 'questions/' + questionId +'/options/delete'  }) ;
	} ;


	this.deleteQuestion = function(questionId){

		return $http({ method : 'POST', url : baseUrl + 'questions/' + questionId +'/delete' });
	} ;


	this.deleteAnswers = function(questionId){

		return $http({ method : 'POST', url : baseUrl + 'questions/' + questionId +'/answers/delete' }) ;
	};


	this.editQuestion = function(questionId , data){

		return $http({ method : 'PUT' , url : baseUrl + 'questions/' + questionId +'/edit', data : data });
	} ;



}]); // end of service
