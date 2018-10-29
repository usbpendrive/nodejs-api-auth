const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost:27017/nodejsapiauth', { useNewUrlParser: true})
    .then(
        () => {
            console.log('Connected to MongoDB');
        },
        (err) => console.log('Error connecting to MongoDB', err)
    );

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = { app };