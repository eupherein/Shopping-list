CREATE DATABASE shopping_list_db;
USE shopping_list_db;

CREATE TABLE list
(
id int NOT NULL AUTO_INCREMENT,
item_name varchar(255) NOT NULL,
got_item BOOLEAN NOT NULL, 
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO list (list) VALUES ('Burgers');