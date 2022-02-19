require("dotenv").config();

class ConfClass {
  constructor(conf) {
    this.conf = conf;
  }
  getString() {
    return this.conf;
  }
  getNumber() {
    return Number(this.conf);
  }
  getBoolean() {
    return this.conf === "true";
  }
}
function getConf(key) {
  if (typeof process.env[key] === "undefined") {
    console.log(`Environment variable ${key} is not set.`);
    return undefined;
  }
  return new ConfClass(String(process.env[key]));
}

const Conf = {
  primaryInfo: {
    isDevMode: !((getConf("NODE_ENV")?.getString() || "") === "production"),
    forWeb: getConf("IS_WEB")?.getBoolean() || false,
    serverPort: process.env.PORT || 1337,
  },
  connectivity: {
    redisPort: getConf("REDIS_PORT")?.getNumber() || 6379,
    redisHost: getConf("REDIS_HOST")?.getString() || "localhost",
    mySqlHost: getConf("MYSQL_HOST")?.getString() || "localhost",
    mySqlPort: getConf("MYSQL_PORT")?.getNumber() || 3306,
    mySqlUser: getConf("MYSQL_USER")?.getString() || "parthiv",
    mySqlDB: getConf("MYSQL_DB")?.getString() || "parthiv",
    mySqlPassword: getConf("MYSQL_PASSWORD")?.getString() || "parthiv",
    mySqlUrl: "mysql://u7dipojfbgepnwbw:UWlkjLp2xL1xCZCSfRIt@b2lrjfmiy7qzs9sc0ge6-mysql.services.clever-cloud.com:3306/b2lrjfmiy7qzs9sc0ge6"
  },
};

module.exports  = Conf;
