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
        res.json({ message: "success"});
        res.end();
    }else {
        res.json({ message: "not true but still rich"});
        res.end();
    }
});


const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});