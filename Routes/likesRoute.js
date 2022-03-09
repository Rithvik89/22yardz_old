const checkAllowance=require('../Controllers/Auth/checkAllowance')
const {Router} = require('express');
const {HandleGetLike,HandlePostLike,HandleDeleteLike} = require('../Controllers/likes/likesController');

const likeRouter = Router();

likeRouter.get('/likes/:id',checkAllowance,HandleGetLike);
likeRouter.post('/likes',checkAllowance,HandlePostLike);
likeRouter.post('/dislikes',checkAllowance,HandleDeleteLike);

module.exports = likeRouter;
