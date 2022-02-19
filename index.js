
const ServerInit = require('./HTTP/ServerInit')
const Conf = require('./HTTP/ConfigInit')
const routeInit = require('./HTTP/RouteInit')
const SinkErrorFor = require('./HTTP/ErrorSinkInit');   


const conf = Conf
const app = ServerInit(conf);
routeInit(app);
SinkErrorFor(app);