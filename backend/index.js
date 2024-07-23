// index.js
const express = require('express');
const app = express();
const port = 3001; // Port number for the server

app.get('/', (req, res) => {
    res.send('Hello World! This is our API.');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to our API!' });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
