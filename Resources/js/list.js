/**
 * @author Rory Zweistra
 */

var win = Ti.UI.currentWindow;
var tab = Ti.UI.currentTab;

var listView = Ti.UI.createTableView({
	allowsSelection: true,
	borderRadius: 15
});

win.add(listView);

var xhr = Ti.Network.createHTTPClient();
xhr.onload = function() {
	Ti.API.log(this.responseText);
	var items = JSON.parse( this.responseText );
	var data = [];
	
	for ( var i = 0; i < items.length; i++ ) {
		
		var row = Ti.UI.createTableViewRow({
			hasChild:true,
			height:80,
			topic:items[i].name,
			title:items[i].name,
			fontSize:24,
			color:'#000',
			selectedBackgroundColor:'#ddd',
		});
		
		data.push(row);
	};
	
	
	listView.setData(data);
};

var lat = 52.18958;
var lon = 5.29524;

xhr.open('GET', 'http://wordpress.oqapi.nl/poiadmin/index.php/poiservice/get_pois_on_proximity/' + lat + '/' + lon );
xhr.send();
