const {
    getComments,
    createComment,
    deleteComment
} = require('../../DB/DB.Tables/DAO-comments');

 
async function HandleGetComments(req,res,next){
    try{
        const data = await getComments(req.query.postId);
        if(data === undefined || data.length === 0)
         res.send({});
        let map = new Map();
        let result = [];
        for(idx in data){
           if(data[idx].parent_id===null){
               result.push(data[idx]);
           }
           map.set(data[idx].comment_id,data[idx]);
        }

       for(idx in data){
           if(data[idx].parent_id!=null){
               parent = map.get(data[idx].parent_id);
               if(parent.child==null){
                   parent.child = [];
               }
               parent.child.push(data[idx]);
           }
       }
       console.log(result);
       res.status(200).json(result);
    }
    catch(err){
        next(err);
    }
}

async function HandlePostComment(req,res,next){
    try{
    console.log(req.body);
    const postId = req.body.postid;
    const userId = req.body.userid;
    var parentId = req.body.parentid;
    const content = req.body.content;
    if(parentId ==='')
     parentId = null;
    console.log(parentId);
    const data = await createComment(postId,userId,parentId,content);
     res.send("commented successfully");  
    }
    catch(err){
        next(err);
    }
}

async function HandleDeleteComment(req,res,next){
    try{
        await deleteComment(req.query.commentId);
    }
    catch(err){
        next(err);
    }
}

module.exports = {HandleDeleteComment,HandlePostComment,HandleGetComments};