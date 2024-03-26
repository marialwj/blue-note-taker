const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// the GET request for 'api/notes'

router.get('/notes', (req, res) => {
    const data = fs.readFileSync('./db/db.json', 'utf8');
    const dbJson = JSON.parse(data);
    res.json(dbJson);
});


// the POST request for 'api/notes'

router.post('/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(dbJson));
    res.json(newNote);
});

// bonus DELETE request for 'api/notes'

router.delete('/notes/:id', (req, res) => {
    const data = fs.readFileSync('./db/db.json', 'utf8');
    const dbJson = JSON.parse(data);
    const newDbJson = dbJson.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(newDbJson));
    res.json({ message: 'Note has been deleted' });
});

module.exports = router;
