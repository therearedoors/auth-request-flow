const express = require('express');
const { json } = require('express/lib/response');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    if(req.body.username !== mockUser.username) res.json({error: 'invalid username'})
    if (req.body.password !== mockUser.password)  res.json({error: 'invalid password'})
    const token = jwt.sign(mockUser, 'key')
    res.json({jwt: token})
});

router.get('/profile', (req, res) => {
    let profile
   try {profile = jwt.verify(req.headers.authorization,'key')}
   catch {return "error"}
   res.json({profile: profile.profile})
});

module.exports = router;
