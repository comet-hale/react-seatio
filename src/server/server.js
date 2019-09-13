const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = process.env.PORT || 3001;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_plot',
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// https://express.js.com/en/guide/routing.html
app.get('/getReservedSeats', (req, res) => {
    const queryForGettingTmp = 'SELECT * FROM seats WHERE id = 0001';
    connection.query(queryForGettingTmp, (err, results, fields) => {
        console.log('results--read', results[0].seat);
        if (err) console.log('error', err);
        res.send(results[0].seat);
    });
});

app.post('/saveReservedSeats', (req, res) => {
    const { data } = req.body;
    console.log('data post', String(data));
    const queryForGettingTmp = `UPDATE seats SET seat = '${String(data)}' WHERE id = 0001`;
    connection.query(queryForGettingTmp, (err, results, fields) => {
        if (err) console.log('error', err);
        res.send(results);
    });
    return res;
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running in PORT ${port}`);
})