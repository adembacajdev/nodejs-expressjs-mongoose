const Store = require('./stores.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const sha256 = require('crypto-js/sha256');
const fs = require('fs');
const config = require('../../config/config');



function create(req, res, next) {
    const PASSWORD_SALT = 'palidhje123';

    const storeModel = new Store({
        storeName: req.body.storeName.toLowerCase(),
        password: sha256(PASSWORD_SALT + req.body.password),
        storeCity: req.body.storeCity,
        storePicture: req.body.storePicture,
        storeDescription: req.body.storeDescription
    });

    Store.find({
        $or: [{ storeName: req.body.storeName }, { storeName: { "$ne": req.body.storeName } }]
    }).lean().exec().then((store) => {
        if (store.length > 0) {
            res.json({ success: false, message: "Dyqani me emer të njëjtë ekziston." })
        } else {
            storeModel.save()
                .then((savedStore) => { res.json({ success: true, data: savedStore }) })
                .catch(e => {
                    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                    next(err);
                });
        }
    })
}

function getOne(req, res, next) {
    Store.findOne({ _id: req.params.storeId })
        .select('_id storeName storeCity storePicture storeDescription').lean().exec().then((data) => {
            if (data) res.json({ success: true, data });
            else res.json({ success: false, data: "Nuk keni te drejte te shikoni kete profil" });
        }).catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function update(req, res, next) {
    Store.findOne({ _id: req.params.storeId }).exec().then((data) => {
        data.storeName = req.body.storeName
        data.storeCity = req.body.storeCity
        data.storeDescription = req.body.storeDescription
        data.storePicture = req.body.storePicture

        data.save().then(savedStore => {
            res.json({ success: true, data: savedStore })
        }).catch(e => {
            res.json({ success: false, message: "Unable to update the store data." })
        })
    }).catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
    })
}

function deleteOne(req, res, next) {
    Store.findOneAndRemove({ _id: req.params.storeId }).then((data) => {
        if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
        else res.json({ success: false, message: "Rekordi nuk ekzistion." });
    }).catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
    })
}

function uploadStorePicture(req, res, next) {
    Store.findOne({ _id: req.params.storeId }).then(async (data) => {
        if (!data) return res.json({ success: false, message: "User record not found" });
        const files = req.files;
        const file = files['file'];

        const filename = `${req.params.storeId}${file.name}`;
        fs.writeFile(`${config.basePath}/public/profile/${filename}`, file.data, function (err) {
            if (err) return res.json({ success: false, message: "Failed to write the picture." });

            var photo = `${config.domain}/public/profile/${filename}`
            Store.findOneAndUpdate({ _id: req.params.storeId }, { $set: { storePicture: photo } }, { new: true }).select("_id storePicture").then(savedStore => {
                res.json({ success: true, data: savedStore })
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

module.exports = { create, getOne, update, deleteOne, uploadStorePicture };