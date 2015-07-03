
var geoLocation = {
    watchId: null,
    latitude: null,
    longitude: null,
    run: function () {
        debugger;
        var options = { enableHighAccuracy: true }
        watchId = navigator.geolocation.watchPosition(geoLocation.onSuccess, geoLocation.onError, options);
    },
    onSuccess: function (position) {
        debugger;
        geoLocation.latitude = position.coords.latitude;
        geoLocation.longitude = position.coords.longitude;
    },
    onError: function (error) {
        debugger;
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
};