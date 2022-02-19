const {
  RequestConnection,
  AcceptConnection,
  GetPendingNetworks,
  GetRecommendedNetworks,
  DropConnectionFromPending
}= require('../../DB/DB.Tables/DAO-Networks')

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
     const {celebrity}=req.body
     console.log(typeof(celebrity))
     try{
        await RequestConnection(user_id,celebrity);
        res.send("request sent Successfully")
     }
     catch(err){
        err.code=501
        next(err)
     }
}

async function NewConnectionMade(req,res,next){
    const {user_id}=req.userData
    const {fan}=req.body

    try{
        // Accept the connection...
       await AcceptConnection(fan,user_id);
       // drop that conection from pending table.....
       console.log("Hello")
       await DropConnectionFromPending(fan,user_id);
       res.send("Connection Made succesfully")
    }
    catch(err){
       err.code=501
       next(err)
    }
}

module.exports={ViewNetworkSection,PendingRequest,NewConnectionMade}