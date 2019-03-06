### Schema

CREATE DATABASE cookie_db;
USE cookie_db;

CREATE TABLE cookies
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
