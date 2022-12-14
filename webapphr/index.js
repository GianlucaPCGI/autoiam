require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: `${process.env.DB_PASSWORD}`, // process.env.password
    database: `${process.env.DB_NAME}` // process.env.db
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

app.post("/test", (req, res) => {
    let nom = req.body.nom;
    let statut = req.body.statut;
    let sql = `INSERT INTO test (nom,statut) VALUES ('${nom}','${statut}');`; // a ajoute des champs requis
    let query = db.query(sql, async function(err, result) {
        if (err) {
            console.log(err);
            res.json({ message: "error, please try again later" });
            res.end();
            return;
        }
        const resp = await sendHook();
        if (resp) {
            res.json({ message: "Employe ajoute avec succes et AD succes" });
            res.end();
            return;
        }else {
            res.json({ message: "Employe ajoute avec succes, AD failed" });
            res.end();
            return;
        }
        
    });
})


app.post('/create', function(req, res) {
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let service = req.body.service || "";
    let statut = req.body.statut;
    let type = req.body.type || "";
    let numero = req.body.numero;
    let gestionnaire = req.body.gestionnaire || "";
    let username = req.body.username;

    let sql = `INSERT INTO employe (nom, prenom, service, statut, type, numero, gestionnaire, username) VALUES ('${nom}','${prenom}','${service}','${statut}','${type}', ${numero},'${gestionnaire}', '${username}');`; // a ajoute des champs requis
    let query = db.query(sql, async function(err, result) {
        if (err) {
            console.log(err);
            res.json({ message: "error, please try again later" });
            res.end();
            return;
        }
        const resp = await sendHook(nom, prenom, numero);
        if (resp) {
            res.json({ message: "Employe ajoute avec succes et AD succes" });
            res.end();
            return;
        }else {
            res.json({ message: "Employe ajoute avec succes, AD failed" });
            res.end();
            return;
        }
        
    });
});

async function sendHook(nom, prenom, numero) {
    let data = {
        hook: true,
        nom: nom,
        prenom: prenom,
        numero: numero,
    }
    console.log(data);
    try {
        const response = await fetch("http://localhost:3001/createad", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
