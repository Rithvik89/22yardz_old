const {Router} = require('express');
const checkAllowance = require('../Controllers/Auth/checkAllowance');
const { 
    HandleProfileUpdate, 
    HandleGetUserDetails, 
    HandleViewProfile, 
    HandleDeleteRequest, 
    HandleDeleteConnection,
    HandleGetAllComments,
    HandleGetAllLikes
} = require('../Controllers/profile/profileController');
const profileRouter = Router();

profileRouter.put('/',checkAllowance,HandleProfileUpdate);
profileRouter.get('/profile-details',checkAllowance,HandleGetUserDetails);
profileRouter.post('/view-profile',checkAllowance,HandleViewProfile);
profileRouter.post('/del-request',checkAllowance,HandleDeleteRequest);
profileRouter.post('/del-connection',checkAllowance,HandleDeleteConnection);
profileRouter.get('/mycomments',checkAllowance,HandleGetAllComments);
profileRouter.get('/likes',checkAllowance,HandleGetAllLikes);

module.exports=profileRouter





// if already connected.....
// is_friend is true...
// Need to show unfriend option..... (in profile).

// if not connected.....

// No request call between each other...
// is_fan is false.... and is_celebrity is false....
// Need to show connect option ...... (in profile).

// Some sort of request call was there between each other...
// check in pending connections.....

// if user is fan and selected_user is celebrity....
// is_celebrity is true.....
// show status pending ..... (in profile).

// if user is celebrity and selected_user is fan ....
// is_fan is true.....
// show Accept and Decline buttons ..... (in profile).
