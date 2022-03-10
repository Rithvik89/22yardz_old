const {
    QueryAll,
    Exec,
    Query
} = require('./DB')

const _query = {
    Create: `INSERT INTO posts ( user_id ,content, created_at,image) VALUES (?,?,?,?);`,
    GetPostById: `SELECT * FROM posts WHERE post_id=?;`,
    Delete: `DELETE FROM posts WHERE post_id=?;`,
    Update: `UPDATE posts SET content=? WHERE post_id = ?;`,
    GetFeed: `SELECT  * from posts
    where post_id in (
    select DISTINCT post_id from events where user_id in (
        select fan from connections where celebrity=(?)
        Union 
        select celebrity from connections where fan=(?)
    ));`,
    addToEvents:`INSERT INTO events (post_id,user_id,date) VALUES (?,?,?);`
}

// defining functions 

function createPost(user_id, content, created_at,image) {
    return Exec(_query.Create, [user_id, content, created_at,image]);
}

function updatePostById(post_id, content) {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeof (post_id) != Number) {
                var error = new Error();
                reject(error);
            }
            var results = await Exec(_query.Update, [content, post_id]);
            resolve(results);
        } catch (err) {
            reject(err);
        }
    })
}

function fetchFeed(user_id) {
   return QueryAll(_query.GetFeed, [user_id,user_id]);
}

function fetchPostById(post_id) {
    return new Promise(async (resolve, reject) => {
        console.log(typeof(post_id))
        if(typeof(post_id) != 'number') {
            var err = new Error();
            reject(err);
        }
        try {
            var results = await Query(_query.GetPostById, [post_id]);
            resolve(results);
        } catch(err) {
            reject(err);
        }
    })
}

function deletePost(post_id) {
    return new Promise(async (resolve, reject) => {
        if(typeof(post_id) != 'number') {
            var err = new Error();
            reject(err);
        }
        try {
            var results = await Exec(_query.Delete, [post_id]);
            resolve(results);
        } catch(err) {
            reject(err);
        }
    })
}

function addToEvents(post_id,user_id,date){
   return Exec(_query.addToEvents,[post_id,user_id,date])
}

module.exports = {
    deletePost, 
    fetchFeed,
    fetchPostById,
    createPost,
    updatePostById,
    addToEvents
}



// ORDER BY events.created_at DESC





// SELECT posts.post_id, posts.user_id, posts.content, posts.created_at, posts.likes FROM posts  INNER JOIN events ON posts.post_id = events.post_id WHERE post_id in (SELECT celebrity FROM connections WHERE fan = ?);

