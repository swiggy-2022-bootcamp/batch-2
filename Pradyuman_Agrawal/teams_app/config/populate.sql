create database teams_db;
use teams_db;

drop table users;

CREATE TABLE users(
email varchar(40) PRIMARY KEY,
password VARCHAR(200) NOT NULL,
name VARCHAR(40),
mobileNo varchar(15)
);

INSERT INTO users VALUES('pa12@iitbbs.ac.in','password','pradyuman','8217299836');
INSERT INTO users VALUES('sa33@iitbbs.ac.in','password','shilpi','8217222236');
INSERT INTO users VALUES('ss92@iitbbs.ac.in','password','swapnil','8217299000');
INSERT INTO users VALUES('km13@iitbbs.ac.in','password','kriti','821111836');
