const {QueryAll,Exec,Query} = require('./DB')

const _query = {
    Create: `INSERT INTO users (username,password,email_id,registered_date) VALUES (?,?,?,?) `,
    GetAll: `SELECT * FROM users`,
    GetUser:`SELECT * FROM users WHERE username=?`,
    GetUserById:`SELECT * FROM users WHERE user_id=?`,
    Delete: `DELETE FROM users WHERE user_id=?`
  };

// defining my functions

function CreateUser(username,password,email_id,date){
    return Exec(_query.Create,[username,password,email_id,date])
}

function GetAllUsers(){
    return QueryAll(_query.GetAll)
     
}

function GetUser(username){
   return Query(_query.GetUser,[username])
}

function GetUserById(user_id){
    return Query(_query.GetUserById,[user_id]);
}


module.exports={GetAllUsers,CreateUser,GetUser,GetUserById}
