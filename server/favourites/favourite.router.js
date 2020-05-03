const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const favCtrl = require('./favourite.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(favCtrl.createOne)

router.route('/:limit/:page')
    .get(favCtrl.getAll)

router.route('/:favouriteId')
    .get(favCtrl.getOne)
    .delete(favCtrl.deleteOne)

module.exports = router;