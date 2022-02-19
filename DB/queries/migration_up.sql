CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(15) NOT NULL,
    email_id VARCHAR(15) NOT NULL,
    cric_index INT DEFAULT 0,
    profile_image VARCHAR(100),
    registered_date DATE,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id INT AUTO_INCREMENT,
    user_id INT NOT NULL ,
    content text NOT NULL,
    created_at date NOT NULL,
    comments INT DEFAULT 0,
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes (
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT likekey UNIQUE (post_id, user_id)
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment text NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS connections (
    fan INT NOT NULL,
    celebrity INT NOT NULL,
    CONSTRAINT followkey UNIQUE (fan, celebrity),
    FOREIGN KEY (fan) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (celebrity) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pendingconnections (
    fan INT NOT NULL,
    celebrity INT NOT NULL,
    CONSTRAINT followkey UNIQUE (fan, celebrity),
    FOREIGN KEY (fan) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (celebrity) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at date,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    CONSTRAINT eventskey UNIQUE (user_id, post_id)
);
