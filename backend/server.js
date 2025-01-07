const express = require('express');
const path = require('path'); // Dodaj ten import
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}
const frontendPath = path.resolve(__dirname, '../frontend/dist');
//db
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static(path.join(frontendPath)));

mongoose.connect('mongodb://127.0.0.1:27017/project')

//Trasa główna
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/api2', (req, res) => {
    res.json({ robole: ['mati', 'ukrainiec'] })
});

app.get('/api', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

// Uruchom serwer
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});