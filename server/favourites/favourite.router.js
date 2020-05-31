const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const favCtrl = require('./favourite.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(validate(paramValidation.createFavourite), favCtrl.createOne)

router.route('/:limit/:page')
    .get(validate(paramValidation.getAllFavourites), favCtrl.getAll)

router.route('/:favouriteId')
    .get(validate(paramValidation.getOneFavourite), favCtrl.getOne)
    .delete(validate(paramValidation.deleteFavourite), avCtrl.deleteOne)

module.exports = router;