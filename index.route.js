const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const categoryRoutes = require('./server/categories/categories.route');
const postRoutes = require('./server/posts/posts.router');
const bagRoutes = require('./server/bag/bag.router');

const router = express.Router();


router.get('/', (req, res) =>
  res.send('Connection test')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

//other Router
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/bags', bagRoutes)

module.exports = router;
