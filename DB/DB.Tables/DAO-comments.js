const {
    Query,
    Exec
} = require('./DB');

const _query = {
    Create: `INSERT INTO comments (post_id,user_id,parent_id,comment) values (?,?,?,?)`,
    Delete:  `DELETE FROM comments (comment_id) WHERE comment_id = (?)`,
    GetCommentsById: `SELECT * FROM comments WHERE post_id = (?)`
}

function deleteComment(comment_id){
    return new Promise(async (resolve,reject)=>{
        try{
            const data = await Exec(_query.Delete,[comment_id]);
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    })
}


function createComment(post_id,user_id,parent_id,comment){
    return new Promise(async (resolve,reject)=>{
        try{
            const data = await Exec(_query.Create,[post_id,user_id,parent_id,comment]);
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    })
}


function getComments(post_id){
  return new Promise(async (resolve,reject)=>{
        try{
            const data = await Exec(_query.GetCommentsById,[post_id]);
            resolve(data);
        }
        catch(err){
            reject(err);
        }
  })
}

module.exports = {createComment,deleteComment,getComments};