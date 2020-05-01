const Post = require('./posts.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const fs = require('fs');
const config = require('../../config/config');

function createOne(req, res, next) {
    const postModel = new Post({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        colors: req.body.colors,
        size: req.body.size,
        rating: req.body.rating,
        reviews: req.body.reviews,
        category: req.body.category,
        created_by: req.body.created_by
    })

    Post.find().lean().exec().then((name) => {
        postModel.save()
            .then((savedPost) => {
                res.json({ success: true, data: savedPost })
            })
            .catch(e => {
                const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                next(err);
            });
    })
}

function updateOne(req, res, next) {
    Post.findOne({ _id: req.params.postId }).exec().then((data) => {
        data.title = req.body.title
        data.description = req.body.description
        data.price = req.body.price
        data.colors = req.body.colors
        data.rating = req.body.rating
        data.reviews = req.body.reviews
        data.category = req.body.category
        data.save()
            .then((savedPost) => {
                res.json({ success: true, data: savedPost })
            })
            .catch(e => {
                res.json({ success: false, message: "Unable to update the Category." })
            })
    })
}

function deleteOne(req, res, next) {
    Post.findOneAndRemove({ _id: req.params.postId }).then(data => {
        if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
        else res.json({ success: false, message: "Rekordi nuk ekzistion." });
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function getAll(req, res, next) {
    Post.find().select('_id title description price colors rating reviews category created_by').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function getOne(req, res, next) {
    Post.findOne({ _id: req.params.postId }).select('_id title description price colors rating reviews category created_by').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function uploadProfilePicture(req, res, next) {
    // console.log('===============files===========', req.files)
    var query = {}
    query._id = req.params.postId
    Post.findOne(query).then((data) => {
        if (!data) {
            return res.json({
                success: false,
                message: "Post record not found"
            })
        }
        const files = req.files;
        const file = files['file']
        // const file = req.files
        const filename = `${data._id}.jpg`
        fs.writeFile(`${config.basePath}/public/profile/${filename}`, file.data, function (err) {
            if (err) {
                console.log("==================================error==========", err)
                return res.json({
                    success: false,
                    message: "Failed to write the picture."
                })
            }

            var photo = `${config.domain}/public/profile/${filename}`
            Post.findOneAndUpdate({ _id: data._id }, { $set: { images: photo } }, { new: true }).select("_id images title").then(savedPost => {
                res.json({
                    success: true,
                    data: savedPost
                })
            }).catch(e => {
                console.log("err", e)
                res.json({
                    success: false,
                    message: "Failed to update the record."
                })
            })
        });
    }).catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne, uploadProfilePicture };