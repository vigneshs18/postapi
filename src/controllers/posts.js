const { Post } = require('../models/post');

exports.createPost = async(req, res) => {
  try {
      let post = new Post({
          title: req.body.title,
          body: req.body.body,
          dislike: req.body.dislike,
          like: req.body.like,
          userId: req.userTokenData._id
      });
      await post.save();

      res.status(201).send({ 
          status: 'Pass',
          message: 'Post Created',
          data : null
      });
  } catch(err) {
      res.status(500).send({ 
          status: 'Fail',
          message: err.message,
          data : null
      });
  }
}

exports.likePost = async(req, res) => {
  try {

      await Post.findByIdAndUpdate(
          req.params.id,
          {$inc : {'likes' : 1}}, 
          {new: true}
      );

      res.status(200).send({
          status: 'Pass',
          message: 'Post likes incremented',
          data: null
      });
  } catch(err) {
      res.status(500).send({
          status: 'Fail',
          message: err.message,
          data: null
      });
  }
}

exports.dislikePost = async(req, res) => {
  try {

      await Post.findByIdAndUpdate(
          req.params.id,
          {$inc : {'dislikes' : 1}}, 
          {new: true}
      );

      res.status(200).send({
          status: 'Pass',
          message: 'Post dislikes incremented',
          data: null
      });
  } catch(err) {
      res.status(500).send({
          status: 'Fail',
          message: err.message,
          data: null
      });
  }
}

exports.deletePost = async(req, res) => {
  try {

     // first retrive the userid of the respective post, then apply condition
     // If matched delete the record else return 'Unauthorised HTTP Code'
    

      await Post.findByIdAndRemove(
        req.params.id
      );

      res.status(200).send({
          status: 'Pass',
          message: 'Post Deleted',
          data: null
      });
  } catch(err) {
    res.status(500).send({
        status: 'Fail',
        message: err.message,
        data: null
    });
}
}