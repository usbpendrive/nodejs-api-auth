const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();

const isEmail = (email) => {
    if (typeof email !== 'string') {
        return false;
    }

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return emailRegex.test(email);
};

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!isEmail(email)) {
            throw new Error('Email must be a valid email address.');
        }
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }
        const user = new User({ email, password });
        const persistedUser = await user.save();

        res.status(201).json({
            title: 'User Registration Successful',
            detail: 'Successfully registered new user'
        });
    } catch (err) {
        res.status(400).json({
            errors: [
                {
                    title: 'Registration Error',
                    detail: 'Something went wrong during registration',
                    errorMessage: err.message,
                }
            ]
        });
    }
});
