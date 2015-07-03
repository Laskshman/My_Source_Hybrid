'use strict';

app.pgSettings = kendo.observable({
    onShow: function () {      
    }
});
(function (parent) {
    var navigateHome = function () {
        app.mobileApp.navigate('authenticationMainView/view.html');
    };
    var settingsViewModel = kendo.observable({
        // Logout user
        logout: function () {
            AppHelper.logout()
                .then(navigateHome, function (err) {
                    appalert.showError(err.message);
                    navigateHome();
                });
        }
    });
    parent.set('settingsViewModel', settingsViewModel);
})(app.pgSettings)