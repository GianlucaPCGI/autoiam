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

app.post('/test', async (req, res) => {
    if (req.body.hook == true) {
        console.log("success and true");
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let numero = req.body.numero;
        let initial1 = prenom[0];
        let initial2 = nom[0];
        const cmd = `az ad user create --display-name "${nom},${prenom}" --password ${initial1}.${initial2}${numero}@cgi.ad --user-principal-name gianluca@munderdifflyn.ca`;

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
        console.log("success and not true");
        res.status(400)
        res.end();
    }
});

async function automate(nom, prenom, numero) {
    const scripts = [`az ad user create --display-name "${nom},${prenom}" --password ${prenom[0]}.${nom[0]}${numero}@cgi.ad --user-principal-name gianluca@munderdifflyn.ca`];
    
    for (let i = 0; i < scripts.length; i++) {   
        try {
            await useScript(scripts[i]);
            console.log(i);
        }catch (e) {
            console.log(e);
            return {
                error: e,
                scriptNumber: i + 1,
                status: false,
            }
        }
    }
    return {
        status: true
    }
}

function useScript(cmd) {
    return new Promise(function(resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return reject(err)
            }else {
                if (stderr) {
                    console.log(stderr);
                    return;
                }
                // not in use
                console.log(stdout);
                // setTimeout(() => { // this shows how it awaits
                resolve();
                // },5000)
                
            }
        });
    });
}


const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});