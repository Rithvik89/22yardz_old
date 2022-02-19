const checkAllowance=require('../Controllers/Auth/checkAllowance')
const {Router} = require('express');
const {HandleGetLike,HandlePostLike,HandleDeleteLike} = require('../Controllers/likes/likesController');

const likeRouter = Router();

likeRouter.get('/:id/likes',HandleGetLike);
likeRouter.post('/:id/likes',HandlePostLike);
likeRouter.delete('/:id/likes',HandleDeleteLike);

module.exports = likeRouter;
