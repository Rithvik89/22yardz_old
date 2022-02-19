const {
    getLikes,
    createLike,
    deleteLike
} = require('../../DB/DB.Tables/DAO-likes');

async function HandleGetLike(req,res,next){
      try{
          const data = await getLikes(req.query.postid);
          if(data===undefined || data.length===0)
           res.send({});
               
          res.status(200).json(data);
      }
      catch(err){
          next(err);
      }
}

async function HandlePostLike(req,res,next){
    const postId = req.query.postid;
    const userId = req.query.userId;
    console.log(req.query);
    try{
        await createLike(postId,userId);
        res.send("like added succesfully");
    }
    catch(err){
        next(err);
    }

}

async function HandleDeleteLike(req,res,next){
    const postId = req.query.postid;
    const userId = req.query.userId;
    try{
        await deleteLike(postId,userId);
        res.send("like deleted successfully");
    }
    catch(err){
        next(err);
    }
}
module.exports = {HandlePostLike,HandleDeleteLike,HandleGetLike};