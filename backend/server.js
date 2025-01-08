const express = require('express');
const path = require('path'); // Dodaj ten import
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: ['localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
const frontendPath = path.resolve(__dirname, '../frontend/dist');
//db
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

app.use(express.json())
app.use(express.static(path.join(frontendPath)));

mongoose.connect('mongodb://127.0.0.1:27017/project')

app.get('/api', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Uruchom serwer
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});