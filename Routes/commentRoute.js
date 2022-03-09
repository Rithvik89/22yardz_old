const checkAllowance=require('../Controllers/Auth/checkAllowance')
const {Router} = require('express');
const {HandleGetComments,HandleDeleteComment,HandlePostComment,HandleGetAllComments} = require('../Controllers/comments/commentsController');

const commentRouter = Router();

commentRouter.get('/:id/comments',checkAllowance,HandleGetComments);
commentRouter.post('/:id/comments',checkAllowance,HandlePostComment);
commentRouter.delete('/:id/comments',checkAllowance,HandleDeleteComment);

module.exports = commentRouter;
