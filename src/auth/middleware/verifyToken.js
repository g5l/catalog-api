const jwt = require('jsonwebtoken');
const config = require('../../../config/auth');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    // res.status(403)
    return res.send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      // res.status(500).send
      return res.send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
