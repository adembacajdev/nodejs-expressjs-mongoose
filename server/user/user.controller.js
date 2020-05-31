const User = require('./user.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const sha256 = require('crypto-js/sha256');
const fs = require('fs');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

function create(req, res, next) {
  const PASSWORD_SALT = 'palidhje123';

  const userModel = new User({
    email: req.body.email.toLowerCase(),
    password: sha256(PASSWORD_SALT + req.body.password),
    name: req.body.name,
    city: req.body.city,
    profile_picture: req.body.profile_picture,
    description: req.body.description,
    number: req.body.number,
    type: req.body.type
  });

  User.find({ email: req.body.email.toLowerCase() }).lean().exec().then((user) => {
    if (user.length > 0) {
      res.json({
        success: false,
        message: "Përdoruesi me email të njëjtë ekziston."
      })
    } else {
      userModel.save()
        .then((savedUser) => {
          res.json({ success: true, data: savedUser })
        })
        .catch(e => {
          const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
          next(err);
        });
    }
  })

}

function getOne(req, res, next) {
  const JWT_SECRET = 'lidhjepalidhje123';
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      User.findOne({ _id: req.params.userId })
        .select('_id email name city profile_picture description number type').lean().exec().then((data) => {
          if (data) res.json({ success: true, data });
          else res.json({ success: false, data: "Nuk keni te drejte te shikoni kete profil" });
        }).catch(e => {
          const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
          next(err);
        })
    });
  } else {
    return res.json({ success: false, message: 'Your request is unauthorizied' })
  }
}

function update(req, res, next) {
  const JWT_SECRET = 'lidhjepalidhje123';
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      User.findOne({ _id: req.params.userId }).exec().then((data) => {
        data.name = req.body.name
        data.city = req.body.city
        data.description = req.body.description
        data.number = req.body.number
        data.type = req.body.type
        data.save().then(savedUser => {
          res.json({ success: true, data: savedUser })
        }).catch(e => {
          res.json({ success: false, message: "Unable to update the department data." })
        })
      }).catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
      })
    });
  } else {
    return res.json({ success: false, message: 'Your request is unauthorizied' })
  }
}

function deleteOne(req, res, next) {
  User.findOneAndRemove({ _id: req.params.userId }).then((data) => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  }).catch(e => {
    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
    next(err);
  })
}

function uploadProfilePicture(req, res, next) {
  User.findOne({ _id: req.params.userId }).then(async (data) => {
    if (!data) return res.json({ success: false, message: "User record not found" });
    const files = req.files;
    const file = files['file'];

    const filename = `${req.params.userId}${file.name}`
    fs.writeFile(`${config.basePath}/public/profile/${filename}`, file.data, function (err) {
      if (err) return res.json({ success: false, message: "Failed to write the picture." });

      var photo = `${config.domain}/public/profile/${filename}`
      User.findOneAndUpdate({ _id: req.params.userId }, { $set: { profile_picture: photo } }, { new: true }).select("_id profile_picture").then(savedUser => {
        res.json({ success: true, data: savedUser })
      }).catch(e => {
        console.log("err", e)
        res.json({ success: false, message: "Failed to update the record." })
      })
    });
  }).catch(e => {
    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
    next(err);
  })
}


module.exports = { create, getOne, update, deleteOne, uploadProfilePicture }