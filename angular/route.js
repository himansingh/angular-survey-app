app.config(['$routeProvider',function ($routeProvider) {
	
	$routeProvider
		.when('/' , {

			templateUrl 	: 'views/main-view.html',
			controller 		: 'mainController'
		})
		.when('/create' , {

			templateUrl 	: 'views/create-survey-view.html',
			controller		: 'createSurveyController',
			controllerAs	: 'createSurvey'
		})
		.when('/survey/viewAll' , {

			templateUrl 	: 'views/all-survey-view.html',
			controller 		: 'allSurveyController',
			controllerAs 	: 'allSurvey'
		})
		.when('/survey/:surveyId' , {

			templateUrl		: 'views/single-survey-view.html',
			controller 		: 'singleSurveyController',
			controllerAs	: 'survey'
		})
		.when('/takeSurvey' , {

			templateUrl		: 'views/poll-all-survey-view.html',
			controller 		: 'allSurveyController',
			controllerAs 	: 'allSurvey'
		})
		.when('/takeSurvey/:surveyId' , {

			templateUrl		: 'views/poll-single-survey-view.html',
			controller 		: 'pollSingleSurveyController',
			controllerAs 	: 'pollSurvey'
		})
		.when('/edit/:surveyId' , {

			templateUrl		: 'views/edit-survey-view.html',
			controller 		: 'editSurveyController',
			controllerAs 	: 'editSurvey'
		})
		.when('/createquestion/:surveyId',{

			templateUrl 	: 'views/create-question-view.html',
			controller 		: 'createQuestionController',
			controllerAs	: 'createQuestion'
		})
		.otherwise({

			redirectTo	: '/'
		});

}]);