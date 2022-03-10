const {
    Query,
    Exec,
    QueryAll
} = require('./DB');

const _query = {
    Create: `INSERT into likes (post_id,user_id) VALUES (?,?);`,
    CreateEvent:`INSERT into events (user_id,post_id,created_at,likes_id) VALUES (?,?,?,?)`,
    GetLikesById: `SELECT likes FROM posts WHERE post_id = (?);`,
    DeleteLike: `DELETE FROM likes WHERE post_id = (?) AND user_id = (?);`,
    UpdateLikes:`UPDATE posts SET likes=(?) where post_id=(?);`,
    getLikeId:`SELECT likes_id from likes where post_id=(?) and user_id=(?);`,
    DeleteEvent:`DELETE FROM events where post_id=(?) and user_id=(?) and likes_id=(?);`,
    GetPostLikes:`SELECT user_id from likes where post_id=(?);`,

    GetNoofLikes:`SELECT COUNT(*) as count from likes where post_id=(?);`,
    GetAllLikes: `SELECT * from likes where user_id=(?)`
}

function createLike(post_id,user_id){
     return Exec(_query.Create,[post_id,user_id]);
}

function getLikes(post_id){
     return Query(_query.GetLikesById,[post_id]);
}

function updateLikes(post_id,likes){
     return Exec(_query.UpdateLikes,[likes,post_id]);
}

function addToEvents(post_id,user_id,date,likes_id){
      return Exec(_query.CreateEvent,[user_id,post_id,date,likes_id]);
}


function deleteLike(post_id,user_id){
    return Exec(_query.DeleteLike,[post_id,user_id]);
}

function getLikeId(post_id,user_id){
      return Query(_query.getLikeId,[post_id,user_id]);
}

function deleteToEvents(post_id,user_id,like_id){
    return Exec(_query.DeleteEvent,[post_id,user_id,like_id]);
}

function GetPostLikes(post_id){
    return QueryAll(_query.GetPostLikes,[post_id]);
}


function GetNoofLikes(post_id){
    return QueryAll(_query.GetNoofLikes,[post_id]);
}
function getAllLikes(user_id) {
    return QueryAll(_query.GetAllLikes,[user_id]);
}

//  function getLikes(post_id){
//     return new Promise(async (resolve,reject)=>{
//         try{
//             const data = await Exec(_query.GetLikesById,[post_id]);
//             resolve(data);
//         }
//         catch(err){
//             reject(err);
//         }
//     })
// }


module.exports = {
    createLike,
    deleteLike,
    getLikes,
    updateLikes,
    addToEvents,
    getLikeId,
    deleteToEvents,
    GetPostLikes,
    GetNoofLikes,
    getAllLikes
};

