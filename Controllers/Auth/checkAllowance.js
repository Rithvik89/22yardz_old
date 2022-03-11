const {
    verifyAccessToken,
    verifyRefreshToken,
    AT_DURATION,
    RT_DURATION,
} = require("../../Helpers/Auth/jwtTokenFactory");
const {
    signAllTokens
} = require("../../Services/Auth/TokenService");


function checkAllowance(req, res, next) {
    console.log("cookies");
    console.log(req.cookies);
    if (req.cookies === undefined) {
        // checking if there is no cookie
        var err = new Error("Not Authorized");
        err.code = 401;
        err.srvMessage = "No Cookies found";
        return next(err);
    } else if (
        // checking if there is no refresh token
        req.cookies.__RT__ === undefined ||
        req.cookies.__RT__ === "" ||
        req.cookies.__RT__ === null
    ) {
        var err = new Error("Login Again");
        err.code = 401;
        err.srvMessage = "Some Cookies not found";
        return next(err);
        
    }
    verifyAccessToken(req.cookies.__AT__)
        .then((data) => {
            verifyRefreshToken(req.cookies.__RT__)
                .then((data) => {
                    req.userData = data;
                    next();
                })
                .catch((err) => {
                    next(err);
                })
        })
        .catch((err) => {
            console.log(err);
            verifyRefreshToken(req.cookies.__RT__)
                .then(async (data) => {
                    const tokens = await signAllTokens(data);
                    res.cookie("__AT__", tokens.accessToken, {
                        maxAge: AT_DURATION.msformat,
                        // httpOnly: true,
                        // sameSite: "strict"
                    })
                    res.cookie("__RT__", tokens.refreshToken, {
                        maxAge: RT_DURATION.msformat,
                        // httpOnly: true,
                        // sameSite: 'strict'
                    })
                    req.userData = data
                    next()
                })
                .catch((err) => {
                    res.clearCookie('__AT__');
                    res.clearCookie('__RT__');
                    next(err);
                })
        })
}

module.exports = checkAllowance