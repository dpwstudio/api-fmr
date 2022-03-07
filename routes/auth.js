const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const connection = require('../db/db');
const jwt = require('jsonwebtoken');


/**
 * POST Login for authentication
 */
router.post('/login', function (req, res) {
    console.log(req.body)
    const email = req.body.email;
    console.log('email', email);
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            console.log('error', error);
            res.status(404).json({
                message: 'There are some error with query',
                error: error
            })
        } else {
            if (results.length > 0) {
                decryptedString = bcrypt.compareSync(password, results[0].password);
                if (decryptedString === true) {
                    console.log('results', results);
                    var token = jwt.sign({
                        id: results.id
                    }, process.env.CONFIG_TOKEN, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).json({...results, token: token})
                } else {
                    res.status(404).json({
                        message: 'Email and password does not match'
                    });
                }

            } else {
                res.status(404).json({
                    message: 'Email does not exits'
                });
            }
        }
    });
});



/**
 * POST Register for create user
 */
router.post('/register', function (req, res, next) {
    try {
        const password = req.body.password;
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                console.error(err)
                return
            }

            console.log('req.body', req.body);

            const today = new Date();
            const email = req.body.email;
            const user = {
                "firstname": req.body.firstname,
                "email": email,
                "newsletters": req.body.newsletter === true ? 1 : 0,
                "cguAccepted": req.body.cguAccepted === true ? 1 : 0,
                "password": hash,
                "createdAt": today,
            }
            connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
                if (results.length > 0) {
                    res.status(409).json({
                        message: 'Email already exists'
                    })
                } else {
                    connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
                        if (error) {
                            console.log('error', error)
                            res.status(405).json({
                                error: 'There are some error with query'
                            })
                        } else {
                            console.log('results', results);
                            var token = jwt.sign({
                                id: res.id
                            }, process.env.CONFIG_TOKEN, {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            res.status(200).json({
                                message: 'User has been successfully created.',
                                token: token
                            })
                        }
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * POST Lost Password 
 */
router.post('/lostPassword', function (req, res) {
    console.log('req', req.body);
    try {
        const email = req.body.email;
        connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
            if (results.length === 0) {
                res.status(404).json({
                    message: 'This email doesn\'t exist'
                })
            } else {
                res.status(200).json({
                    message: 'Email founded.'
                })
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

/**
 * PUT Reset Password 
 */
router.put('/resetPassword', function (req, res) {
    console.log('req', req.body);
    try {
        const password = req.body.password;
        console.log('password')
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                console.error(err)
                return
            }

            const email = req.body.email;
            const user = {
                password: hash,
                email: email
            }
            console.log('user', user);
            connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
                if (results.length === 0) {
                    res.status(404).json({
                        message: 'Email not found'
                    })
                } else {
                    const sql = `UPDATE users SET password="${user.password}" WHERE email="${user.email}"`;
                    console.log('sql', sql);
                    connection.query(sql, function (err, result) {
                        if (error) {
                            console.log('error', error)
                            res.status(405).json({
                                error: 'There are some error with query'
                            })
                        } else {
                            res.status(200).json({
                                message: 'Reset password with success.'
                            })
                        }
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;