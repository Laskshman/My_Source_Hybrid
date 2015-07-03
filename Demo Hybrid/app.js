(function() {
    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        data: {}
    };

    var watchID = null;

    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {

                // the application needs to know which view to load first
                //initial: 'webservice/view.html',
                initial: 'authenticationMainView/view.html',
                statusBarStyle: 'black-translucent'
            });
        });
    };

    if (window.cordova) {
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', function() {
            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            debugger;
            bootstrap();
            var Options = { timeout: 30000 };
            watchID = navigator.geolocation.watchPosition(geoLocation.onSuccess, geoLocation.OnError, Options);            
        }, false);
    } else {
        bootstrap();
    }

    window.app = app;
    
    
    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());