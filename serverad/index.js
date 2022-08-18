require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const { log } = require('console');


const app = express();

app.use(express.urlencoded({ extended: true }));    
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "success"});
    res.end();
});

app.post('/test', (req, res) => {
    if (req.body.hook == true) {
        console.log("success and true");
        res.status(207)
        res.end();
    }else {
        console.log("success and not true");
        res.status(400)
        res.end();
    }
});

app.get('/script', async function(req, res) {
    const scripts = ['ls', 'ls', 'echo "hello world"'];

    for (let i = 0; i < scripts.length; i++) {
        
        await useScript(scripts[i]).then((stderr, stdout) => {
            if (stderr) {
                console.log(stderr);
                return; 
            }
            console.log(stdout);
            return;
        }).catch((err) => {
            console.log(err);
        });
    }
    res.end();
});

function useScript(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            }else {
                resolve(stderr, stdout);
            }
        });
    });
}


const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});