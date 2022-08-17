const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: '20.151.130.99',
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

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: "success"});
    res.end();
});

app.get('/test', (req, res) => {
    let sql = "SELECT * FROM posts;"

    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result[0].title);
        res.json({ message: "success" });
        res.end();
    });

})

app.post('/posttest', (req, res) => {
    console.log(req.body.title);
    res.end();
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
