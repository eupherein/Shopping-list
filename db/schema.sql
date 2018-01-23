DROP DATABASE IF EXISTS shopping_list_db;
CREATE DATABASE shopping_list_db;
USE shopping_list_db;

CREATE TABLE list
(
id int NOT NULL AUTO_INCREMENT,
itemName varchar(255) NOT NULL,
gotItem BOOLEAN NOT NULL, 
PRIMARY KEY (id)
);
