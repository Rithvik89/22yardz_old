const jwt = require('jsonwebtoken');

const AT_DURATION = {
    msformat : 1000*60*15,
    AT_SECRET_KEY:"BWEF&*hbiy&(&*)njhinu"
};

const RT_DURATION = {
    msformat : 1000*60*60*24,
    RT_SECRET_KEY:"NUIHibuym*&^(b^$%&^& &b"
};

//creates and resolves token if token is valid else rejects error
function createToken(payload, secret , options ) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if(err){
                err.srvMessage = "Error in token creation";
                reject(err);
            }
            resolve(token);
        })
    })
}


//creates and resolves token if token is valid else rejects error
function signAccessToken ( userData ) {
    const  payload = {
        user_id : userData.user_id,
        username : userData.username,
        email : userData.email_id,
        registered_date: userData.registered_date,
        profile_image: userData.profile_image,
        bio:userData.bio
    }
    const secret = AT_DURATION.AT_SECRET_KEY;
    const options = {
        expiresIn : AT_DURATION.msformat,
        issuer : '22yards', 
    }

    return createToken(payload, secret, options);

}

//creates and resolves token if token is valid else rejects error
function signRefreshToken ( userData ) {
    const  payload = {
        user_id : userData.user_id,
        username : userData.username,
        email : userData.email_id,
        registered_date: userData.registered_date,
        profile_image: userData.profile_image,
        bio:userData.bio
    }
    const secret = RT_DURATION.RT_SECRET_KEY;
    const options = {
        expiresIn : RT_DURATION.msformat,
        issuer : '22yards'
    }

    return createToken(payload, secret, options);
}

//verifies and resolves payload if token is valid else rejects error
function verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, AT_DURATION.AT_SECRET_KEY, (err, payload) => {
            if(err) {
                console.log("some error in verifying token")
                err.code = 404;
                err.srvMessage = "Access Token Not Valid";
                reject(err);
            }
            resolve(payload);
        })
    })
}


//verifies and resolves payload if token is valid else rejects error
function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, RT_DURATION.RT_SECRET_KEY, (err, payload) => {
            if(err) {
                err.code = 404;
                err.srvMessage = "Refresh Token Not Valid";
                reject(err);
            }
            resolve(payload);
        })
    })
}

module.exports = {signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, AT_DURATION, RT_DURATION};