'use strict';

app.home = kendo.observable({
    onShow: function() {}
});
(function(parent){
    var navigateHome = function () {
        app.mobileApp.navigate('#signin');
    };
    var homeViewModel= (function(){
         // Logout user
        var logout = function () {
            app.alert.Apphelper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };
        return {           
            logout: logout
        };
    }());    
    parent.set('homeViewModel', homeViewModel);
    parent.set('onShow', function() {       
    });
})(app.home)