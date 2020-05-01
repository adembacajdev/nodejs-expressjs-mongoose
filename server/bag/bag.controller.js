const Bag = require('./bag.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
    const bagModel = new Bag({
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })

    Bag.find({ post_id: req.body.post_id }).lean().exec().then((post) => {
        if (post.length > 0) {
            res.json({ success: false, message: 'A Post with the same name already exists on your Bag.' })
        } else {
            bagModel.save()
                .then((savedBag) => {
                    res.json({ success: true, data: savedBag })
                })
                .catch(e => {
                    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                    next(err);
                });
        }
    })
}

function deleteOne(req, res, next) {
    Bag.findOneAndRemove({ _id: req.params.bagId }).then(data => {
        if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
        else res.json({ success: false, message: "Rekordi nuk ekzistion." });
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function getAll(req, res, next) {
    Bag.find().select('_id post_id user_id').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function getOne(req, res, next) {
    Bag.findOne({ _id: req.params.bagId }).select('_id post_id user_id').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

module.exports = { createOne, deleteOne, getAll, getOne };