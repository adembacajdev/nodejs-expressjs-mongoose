const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const revCtrl = require('./reviews.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(validate(paramValidation.createOneReview), revCtrl.createOne)

router.route('/:limit/:page')
    .get(validate(paramValidation.getAllReviews), revCtrl.getAll)

router.route('/:reviewId')
    .get(validate(paramValidation.getOneReview), revCtrl.getOne)
    .delete(validate(paramValidation.deleteOneReview), revCtrl.deleteOne)

module.exports = router;