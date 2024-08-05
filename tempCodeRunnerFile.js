const express = require("express");
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hedi23873499&',
    port: 3306,
    database: 'antigaspi' // Add the database name here
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database...');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
