/*====================
	MODEL
====================*/
var model = {

	currentWeather: {
		location: null,
		temp: {
			c: null,
			f: null,
		},
		feelsLike: {
			c: null,
			f: null,
		},
		weather: null,
		wind: null,
		precipitation: null,
		humidity: null,
		icon: {
			name: null,
			imgURL: null,
		}
	}
};

/*====================
	CONTROLLER
====================*/

controller = {

	init: function(){
		controller.getWeatherInfo();
	},

	//gets weather information from Weather Underground API
	//found on https://www.wunderground.com/weather/api/
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