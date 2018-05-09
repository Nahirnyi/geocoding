var cities = [
		"Kolomiya",
		"Otynia",
		"Horodenka",
		"Sniatyn",
		"Polianucya",
		"Yasinja",
		"Nadvirna",
		"Deliatyn",
		"Tysmenytsia",
		"Bogorodchany"
	];

var locHtml = document.getElementById('myloc');
var citiesHtml = document.getElementById('cities');
var myCoordinates = [];
const DISTANCE_EARTH = 2 * 3.14 * 6372795;
var minDistance;
var closestCity = '';

function myLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		locHtml.innerHTML = "Get Location not possible";
	}
}

function showPosition(position){
	myCoordinates = [position.coords.latitude, position.coords.longitude];
	locHtml.innerHTML = "Коорлинати знаходження: <br>" +
			"Longitude: " + 
			myCoordinates[1] + 
			"<br> Latitude: " + 
			myCoordinates[0] + 
			"<br>";

	cities.forEach(function(city) {
	    otherCityCoordinates = geoadres(city);
	    calculateDistance(myCoordinates, otherCityCoordinates, city);
	});	

	showClosestCity();
}



function geoadres(adress) {
	var resultlat = ''; var resultlng = '';
	$.ajax({
		async: false,
		dataType: "json",
		url: 'http://maps.google.com/maps/api/geocode/json?address=' + adress,
		success: function(data){
			for (var key in data.results) {
				resultlat = data.results[key].geometry.location.lat;
				resultlng = data.results[key].geometry.location.lng;
			} 
		}
	});
	return [resultlat, resultlng];
}

function calculateDistance(myLocation, otherCityLocation, city) {
	var distance = Math.sqrt(
			(myLocation[0]-otherCityLocation[0]) * 
			(myLocation[0]-otherCityLocation[0]) + 
			(myLocation[1]-otherCityLocation[1]) * 
			(myLocation[1]-otherCityLocation[1])) * 
			DISTANCE_EARTH / 
			360;

	if(!minDistance || minDistance > distance){
		minDistance = distance;
		closestCity = city;
	}
	
	citiesHtml.innerHTML += "Місто " + city + " знаходиться на відстані " + distance + " метрів<br>";
}

function showClosestCity() {
	citiesHtml.innerHTML += "<br>Найближче місто " + closestCity;
}