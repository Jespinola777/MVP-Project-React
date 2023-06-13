DROP TABLE IF EXISTS Bookshelf;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS Profile;
DROP TABLE IF EXISTS Users;



CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT 
);

CREATE TABLE Profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    first_name TEXT,
    last_name TEXT,
    bio TEXT,
    picture TEXT,
    FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER,
    book_picture TEXT,
    book_title TEXT,
    post TEXT,
    rating INTEGER,
    FOREIGN KEY (profile_id) REFERENCES Profile (id)
);

CREATE TABLE Bookshelf (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER,
    favbooks TEXT,
    FOREIGN KEY (profile_id) REFERENCES Profile (id)
);

