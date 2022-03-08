const {
  RequestConnection,
  AcceptConnection,
  GetPendingNetworks,
  GetRecommendedNetworks,
  DropConnectionFromPending,
  MyConnections,
  RemoveFromPendingConnections,
  RemoveSuggestion
}= require('../../DB/DB.Tables/DAO-Networks')
const {
   verifyAccessToken
}=require('../../Helpers/Auth/jwtTokenFactory')

async function ViewNetworkSection(req,res,next){
    const {user_id}=req.userData
    try{
       const pending=await GetPendingNetworks(user_id)
       const recommend=await GetRecommendedNetworks(user_id)
       res.send({pending,recommend})
    }
    catch(err){
        err.code=501
        next(err)
    }
}

async function PendingRequest(req,res,next){
     const {user_id}=req.userData
     let {celebrity}=req.body
     celebrity=parseInt(celebrity)
     try{
        await RequestConnection(user_id,celebrity);
      //   await DropRemoveConnections(celebrity,user_id);
        res.send({message:"request sent Successfully"})
     }
     catch(err){
        err.code=501
        next(err)
     }
}

async function NewConnectionMade(req,res,next){
    const {user_id}=req.userData
    let {fan}=req.body
    fan=parseInt(fan)
    try{
        // Accept the connection...
       await AcceptConnection(fan,user_id);
       // drop that conection from pending table.....
       await DropConnectionFromPending(fan,user_id);
       res.send({message:"Connection Made succesfully"})
    }
    catch(err){
       err.code=501
       next(err)
    }
}

async function MyNetworkConnections(req,res,next){
    try{
       console.log(req.cookies.__AT__)
       const payload=await verifyAccessToken(req.cookies.__AT__);
       let user_id=payload.user_id;
       user_id=parseInt(user_id);
       try{
         const myConnections=await MyConnections(user_id);
         res.send({myConnections})
       }
       catch{
          next()
       }
    }
    catch{
       next();
    }
}

async function DeclineConnections(req,res,next){
    try{
      const payload=await verifyAccessToken(req.cookies.__AT__);
      let user_id=payload.user_id;
      user_id=parseInt(user_id);

      let enemy=req.body.enemy
      enemy=parseInt(enemy)
      try{
         // await RemoveConnections(enemy,user_id);
         await RemoveFromPendingConnections(enemy,user_id);
         await RemoveSuggestion(enemy,user_id);
         res.send({message:"removed from collection"});
       }
       catch{
          next()
       }
    }
    catch{
       next();
    }
}

async function DeclineSuggestion(req,res,next){
   try{
      const payload=await verifyAccessToken(req.cookies.__AT__);
      let user_id=payload.user_id;
      user_id=parseInt(user_id);
      let enemy=req.body.enemy
      enemy=parseInt(enemy)
      try{
         await RemoveSuggestion(enemy,user_id);
         res.send({message:"removed from collection"});
       }
       catch{
          next()
       }
    }
    catch{
       next();
    }
}

module.exports={ViewNetworkSection,PendingRequest,NewConnectionMade, MyNetworkConnections,DeclineConnections,DeclineSuggestion}