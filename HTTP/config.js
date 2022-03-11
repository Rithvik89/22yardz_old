const mysql=require('mysql2')
const conf=require('./ConfigInit')

const mysql_pool = mysql.createConnection("mysql://u7dipojfbgepnwbw:UWlkjLp2xL1xCZCSfRIt@b2lrjfmiy7qzs9sc0ge6-mysql.services.clever-cloud.com:3306/b2lrjfmiy7qzs9sc0ge6");

module.exports=mysql_pool