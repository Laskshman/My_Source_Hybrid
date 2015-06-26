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
                    mobileNo: '',
                    birthDate: new Date(),
                    gender: '0',
                    validateData: function (data) {
                        if (!data.email) {
                            alert('Missing email');
                            return false;
                        }

                        if (!data.password) {
                            alert('Missing password');
                            return false;
                        }

                        if (!data.mobileNo) {
                            alert('Missing Mobile No');
                            return false;
                        }

                        return true;
                    },
                    signin: function () {
                        var model = authenticationViewModel,
                            email = model.email.toLowerCase(),
                            password = model.password;

                        if (!model.validateData(model)) {
                            return false;
                        }

                        provider.Users.login(email, password, successHandler, init);
                    },
                    register: function () {
                        var model = authenticationViewModel,
                            email = model.email.toLowerCase(),
                            password = model.password,
                            displayName = model.displayName,
                            userName = model.userName,
                            birthDate = model.birthDate,
                            gender = model.gender,
                            attrs = {
                                Email: email,
                                DisplayName: displayName,
                                BirthDate: birthDate,
                                Gender: gender
                            };

                        if (!model.validateData(model)) {
                            return false;
                        }

                        provider.Users.register(userName, password, attrs, successHandler, init).then(function () {
                                    showAlert("Registration successful");
                                },
                                function (message) {
                                    showAlert(message, 'Error occured');
                                }
                            },
                            toggleView: function () {
                                mode = mode === 'signin' ? 'register' : 'signin';
                                init();
                            },
                            onSelectChange: function () {
                                var selected = sel.options[sel.selectedIndex].value;
                                sel.style.color = (selected === 0) ? '#b6c5c6' : '#34495e';
                            }
                    });

                parent.set('authenticationViewModel', authenticationViewModel); parent.set('onShow', function () {
                    provider.Users.currentUser().then(successHandler, init);
                });
            })(app.authenticationView);