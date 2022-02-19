const authRouter = require("../Routes/authRoute");
const feedRouter=require('../Routes/feedRoute')
const networkRouter=require('../Routes/networkRoute')
const likeRouter=require('../Routes/likesRoute');
const commentRouter=require('../Routes/commentRoute');
const createTables=require('../DB/createTables')

function routeInit(app)
{
    createTables()
    app.use(authRouter)
    app.use('/feed',feedRouter)
    app.use('/network',networkRouter)
    app.use('/post',likeRouter)
    app.use('/post',commentRouter);

}

module.exports = routeInit;