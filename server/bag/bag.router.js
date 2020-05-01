const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const bagCtrl = require('./bag.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(bagCtrl.createOne)
    .get(bagCtrl.getAll)

router.route('/:bagId')
    .get(bagCtrl.getOne)
    .delete(bagCtrl.deleteOne)

module.exports = router;