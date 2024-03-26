const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// the GET request for 'api/notes'

router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(dbJson);
});

// the POST request for 'api/notes'

router.post('api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
});

// bonus DELETE request for 'api/notes'

router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync('./db/db.json', 'utf8');
    const dbJson = JSON.parse(data); 
    const newDbJson = dbJson.filter(note => note.id !== req.params.id); 

    fs.writeFileSync('./db/db.json', JSON.stringify(newDbJson)); 
    res.json({ message: 'Note has been deleted' }); 
});

