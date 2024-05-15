const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const emailRegex = /^(?=.*@gmail.com|@outlook.com|@yahoo.com|@o2.com)/;
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W)/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Nieprawidłowa domena e-mail.' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Hasło musi zawierać co najmniej jedną cyfrę, jedną dużą literę i jeden znak specjalny.' });
    }

    try {
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(400).json({ message: 'Użytkownik już istnieje.' });
        }

        const user = new User({ username, email, password });

        await user.save();
        res.status(201).json({ message: 'Użytkownik zarejestrowany poprawnie.' });
    } catch (err) {
        res.status(500).json({ message: 'Błąd serwera.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await User.findOne({ email, username });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Nie prawidłowy adres e-mail lub hasło.' });
        }

        res.status(200).json({ message: 'Logowanie zakończone sukcesem.', username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Błąd serwera.' });
    }
});

module.exports = router;
