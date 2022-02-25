const {
  CreateUser,
  GetUser,
} = require("../../DB/DB.Tables/DAO-users");
const { checkIfLogin, performLogin,performLogout} = require("../../Services/Auth/LoginService");

async function HandleUserRegister(req, res,next) {
  const { username, password, email_id } = req.body;
  const date=new Date()
  GetUser(username)
    .then(async (result) => {
      if (result===undefined) {
        try {
          await CreateUser(username, password, email_id,date);
        performLogin(res,req.body.username, req.body.password) 
          .then( (token) => {
            res.status(200);
            res.send({token});
          })
          .catch((err) => {
            next(err);
          })
        } catch (err) {
          next(err);
        }
      } else {
          console.log("iam already in db")
          const err = new Error("Credintials already exits");
          err.code = 400;
          next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
}

function HandleUserLogin(req,res,next) {
  checkIfLogin(req.cookies.__RT__)
    .then((token) => {
      res.send({token})
    })
    .catch((err) => {
      performLogin(res,req.body.username, req.body.password) 
        .then( (token) => {
          res.status(200);
          res.send({token});
        })
        .catch((err) => {
          next(err);
        })
    })
}

async function HandleUserLogout(req, res, next) {
  console.log("Into Handle user LogOut")
  console.log(req.cookies);
  res.clearCookie('__AT__',{sameSite: 'none', secure: true} );
  res.clearCookie('__RT__',{sameSite: 'none', secure: true });
  checkIfLogin(req.cookies.__RT__)
    .then((userData) => {
     performLogout(req.cookies.__RT__,userData)
        .then(
          () => {
            res.send({message:"Logged out successfully"})
            console.log("User Logged out")
          }
        )
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      next(err);
    })
}

module.exports = {  HandleUserLogin, HandleUserRegister, HandleUserLogout};

