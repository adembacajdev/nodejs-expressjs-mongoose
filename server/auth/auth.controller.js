const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
const sha256 = require('crypto-js/sha256');
const PASSWORD_SALT = 'palidhje123';
const JWT_SECRET = 'lidhjepalidhje123';


function login(req, res, next) {
  const email = req.body.email.toLowerCase()
  const password = sha256(PASSWORD_SALT + req.body.password).toString()
  const remember = req.body.remember
  User.find({ email: email, password: password }).lean().exec().then(userData => {
    if (userData.length == 1) {
      const token = jwt.sign({
        email: email,
        user_level: userData[0].user_level,
        user_id: userData[0]._id,
        name: userData[0].name,
        surname: userData[0].surname,
        gender: userData[0].gender,
        city: userData[0].city,
        profile_picture: userData[0].profile_picture
      }, JWT_SECRET, { expiresIn: remember ? "30d" : "24h" });

      return res.json({
        token,
        email: email,
        user_level: userData[0].user_level,
        user_id: userData[0]._id,
        name: userData[0].name,
        surname: userData[0].surname,
        gender: userData[0].gender,
        city: userData[0].city,
        profile_picture: userData[0].profile_picture,
        success: true
      });
    } else {
      return res.json({
        message: "Përdoruesi apo Fjalëkalimi i gabuar",
        success: false
      })
    }
  }).catch((e) => {
    const err = new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR, true);
    next(err);
  })
}


module.exports = { login };
