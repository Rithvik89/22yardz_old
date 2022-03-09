const { parse } = require('dotenv');
const {
    getLikes,
    createLike,
    deleteLike,
    updateLikes,
    addToEvents,
    getLikeId,
    deleteToEvents,
    GetPostLikes,
    GetNoofLikes
} = require('../../DB/DB.Tables/DAO-likes');

const {GetUserById} = require('../../DB/DB.Tables/DAO-users');
async function HandleGetLike(req,res,next){
    // console.log(req.params);
    let post_id=req.params.id;
    post_id=parseInt(post_id);
    let list = [];
    try{
       const likedUsers=await GetPostLikes(post_id);
       for(let user = 0;user < likedUsers.length;user++) {
            let id = likedUsers[user].user_id;
            const data = await GetUserById(id);
            list.push(data);
       }
       res.send({likedUsers: list});
     }
    catch(err){
        next(err)
    }
}

async function HandlePostLike(req,res,next){
    const {user_id}=req.userData;
    const {post_id}=req.body;
    console.log(user_id,post_id);
    try{
        const date=new Date();
        // let prev_likes=await getLikes(post_id);
        // console.log(prev_likes);
        // prev_likes=parseInt(prev_likes.likes);
        // prev_likes=prev_likes+1;
        // console.log(prev_likes);
        

        const xyz=await createLike(post_id,user_id);

        // like table no.of likes
        const Likes=await GetNoofLikes(post_id);
        console.log(Likes)
         await updateLikes(post_id,Likes[0].count);

        let likes_id=xyz.insertId;
       
        
        await addToEvents(post_id,user_id,date,likes_id);

        res.send({message:"liked the post"});
    }
    catch(err){
        next(err);
    }

}

async function HandleDeleteLike(req,res,next){
    const {user_id}=req.userData;
    const {post_id}=req.body;
    console.log(user_id,post_id);
    try{
        let prev_likes=await getLikes(post_id);
        console.log(prev_likes);
        prev_likes=parseInt(prev_likes.likes);
        prev_likes=prev_likes-1;
        console.log(prev_likes);
        await updateLikes(post_id,prev_likes);
        let like_id=await getLikeId(post_id,user_id);
        like_id=like_id.likes_id;
        like_id=parseInt(like_id);
        
        await deleteLike(post_id,user_id);
       
        
        await deleteToEvents(post_id,user_id,like_id);

        res.send({message:"like deleted"});
    }
    catch(err){
        next(err);
    }
}
module.exports = {
    HandlePostLike,
    HandleDeleteLike,
    HandleGetLike
};