const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const config = require('../config')
const users = require('../data/users')
const _ = require("lodash")

module.exports = new PassportLocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true

}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };
    const user = _.find(users, (u) => {
        return u.email == email
    })
    if (user) {
        if (userData.password == user.password) {
            const payload = {
                sub: user.id
            };
            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.name
            };
            return done(null, token, data);
        } else {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }
    } else {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
    }
});