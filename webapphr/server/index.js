const express = require('express');
const next = require('next');
require('dotenv').config();
const bodyParser  = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

    const db = mysql.createConnection({
        host: 'my_db',
        user: 'root',
        password: 'password123'
    });

    db.connect((err) => {
        if (err) {
            throw err;
        }else {
            console.log('Connection established');
        }
    });

    const server = express();

    // middleware
    server.use(express.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    

    server.get("/test", (req, res) => {
        console.log("hello this worked");
        res.json({ message: "hello this worked"});
        res.end();
    }); 
     
    // server handle for next
    server.all('*', (req, res) => {
        return handle(req, res)
    });
    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });

}).catch((err) => {
    console.log(`> Error: ${err}`);
    process.exit(1);
});