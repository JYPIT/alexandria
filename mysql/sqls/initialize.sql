DROP DATABASE IF EXISTS alexandria;

CREATE DATABASE alexandria;
USE alexandria;

CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT,
    bookId VARCHAR(128) NOT NULL,
    userId VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL,
    avatar VARCHAR(128) NOT NULL,
    text TEXT,
    createdAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);