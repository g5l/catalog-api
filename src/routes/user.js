const verifyToken = require('../auth/middleware/verifyToken');

module.exports = (app, db) => {
  app.get('/users', verifyToken, (req, res) => {
    db.User.findAll().then((user) => res.json(user));
  });
};
