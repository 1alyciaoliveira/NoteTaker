const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let notes = [];

// Route for reading previous notes

fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
       notes = JSON.parse(data);
    }
});

router.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Route for getting a specific note 

router.get('/api/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json('error');
        } else {
            const notes = JSON.parse(data);
            const note = notes.find((note) => note.note_id === noteId);

            if (note) {
                res.json(note);
            } else {
                res.status(404).json('Note not found');
            }
        }
    });
});

// Route for creating a new note
router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (writeError) => {
            if(writeError) {
                console.error(writeError);
                res.status(500).json('Error');
            } else {
                const response = {
                    status: 'success',
                    body: newNote,
                };

                console.log(response);
                res.status(201).json(response);
            }
        });
    } else {
        res.status(500).json('Error');
    }

});


// Route for deleting a note


module.exports = router;