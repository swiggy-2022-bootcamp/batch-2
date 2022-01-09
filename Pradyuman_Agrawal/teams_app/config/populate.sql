create database teams_db;
use teams_db;

drop table meetingMembers;
drop table meetings;
drop table users;

CREATE TABLE users(
userId INT PRIMARY KEY AUTO_INCREMENT,
email varchar(40) UNIQUE,
password VARCHAR(200) NOT NULL,
name VARCHAR(40) NOT NULL,
mobileNo varchar(15)
);

INSERT INTO users (email,password,name,mobileNo) VALUES('pa12@iitbbs.ac.in','password','pradyuman','8217299836');
INSERT INTO users (email,password,name,mobileNo) VALUES('sa33@iitbbs.ac.in','password','shilpi','8217222236');
INSERT INTO users (email,password,name,mobileNo) VALUES('ss92@iitbbs.ac.in','password','swapnil','8217299000');
INSERT INTO users (email,password,name,mobileNo) VALUES('km13@iitbbs.ac.in','password','kriti','821111836');

CREATE TABLE meetings(
meetingId INT PRIMARY KEY AUTO_INCREMENT,
creatorId INT NOT NULL,
startTime TIMESTAMP NOT NULL,
FOREIGN KEY (creatorId) REFERENCES users(userId)
);

CREATE TABLE meetingMembers(
    meetingId INT NOT NULL, 
    userId INT NOT NULL, 
    CONSTRAINT PK_meetingMembers PRIMARY KEY (meetingId,userId), 
    FOREIGN KEY (userId) REFERENCES users(userId), 
    FOREIGN KEY (meetingId) REFERENCES meetings(meetingId) 
);

SELECT * FROM Customers
WHERE City IN ('Paris','London');

        