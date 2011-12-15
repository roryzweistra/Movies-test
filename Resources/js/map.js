/**
 * @author Rory Zweistra
 */

var win = Ti.UI.currentWindow;
var tab = Ti.UI.currentTab;

var currentLat = Ti.App.Properties.getString('viewing_lat'); //52.18958;
var currentLng = Ti.App.Properties.getString('viewing_lon'); //5.29599;

var mapView = Ti.Map.createView({
	mapType: Ti.Map.STANDARD_TYPE,
	animate: true,
	regionFit: true,
	userLocation: true,
	region: {
		latitude: currentLat,
		longitude: currentLng,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	},
	top: 0,
	bottom:0,
	left: 0
});

win.add(mapView);



var buttonBarView = Titanium.UI.createButtonBar({
    labels:['Mode', 'Eten & Drinken', 'Beauty', 'Shopping', 'Cultuur'],
    backgroundColor:'#336699',
    backgroundSelectedColor:'#DDD',
    top:0,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:25,
    width:'100%'
});
mapView.add(buttonBarView);

buttonBarView.addEventListener('click', function(e) {
	if ( e.index === 0 ) {
		Ti.API.info(e.index);
	}
	else if ( e.index === 1 ) {
		Ti.API.info(e.index);
	}
	else if ( e.index === 2 ) {
		Ti.API.info(e.index);
	}
	else if ( e.index === 3 ) {
		Ti.API.info(e.index);
	}
	else if ( e.index === 4 ) {
		Ti.API.info(e.index);
	}
});


if ( Ti.Geolocation.locationServicesEnabled ) {
    Ti.Geolocation.purpose	= 'Get Current Location';
    Ti.Geolocation.distanceFilter	= 0;
    Ti.Geolocation.showCalibration	= true;
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
        } else {
            Ti.API.info(e.coords);
            Ti.App.Properties.setString("current_lat", e.coords.latitude);
			Ti.App.Properties.setString("current_lon", e.coords.longitude);
        }
    });
} else {
    alert('Please enable location services');
}

Ti.Geolocation.addEventListener('location', function() {
	Ti.Geolocation.getCurrentPosition( function( e ) {
		Ti.App.Properties.setString("viewing_lat", e.coords.latitude);
		Ti.App.Properties.setString("viewing_lon", e.coords.longitude);
		mapView.setLocation({ latitude:e.coords.latitude, longitude:e.coords.longitude });
		var xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function() {
			Ti.API.log(this.responseText);
			var items = JSON.parse( this.responseText );
			var data = [];
			
			for ( var i = 0; i < items.length; i++ ) {
				var address = items[i].address;
				if ( address === null ) {
					address = '';
				}
				var distance = items[i].distance;
				distance = distance / 1000;
				distance = distance.toFixed(1);
				address += distance + 'km van uw huidige locatie';
				
				var poi = Ti.Map.createAnnotation({
					title:items[i].name,
					subtitle: address,
					animate:false,
					latitude:items[i].lat,
					longitude:items[i].lon,
					myid:items[i].id
				});
				
				data.push(poi);
			};
	
		mapView.addAnnotations(data);
	};
	xhr.open('GET', 'http://wordpress.oqapi.nl/poiadmin/index.php/poiservice/get_pois_on_radius/' + e.coords.latitude + '/' + e.coords.longitude );
	xhr.send();
	})
});

mapView.addEventListener('regionChanged', function(new_region) {
	Ti.App.Properties.setString("viewing_lat", new_region.latitude);
	Ti.App.Properties.setString("viewing_lon", new_region.longitude);
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		Ti.API.log(this.responseText);
		var items = JSON.parse( this.responseText );
		var data = [];
		
		for ( var i = 0; i < items.length; i++ ) {
			var address = items[i].address;
			if ( address === null ) {
				address = '';
			}
			var distance = items[i].distance;
			distance = distance / 1000;
			distance = distance.toFixed(1);
			address += distance + 'km van uw huidige locatie';
			
			var poi = Ti.Map.createAnnotation({
				title:items[i].name,
				subtitle: address,
				animate:false,
				latitude:items[i].lat,
				longitude:items[i].lon,
				myid:items[i].id
			});
			
			data.push(poi);
		};
	
	mapView.addAnnotations(data);
	};
	xhr.open('GET', 'http://wordpress.oqapi.nl/poiadmin/index.php/poiservice/get_pois_on_radius/' + new_region.latitude + '/' + new_region.longitude );
	xhr.send();
});
