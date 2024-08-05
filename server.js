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
app.post('/api/signup/step1', (req, res) => {
    const { nom, prenom, adresse } = req.body;
    const query = 'INSERT INTO users (nom, prenom, adresse) VALUES (?, ?, ?)';
    db.query(query, [nom, prenom, adresse], (err, results) => {
      if (err) return res.status(500).send(err);
      const userId = results.insertId;
      res.status(200).send({ message: 'Step 1 data received', userId });
    });
  });
  app.post('/api/signup/step2', (req, res) => {
    const { adresse, email, password } = req.body; // Use 'adresse' instead of 'id'
    const query = 'UPDATE users SET email = ?, password = ? WHERE adresse = ?'; // Update query
    db.query(query, [email, password, adresse], (err, results) => { // Use 'adresse' in the query
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Step 2 data received', adresse }); // Use 'adresse' in the response
    });
});
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) {
          res.status(200).send({ message: 'Login successful', user: results[0] });
      } else {
          res.status(401).send({ message: 'Invalid email or password' });
      }
  });
});
  
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
