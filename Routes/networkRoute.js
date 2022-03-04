const {Router} =require('express')
const {ViewNetworkSection,PendingRequest,NewConnectionMade,MyNetworkConnections,DeclineConnections,DeclineSuggestion} =require('../Controllers/network/networkController')
const checkAllowance=require('../Controllers/Auth/checkAllowance')
const networkRouter=Router()

networkRouter.get('/',checkAllowance,ViewNetworkSection);
networkRouter.post('/pending-connection',checkAllowance,PendingRequest);
networkRouter.post('/new-connection',checkAllowance,NewConnectionMade);
networkRouter.get('/my-connections',checkAllowance,MyNetworkConnections);
networkRouter.post('/decline-connection',checkAllowance,DeclineConnections);
networkRouter.post('/decline-suggestion',checkAllowance,DeclineSuggestion);

module.exports=networkRouter
