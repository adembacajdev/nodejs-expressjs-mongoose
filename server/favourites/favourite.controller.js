const Favourite = require('./favourite.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
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
}

function deleteOne(req, res, next) {
    Favourite.findOneAndRemove({ _id: req.params.favouriteId }).then(data => {
        if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
        else res.json({ success: false, message: "Rekordi nuk ekzistion." });
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

function getAll(req, res, next) {
    const options = {
        page: req.params.page,
        limit: req.params.limit,
        collation: {
            locale: 'en'
        },
        select: "_id post_id user_id",
        sort: { _id: -1 }
    };
    Favourite.paginate({}, options).then((data) => {
        res.json({ success: true, data: data })
    }).catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
    });
}

function getOne(req, res, next) {
    Favourite.findOne({ _id: req.params.favouriteId }).select('_id post_id user_id').lean().exec().then((data) => {
        res.json({ success: true, data })
    })
        .catch(e => {
            const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
            next(err);
        })
}

module.exports = { createOne, deleteOne, getAll, getOne };