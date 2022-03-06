const {Router} = require('express');
const checkAllowance = require('../Controllers/Auth/checkAllowance');
const { HandleProfileUpdate, HandleGetUserDetails } = require('../Controllers/profile/profileController');
const profileRouter = Router();

profileRouter.put('/',checkAllowance,HandleProfileUpdate);
profileRouter.get('/profile-details',checkAllowance,HandleGetUserDetails);

module.exports=profileRouter