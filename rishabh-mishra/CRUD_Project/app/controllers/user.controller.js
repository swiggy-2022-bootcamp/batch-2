const db = require("../models");
const User = db.users;

//signup user
const createUser = async (req, res) => {
  console.log(req.body);
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(500).send({
      message: err.message || "error while creating the User.",
    });
  }
};

//fetch all users
const findAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (err) {
    res.status(500).send({
      message: err.message || "error while retrieving the users.",
    });
  }
};

//fecth user by id
const findUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user)
      res.status(404).send({ message: "User Not Found with Id " + id });
    else res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "error while retrieving the user with id " + id,
    });
  }
};

const updateUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body);
    if (!updatedUser)
      res.status(404).send({ message: "User cannot be updated with Id " + id });
    else res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "error Updating the user with id " + id,
    });
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser)
      res.status(404).send({ message: "User cannot be deleted with Id " + id });
    else res.send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "error deleting the user with id " + id,
    });
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
};
