const {Exec} = require('./DB');

const _query={
    ChangeProfile:`UPDATE users SET profile_image=(?), bio=(?)
     where user_id=(?);`
}

//defining fundtions

function updateProfile(user_id,profile_image,bio){
    return Exec(_query.ChangeProfile,[user_id,profile_image,bio]);
}

module.exports={updateProfile};