const checkAllowance=require('../Controllers/Auth/checkAllowance')
const {Router}=require('express')
const { HandleAddUserPost, HandleGetAllPosts,HandleGetThisPost } = require('../Controllers/feed/feedController')

const feedRouter=Router()

feedRouter.post('/',checkAllowance,HandleAddUserPost)
feedRouter.get('/',checkAllowance,HandleGetAllPosts)
feedRouter.get('/:id',checkAllowance,HandleGetThisPost)


module.exports=feedRouter

