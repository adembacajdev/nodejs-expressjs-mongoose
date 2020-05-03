const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const postCtrl = require('./posts.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(postCtrl.createOne)

router.route('/:limit/:page')
    .get(postCtrl.getAll)

router.route('/images/:postId')
    .post(postCtrl.uploadProfilePicture);

router.route('/:postId')
    .get(postCtrl.getOne)
    .put(postCtrl.updateOne)
    .delete(postCtrl.deleteOne)


module.exports = router;