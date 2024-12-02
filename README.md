npm init -y

npm install express

npm install ejs

npm install express mysql body-parser cors
npm install --save-dev nodemon


CREATE DATABASE crud_db;
USE crud_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email) VALUES 
("John Doe", "john@example.com"),
("Jane Smith", "jane@example.com");
