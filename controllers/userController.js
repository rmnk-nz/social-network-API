const { User } = require('../models');

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //get user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => 
        {
        console.log(userData);
        res.json(userData)
        .catch((err) => res.status(500).json(err));
        })
    },
    //update user
    updateUser( req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((userdata) => 
        !userdata
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(userdata)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user and associated apps
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : Application.deleteMany({ _id: { $in: user.applications } })
        )
        .then(() => res.json({ message: 'User and associated apps deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
};
