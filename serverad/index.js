require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


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
        res.end();
    }else {
        console.log("success and not true");
        res.end();
    }
});


const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});