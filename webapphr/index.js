require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log(process.env.DB_NAME);
console.log(process.env.DB_PASSWORD);
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: `password`,
    database: `RH`
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

function sendHook() {
    let data = {
        hook: true
    }
    fetch("http://localhost:3001/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

app.post('/create', (req, res) => {
    let nom = req.body.nom;
    let statut = req.body.statut;
    let sql = `INSERT INTO employe (nom,statut) VALUES ('${nom}','${statut}');`; // a ajoute des champs requis
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: "error, please try again later" });
            res.end();
        }
        res.json({ message: "Employe ajoute avec succes" });
        sendHook();
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
