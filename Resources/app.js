// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFF');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
});


//
// create base UI tab and root window
//
var mapwindow = Titanium.UI.createWindow({  
    title:'Kaart',
    backgroundColor:'#fff',
    url:'js/map.js'
});
var maptab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Kaart',
    window:mapwindow
});

//
// create controls tab and root window
//
var listwindow = Titanium.UI.createWindow({  
    title:'Lijst',
    backgroundColor:'#fff',
    url:'js/list.js'
});
var listtab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Lijst',
    window:listwindow
});

//
// create controls tab and search window
//
var searchwindow = Titanium.UI.createWindow({  
    title:'Zoek',
    backgroundColor:'#fff',
    url: 'js/search.js'
});
var searchtab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Zoek',
    window:searchwindow
});


//
//  add tabs
//
tabGroup.addTab(maptab);  
tabGroup.addTab(listtab);
tabGroup.addTab(searchtab);  


// open tab group
tabGroup.open();
