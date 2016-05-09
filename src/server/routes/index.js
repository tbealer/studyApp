var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var helpers = require('../lib/helpers')

router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;

  knex('users').where('email', email)
    .then(function(data) {
      if(data.length) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exists'
        });
      } else {
        var hashedPassword = helpers.hashing(password);
        knex('users')
        .returning('*')
        .insert({
          email: email,
          password: hashedPassword,
          name: name
        })
        .then(function(user) {
          var token = helpers.generateToken(user);
          delete user.password;
          res.status(200).json({
            status: 'success',
            data: {
              token: token,
              user: user
            }
          });
        })
        .catch(function(err) {
          return next(err);
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  knex('users').where('email', email)
  .then(function (user) {
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email does not exist'
      });
    } else {
      var match = helpers.comparePassword(req.body.password, user[0].password);
      if (!match) {
        return res.status(401).json({
          status: 'fail',
          message: 'Password is not correct'
        });
      }
      delete user[0].password;
      var token = helpers.generateToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user[0]
        }
      });
    }
  })
  .catch(function (err) {
    return next(err);
  });
});

module.exports = router;
