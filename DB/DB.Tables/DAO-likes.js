const {
    Query,
    Exec
} = require('./DB');

const _query = {
    Create: `INSERT into likes (post_id,user_id) VALUES (?,?)`,
    GetLikesById: `SELECT * FROM likes WHERE post_id = (?)`,
    Delete: `DELETE FROM likes WHERE post_id = (?) AND user_id = (?)`
}

 function createLike(post_id,user_id){
    return new Promise(async (resolve,reject)=>{
        try{
            const data = await Exec(_query.Create,[post_id,user_id]);
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    })
}

function deleteLike(post_id,user_id){
    return new Promise(async (resolve,reject)=>{
        try{
            const data = await Exec(_query.Delete,[post_id,user_id]);
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    })
}

 function getLikes(post_id){
    return new Promise(async (resolve,reject)=>{
        try{
            const data = await Exec(_query.GetLikesById,[post_id]);
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    })
}

module.exports = {createLike,deleteLike,getLikes};