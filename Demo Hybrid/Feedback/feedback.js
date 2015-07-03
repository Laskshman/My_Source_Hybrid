'use strict';

app.feedback = kendo.observable({
    onShow: function () {     
    }
});
(function (parent) {
    var navigateHome = function () {
        app.mobileApp.navigate('authenticationMainView/view.html');
    };
    var feedbackViewModel = kendo.observable({
        displayName: '',
        email: '',
        mobileNo: '',
        // Logout user
        logout: function () {
            AppHelper.logout()
                .then(navigateHome, function (err) {
                    appalert.showError(err.message);
                    navigateHome();
                });
        },
        submit: function () {
            appalert.showAlert("Submit button is clicked");
        }
    });
    parent.set('feedbackViewModel', feedbackViewModel);
})(app.feedback)