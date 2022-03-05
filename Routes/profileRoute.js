const {Router} = require('express');
const checkAllowance = require('../Controllers/Auth/checkAllowance');
const { HandleProfileUpdate } = require('../Controllers/profile/profileController');
const profileRouter = Router();

profileRouter.put('/',checkAllowance,HandleProfileUpdate);

module.exports=profileRouter