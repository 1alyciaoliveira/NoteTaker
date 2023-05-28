const express = require('express');
const path = require('path');

const router = express.Router();


//Route for homepage
router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

//Route for notes
router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = router;