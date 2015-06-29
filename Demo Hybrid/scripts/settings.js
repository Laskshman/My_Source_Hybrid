var appsettings={
    
    everlive: {
        apiKey: 'z9HXZcXMmEc8EjtA', // Put your Backend Services API key here
        scheme: 'https',
        url: '//platform.telerik.com/bs-api/v1/'
    },    
    eqatec: {
        productKey: '1416717f51014d88b6c06fcc05c30337',  // Put your EQATEC product key here
        version: '1.0.0.0' // Put your application version here
    },    
    feedback: {
        apiKey: 'abc838c0-1afa-11e5-bd9b-6b07a0c2b93e',  // Put your AppFeedback API key here
        options: {
            enableShake: true,
            apiUrl: 'https://platform.telerik.com/feedback/api/v1'
        }
    },
    facebook: {
        appId: '1408629486049918', // Put your Facebook App ID here
        redirectUri: 'https://www.facebook.com/connect/login_success.html' // Put your Facebook Redirect URI here
    },

    google: {
        clientId: '49677839859-smq9b41rmork7lb2imdac9ofdjfsm1il.apps.googleusercontent.com',
        redirectUri: 'https://localhost/LoginResult.html'
        //clientId: '406987471724-q1sorfhhcbulk6r5r317l482u9f62ti8.apps.googleusercontent.com', // Put your Google Client ID here
        //redirectUri: 'http://localhost' // Put your Google Redirect URI here
    },
    messages: {
        mistSimulatorAlert: 'The social login doesn\'t work in the In-Browser Client, you need to deploy the app to a device, or run it in the simulator of the Windows Client or Visual Studio.',
        removeActivityConfirm: 'This activity will be deleted. This action can not be undone.'
    }
    
};