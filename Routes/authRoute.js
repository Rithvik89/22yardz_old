const {Router} = require('express');
const { HandleUserLogin, HandleUserRegister,HandleUserLogout} = require('../Controllers/Auth/userController');

const authRouter = Router();


authRouter.post('/register',HandleUserRegister);
authRouter.post('/login',HandleUserLogin );
authRouter.get('/logout',HandleUserLogout );

module.exports = authRouter;