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
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        err ? next(err) : res.status(200).send(data)
    })
});

//post new notes within a new variable referenced in package.json and takes data from db.json and then pushing the newly added note into an array. then write to db.json as a string

app.post('/api/notes', (req, res) => {
    const note = {
        id: generateId({
            length: 8,
            useLetters: true
        }),
        title: req.body.title,
        text: req.body.text
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {next(err)
        const notes = JSON.parse(data)
            notes.push(note);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {next(err)}
            res.status(200).send(note)
        })}
    }
    )
})



