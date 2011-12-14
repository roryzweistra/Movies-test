/**
 * @author Rory Zweistra
 */

var win = Ti.UI.currentWindow;
var tab = Ti.UI.currentTab;

var searchBar = Ti.UI.createSearchBar({
	barColor:'#000', 
    showCancel:true,
    hintText: 'Enter search phrase',
    height:43,
    top:0,
});

win.add(searchBar);

searchBar.addEventListener('cancel', function() {
	searchBar.value = '';
});

searchBar.addEventListener('return', function() {
	searchBar.blur();
	if ( searchBar.value != '' ) {
		xhr.open('GET', 'http://wordpress.oqapi.nl/poiadmin/index.php/poiservice/search/' + searchBar.value + '/' + lat + '/' + lon );
		xhr.send();
	}
});

var searchList = Ti.UI.createTableView({
	allowsSelection: true,
	borderRadius: 15,
	top: 45
});

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
	
	win.add(searchList);
	searchList.setData(data);
};

var lat = 52.18958;
var lon = 5.29524;

win.addEventListener('click', function(){
	searchBar.blur();
});