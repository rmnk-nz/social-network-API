const { User, Thought } = require('../models');

module.exports = {
    //get thought by id
    getSingleThought(req, res) {
        User.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'User Thought does not Exist' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //create new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((userData) =>
        !userData
        ? res.status(404).json({ message: 'User does not Exist' })
        : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    },
    //update thought
    updateThought( req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'Thought does not Exist' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user and associated apps
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'Thought does not Exist' })
        : res.json({message: 'Thought successfully removed' })
        )
        .catch((err) => res.status(500).json(err));
    },
    //create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((thought) =>
        !thought
        ?res.status(404).json({ message: 'Thought does not Exist' })
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    //delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'Thought does not Exist' })
        : res.json({message: 'Reaction successfully removed' })
        )
        .catch((err) => res.status(500).json(err));
      },
}