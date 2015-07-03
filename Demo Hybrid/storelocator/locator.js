'use strict';

var map;
var markers = [];
var infoWindow = new google.maps.InfoWindow();

app.locator = kendo.observable({
    onShow: function () {
        debugger;
        var lati = parseFloat(geoLocation.latitude);
        var long = parseFloat(geoLocation.longitude);
        var currentlocation = new google.maps.LatLng(lati, long);
        var mapOptions = {
            sensor:false,
            center: currentlocation,                
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            navigationControl: true,
            navigationControlOptions:
            {
                style: google.maps.NavigationControlStyle.ZOOM_PAN,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            panControl: true,
            panControlOptions: {
                style: google.maps.MapTypeControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            scaleControl: true            
        };
        map = new google.maps.Map(document.getElementById("map"),
       mapOptions);
        var marker = new google.maps.Marker({
            position: currentlocation,
            map: map,            
        });
        marker.info = new google.maps.InfoWindow({
            content: '<b> Your Current Location </b> '
        });

        google.maps.event.addListener(marker, 'click', function () {
            marker.info.open(map, marker);
        });
        markers.push(marker);
        google.maps.event.trigger(map, 'resize');
        app.locator.addTable();
    },
    addTable: function(){
        var table = "<style type='text/css'> #table, #th, #td { border: 2px solid black; } </style>";
        table += "<table class='table' border='1' ><tr><th style='width: 100px; text-align: center;'>Outlet Name & Address </th><th style='width: 100px; text-align: center;'>Distance From Current Address(km in Approx)</th><th style='width: 100px; text-align: center;'>Contact #</th></tr>";
        table += "<tr><td style='width: 400px;text-align: left;'><u><b>Guindy</b></u><br/>YYY<br/>600024</td>";
        table += "<td style='width: 100px;text-align: center;'>11</td>";
        table += "<td style='width: 100px;text-align: left;'>04426173052</td>";
        table += "</table>";
        $("#myData").html(table);
    }
});
(function (parent) {
    var navigateHome = function () {
        app.mobileApp.navigate('authenticationMainView/view.html');
    };
    var locatorViewModel = kendo.observable({
        // Logout user
        logout: function () {
            AppHelper.logout()
                .then(navigateHome, function (err) {
                    appalert.showError(err.message);
                    navigateHome();
                });
        }
    });
    parent.set('locatorViewModel', locatorViewModel);    
})(app.locator)