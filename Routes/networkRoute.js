const {Router} =require('express')
const {ViewNetworkSection,PendingRequest,NewConnectionMade} =require('../Controllers/network/networkController')
const checkAllowance=require('../Controllers/Auth/checkAllowance')
const networkRouter=Router()

networkRouter.get('/',checkAllowance,ViewNetworkSection)
networkRouter.post('/pending-connection',checkAllowance,PendingRequest)
networkRouter.post('/new-connection',checkAllowance,NewConnectionMade)

module.exports=networkRouter
