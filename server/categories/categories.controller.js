const Category = require('./categories.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
    const categoryModel = new Category({
        name: req.body.name
    })

    Category.find({ name: req.body.name }).lean().exec().then((name) => {
        if (name.length > 0) {
            res.json({ success: false, message: 'A Category with the same name already exists.' })
        } else {
            categoryModel.save()
                .then((savedCategory) => {
                    res.json({ success: true, data: savedCategory })
                })
                .catch(e => {
                    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                    next(err);
                });
        }
    })
}

function updateOne(req, res, next) {
    Category.findOne({ _id: req.params.categoryId }).exec().then((data) => {
        data.name = req.body.name
        data.save()
            .then((savedCategory) => {
                res.json({ success: true, data: savedCategory })
            })
            .catch(e => {
                res.json({ success: false, message: "Unable to update the Category." })
            })
    })
}

function deleteOne(req, res, next) {
    Category.findOneAndRemove({ _id: req.params.categoryId }).then(data => {
        if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
        else res.json({ success: false, message: "Rekordi nuk ekzistion." });
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function getAll(req, res, next) {
    Category.find().select('_id name').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function getOne(req, res, next) {
    Category.findOne({ _id: req.params.categoryId }).select('_id name').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
    .catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne };