### Schema

CREATE DATABASE cookie_db;
USE cookie_db;

CREATE TABLE cookies
(
	id int AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
