CREATE TABLE IF NOT EXISTS comments (
    ID INT NOT NULL AUTO_INCREMENT,
    postID INT NOT NULL,
    allText TEXT NOT NULL,
    authorID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (postID) REFERENCES posts (ID),
    FOREIGN KEY (authorID) REFERENCES users (ID)
);