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

const tableName = 'mapping_data';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// NOTE: Get a reserved info by selected event_key
app.get('/getReservedSeats/:key', (req, res) => {
    const { key } = req.body.data;
    const queryForGettingTmp = `SELECT * FROM ${tableName} WHERE key = ${key}`;
    connection.query(queryForGettingTmp, (err, results, fields) => {
        console.log('results--read', results.reserved);
        if (err) console.log('error', err);
        res.send(results.reserved);
    });
});

// NOTE: Get all seat info like event_name, row, column, event_key, etc
app.get('/getAllSeatInfo', (req, res) => {
    const queryForGettingTmp = `SELECT * FROM ${tableName}`;
    connection.query(queryForGettingTmp, (err, results, fields) => {
        console.log('results--read', results);
        if (err) console.log('error', err);
        res.send(results);
    });
});

// NOTE: update reserved info by event_key
app.post('/updateReservedSeats', (req, res) => {
    const { reserved, key } = req.body.data;
    console.log('data post', String(reserved));
    const queryForGettingTmp = `UPDATE ${tableName} SET reserved = '${String(reserved)}' WHERE key = ${key}`;
    connection.query(queryForGettingTmp, (err, results, fields) => {
        if (err) console.log('error', err);
        res.send(results);
    });
    return res;
});

// NOTE: Create a new mapping data
app.post('/saveNewSeatType', (req, res) => {
    const { eventName, key, row, column } = req.body.data;
    console.log('new seat key', key);
    console.error('req.body.data', req.body.data);
    const queryForGettingTmp = `INSERT INTO mapping_data (id, event_name, key, row, column, reserved) VALUES ?`;
    console.log('queryForGettingTmp', queryForGettingTmp);

    const values = [
        ['1', eventName, key, row, column, ''],
    ];
    connection.query(queryForGettingTmp, [values], (err, results, fields) => {
        if (err) console.log('error', err);
        res.send(results);
    });
    return res;
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running in PORT ${port}`);
})