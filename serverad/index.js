require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');


const app = express();

app.use(express.urlencoded({ extended: true }));    
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "success"});
    res.end();
});

app.post('/createad', async (req, res) => {
    if (req.body.hook == true) {
        console.log("success and true");
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let numero = req.body.numero;
        let initial1 = prenom[0];
        let initial2 = nom[0];
        const cmd = `az ad user create --display-name "${nom},${prenom}" --password ${initial1}.${initial2}${numero}@cgi.ad --user-principal-name ${nom}@munderdifflyn.ca`;

        let error = false;
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                error = true;
            }else {
                if (stderr) {
                    console.log(stderr);
                    error = true;
                }
                console.log(stdout);
                
            }
        });
        if (!error) {
            res.status(207);
            res.end();
        }else {
            console.log(`error: in ad`);
            res.status(400)
            res.end();
        }
    }else {
        console.log("set hook to true");
        res.status(400)
        res.end();
    }
});


const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});