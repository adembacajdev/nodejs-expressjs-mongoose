const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(userCtrl.create)

router.route('/uploadProfilePicture/:userId')
  .post(userCtrl.uploadProfilePicture)

router.route('/:userId')
  .get(userCtrl.getOne)
  .put(userCtrl.update)
  .delete(userCtrl.deleteOne)

module.exports = router;
