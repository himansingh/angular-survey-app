app.controller('mainController',['$rootScope', '$scope' , function( $rootScope , $scope){

	// storing some username and password for logging in
	var userDetails = [

						{ userName : 'himanshu' , password : 'himanshu12'} ,

						{ userName : 'salim' , password : 'salim12'} , 

						{ userName : 'sandeep' , password : 'sandeep12'} ,

						{ userName : 'nikita' , password : 'nikita12'},

						{ userName : 'pooja' , password : 'pooja12'}

					] ;


	$scope.logMeIn = function(userName , password){
		userDetails.forEach(function(element){
			if( userName == element.userName && password == element.password ){
				$rootScope.loggedIn = true ;
			}
		}) ; // end of forEach
		
		if(!$rootScope.loggedIn){
			alert("Incorrect username or password!\n Please try again.\n");
		}
		
	}; // end of logMeIn function

}]) ; // end of controller