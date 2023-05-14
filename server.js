const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let licenses = [];

app.get('/', (req, res) => {
    res.send('License management server is running!');
});

app.get('/generate', (req, res) => {
    const newKey = uuid.v4();
    licenses.push(newKey);
    res.json(newKey);
});

app.get('/delete/:key', (req, res) => {
    const key = req.params.key;
    const index = licenses.indexOf(key);
    if (index > -1) {
        licenses.splice(index, 1);
        res.json({ message: 'Deleted successfully' });
    } else {
        res.json({ message: 'Key not found' });
    }
});

app.get('/verify/:key', (req, res) => {
    const key = req.params.key;
    const valid = licenses.includes(key);
    res.json({ valid });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
