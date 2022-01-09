create database teams_db;
use teams_db;

drop table users;

CREATE TABLE users(
userId INT PRIMARY KEY AUTO_INCREMENT,
email varchar(40) UNIQUE,
password VARCHAR(200) NOT NULL,
name VARCHAR(40) NOT NULL,
mobileNo varchar(15)
);

INSERT INTO users (email,password,name,mobileNo) VALUES('pa12@iitbbs.ac.in','password','pradyuman','8217299836');
INSERT INTO users VALUES('sa33@iitbbs.ac.in','password','shilpi','8217222236');
INSERT INTO users VALUES('ss92@iitbbs.ac.in','password','swapnil','8217299000');
INSERT INTO users VALUES('km13@iitbbs.ac.in','password','kriti','821111836');
