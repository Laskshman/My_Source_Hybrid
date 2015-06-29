'use strict';

app.home = kendo.observable({
    onShow: function() {}
});
(function(parent){
    var navigateHome = function () {
        app.mobileApp.navigate('authenticationMainView/view.html');
    };
    var homeViewModel= kendo.observable({
         // Logout user
         logout: function () {
            AppHelper.logout()
            .then(navigateHome, function (err) {
                appalert.showError(err.message);
                navigateHome();
            });
        }   
    });    
    parent.set('homeViewModel', homeViewModel);   
})(app.home)