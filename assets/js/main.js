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

};  //end model

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

			dataType: "jsonp",

			success: function( response ) {
				console.log(response);

	        	// var obj = JSON.parse(response);
	        	/*I do not need to run the above code because jQuery automatically parses the datatype if it is jsonp.
	        	Running the above code would return an error.*/

	        	controller.setCurrentWeather(response.current_observation);
			},
		});
	},

	setCurrentWeather: function(data) {
		
		// var weather = obj.current_observation;

		model.currentWeather= {
			location: data.display_location.full,
			temp: {
				c: data.temp_c,
				f: data.temp_f,
			},
			feelsLike: {
				c: data.feelslike_c,
				f: data.feelslike_f,
			},
			weather: data.weather,
			wind: data.wind_mph,
			precipitation: data.precip_today_in,
			humidity: data.relative_humidity,
			icon: {
				name: data.icon,
				imgURL: data.icon_url,
			}
		};
	},

	getCurrentWeather: function() {
		return model.currentWeather;
	}

}; //end controller


/*====================
	VIEW
====================*/


/*====================
	INITIALIZE
====================*/

controller.init();