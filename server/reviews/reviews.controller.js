const Review = require('./reviews.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Post = require('../posts/posts.model');
const jwt = require('jsonwebtoken');

function createOne(req, res, next) {
    const reviewModel = new Review({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        comment: req.body.comment,
        rating: req.body.rating
    })

    Review.find({ post_id: req.body.post_id }).lean().exec().then((post) => {
        reviewModel.save()
            .then(async (savedReview) => {
                res.json({ success: true, data: savedReview });
            })
            .catch(e => {
                const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                next(err);
            });
    })
}

function deleteOne(req, res, next) {
    const JWT_SECRET = 'lidhjepalidhje123';
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // const user_id = user.user_id
            Review.findOneAndRemove({ _id: req.params.reviewId, user_id: user.user_id })
                .then(data => {
                    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
                    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
                })
                .catch(e => {
                    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                    next(err);
                })
        });
    } else {
        return res.json({ success: false, message: 'Your request is unauthorizied' })
    }
}

function getAll(req, res, next) {
    var query = {};
    if (req.body.user_id) query.user_id = req.body.user_id;
    if (req.body.post_id) query.post_id = req.body.post_id;
    const options = {
        page: req.params.page,
        limit: req.params.limit,
        collation: { locale: 'en' },
        select: "_id post_id user_id comment rating",
        sort: { _id: -1 }
    };
    Review.paginate(query, options).then((data) => {
        res.json({ success: true, data: data })
    }).catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
    });
}

function getOne(req, res, next) {
    Review.findOne({ _id: req.params.reviewId }).select('_id post_id user_id comment rating').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

module.exports = { createOne, deleteOne, getAll, getOne };