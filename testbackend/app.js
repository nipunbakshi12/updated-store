const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config()
const port = process.env.PORT;

app.use(express.json());


// Example routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})

// Export the app for the serverless function to pick it up
module.exports = app;
