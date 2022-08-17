const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
})

db.connect((err) => {
    if (err) {
        throw err;
    }else {
        console.log('Connected');
    }
})

const app = express();

app.get('/', (req, res) => {
    res.json({ message: "success"});
    res.end();
});

app.get('/test', (req, res) => {
    let sql = "SELECT * FROM posts;"

    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result[1]);
        res.json({ message: "success" });
        res.end();
    });

})

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
