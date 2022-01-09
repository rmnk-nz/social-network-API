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
        ? res.status(404).json({ message: 'User does not Exist' })
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
            { new: true }
        )
        .then((userData) => 
        !userData
        ? res.status(404).json({ message: 'User does not Exist' })
        : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'User does not Exist' })
        : Application.deleteMany({ _id: { $in: user.applications } })
        )
        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    //add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'User does not Exist' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'User does not Exist' })
        : res.json({message: 'Friend successfully removed' })
        )
        .catch((err) => res.status(500).json(err));
      },
};
