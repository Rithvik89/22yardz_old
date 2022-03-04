const config=require('../HTTP/config')


const mysql_pool=config
function createTables(req,res){
    const createUserTableQuery=`CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT,
        username VARCHAR(15) UNIQUE NOT NULL,
        password VARCHAR(15) NOT NULL,
        email_id VARCHAR(150) NOT NULL,
        cric_index INT DEFAULT 0,
        profile_image VARCHAR(100),
        registered_date DATE,
        PRIMARY KEY (user_id)
    );`

    const createPostTableQuery=`CREATE TABLE IF NOT EXISTS posts (
        post_id INT AUTO_INCREMENT,
        user_id INT NOT NULL ,
        content text NOT NULL,
        created_at date NOT NULL,
        comments INT DEFAULT 0,
        likes INT DEFAULT 0,
        image VARCHAR(100) NULL,
        shares INT DEFAULT 0,
        PRIMARY KEY (post_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );`

    const createLikesTableQuery=`CREATE TABLE IF NOT EXISTS likes (
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT likekey UNIQUE (post_id, user_id),
        FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
    );`

    const createCommentsTableQuery=`CREATE TABLE IF NOT EXISTS comments (
        comment_id INT auto_increment primary key,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        parent_id INT,
        comment text NOT NULL,
        date timestamp default current_timestamp(),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES comments(comment_id) ON DELETE CASCADE
    );`

    const createEventsTableQuery=`CREATE TABLE IF NOT EXISTS events (
        user_id INT NOT NULL,
        post_id INT NOT NULL,
        created_at date,
        FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
        CONSTRAINT eventskey UNIQUE (user_id, post_id)
    );`

    const createConnectionTableQuery=`CREATE TABLE IF NOT EXISTS connections (
        fan INT NOT NULL,
        celebrity INT NOT NULL,
        CONSTRAINT followkey UNIQUE (fan, celebrity),
        FOREIGN KEY (fan) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (celebrity) REFERENCES users(user_id) ON DELETE CASCADE
    );`
    const createPendingConnectionTableQuery=`CREATE TABLE IF NOT EXISTS pendingconnections (
        fan INT NOT NULL,
        celebrity INT NOT NULL,
        CONSTRAINT followkey UNIQUE (fan, celebrity),
        FOREIGN KEY (fan) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (celebrity) REFERENCES users(user_id) ON DELETE CASCADE
    );`
    const createDeclineConnectionTableQuery=`CREATE TABLE IF NOT EXISTS declineConnections (
        user INT NOT NULL,
        enemy INT NOT NULL,
        CONSTRAINT followkey UNIQUE (user, enemy)
    );`
    const createDeclineSuggestionsTableQuery=`CREATE TABLE IF NOT EXISTS declineSuggestions (
        user INT NOT NULL,
        enemy INT NOT NULL,
        CONSTRAINT followkey UNIQUE (user, enemy)
    );`

    mysql_pool.query(createUserTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })
    
    mysql_pool.query(createPostTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })

    mysql_pool.query(createConnectionTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })
    
    mysql_pool.query(createPendingConnectionTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })

    mysql_pool.query(createEventsTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })

    mysql_pool.query(createLikesTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })

    mysql_pool.query(createCommentsTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })

    mysql_pool.query(createDeclineConnectionTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })
    mysql_pool.query(createDeclineSuggestionsTableQuery,(error,result,field)=>{
        if(error) console.log(error);
    })
}

module.exports=createTables


