require('dotenv').config();
const express = require('express');
const path = require('path'); // Dodaj ten import
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
const frontendPath = path.resolve(__dirname, '../frontend/dist');
//db
const mongoose = require('mongoose');
const { UserModel, UserAddModel } = require('./models/Users');

app.use(express.json())
app.use(express.static(path.join(frontendPath)));

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.${db_host}/project`)
.then(() => console.log('Połączono z bazą danych'))
.catch(err => console.error('Błąd połączenia z bazą danych:', err.message));

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.post('/', (req, res) => {
    res.redirect('/planowanie');
});

app.get('/api', (req, res) => {
    res.status(200).json({
      message: 'Witaj w naszym API!',
      version: '1.0.0',
      endpoints: {
        pracownicy: '/api/planowanie',
        magazyn: '/api/pracownicy',
        produkty: '/api/maszyny',
        status: '/api/magazyn',
        status: '/api/finanse'
      }
    });
});

app.get('/api/pracownicy', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.delete('/api/pracownicy/:id', async (req, res) => {
    try {
        await UserModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Pracownik usunięty' });
    } catch (error) {
        console.error('Błąd podczas usuwania:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.put('/api/pracownicy/:id', async (req, res) => {
    try {
        await UserModel.updateOne({ _id: req.params.id}, req.body);
        res.status(200).json({ message: 'Pracownik zaktualizowany' });
    }
    catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.post('/api/pracownicy', async (req, res) => {
    try {
        const user = new UserAddModel(req.body);
        await user.save();
        res.status(200).json({ message: 'Pracownik zapisany'});
    } catch (error) {
        console.error('Błąd podczas zapisu:', error.message);

        // Obsługa błędów walidacji
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: 'Błąd walidacji', errors });
        }

        // Inne błędy
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Uruchom serwer
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});