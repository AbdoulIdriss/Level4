CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    userrole ENUM('user' , 'admin') NOT NULL,
    userplan ENUM('free' , 'prenium' )
);