const {
  KVSet,KVGet
} = require("../../DB/KVStore");
const {verifyRefreshToken} = require("./../../Helpers/Auth/jwtTokenFactory");
const {
  signAllTokens
} = require("./TokenService");
const {
  AT_DURATION,
  RT_DURATION
} = require('../../Helpers/Auth/jwtTokenFactory');
const {GetUser} = require('../../DB/DB.Tables/DAO-users');

//if already logged in resolves payload else rejects
function checkIfLogin(refreshToken) {
  return new Promise((resolve, reject) => {
    verifyRefreshToken(refreshToken)
      .then(async (payload) => {
        console.log("Checking if its login")
        const isBlacklisted = await KVGet(refreshToken);

        if(isBlacklisted){
          resolve(refreshToken)
        }
        else{
          var err = new Error("Unauthorized");
          err.code = 401;
          err.srvMessage = 'Cookie Token Black Listed, Login Again';
          reject(err);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}


//if login is successful it sets the cookie and resolves the payload(user data) else rejects the error
function performLogin(res,username, password) {
  return new Promise((resolve, reject) => {
    GetUser(username)
      .then(async (data) => {
        if (data !== undefined && password === data.password) {
          try {
            const tokens = await signAllTokens(data);
            res.cookie('__AT__', tokens.accessToken, {
              maxAge: AT_DURATION.msformat,
              // httpOnly: true,
              // sameSite: 'strict'
               sameSite: 'none', secure: true 

            })
            res.cookie('__RT__', tokens.refreshToken, {
              maxAge: RT_DURATION.msformat,
              // httpOnly: true,
              // sameSite: 'strict'
              sameSite: 'none', secure: true 

            })
            const {refreshToken}  =tokens;
            resolve(refreshToken);

          } catch (err) {
            reject(err);
          }
        } else {
          var err = new Error("Invalid Credentials");
          err.code = 401;
          err.srvMessage = err.message;
          reject(err);
        }
      })
      .catch((err) => {
        reject(err);
      })
  })

}

//add the refresh token to redis
function performLogout(refreshToken, userData) {
  return new Promise((resolve, reject) => {
    let expirationTimeInSeconds = new Date(0);

    expirationTimeInSeconds.setSeconds(userData.exp);

    expirationTimeInSeconds = Math.ceil(
      (expirationTimeInSeconds - Date.now()) / 1000 + 60
    );

    KVSet(refreshToken, 1, expirationTimeInSeconds)
      .then((reply) => {
         resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  checkIfLogin,
  performLogin,
  performLogout
};