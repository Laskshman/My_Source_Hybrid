/**
 * alert & navigate JS
 */

var appalert = {
    // Global error handling
    showAlert: function (message, callback) {
        navigator.notification.alert(message, callback || function () {}, "Hospitality Demo App", 'OK');
    },
    showError: function (message) {
        appalert.showAlert(message, 'Error occured');
    }    
};

var AppHelper = {

    // Return user profile picture url
    resolveProfilePictureUrl: function (id) {
        if (id && id !== emptyGuid) {
            return el.Files.getDownloadUrl(id);
        } else {
            return 'styles/images/avatar.png';
        }
    },

    // Return current activity picture url
    resolvePictureUrl: function (id) {
        if (id && id !== emptyGuid) {
            return el.Files.getDownloadUrl(id);
        } else {
            return '';
        }
    },

    // Date formatter. Return date in d.m.yyyy format
    formatDate: function (dateString) {
        return kendo.toString(new Date(dateString), 'MMM d, yyyy');
    },

    // Current user logout
    logout: function () {
        var provider = app.data.defaultProvider;
        return provider.Users.logout();
    },

    autoSizeTextarea: function () {
        var rows = $(this).val().split('\n');
        $(this).prop('rows', rows.length + 1);
    },
    isNullOrEmpty: function (value) {
        debugger;
        return typeof value === 'undefined' || value === null || value === '';
    },
    isKeySet: function(key) {
        debugger;
        var regEx = /^\$[A-Z_]+\$$/;
    return !AppHelper.isNullOrEmpty(key) && !regEx.test(key);
    }
};