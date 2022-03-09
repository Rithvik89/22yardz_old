const {
    Query,
    Exec,
    QueryAll
} = require('./DB');

const _query = {
    Create: `INSERT INTO comments (post_id,user_id,comment,date) values (?,?,?,?)`,
    Delete:  `DELETE FROM comments WHERE comment_id=(?)`,
    GetCommentsById: `SELECT * FROM comments WHERE post_id=(?)`,
    DeleteEvent:`DELETE FROM events where post_id=(?) and user_id=(?) and comment_id=(?);`,
    CreateEvent:`INSERT into events (user_id,post_id,created_at,comment_id) VALUES (?,?,?,?)`,
    getCommentsByUser: `SELECT * FROM comments WHERE user_id=(?)`
}

function deleteComment(comment_id){
    return Exec(_query.Delete,[comment_id]);
}


function createComment(post_id,user_id,comment) {
  return  Exec(_query.Create,[post_id,user_id,comment,(new Date())]);
}


function getComments(post_id) {
   return QueryAll(_query.GetCommentsById,[post_id]);
      
}

function deleteToEvent(postId,userId,commentId) {
  return Exec(_query.DeleteEvent,[postId,userId,commentId]);
}

function addToEvents(postId,userId,commentId) {
    return Exec(_query.CreateEvent,[userId,postId,(new Date()),commentId]);
}

function getAllComments(userId) {
    return Exec(_query.getCommentsByUser,[userId]);
}
module.exports = {
    createComment,
    deleteComment,
    getComments,
    deleteToEvent,
    addToEvents,
    getAllComments
};