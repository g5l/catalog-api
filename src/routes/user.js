module.exports = (app, db) => {
  app.get('/users', (req, res) => {
    db.User.findAll()
      .then((user) => res.json(user))
  })

  app.post('/user', (req, res) => {
  })
}