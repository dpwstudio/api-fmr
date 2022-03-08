const express = require('express');
const router = express.Router();
const _ = require('lodash');
const connection = require('../db/db');
const moment = require('moment');


/**
 * GET Products
 */
router.get('/', function (req, res, next) {
  try {
    connection.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      res.status(200).json([...results]);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * GET Products by id
 */
router.get('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    connection.query('SELECT * FROM products WHERE id = ?', id, (error, result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'Property not found'
        });
      } else {
        res.status(200).json([...result]);
      }
      connection.on('error', function (err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});


/**
 * POST products
 */
router.post('/', (req, res) => {
  console.log('req', req.body);
  try {
    if (req) {
      const today = new Date();
      const date = moment().format("YYYYMMDD_HHmm");
      const DIR = 'http://dpwstudio.local:3000/images/users';
      const productToSend = {
        img: JSON.stringify([{
          photoFace: `${DIR}/${date}_${req.body.photoFace}`,
          photoDos: `${DIR}/${date}_${req.body.photoDos}`,
          photoProfile: `${DIR}/${date}_${req.body.photoProfile}`,
          photoGriffe: `${DIR}/${date}_${req.body.photoGriffe}`,
          photo5: `${DIR}/${date}_${req.body.photo5}`,
          photo6: `${DIR}/${date}_${req.body.photo6}`
        }]),
        catalogType: req.body.catalogType,
        category: req.body.category,
        kind: req.body.kind,
        brand: req.body.brand,
        model: req.body.model,
        matter: req.body.matter,
        color: req.body.color,
        description: req.body.description,
        dimensions: JSON.stringify([{
          height: req.body.height,
          width: req.body.width,
          depth: req.body.depth,
        }]),
        stateOfProduct: req.body.stateChoice,
        amount: JSON.stringify([{
          price: req.body.price,
          amountWin: req.body.amountWin,
        }]),
        user: JSON.stringify([{
          userId: req.body.userId,
          userImg: req.body.userImg,
          userName: req.body.userName,
          userCountry: req.body.userName,
        }]),
        status: 'waiting',
        createdAt: today,
      }
      connection.query('INSERT INTO products SET ?', productToSend, function (error, results, fields) {
        if (error) {
          console.log('error', error)
          res.status(400).json({
            error: error,
            message: 'There are some error with query'
          })
        } else {
          res.status(200).json({
            message: 'Products created successfully.'
          })
        }
      });
    }
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      error: error,
    });
  }
});

/**
 * PUT products by id
 */
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log('req', req.body);
  const product = {
    image: today + '_' + req.body.image,
    name: req.body.title,
    category: req.body.address,
    ingredient: req.body.description,
    description: req.body.description,
    price: req.body.price,
    createdAt: today,
  }

  connection.query('SELECT * FROM products WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'Product doesn\'t exists.'
      });
    } else {
      const sql = `UPDATE products SET 
        name="${product.name}",
        category="${category}",
        category="${category}",
        ingredient="${ingredient}",
        description="${description}"
        price="${price}"
        WHERE id=${id}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Product has been successfully updated.'
        });
      });
    }
  });
});

/**
 * DELETE Products by id
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = `DELETE FROM products WHERE id=${id}`;
  connection.query(sql, function (err, result) {
    console.log('result', sql);
    if (err) {
      res.status(500).json({
        error: 'Something went wrong!'
      })
    }
    res.status(200).json({
      message: 'Product has been successfully deleted.'
    });
  });
});


module.exports = router;