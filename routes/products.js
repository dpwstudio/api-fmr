const express = require('express');
const router = express.Router();
const _ = require('lodash');
const connection = require('../db/db');
const moment = require('moment');
const url = require('url');


/**
 * POST Products (récupère les produits)
 */
router.post('/filters', function (req, res, next) {
    console.log('xxxx', req.body);
    const filters = {
      catalogType: req.body.catalogType,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };

  try {
    let query = '';
    if (filters.catalogType && filters.category) {
      query = `SELECT DISTINCT p.*, u.firstname, u.ctryCode, u.img AS userImg, u.createdAt AS userDateMember FROM products AS p, users AS u INNER JOIN users WHERE p.userId = u.id AND catalogType="${filters.catalogType}" AND category="${filters.category}"`;
    } else if (filters.startDate && filters.endDate) {
      query = `SELECT DISTINCT p.*, u.firstname, u.ctryCode, u.img AS userImg, u.createdAt AS userDateMember FROM products AS p, users AS u INNER JOIN users WHERE p.userId = u.id AND p.createdAt BETWEEN "${filters.startDate}" AND "${filters.endDate}"`;
    } else {
      query = 'SELECT DISTINCT p.*, u.firstname, u.ctryCode, u.img AS userImg, u.createdAt AS userDateMember FROM products AS p, users AS u INNER JOIN users WHERE p.userId = u.id';
    }
    console.log('query', query);
    connection.query(query, function (error, results, fields) {
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
      const DIR = 'http://dpwstudio.local:3000/images/products';
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
        subCategory: req.body.subCategory,
        kind: req.body.kind,
        brand: req.body.brand,
        model: req.body.model.toLowerCase(),
        matter: req.body.matter.toLowerCase(),
        color: req.body.color.toLowerCase(),
        description: req.body.description.toLowerCase(),
        dimensions: JSON.stringify([{
          height: req.body.height,
          width: req.body.width,
          length: req.body.length,
          size: req.body.size,
          sizeType: req.body.sizeType,
          sizeClothes: req.body.sizeClothes,
          diameter: req.body.diameter
        }]),
        stateOfProduct: req.body.stateChoice,
        authenticity: JSON.stringify([{
          invoice: req.body.invoice,
          certificate: req.body.certificate,
          noProof: req.body.noProof,
        }]),
        amount: JSON.stringify([{
          price: req.body.price,
          amountWin: req.body.amountWin,
        }]),
        userId: req.body.userId,
        status: 'waiting',
        createdAt: today,
      }
      connection.query('INSERT INTO products SET ?', productToSend, function (error, results, fields) {
        console.log('results', results);
        if (error) {
          console.log('error', error)
          res.status(400).json({
            error: error,
            message: 'There are some error with query'
          })
        } else {
          res.status(200).json({
            message: 'Products created successfully.',
            idProduct: results.insertId
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