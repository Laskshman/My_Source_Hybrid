'use strict';

app.changePasswordView = kendo.observable({
    onShow: function () {}
});
(function (parent) {
    var navigateHome = function () {
        app.mobileApp.navigate('authenticationMainView/view.html');
    };
    var changepasswordViewModel = kendo.observable({
        oldpassword: '',
        newpassword: '',
        cfmnewpassword: '',
        // Logout user
        logout: function () {
            AppHelper.logout()
                .then(navigateHome, function (err) {
                    appalert.showError(err.message);
                    navigateHome();
                });
        },
        validateData: function (data) {
            if (!data.oldpassword) {
                appalert.showAlert('Please Enter the Old Password');
                return false;
            }
            if (!data.newpassword) {
                appalert.showAlert('Please Enter the New Password');
                return false;
            }
            if (!data.cfmnewpassword) {
                appalert.showAlert('Please Enter the Confirm Password');
                return false;
            }
            if (data.oldpassword === data.newpassword) {
                appalert.showAlert(' Old Password and New Password are Same, Please set Different Password from Previous One. ');
                return false;
            }
            if (data.newpassword !== data.cfmnewpassword) {
                appalert.showAlert('Confirm Password Mismatch');
                return false;
            }
            return true;
        },
        submit: function () {
            var model = changepasswordViewModel,
                password = model.oldpassword,
                newPassword = model.newpassword,
                cfmnewPassword = model.cfmnewpassword;

            if (!model.validateData(model)) {
                return false;
            }
            var provider = app.data.defaultProvider;
            provider.Users.currentUser(function (data) {
                    if (data.result) {
                        var username = data.result.Username;

                        // var object = {
                        //     "Username": username, //pass the username
                        //     "Password": password, //pass the user's current password
                        //     "NewPassword": newPassword //pass the user's new password
                        // };
                        // var apiKey = appsettings.everlive.apiKey;
                        // $.ajax({
                        //     type: "POST",
                        //     url: "http://api.everlive.com/v1/"+ apiKey +"/Users/changepassword",
                        //     contentType: "application/json",
                        //     data: JSON.stringify(object),
                        //     success: function (data) {                        
                        //         appalert.showAlert("Your Password Is Successfully Changed.");
                        //         app.mobileApp.navigate('home/view.html');
                        //     },
                        //     error: function (error) {                        
                        //         appalert.showError(error);
                        //     }
                        // });
                        provider.Users.changePassword(username, password, newPassword,
                            function (data) {
                                debugger;
                                appalert.showError(data);
                            },
                            function (error) {
                                debugger;
                                appalert.showAlert("Your Password Is Successfully Changed.");
                                app.mobileApp.navigate('home/view.html');

                            });
                    } else {
                        appalert.showAlert("Missing access token. Please log in!");
                    }
                },
                function (err) {
                    alert(err.message + " Please log in.");
                });

            appalert.showAlert("Submit button is clicked");
        }
    });
    parent.set('changepasswordViewModel', changepasswordViewModel);
})(app.changePasswordView)