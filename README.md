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



git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/flvshsoft/express-01-init.git
git push -u origin main


<!-- upload file -->
npm install multer
