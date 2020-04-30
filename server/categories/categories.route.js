const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const catCtrl = require('./categories.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(catCtrl.createOne)
    .get(catCtrl.getAll)

router.route('/:categoryId')
    .get(catCtrl.getOne)
    .put(catCtrl.updateOne)
    .delete(catCtrl.deleteOne)

module.exports = router;