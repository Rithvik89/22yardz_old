const {Exec,QueryAll} = require('./DB');

const _query={
    ChangeProfile:`UPDATE users SET profile_image=(?), bio=(?)
     where user_id=(?);`,
     ProfileDetails:`SELECT * from users where user_id=(?);`,
     viewProfile:`Select * from users where user_id=(?);`,
     checkFriend1:`select * from connections where (celebrity = (?) and fan = (?));`,
     checkFriend2:`select * from connections where (fan = (?) and celebrity = (?));`,
     checkfan:`select * from pendingconnections where fan=(?) and celebrity=(?);`,
     checkceleb:`select * from pendingconnections where celebrity=(?) and fan = (?);`
}

//defining fundtions

function updateProfile(user_id,profile_image,bio){
    return Exec(_query.ChangeProfile,[profile_image,bio,user_id]);
}
function ProfileDetails(user_id){
    return QueryAll(_query.ProfileDetails,[user_id])
}
function viewProfileDetails(user_id){
    return QueryAll(_query.viewProfile,[user_id]);
}
function checkAsFan(selected_user,user){
      return QueryAll(_query.checkfan,[selected_user,user])
}
function checkAsCelebrity(selected_user,user){
    return QueryAll(_query.checkceleb,[selected_user,user])
}
function checkAsFriend1(user,selected_user){
   return QueryAll(_query.checkFriend1,[user,selected_user]);
}
function checkAsFriend2(user,selected_user){
    return QueryAll(_query.checkFriend2,[selected_user,user]);
 }


module.exports={updateProfile,ProfileDetails,viewProfileDetails,checkAsFan,checkAsFriend1,checkAsFriend2,checkAsCelebrity};