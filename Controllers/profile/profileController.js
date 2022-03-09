const {
    updateProfile,
    ProfileDetails,
    viewProfileDetails,
    checkAsFan,
    checkAsCelebrity,
    checkAsFriend1,
    checkAsFriend2,
    getuserid,
    deleteRequest,
    deleteConnection,
}=require('../../DB/DB.Tables/DAO-Profile');
const {
  getAllLikes
} = require('../../DB/DB.Tables/DAO-likes')
const {
  getAllComments
} = require('../../DB/DB.Tables/DAO-comments');
const {
    MyConnections
}=require('../../DB/DB.Tables/DAO-Networks');
const { GetUserById } = require('../../DB/DB.Tables/DAO-users');

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
        const myConnections=await MyConnections(user_id);
        let connectionsList=[];
        for(let i=0;i<myConnections.length;i++){
          if(myConnections[i].celebrity!==undefined){
               let userDetails=await GetUserById(myConnections[i].celebrity);
               connectionsList.push(userDetails);
          }
          else if(myConnections[i].fan!==undefined){
            let userDetails=await GetUserById(myConnections[i].fan);
            connectionsList.push(userDetails);
          }
        }
        res.send({data,connectionsList});
    }
    catch{
        next();
    }
}

async function HandleViewProfile(req,res,next){
    const {user_id}=req.userData;
    let {view_user}=req.body;
    console.log(view_user);
    console.log(user_id);
    try{
        view_user=await getuserid(view_user);
        view_user=parseInt(view_user.user_id);
        const myConnections=await MyConnections(view_user);
        let connectionsList=[];
        for(let i=0;i<myConnections.length;i++){
          if(myConnections[i].celebrity!==undefined){
               let userDetails=await GetUserById(myConnections[i].celebrity);
               connectionsList.push(userDetails);
          }
          else if(myConnections[i].fan!==undefined){
            let userDetails=await GetUserById(myConnections[i].fan);
            connectionsList.push(userDetails);
          }
        }
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
       
       res.send({data,connectionsList,is_fan,is_celeb,is_friend});
    }
    catch{
        next();
    }
}

async function HandleDeleteRequest(req,res,next){
    const {user_id}=req.userData;
    let {celebrity}=req.body;
    celebrity=parseInt(celebrity);
    try{
      // Delete Request...
      await deleteRequest(user_id,celebrity);
      res.send({message:"Request deleted successfully"});
    }
    catch(err){
      next(err);
    }
}

async function HandleDeleteConnection(req,res,next){
     const {user_id}=req.userData;
     let {other} =req.body;
     other=parseInt(other);
     try{
         console.log(user_id,other);
       await deleteConnection(user_id,other);
       res.send({message:"Connection deleted successfully"});
    }
     catch(err){
        next(err);
     }
}

async function HandleGetAllComments(req,res,next) {
  try {
      const {user_id} = req.userData;
      console.log(req.userData);
      const data = await getAllComments(user_id);
      console.log(data);
      res.send(data);
  } catch (err) {
      next(err);
  }
}
async function HandleGetAllLikes(req,res,next) {
  try {
     const {user_id} = req.userData;
     const data = await getAllLikes(user_id);
     console.log(data);
     res.send(data);
  } catch (err) {
     next(err);
  }
}
module.exports={
  HandleProfileUpdate,
  HandleGetUserDetails,
  HandleViewProfile,
  HandleDeleteRequest,
  HandleDeleteConnection,
  HandleGetAllComments,
  HandleGetAllLikes
}