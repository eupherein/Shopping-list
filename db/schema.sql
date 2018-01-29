DROP DATABASE IF EXISTS shopping_list_db;
CREATE DATABASE shopping_list_db;
USE shopping_list_db;

CREATE TABLE list
(
id int NOT NULL AUTO_INCREMENT,
item varchar (255) NOT NULL,
gotItem BOOLEAN DEFAULT false, 
PRIMARY KEY (id)
);
