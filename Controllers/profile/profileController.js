const {
    updateProfile,ProfileDetails,viewProfileDetails,checkAsFan,checkAsCelebrity,checkAsFriend1,checkAsFriend2
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

async function HandleViewProfile(req,res,next){
    const {user_id}=req.userData;
    const {view_user}=req.body;
    console.log(user_id);
    try{
       const data=await viewProfileDetails(view_user);
       const friend1=await checkAsFriend1(user_id,view_user);
       const friend2=await checkAsFriend2(user_id,view_user);
       const fan=await checkAsFan(view_user,user_id);
       const celeb=await checkAsCelebrity(view_user,user_id);
       let is_friend,is_fan,is_celeb;
       if(friend1.length===0||friend2.length===0){
          is_friend=0;
       }
       else{
           is_friend=1;
       }
       if(fan.length===0){
          is_fan=0;
       }
       else{
         is_fan=1;
       }
       if(celeb.length===0){
         is_celeb=0;
       }
       else{
         is_celeb=1;
       }
       
       res.send({data,is_fan,is_celeb,is_friend});
    }
    catch{
        next();
    }
}
module.exports={HandleProfileUpdate,HandleGetUserDetails,HandleViewProfile}