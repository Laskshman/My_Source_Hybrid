function(){
    
     // Global error handling
    var showAlert = function(message, callback) {
        navigator.notification.alert(message, callback || function () {
        },"Demo App", 'OK');
    };

    var showError = function(message) {
        showAlert(message, 'Error occured');
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
            var provider= app.data.defaultProvider;
            return provider.Users.logout();
        },

        autoSizeTextarea: function () {
            var rows = $(this).val().split('\n');
            $(this).prop('rows', rows.length + 1);
        }
    };
}