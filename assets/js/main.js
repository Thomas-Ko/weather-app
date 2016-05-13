/*====================
	MODEL
====================*/
var model = {

	//current weather data; nulls will be replaced with info from API call (see controller.getInitialWeatherData and controller.getZipWeatherData)
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
		controller.getInitialWeatherData();
		view.init();
	},

	//gets initial weather information from Weather Underground API
	//found on https://www.wunderground.com/weather/api/
	getInitialWeatherData : function(){
		$.ajax({
			type: "GET",

			//looks up the user's location by ip address
			url: "http://api.wunderground.com/api/32d6346cb727aad9/forecast/geolookup/conditions/q/autoip.json?",

			dataType: "jsonp",

			success: function( response ) {
	        	// var obj = JSON.parse(response);
	        	/*I do not need to run the above code because jQuery automatically parses the datatype if it is jsonp.
	        	Running the above code would return an error.*/

	        	controller.setCurrentWeather(response.current_observation);
			},

			error: function(){
         		$("#location").text("Error processing request");
        	}
      
		});
	},

	//gets weather information by zip code; used in view.setSettings function
	getZipWeatherData : function(zipcode){
		$.ajax({
			type: "GET",

			//looks up the user's location by ip address
			url: "http://api.wunderground.com/api/32d6346cb727aad9/forecast/geolookup/conditions/q/" +zipcode+ ".json",

			dataType: "jsonp",

			success: function( response ) {
	        	console.log("ZIP DATA: " +response);
	        	controller.setCurrentWeather(response.current_observation);

			},

			error: function(){
         		$("#location").text("Error processing request");
        	}
		});
	},

	setCurrentWeather: function(data) {
		if(data === undefined){
			$("#location").text("Location not found");
		} else {
			model.currentWeather= {
				location: data.display_location.full,
				temp: {
					c: Math.round(data.temp_c),
					f: Math.round(data.temp_f),
				},
				feelsLike: {
					c: Math.round(data.feelslike_c),
					f: Math.round(data.feelslike_f),
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
		}
	},

	getCurrentWeather: function() {
		return model.currentWeather;
	}

}; //end controller


/*====================
	VIEW
====================*/

view = {

	init : function(){
		$(document).ajaxStop(function () {
			var data = controller.getCurrentWeather();
			view.renderWeather(data);
			view.renderImg(data.icon.name);
			view.changeTempScale(data);
		});
		view.onSettingsClick();
		view.setSettings();
	},

	//renders all weather information on screen
	renderWeather: function(data){
		
		$("#location").text(data.location);
		$("#temp").text(data.temp.f);
		$("#feelsLike").text(data.feelsLike.f);
		$("#weather").text(data.weather);
		$("#wind").text(data.wind);
		$("#precipitation").text(data.precipitation);
		$("#humidity").text(data.humidity);

		$(".temp-type-letter").text("F");
	},

	//finds and renders correct weather image
	renderImg: function(data){
		var img ="";
		
		switch(data){
			case "chanceflurries": 	img = "chanceflurries"; break;
			case "chancerain": 		img = "chancerain"; 	break;
			case "chancesleet": 	img = "chancesleet";	break;
			case "chancesnow": 		img = "chancesnow"; 	break;
			case "chancetstorms": 	img = "chancetstorms"; 	break;
			case "clear": 			img = "clear"; 			break;
			case "cloudy": 			img = "cloudy"; 		break;
			case "flurries": 		img = "flurries"; 		break;
			case "fog": 			img = "fog"; 			break;
			case "hazy": 			img = "hazy"; 			break;
			case "mostlycloudy": 	img = "mostlycloudy"; 	break;
			case "mostlysunny": 	img = "mostlysunny"; 	break;
			case "partlycloudy": 	img = "partlycloudy"; 	break;
			case "partlysunny": 	img = "partlysunny"; 	break;
			case "sleet": 			img = "sleet"; 			break;
			case "rain": 			img = "rain"; 			break;
			case "snow": 			img = "snow"; 			break;
			case "sunny": 			img = "sunny"; 			break;
			case "tstorms": 		img = "tstorms"; 		break;
			case "partlycloudy": 	img = "partlycloudy"; 	break;
			default: 				img = "unknown";
		}

		$('img').attr("src", "assets/img/"+ img +".svg");
	},

	//changes display from fahrenheit to celsius and vice versa on click
	changeTempScale : function(data){
		$("#temp-type-letter").on("click", function(){
			
			if($("#temp-type-letter").text()=="F"){
				$("#temp").text(data.temp.c);
				$("#feelsLike").text(data.feelsLike.c);
				$(".temp-type-letter").text("C");
			} else {
				$("#temp").text(data.temp.f);
				$("#feelsLike").text(data.feelsLike.f);
				$(".temp-type-letter").text("F");
			}

		});
	},

	//clears placeholder and values from input when user goes to settings
	onSettingsClick: function(){
		$("#settings").on("click",function(){
			$("#zipCode").attr("placeholder", "");
			$("#zipCode").val("");
		});
	},

	//retrieves weather information when user enters zip code
	setSettings: function(){
		$("#setSettings").on("click", function(){
			
			var zipcode = $("#zipCode").val();
			
			if (zipcode.length!=5 || isNaN(zipcode)){
				$("#zipCode").val("");
				$("#zipCode").attr("placeholder", "Zip Code must be 5 numbers long");
				return;
			} else {
				controller.getZipWeatherData(zipcode);
				$('#myModal').modal('toggle');	//closes modal

				//three lines below make sure modal background is gone
				$('#myModal').modal('hide');
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();

				$( "#setSettings").unbind( "click" );
				
				view.init();

			}
		});
	},

}; //end view


/*====================
	INITIALIZE
====================*/

controller.init();