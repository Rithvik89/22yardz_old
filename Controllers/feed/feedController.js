const {
   deletePost, 
   fetchFeed,
   fetchPostById,
   createPost,
   updatePostById,
   addToEvents
} = require('../../DB/DB.Tables/DAO-Posts')


async function HandleAddUserPost(req,res,next){
         const {user_id}=req.userData
         const {content,image}=req.body
         const date=new Date()
         console.log(user_id,content,date,image)
         try{
            let response=await createPost(user_id,content,date,image)
            response=response.insertId;
            await addToEvents(response,user_id,date);
            res.send({message:"Post created successfully"})
         }
         catch(err){
            err.code=501
            next(err)
         }
}

async function HandleGetAllPosts(req,res,next){
       try{
         const {user_id}=req.userData
         const data=await fetchFeed(user_id)
         res.send(data)
       }
       catch(err){
          next(err);
       }
}

async function HandleGetThisPost(req,res,next){
   const feed_id=Number(req.params.id)
   const data=await fetchPostById(feed_id)
   res.send(data)
}

async function HandleDeletePost(req,res,next){
   await deletePost(req.params.id)
}



module.exports={HandleAddUserPost,HandleGetAllPosts,HandleGetThisPost,HandleDeletePost}