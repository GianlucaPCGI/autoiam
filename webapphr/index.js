const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
})

db.connect((err) => {
    if (err) {
        throw err;
    }else {
        console.log('Connected');
    }
})

const app = express();

app.use(express.urlencoded({ extended: true }));    
app.use(bodyParser.json());
app.use(cors());

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
    
});

app.post('/create', (req, res) => {
    let nom = req.body.nom;
    let statut = req.body.statut;
    let sql = `INSERT INTO employe (nom,statut) VALUES (${nom},${statut});`; // a ajoute des champs requis
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: "error, please try again later" });
            res.end();
        }
        res.json({ message: "Employe ajoute avec succes" });
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
