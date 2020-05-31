const Joi = require('joi');

module.exports = {
  //Auth
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  //Favourite
  createFavourite: {
    body: {
      user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      post_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },
  getAllFavourites: {
    params: {
      limit: Joi.number().min(1).required(),
      page: Joi.number().min(1).required(),
    }
  },
  getOneFavourite: {
    params: {
      favouriteId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  },
  deleteFavourite: {
    params: {
      favouriteId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  },
  // Posts
  createPost: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().optional(),
      colors: Joi.array().items(Joi.string()).required(),
      size: Joi.array().optional(),
      rating: Joi.number().optional(),
      reviews: Joi.array().items(Joi.allow("")).optional(),
      category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      images: Joi.array().items(Joi.string()).optional(),
      phone_number: Joi.number().required(),
      type: Joi.number().min(1).max(1).required(),
    }
  },
  getAllPosts: {
    params: {
      limit: Joi.number().min(1).required(),
      page: Joi.number().min(1).required(),
    },
    body: {
      post_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    }
  },
  getOnePost: {
    params: {
      postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  },
  updateOnePost: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().optional(),
      colors: Joi.array().items(Joi.string()).required(),
      size: Joi.array().optional(),
      rating: Joi.number().optional(),
      reviews: Joi.array().items(Joi.allow("")).optional(),
      category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      images: Joi.array().items(Joi.string()).optional(),
      phone_number: Joi.number().required(),
      type: Joi.number().min(1).max(1).required(),
    }
  },
  deleteOnePost: {
    params: {
      postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  },
  // Reviews
  createOneReview: {
    body: {
      user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      post_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      comment: Joi.string().optional(),
      rating: Joi.optional(),
    }
  },
  getAllReviews: {
    body: {
      user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      post_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    }
  },
  getOneReview: {
    params: {
      reviewId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  },
  deleteOneReview: {
    params: {
      reviewId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  },
  //Users
  createOneUser: {
    body: {
      name: Joi.string.required(),
      city: Joi.string.required(),
      profile_picture: Joi.string(),
      description: Joi.string().optional(),
      number: Joi.number().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type: Joi.number().min(1).max(1).required(),
      store_address: Joi.string().optional()
    }
  },
  getOneUser: {
    params: {
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  },
  updateOneUser: {
    params: {
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    },
    body: {
      name: Joi.string.required(),
      city: Joi.string.required(),
      profile_picture: Joi.string(),
      description: Joi.string().optional(),
      number: Joi.number().required(),
      type: Joi.number().min(1).max(1).required(),
      store_address: Joi.string().optional()
    }
  },
  deleteOneUser: {
    params: {
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }
  }
};
