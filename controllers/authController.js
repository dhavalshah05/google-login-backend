const GoogleAuth = require('google-auth-library');
const User = require('../models/User');

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

    // verify idTokan and retrieve payload
    const payload = await verifyUser(idToken, process.env.CLIENT_ID);
    const googleUserId = payload['sub'];

    // find User by googleUserId
    let user = await User.findOne({ googleUserId: googleUserId });

    // If user not found, create a new user with googleUserId
    if(!user){
        user = await (new User({ googleUserId: googleUserId })).save();
    }

    user.email = payload['email'];
    user.name = payload['name'];
    user.picture = payload['picture'];

    // add user to request
    req.user = user;

    // continue
    next();
};
