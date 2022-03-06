const {Exec,QueryAll} = require('./DB');

const _query={
    ChangeProfile:`UPDATE users SET profile_image=(?), bio=(?)
     where user_id=(?);`,
     ProfileDetails:`SELECT * from users where user_id=(?);`
}

//defining fundtions

function updateProfile(user_id,profile_image,bio){
    return Exec(_query.ChangeProfile,[profile_image,bio,user_id]);
}
function ProfileDetails(user_id){
    return QueryAll(_query.ProfileDetails,[user_id])
}

module.exports={updateProfile,ProfileDetails};