/*====================
	MODEL
====================*/


/*====================
	CONTROLLER
====================*/

controller = {

	init: function(){
		controller.getWeatherInfo();
	},

	getWeatherInfo : function(){
		$.ajax({
			type: "GET",

			url: "http://api.wunderground.com/api/32d6346cb727aad9/forecast/geolookup/conditions/q/autoip.json?",

			success: function( response ) {
				console.log(response);
			},
		});

		
	}

}; //end controller


/*====================
	VIEW
====================*/


/*====================
	INITIALIZE
====================*/

controller.init();