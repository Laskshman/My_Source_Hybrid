
var geoLocation = {
    watchId: null,
    latitude: null,
    longitude: null,
    run: function () {        
        var options = { enableHighAccuracy: true }
        watchId = navigator.geolocation.watchPosition(geoLocation.onSuccess, geoLocation.onError, options);
    },
    onSuccess: function (position) {        
        geoLocation.latitude = position.coords.latitude;
        geoLocation.longitude = position.coords.longitude;
    },
    onError: function (error) {        
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
};