require('dotenv').config();
const express = require('express');
const path = require('path'); // Dodaj ten import
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
const { MachineModel, MachineAddModel } = require('./models/Machines');
const { PlanningModel, PlanningAddModel } = require('./models/Planning');
const { WarehouseModel, WarehousePutModel, WarehouseAddModel } = require('./models/Warehouse');
const { FinanceModel, FinancePutModel, FinanceAddModel } = require('./models/Finance');

app.use(express.json())
app.use(express.static(path.join(frontendPath)));
app.use('/api', (req, res, next) => {
    if (req.path === '/logowanie' || req.path === '/logout' || req.path === '/auth') return next();
    authMiddleware(req, res, next);
});

function authMiddleware(req, res, next) {

    const token = req.headers['cookie']?.split('=')[1];

    if (!token) {
        return res.status(401).json({ message: "Brak tokena" });
    }

    next();
}

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

const users = [
    {
        id: 1,
        login: "administrator",
        password: "$2b$10$X/m32SH9V2gtjyoAaPPA4enPEtP2Y5biqEuGx.tx0hVGO2bsMq4jS",
    },
];

mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.${db_host}/project`)
    .then(() => console.log('Połączono z bazą danych'))
    .catch(err => console.error('Błąd połączenia z bazą danych:', err.message));

app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Witaj w naszym API!',
        version: '1.0.0',
        endpoints: {
            planowanie: '/api/planowanie',
            pracownicy: '/api/pracownicy',
            maszyny: '/api/maszyny',
            magazyn: '/api/magazyn',
            finanse: '/api/finanse'
        }
    });
});

app.get('/api/pracownicy', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('/api/maszyny', (req, res) => {
    MachineModel.find()
        .then(items => res.json(items))
        .catch(err => res.json(err))
});

app.get('/api/planowanie', (req, res) => {
    PlanningModel.find()
        .then(items => res.json(items))
        .catch(err => res.json(err))
});

app.get('/api/magazyn', (req, res) => {
    WarehouseModel.find()
        .then(items => res.json(items))
        .catch(err => res.json(err))
});

app.get('/api/finanse', (req, res) => {
    FinanceModel.find()
        .then(items => res.json(items))
        .catch(err => res.json(err))
});

function generateToken(user) {
    return jwt.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token ważny przez 1 godzinę
    });
}

app.post("/api/logowanie", async (req, res) => {
    const { login, pass } = req.body;

    const user = users.find((u) => u.login === login);
    if (!user) {
        return res.status(401).json({ message: "Nie znaleziono użytkownika" });
    }

    const isMatch = await bcrypt.compare(pass.trim(), user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Niepoprawne hasło" });
    }

    const token = generateToken(user);

    res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(200).json({ message: "Zalogowano", token });
});

app.post("/api/auth", (req, res) => {
    const token = req.headers['cookie']?.split('=')[1];
    if (!token) {
        return res.status(401).json({ message: "Brak tokena" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Zalogowano", user: decoded });
    } catch (error) {
        res.status(401).json({ message: "Niepoprawny token" });
    }
})

app.post("/api/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Wylogowano" });
});

app.post('/api/pracownicy', async (req, res) => {
    try {
        const user = new UserAddModel(req.body);
        await user.save();
        res.status(200).json({ message: 'Pracownik zapisany' });
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

app.post('/api/maszyny', async (req, res) => {
    try {
        console.log(req.body);
        const item = new MachineModel(req.body);
        await item.save();
        res.status(200).json({ message: 'Maszyna zapisana' });
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

app.post('/api/planowanie', async (req, res) => {
    try {
        console.log(req.body);
        const item = new PlanningAddModel(req.body);
        await item.save();
        res.status(200).json({ message: 'Harmonogram zapisany' });
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

app.post('/api/magazyn', async (req, res) => {
    try {
        console.log(req.body);
        const item = new WarehouseAddModel(req.body);
        await item.save();
        res.status(200).json({ message: 'Przedmiot zapisany' });
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

app.post('/api/finanse', async (req, res) => {
    try {
        console.log(req.body);

        const item = await FinanceModel.findById('677edc054d7fc3791077dff0');

        await FinanceModel.findByIdAndUpdate(
            item._id,
            {
                $push: { costs: [req.body.category, req.body.name, req.body.count] },
            },
            { new: true }
        )

        res.status(200).json({ message: 'Przedmiot zapisany' });
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

app.put('/api/pracownicy/:id', async (req, res) => {
    try {
        await UserModel.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: 'Pracownik zaktualizowany' });
    }
    catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.put('/api/maszyny/:id', async (req, res) => {
    try {
        await MachineModel.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: 'Maszyna zaktualizowana' });
    }
    catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.put('/api/planowanie/:id', async (req, res) => {
    try {
        await PlanningModel.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: 'Harmonogram zaktualizowany' });
    }
    catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.put('/api/magazyn/:id', async (req, res) => {

    try {
        const { historyId } = req.body;
        const index = parseInt(historyId, 10);

        if (historyId !== undefined && historyId !== null) {
            console.log(historyId);
            const { id } = req.params;
            let flag = true;
            let num = 0;

            const item = await WarehouseModel.findById(id);
            if (item.history[index][0] === false) {
                flag = false
                num = item.count + item.history[index][1]
            } else {
                flag = true
                num = item.count - item.history[index][1]
            }

            await WarehouseModel.updateOne(
                { _id: id },
                { $unset: { [`history.${index}`]: 1 } }, // Ustawia history[2] na null
            );

            await WarehouseModel.updateOne(
                { _id: id },
                { $pull: { history: null } },
            );

            await WarehouseModel.updateOne(
                { _id: id },
                { $inc: { count: flag === false ? item.history[index][1] : -item.history[index][1] } },
            );

            return res.status(200).json({ message: 'Element historii usunięty' });

        } else {
            const { positive, amount, date } = req.body; // Pobieramy wartości z requesta
            const { id } = req.params;

            console.log(req.body);
            const newAmount = amount.replace(/^0+/, '') || 0;

            // Sprawdzenie, czy produkt istnieje
            const item = await WarehouseModel.findById(id);
            if (!item) {
                return res.status(404).json({ message: 'Produkt nie znaleziony' });
            }

            if (positive === false && item.count < newAmount) {
                return res.status(400).json({ message: 'Nie można dodać ujemnej ilości' });
            }

            const parseAmount = parseInt(newAmount, 10);
            const updatedItem = await WarehouseModel.findByIdAndUpdate(
                id,
                {
                    $inc: { count: positive ? parseAmount : -parseAmount },
                    $push: { history: [positive ? true : false, newAmount, date] },
                },
                { new: true }
            )

            res.status(200).json(updatedItem);
        }

    } catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
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

app.delete('/api/maszyny/:id', async (req, res) => {
    try {
        await MachineModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Maszyna usunięta' });
    } catch (error) {
        console.error('Błąd podczas usuwania:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.delete('/api/magazyn/:id', async (req, res) => {
    try {
        await WarehouseModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Maszyna usunięta' });
    } catch (error) {
        console.error('Błąd podczas usuwania:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Uruchom serwer
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});