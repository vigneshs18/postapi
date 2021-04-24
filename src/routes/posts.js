const express = require('express');

const PostController = require('../controllers/post');
const verifyLogin = require('../middlewares/verifylogin');
// const verifyUser = require('../middlewares/verifyUser');

const router = express.Router();

router.get('/all', PostController.fetchPosts);
router.post('/create', verifyLogin, PostController.createPost);
router.put('/like/:id', verifyLogin, PostController.likePost);
router.put('/dislike/:id', verifyLogin, PostController.dislikePost);
router.delete('/delete/:id', verifyLogin, PostController.deletePost);

module.exports = router;