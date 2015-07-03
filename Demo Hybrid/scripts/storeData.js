var storeLocData = {
    getLocation: function (options) {
        var dfd = new $.Deferred();

        //Default value for options
        if (options === undefined) {
            options = { enableHighAccuracy: true };
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                dfd.resolve(position);
            },
            function (error) {
                dfd.reject(error);
            },
            options);

        return dfd.promise();
    },
};