const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db/db');
const moment = require('moment');

/**
 * GET Users
 */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    return res.send([...results]);
  });
});

/**
 * POST Users
 */
router.post('/', function (req, res, next) {
  try {
    const password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        console.error(err)
        return
      }

      console.log('req.body', req.body);

      const today = new Date();
      const user = {
        "lastName": req.body.lastName,
        "firstName": req.body.firstName,
        "email": req.body.email,
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
              res.status(405).json({
                error: 'There are some error with query'
              })
            } else {
              res.status(200).json({
                message: 'User has been successfully created.'
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
 * GET User by id
 */
router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'User not found'
        });
      } else {
        res.status(200).json([...result]);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * PUT Users  by id
 */
router.put('/:id', function (req, res, next) {
  console.log('req.params', req.params);
  const id = req.params.id;
  console.log('id', id);
  console.log('req', req.body);
  const date = moment().format("YYYYMMDD_HHmm");
  const users = {
    img: {
      avatar: `http://dpwstudio.local:3000/images/users/${date}_${req.body.avatar}`,
      dressing: `http://dpwstudio.local:3000/images/users/${date}_${req.body.dressing}`,
      gallery: `http://dpwstudio.local:3000/images/users/${date}_${req.body.gallery}`,
    },
    imgType: req.body.imgType,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    phone: req.body.phone,
    address: {
      address: req.body.address,
      zipCode: req.body.zipCode,
      city: req.body.city,
      country: req.body.country,
    },
    addressType: req.body.addressType,
  }

  const address = JSON.stringify([users.address]);
  connection.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'User doesn\'t exists.'
      });
    } else {
      let sql = '';
      let imgToSend = '';
      let resultImg = {};
      if (results[0].img) {
        resultImg = JSON.parse(results[0].img);
        console.log('resultImg exist', resultImg);
        if (users.imgType === 'avatar') {
          resultImg.map(img => img.avatar = users.img.avatar);
        } else if (users.imgType === 'dressing') {
          resultImg.map(img => img.dressing = users.img.dressing);
        } else {
          resultImg.map(img => img.gallery = users.img.gallery);
        }
        imgToSend = JSON.stringify(resultImg);
        console.log('obj imgToSend exist', imgToSend)
      } else {
        if (users.imgType === 'avatar') {
          resultImg.avatar = users.img.avatar;
        }
        if (users.imgType === 'dressing') {
          resultImg.dressing = users.img.dressing;
        }
        if (users.imgType === 'gallery') {
          resultImg.gallery = users.img.gallery;
        }
        imgToSend = JSON.stringify([resultImg]);
        console.log('imgToSend not exist', imgToSend)
      }

      /**
       * Définition de la requête SQL à envoyer
       */
      if (users.addressType === 'deliveryAddress') {
        sql = `UPDATE users SET deliveryAddress='${address}', ctryCode="${users.ctryCode}" WHERE id=${id}`;
      } else if (users.addressType === 'billingAddress') {
        sql = `UPDATE users SET billingAddress='${address}' WHERE id=${id}`;
      } else if (users.imgType === 'avatar') {
        sql = `UPDATE users SET img='${imgToSend}' WHERE id=${id}`;
      } else if (users.imgType === 'dressing') {
        sql = `UPDATE users SET img='${imgToSend}' WHERE id=${id}`;
      } else if (users.imgType === 'gallery') {
        sql = `UPDATE users SET img='${imgToSend}' WHERE id=${id}`;
      } else if (users.lastname && users.firstname && users.phone) {
        sql = `UPDATE users SET lastname="${users.lastname}", firstname="${users.firstname}", phone="${users.phone}" WHERE id=${id}`;
      }
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Users has been successfully updated.',
          user: result
        });
      });
    }
  });
});

/**
 * DELETE User by id
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM users WHERE id=${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

module.exports = router;