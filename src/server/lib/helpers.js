var bcrypt = require('bcryptjs');
var moment = require('moment');
var jwt = require('jwt-simple');

// var config = require('../../_config');

function ensureAdmin(req, res, next) {
  // check headers for the presence of an auth object
  if(!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'fail',
      message: 'No header present or no authorization header.'
    });
  }
  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();
  // ensure that it is valid
  if(now > payload.exp || payload.iat > now || user.role != 'admin') {
    return res.status(401).json({
      status: 'fail',
      message: 'Token is invalid'
    });
  }
  // ensure user is still in the database
  knex('users')
    .where('id', payload.sub)
    .first()
    .then(function(user) {
      // if in database, let them access the route
      next();
    })
    .catch(function(err) {
      return next(err);
    });
}

function hashing(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
  console.log(password, hashedPassword)
  return bcrypt.compareSync(password, hashedPassword);
}

function generateToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user[0].id
  };
  return jwt.encode(payload, '\x07q\xa1\xb0\xa0\xa7x\xda\xb2\xa9+g|\xd5\x9d\xd9\x9f\x12\xc4-I\x12Q\xfc');
}


module.exports = {
  ensureAdmin: ensureAdmin,
  hashing: hashing,
  comparePassword: comparePassword,
  generateToken: generateToken
};