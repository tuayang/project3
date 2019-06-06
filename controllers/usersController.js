const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Defining methods for the booksController
module.exports = {
  findOne: function(req, res) {
    const { username, password } = req.body;
    console.log(req.body);
    db.User
      .findOne({username})
      .then(dbModel => {
        if(!dbModel) {
          return res.status(404).json({
            error: "Username and password not matching"
          });
        }

        // if (dbModel.password !== password) {
        //   return res.status(404).json({
        //     error: "Username and password not matching"
        //   });
        // }
        bcrypt.compare(password, dbModel.password, function(err, same) {
          if (err) {
            return res.status(500).json({
              error: "Something went wrong"
            })
          }
          if (!same) {
            return res.status(404).json({
              error: "password username not matching"
            });
          }
          const { username, _id: id } = dbModel;

          const token = jwt.sign({username, id}, 'my-website-secret');
          return res.json({
            id,
            username,
            token
          })
        })
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username;
    db.User
      .create({ username, password})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
