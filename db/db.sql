-- user table
CREATE TABLE users(
    "id" varchar(128) primary key,
    "password" varchar(128) not null,
    "name" varchar(128) not null
);

-- otp table
CREATE TABLE otp(
    "userID" varchar(128) unique references users(id) on delete cascade,
    "secretKey" varchar(128) primary key
);
