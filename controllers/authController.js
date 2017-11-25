const GoogleAuth = require('google-auth-library');

// initialize Google Auth
let auth = new GoogleAuth;
let client = new auth.OAuth2(process.env.CLIENT_ID, '', '');

// helper function
let verifyUser = (idToken, clientId) => {
    return new Promise((resolve, reject) => {
        client.verifyIdToken(idToken, clientId,
            function (e, login) {
                // reject 
                if (e) {
                    reject('Token verification failed!');
                    return;
                }

                // resolve with payload
                let payload = login.getPayload();
                resolve(payload);
            }
        );
    });
};


exports.authenticateUser = async (req, res, next) => {

    // retrieve idToken from Request Header
    let idToken = req.header('idToken');

    // throw error if idToken is not available
    if (!idToken) {
        let error = new Error('Unable to retrieve token');
        error.status = 500;
        next(error);
        return;
    }

    let payload = await verifyUser(idToken, process.env.CLIENT_ID);
    let googleUserId = payload['sub'];

    // 1. Get user from userId
    // 2. If user not found, create one
    // 3. If user found, add userId and _id to request
    // 4. Do continue with the request

    // add userId as googleId in request
    req.googleUserId = googleUserId;
    // continue
    next();

};
