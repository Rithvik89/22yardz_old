const {
   deletePost, 
   fetchFeed,
   fetchPostById,
   createPost,
   updatePostById
} = require('../../DB/DB.Tables/DAO-Posts')


async function HandleAddUserPost(req,res,next){
         const {user_id}=req.userData
         const {content}=req.body
         const date=new Date()
         console.log(user_id,content,date)
         try{
            await createPost(user_id,content,date)
            res.send("Post created successfully")
         }
         catch(err){
            err.code=501
            next(err)
         }
}

async function HandleGetAllPosts(req,res){
        const {user_id}=req.userData
        const data=await fetchFeed(user_id,0)
        res.send(data)
}

async function HandleGetThisPost(req,res){
   const feed_id=Number(req.params.id)
   const data=await fetchPostById(feed_id)
   res.send(data)
}

async function HandleDeletePost(req,res){
   await deletePost(req.params.id)
}



module.exports={HandleAddUserPost,HandleGetAllPosts,HandleGetThisPost,HandleDeletePost}