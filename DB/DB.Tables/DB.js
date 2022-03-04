const config = require("../../HTTP/config");
const mysql_pool  = config;


function Exec(create_query, arg) {
  return new Promise((resolve, reject) => {
    mysql_pool.query(create_query, arg, (error, result, field) => {
      if (error) {
        var err = new Error('internal server error');
        err.srvMessage = error.sqlMessage;
        err.code = 500;
       console.log("not able to remove from pending connections")
        reject(err);
      }
      console.log("removing from pending connection")
      resolve(result);
    });
  });
}

function QueryAll(get_all_query,arg) {
  
  return new Promise(async (resolve, reject) => {
      mysql_pool.query(get_all_query,arg, (error, result, field) => {
        if (error) {
          var err = new Error('internal server error');
          err.srvMessage = error.sqlMessage;
          err.code = 500;
          
          reject(err);
        }
        
        resolve(result);
      });
  });
}

function Query(get_query, arg) {
 
  return new Promise(async (resolve, reject) => {
    console.log("in the login")
      mysql_pool.query(get_query, arg, (error, result, field) => {
        if (error) {
          var err = new Error('internal server error');
          err.srvMessage = error.sqlMessage;
          err.code = 500;
          reject(err);
        }
        resolve(result[0]);
      });
  });
}


module.exports = { QueryAll, Exec, Query };
