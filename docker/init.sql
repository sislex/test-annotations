CREATE DATABASE IF NOT EXISTS BD1;

USE BD1;

CREATE TABLE table1 (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL
);

INSERT INTO table1 (name) VALUES ('Вася');
