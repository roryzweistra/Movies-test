/**
 * @author Rory Zweistra
 */

var win = Ti.UI.currentWindow;
var tab = Ti.UI.currentTab;

var currentLat = 52.18958;
var currentLng = 5.29524;

var mapView = Ti.Map.createView({
	mapType: Ti.Map.STANDARD_TYPE,
	animate: true,
	regionFit: true,
	userLocation: true,
	region: {
		latitude: currentLat,
		longitude: currentLng,
	},
	top: 0,
	bottom:0,
	left: 0
});

win.add(mapView);


if ( Ti.Geolocation.locationServicesEnabled ) {
    Titanium.Geolocation.purpose	= 'Get Current Location';
    Ti.Geolocation.distanceFilter	= 10;
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
        } else {
            Ti.API.info(e.coords);
        }
    });
} else {
    alert('Please enable location services');
}

Ti.Geolocation.addEventListener('location', function() {
	Ti.Geolocation.getCurrentPosition( function( e ) {
		mapView.setLocation({ latitude:e.coords.latitude, longitude:e.coords.longitude });
	})
});
