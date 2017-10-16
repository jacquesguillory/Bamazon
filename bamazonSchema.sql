DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LED TV", "Electronics", 2000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Playstation 4", "Electronics", 350, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Menudo's Greatest Hits CD", "Electronics", 1, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Alabama Man", "Toys", 14, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Accomadater", "Toys", 69,  100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Lego Tupac Set", "Toys", 20, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Robot Companion with JFK AI", "Toys", 500, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Wild Wacky Action Bike", "Sports", 40, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Steroids", "Sports", 200, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Hockey Stick", "Sports", 200, 5);

 




SELECT * FROM products;

    
