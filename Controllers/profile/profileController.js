const {
    updateProfile,ProfileDetails
}=require('../../DB/DB.Tables/DAO-Profile');

async function HandleProfileUpdate(req,res,next){
    const {user_id}=req.userData
    const {profile_image,bio}=req.body
    console.log(user_id);
    console.log(profile_image);
    console.log(bio);
    try{
       await updateProfile(user_id,profile_image,bio);
       res.send({message:"Profile Updated successfully"})
    }
    catch(err){
       err.code=501
       next(err)
    }
}

async function HandleGetUserDetails(req,res,next){
    const {user_id}=req.userData
    console.log(user_id);
    try{
        const data=await ProfileDetails(user_id);
        res.send(data);
    }
    catch{
        next();
    }
}

module.exports={HandleProfileUpdate,HandleGetUserDetails}