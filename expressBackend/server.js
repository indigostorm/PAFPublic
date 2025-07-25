const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mysql = require('mysql2');
const cors = require('cors');


app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const db = mysql.createConnection({
  host:DB_HOST,
  user:DB_USER,
  password:DB_PASSWORD,
  database:DB_NAME
  
});

app.get("/books", (req, res) => {
   const qry = "SELECT * FROM books"
   db.query(qry,(err,data) => {
        if(err) return res.json("oopsie")
        return res.json(data)


   });});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";

 db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
    // demo qry from mysql workbench INSERT INTO `vplibrary`.`books` (title, desc, author`) VALUES ('Test2', 'Test2', 'Test2');
    const qry = "INSERT INTO books (`title`, `desc`, `author`) VALUES (?);"
    //accept values from post command json style in the body
    const values = [
        req.body.title,
        req.body.desc,
        req.body.author,
    ]
   
   
    // const values = [
    //    'title',
    //    'desc',
    //    'auth',
    //];
    //db.query("INSERT INTO `vplibrary`.`books` (`title`, `desc`, `author`) VALUES ('Test3', 'Test3', 'Test3');",(err,data) => {
    db.query(qry, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});


app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.patch("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `author`= ?, `cover`=?  WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.author,
    req.body.cover,
    
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});







app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

