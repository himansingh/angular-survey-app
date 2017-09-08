 // This filter capitalizes first letter of every sentence.

app.filter('capitalize', function(){

	return function( input ){

		var newString = [], output ;

		if( input != undefined && input != null ){
			
			newString[0] = input.charAt(0).toUpperCase();

			for( var i=1 ; i < input.length ; ){

				if(input.charAt(i) == '.' || input.charAt(i) == '!' || input.charAt(i) == '?'){

					newString[i]= input.charAt(i);
					newString[i+1]= input.charAt(i+1);
					newString[i+2]= input.charAt(i+2).toUpperCase();
					i = i+3 ;
				}

				else{
					newString[i] = input.charAt(i);
					i++ ;
				}	
			}

			output = newString.join('');
		}	

		return output ;
	}

}) ; // end of filter