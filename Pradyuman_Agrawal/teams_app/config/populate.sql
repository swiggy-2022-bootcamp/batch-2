create database teams_db;
use teams_db;

drop table meetingMembers;
drop table meetings;
drop table users;

CREATE TABLE users(
userId INT PRIMARY KEY AUTO_INCREMENT,
email varchar(40) UNIQUE,
password VARCHAR(200) NOT NULL,
name VARCHAR(40) NOT NULL
);

CREATE TABLE meetings(
meetingId INT PRIMARY KEY AUTO_INCREMENT,
creatorId INT NOT NULL,
startTime TIMESTAMP NOT NULL,
endTime TIMESTAMP DEFAULT "2000-01-01T12:00:00",
description varchar(200),
inviteLinkAccess BOOLEAN DEFAULT FALSE,
FOREIGN KEY (creatorId) REFERENCES users(userId)
);

CREATE TABLE meetingMembers(
    meetingId INT NOT NULL, 
    userId INT NOT NULL, 
    CONSTRAINT PK_meetingMembers PRIMARY KEY (meetingId,userId), 
    FOREIGN KEY (userId) REFERENCES users(userId), 
    FOREIGN KEY (meetingId) REFERENCES meetings(meetingId) 
);
