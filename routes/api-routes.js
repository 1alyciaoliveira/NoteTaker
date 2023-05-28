const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

function readNotesFromDb(callback) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            callback([]);
        } else {
            const notes = JSON.parse(data);
            callback(notes);
        }
    });
}

// Route for reading previous notes

router.get('/api/notes', (req, res) => {
    readNotesFromDb ((notes) => {
        res.json(notes);
    });
});

// Route for getting a specific note 

router.get('/api/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;

    readNotesFromDb((notes) => {
        const note = notes.find((note) => note.note_id === noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json('Note not found');
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

        readNotesFromDb((notes) => {
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
    });

    } else {
        res.status(500).json('Error');
    }
});


// Route for deleting a note
router.delete('/api/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;

    readNotesFromDb((notes) => {
        const updateNotes = notes.filter((note) => note.note_id !== noteId);

        fs.writeFile('./db/db.json', JSON.stringify(updateNotes), (writeError) => {
            if (writeError) {
            console.error(writeError);
            res.status(500).json('Error');
            } else {
            res.status(200).json('Note deleted successfully');
            }
        });
    });
});

module.exports = router;