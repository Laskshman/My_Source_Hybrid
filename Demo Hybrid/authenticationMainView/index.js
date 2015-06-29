'use strict';

app.authenticationView = kendo.observable({
    onShow: function () {}
});
(function (parent) {
    var provider = app.data.defaultProvider,
        mode = 'signin',
        registerRedirect = 'home',
        signinRedirect = 'home',
        init = function (error) {
            if (error) {
                if (error.message) {
                    alert(error.message);
                }

                return false;
            }

            var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';

            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
            } else {
                $(activeView).show().siblings().hide();
            }
        },
        successHandler = function (data) {
            var redirect = mode === 'signin' ? signinRedirect : registerRedirect;

            if (data && data.result) {
                app.user = data.result;
                app.mobileApp.navigate(redirect + '/view.html');
            } else {
                init();
            }
        },
        authenticationViewModel = kendo.observable({
            displayName: '',
            email: '',
            userName: '',
            password: '',
            passwordSalt: '',
            mobileNo: '',
            birthDate: new Date(),
            gender: '0',
            validateData: function (data) {
                if (!data.userName) {
                    alert('Missing User Name');
                    return false;
                }

                if (!data.password) {
                    alert('Missing password');
                    return false;
                }

                return true;
            },
            validateDataRegister: function (data) {
                if (!data.email) {
                    alert('Missing email');
                    return false;
                }
                if (!data.password) {
                    alert('Missing password');
                    return false;
                }
                if (data.password === data.passwordSalt) {
                    alert('Confirm Password Mismatch');
                    return false;
                }
                if (!data.mobileNo) {
                    alert('Missing Mobile No');
                    return false;
                }
                if (!data.userName) {
                    alert('Missing User Name');
                    return false;
                }
                return true;
            },
            signin: function () {
                var model = authenticationViewModel,
                    userName = model.userName,
                    password = model.password;

                if (!model.validateData(model)) {
                    return false;
                }
                provider.Users.login(userName, password, successHandler, init);
            },
            register: function () {
                var model = authenticationViewModel,
                    email = model.email.toLowerCase(),
                    password = model.password,
                    displayName = model.displayName,
                    userName = model.userName,
                    gender = model.gender,
                    birthDate = model.birthDate,
                    attrs = {
                        Email: email,
                        DisplayName: displayName,
                        Username: userName,
                        Gender: gender,
                        BirthDate: birthDate,
                    };
                if (!model.validateDataRegister(model)) {
                    return false;
                }

                provider.Users.register(email, password, attrs, successHandler, init).then(function () {
                        showAlert("Registration successful");
                    },
                    function (err) {
                        showError(err.message);
                    });
            },
            toggleView: function () {
                mode = mode === 'signin' ? 'register' : 'signin';
                init();
            },
            onSelectChange: function () {
                var selected = sel.options[sel.selectedIndex].value;
                sel.style.color = (selected === 0) ? '#b6c5c6' : '#34495e';
            },
            forgot: function () {
                debugger;
                if (!this.authenticationViewModel.email && !this.authenticationViewModel.mobileNo) {
                    alert("Email address Or Mobile No is required.");
                    return;
                }
                var apiKey = appsettings.everlive.apiKey;
                $.ajax({
                    type: "POST",
                    url: "https://api.everlive.com/v1/" + apiKey + "/Users/resetpassword",
                    contentType: "application/json",
                    data: JSON.stringify({
                        Email: this.authenticationViewModel.email
                    }),
                    success: function () {
                        navigator.notification.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                        window.location.href = "authenticationMainView/view.html";
                    },
                    error: function () {
                        navigator.notification.alert("Unfortunately, an error occurred resetting your password.")
                    }
                });
            },
            forgotView: function () {
                $("#forgot").data("kendoMobileModalView").close();
            },
            signupFacebook: function () {
                alert("Clicked the Facebook");
            },
            signupGoogle: function () {
                alert("Clicked the Google");
            }
        });

    parent.set('authenticationViewModel', authenticationViewModel);
    parent.set('onShow', function () {
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.authenticationView);