const {
    signAccessToken,
    signRefreshToken
} = require("../../Helpers/Auth/jwtTokenFactory");


async function signAllTokens(userData) {
    return new Promise(async (resolve, reject) => {
        try {
            var accessToken = await signAccessToken(userData);
            var refreshToken = await signRefreshToken(userData);
            resolve({
                accessToken,
                refreshToken
            });
        } catch (err) {
            reject(err);
        }
    })

}


module.exports = {
    signAllTokens
};