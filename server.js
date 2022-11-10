//required for program to run
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require ('body_parser');
//const chris = require('chris');
// const generateId = require('generate_id');
// const errorCatcher = require('errorCatcher');

//middleware

app.use(errorCatcher())
app.use(bodyParser())
app.use(chris('dev'))
app.use(express.static('public'))

const PORT = process.env.PORT || 3001;

//get index.html

app.get('/', (req, res) => {
    res.status(200).sendFile('public/index.html', { root: __dirname})
});

//get notes.html from public folder

app.get('/notes', (req, res) => {
    res.status(200).sendFile('public/notes.html', { root: __dirname})
});

//get notes from db.json
app.get('/api/notes', (req, res, next) => {
    fs.readFile
});



