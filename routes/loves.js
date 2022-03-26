const express = require('express');
const router = express.Router();
const connection = require('../db/db');

/**
 * GET Loves
 */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM loves', function (error, results, fields) {
    if (error) throw error;
    return res.send([...results]);
  });
});

/**
 * POST Loves
 */
router.post('/', (req, res) => {
  console.log('req', req.body);
  try {
    if (req) {
      const today = new Date();
      const love = {
        productId: req.body.productId,
        userId: req.body.userId,
        addedAt: today
      }
      console.log('love', love);
      const query = `SELECT * FROM loves WHERE productId = "${love.productId}" AND userId ="${love.userId}"`
      connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
          res.status(409).json({
            message: 'Product already exists in your love'
          })
        } else {
          connection.query('INSERT INTO loves SET ?', love, function (error, results, fields) {
            if (error) {
              console.log('error', error);
              res.status(405).json({
                error: error
              })
            } else {
              res.status(200).json({
                message: 'Product has been successfully added in your Love.'
              })
            }
          });
        }
      });
    }
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      error: error,
    });
  }
})


/**
 * GET Love by userId
 */
router.get('/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const query = `SELECT w.*, p.img, p.catalogType, p.kind, p.brand, p.amount, p.model, p.userId AS productUserId, u.firstname, u.img AS userImg, u.ctryCode FROM loves AS w, products AS p, users AS u WHERE w.productId = p.id AND p.userId = u.id AND w.userId="${userId}"`
    connection.query(query, (error, result) => {
      console.log('error', error);
      if (result.length === 0) {
        res.status(404).json({
          message: 'Love not found'
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
 * PUT Love by id
 */
router.put('/:id', function (req, res, next) {
  console.log('req', req.body);
  const id = req.params.id;
  const status = req.body.status;

  connection.query('SELECT * FROM loves WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'Loves doesn\'t exists.'
      });
    } else {
      const sql = `UPDATE loves SET status="${status}" WHERE id=${id}`;
      console.log('sql', sql);
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Loves has been successfully updated.'
        });
      });
    }
  });
});

/**
 * DELETE Love by id
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM loves WHERE id=${id}`;
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