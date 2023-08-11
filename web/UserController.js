const { Sequelize } = require('sequelize');
const db = require('../model')
const User = db.users
const Role = db.roles

// Request using POST method that adds a user to the database
const addUser = async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      isAdmin: req.body.isAdmin,
      isLandlord: req.body.isLandlord,
      isTenant: req.body.isTenant,
      isApproved: req.body.isApproved,
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};
  
// Request using GET method that retrieves all user information from the database
const getAllUsers = async (req,res) => {
  let users = await User.findAll()
  res.status(200).json({message: users})
}

// Request using GET method that retrieves all users that share the same username as given from the parameters of the request
const getUsersByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const users = await User.findAll({
      where: { username: username },
    });
    res.status(200).json({message: users});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users by username" });
  }
};

// Request using GET method that retrieves the user with the id given from the parameters of the request
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: id },
    });
    res.status(200).json({message: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user by id" });
  }
};

// Request using PUT method that updates the isApproved field of the user given his id
const approveUser = async (req, res) => {
  try {
    await User.update(
      {isApproved: req.body.isApproved},
      {where: {id: req.body.id}}
    )
    res.status(200).json({message: "Successfully updated"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to approve user" });
  }
}

// Request using PUT method that updates all the fields of the user given his id
// ID NEVER CHANGES
const updateUser = async (req, res) => {
  try {
    const updatedData = {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      isAdmin: req.body.isAdmin,
      isLandlord: req.body.isLandlord,
      isTenant: req.body.isTenant,
      isApproved: req.body.isApproved,
    };

    await User.update(updatedData, {
      where: { id: req.body.id },
    });

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = {
    addUser,
    getAllUsers,
    getUsersByUsername,
    getUserById,
    approveUser,
    updateUser
}