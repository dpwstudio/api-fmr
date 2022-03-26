const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db/db');

/**
 * GET Comments
 */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM comments', function (error, results, fields) {
    if (error) throw error;
    return res.send([...results]);
  });
});

/**
 * POST Comments
 */
router.post('/', (req, res) => {
  console.log('req', req.body);
  try {
    if (req) {
      const today = new Date();
      const comment = {
        "comment": req.body.comment,
        "productId": req.body.productId,
        "userId": req.body.userId,
        "createdAt": today
      }
      console.log('comment', comment);
      connection.query('INSERT INTO comments SET ?', comment, function (error, results, fields) {
        if (error) {
          console.log('error', error);
          res.status(400).json({
            error: error,
            message: 'There are some error with query'
          })
        } else {
          res.status(200).json({
            message: 'Comment created successfully.'
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
})


/**
 * GET Comment by id
 */
router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT DISTINCT c.*, u.firstname, u.ctryCode, u.img AS userImg FROM comments AS c, users AS u INNER JOIN users WHERE c.userId = u.id AND productId="${id}"`
    connection.query(query, (error, result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'Comment not found'
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
 * PUT Comment by id
 */
router.put('/:id', function (req, res, next) {
  console.log('req', req.body);
  const id = req.params.id;
  const status = req.body.status;

  connection.query('SELECT * FROM comments WHERE id = ?', [id], function (error, results, fields) {
    if (results.length === 0) {
      res.status(200).json({
        message: 'Comments doesn\'t exists.'
      });
    } else {
      const sql = `UPDATE comments SET status="${status}" WHERE id=${id}`;
      console.log('sql', sql);
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('err', err);
          res.status(500).json({
            error: 'Something went wrong!'
          })
        }
        res.status(200).json({
          message: 'Comments has been successfully updated.'
        });
      });
    }
  });
});

/**
 * DELETE Comment by id
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM comments WHERE id=${id}`;
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