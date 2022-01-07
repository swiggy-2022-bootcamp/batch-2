const db = require("../models");
const User = db.users;

//register new user
exports.createUser = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while creating user",
      });
    });
};

exports.findAllUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while retrieving users",
      });
    });
};

exports.findUserById = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `user not found with id: ${id}`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `error while retrieving user with id ${id}`,
      });
    });
};

exports.updateUserById = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `user cannot be updated with Id ${id}`,
        });
      } else {
        res.send({
          message: `user updated successfully`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `error Updating the user with id: ${id}`,
      });
    });
};

exports.deleteUserById = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `user cannot be updated with Id ${id}`,
        });
      } else {
        res.send({
          message: "User deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `error deleting the user with id ${id}`,
      });
    });
};