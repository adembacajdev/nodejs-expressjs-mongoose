const Favourite = require('./favourite.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const jwt = require('jsonwebtoken');

function createOne(req, res, next) {
    const JWT_SECRET = 'lidhjepalidhje123';
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            const favouriteModel = new Favourite({
                post_id: req.body.post_id,
                user_id: req.body.user_id
            })

            Favourite.find({ post_id: req.body.post_id }).lean().exec().then((post) => {
                if (post.length > 0) {
                    res.json({ success: false, message: 'A Post with the same name already exists on your Favourites.' })
                } else {
                    favouriteModel.save()
                        .then((savedFavourite) => {
                            res.json({ success: true, data: savedFavourite })
                        })
                        .catch(e => {
                            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                            next(err);
                        });
                }
            })
        });
    } else {
        return res.json({ success: false, message: 'Your request is unauthorizied' })
    }
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
            Favourite.findOneAndRemove({ _id: req.params.favouriteId }).then(data => {
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
    const JWT_SECRET = 'lidhjepalidhje123';
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            var query = {}
            if (req.body.user_id) query.user_id = req.body.user_id;

            const options = {
                page: req.params.page,
                limit: req.params.limit,
                collation: {
                    locale: 'en'
                },
                select: "_id post_id user_id",
                sort: { _id: -1 }
            };
            Favourite.paginate(query, options).then((data) => {
                res.json({ success: true, data: data })
            }).catch(e => {
                const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
                next(err);
            });
        });
    } else {
        return res.json({ success: false, message: 'Your request is unauthorizied' })
    }
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
            Favourite.findOne({ _id: req.params.favouriteId }).select('_id post_id user_id').lean().exec().then((data) => {
                res.json({ success: true, data })
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

module.exports = { createOne, deleteOne, getAll, getOne };