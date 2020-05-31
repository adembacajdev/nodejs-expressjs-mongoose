const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const postCtrl = require('./posts.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(validate(paramValidation.createPost), postCtrl.createOne)

router.route('/:limit/:page')
    .get(validate(paramValidation.getAllPosts), postCtrl.getAll)

router.route('/images/:postId')
    .post(postCtrl.uploadProfilePicture);

router.route('/:postId')
    .get(validate(paramValidation.getOnePost), postCtrl.getOne)
    .put(validate(paramValidation.updateOnePost), postCtrl.updateOne)
    .delete(validate(paramValidation.deleteOnePost), postCtrl.deleteOne)


module.exports = router;