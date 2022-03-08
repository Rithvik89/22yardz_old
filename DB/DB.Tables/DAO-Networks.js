const {QueryAll,Exec,Query}=require('./DB')

const _query={
    GetPending:`select * from users
      where user_id IN (
        select fan from pendingconnections 
        where celebrity=(?));`,
    GetRecommend:`select * from users
        where NOT user_id IN (
            select user_id from users where user_id=(?)
            union
            select fan from connections where celebrity=(?) 
            union
            select celebrity from connections where fan=(?)
            union
            select fan from pendingconnections where celebrity=(?)
            union 
            select celebrity from pendingconnections where fan=(?)
            union
            select user from declineSuggestions where enemy=(?));`,
    InitiateConnection:`INSERT INTO pendingconnections (fan,celebrity)
     VALUES (?,?);`,
    AcceptConnection:`INSERT INTO connections (fan,celebrity)
    VALUES (?,?);`,
    MyConnections:`SELECT fan FROM connections WHERE celebrity=(?) 
        UNION
        SELECT celebrity FROM connections WHERE fan=(?);`,
    RemoveFromPendingConnections:`Delete from pendingconnections  
    where fan=(?) and celebrity=(?);`,
    RemoveSuggestion:`INSERT INTO declineSuggestions (user,enemy)
    VALUES (?,?);`
}

// defining function...

function RequestConnection(fan,celebrity){
    return Exec(_query.InitiateConnection,[fan,celebrity]);
} 

function AcceptConnection(fan,celebrity){
    return Exec(_query.AcceptConnection,[fan,celebrity]);    
}

function GetPendingNetworks(celebrity){
    return QueryAll(_query.GetPending,[celebrity]);
}

function GetRecommendedNetworks(user){
    return QueryAll(_query.GetRecommend,[user,user,user,user,user,user]);
}

function DropConnectionFromPending(fan,celebrity){
    return Exec(_query.RemoveFromPendingConnections,[fan,celebrity]); 
}
function MyConnections(user){
    return QueryAll(_query.MyConnections,[user,user]);
}
function DropRemoveConnections(user,enemy){
    return Exec(_query.DropRemoveConnetion,[enemy,user]);
}
function RemoveFromPendingConnections(fan,celebrity){
   return Exec(_query.RemoveFromPendingConnections,[fan,celebrity]);
}
function RemoveSuggestion(user,enemy){
    return Exec(_query.RemoveSuggestion,[user,enemy]);
}

module.exports={RequestConnection,AcceptConnection,GetPendingNetworks,GetRecommendedNetworks,DropConnectionFromPending,MyConnections,DropRemoveConnections,RemoveFromPendingConnections,RemoveSuggestion}
 
// GetPending:`select * from users
// where user_id IN (
//   select fan from pendingconnections 
//   left join declineConnections ON (pendingconnections.fan = declineConnections.user and pendingconnections.celebrity = declineConnections.enemy)
//   where (declineConnections.user IS NULL) and (pendingconnections.celebrity = (?)) 
// );`,
// GetRecommend:`select * from users
//   where NOT user_id IN (
//       select user_id from users where user_id=(?)
//       union
//       select fan from connections where celebrity=(?) 
//       union
//       select celebrity from connections where fan=(?)
//       union
//       select fan from pendingconnections where celebrity=(?)
//       union 
//       select celebrity from pendingconnections where fan=(?)
//       union
//       select user from declineSuggestions where enemy=(?));`,
// InitiateConnection:`INSERT INTO pendingconnections (fan,celebrity)
// VALUES (?,?);`,
// AcceptConnection:`INSERT INTO connections (fan,celebrity)
// VALUES (?,?);`,
// DropConnection:`DELETE from pendingconnections WHERE fan=(?) AND celebrity=(?);`,
// MyConnections:`SELECT fan FROM connections WHERE celebrity=(?) 
//   UNION
//   SELECT celebrity FROM connections WHERE fan=(?);`,
// DropRemoveConnetion:`Delete from declineConnections 
// where user=(?) and enemy=(?);`,
// RemoveFromPendingConnections:`Delete from pendingconnections  
// where fan=(?) and celebrity=(?);`,
// RemoveConnection:`INSERT INTO declineConnections (user,enemy)
// VALUES (?,?);`,
// RemoveSuggestion:`INSERT INTO declineSuggestions (user,enemy)
// VALUES (?,?);`

//removeFromPendingConnections is same as DropConnection.

// function RemoveConnections(user,enemy){
//     return Exec(_query.RemoveConnection,[user,enemy]);
// }