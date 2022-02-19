const checkAllowance=require('../Controllers/Auth/checkAllowance')
const {Router} = require('express');
const {HandleGetComments,HandleDeleteComment,HandlePostComment} = require('../Controllers/comments/CommentsController');

const commentRouter = Router();

commentRouter.get('/:id/comments',HandleGetComments);
commentRouter.post('/:id/comments',HandlePostComment);
commentRouter.delete('/:id/comments',HandleDeleteComment);

module.exports = commentRouter;
