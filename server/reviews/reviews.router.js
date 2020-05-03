const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const revCtrl = require('./reviews.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(revCtrl.createOne)

router.route('/:limit/:page')
    .get(revCtrl.getAll)

router.route('/:reviewId')
    .get(revCtrl.getOne)
    .delete(revCtrl.deleteOne)

module.exports = router;