const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql2');
const port = process.env.port || 3000;
const config = require('./backend/config');
const log = require('./backend/log.middleware');

app.use(cors());
app.use(log);

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.database.host,
  user: config.database.user,
  port: config.database.port,
  password: config.database.password,
  database: config.database.database
});

app.get('/', (req, res) => {
  res.send('I am alive!');
});

app.get('/api/contact', (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) {
      console.error(err);
      res.status(400).send('Error occured' + err);
    }

    if(conn) {
      conn.query('SELECT * FROM contacts;', (err, records, fields) => {
        if(err) {
          res.status(400).json({
            message: 'Error occured while querying',
            error: err
          });
        }
        res.status(200).send(records);
      });
      conn.release();
    }
  })
});

app.get('/api/posts', (req, res) => {
  const posts = [
    {title: "1st Post", content: "This is from server"},
    {title: "2st Post", content: "This is from server"}
  ];
  res.status(200).json(posts);
})

app.listen(port, (err) => {
  if(err) { return err; }
  console.log(`Started listeing on ${port}...`);
});

