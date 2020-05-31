const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(validate(paramValidation.createOneUser), userCtrl.create)

router.route('/uploadProfilePicture/:userId')
  .post(userCtrl.uploadProfilePicture)

router.route('/:userId')
  .get(validate(paramValidation.getOneUser), userCtrl.getOne)
  .put(validate(paramValidation.updateOneUser), userCtrl.update)
  .delete(validate(paramValidation.deleteOneUser), userCtrl.deleteOne)

module.exports = router;
