const {
    getComments,
    createComment,
    deleteComment,
    addToEvents,
    deleteToEvent,
} = require('../../DB/DB.Tables/DAO-comments');


 
async function HandleGetComments(req,res,next) {
    try {
        const data = await getComments(req.params.id);
        console.log(data);
       res.send(data);
    } catch (err) { 
        next(err);
    }
}

async function HandlePostComment(req,res,next) {
    try {
    console.log(req.body);
    const postId = req.body.postid;
    const userId = req.body.userid;
    const content = req.body.content;
    const data = await createComment(postId,userId,content);
    console.log(data);
    await addToEvents(postId,userId,data.insertId);
     res.send("commented successfully");  
    } catch (err) {
        next(err);
    }
}

async function HandleDeleteComment(req,res,next){
    try {
        console.log(req.body);
        const data = await deleteComment(req.body.commentid);
        console.log(data);
        await deleteToEvent(req.body.postid,req.body.userid,req.body.commentid);
        res.send("Deleted Sucessfully");
    } catch (err) {
        next(err);
    }
}



module.exports = {
    HandleDeleteComment,
    HandlePostComment,
    HandleGetComments
};