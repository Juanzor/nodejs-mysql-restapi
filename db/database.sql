CREATE DATABASE companydb;

use companydb;

CREATE table employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) ,
    salary INT(5),
    PRIMARY KEY id
);

INSERT INTO employee VALUES
(1,'Joe',1000),
(2,'Mary',2000),
(3,'John',4000),
(4,'Alpaca',2000)