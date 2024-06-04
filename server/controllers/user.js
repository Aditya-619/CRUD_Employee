require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.js');

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json('Fill in all the fields.');
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(401).json('User already exists.');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: encryptedPassword,
        });
        const token = jwt.sign(
            { id: user._id, username },
            process.env.SECRET_KEY,
            { expiresIn: '2h' }
        )
        user.token = token;
        user.password = undefined;
        res.status(200).json({ message: 'User registered successfully.', user });

    } catch (err) {
        res.status(400).json(err);
    }
}

const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json('Fill in all the fields.');
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json('User does not exists.');
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id, username },
                process.env.SECRET_KEY,
                { expiresIn: '2h' }
            )
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie('token', token, options).json(
                {
                    message: 'Successfully logged in',
                    success: true,
                    user
                }
            )
        } else {
            res.status(400).json('Unauthorize');
        }

    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { registerUser, loginUser };

