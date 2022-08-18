require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');


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

async function sendHook() {
    let data = {
        hook: true
    }
    try {
        const response = await fetch("http://localhost:3001/test", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        if (response.status == 207) {
            console.log("the response was true");
            return true;
        }
        console.log("the response was false");
        return false;
    }catch (err) {
        console.log(err);
        return false;
    }
}

app.post('/create', function(req, res) {
    let nom = req.body.nom;
    let statut = req.body.statut;
    let sql = `INSERT INTO employe (nom,statut) VALUES ('${nom}','${statut}');`; // a ajoute des champs requis
    let query = db.query(sql, async function(err, result) {
        if (err) {
            console.log(err);
            res.json({ message: "error, please try again later" });
            res.end();
        }
        const resp = await sendHook();
        if (resp) {
            res.json({ message: "Employe ajoute avec succes et AD succes" });
            res.end();
        }else {
            res.json({ message: "Employe ajoute avec succes, AD failed" });
            res.end();
        }

    });
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
