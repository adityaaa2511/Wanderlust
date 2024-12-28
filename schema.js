const Joi=require("joi");

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.object({
            filename:Joi.string(),
            url:Joi.string()
        }).allow(null,""),
        price:Joi.number().required().min(0),
        location:Joi.string().required(),
        country:Joi.string().required()
    }).required()
})

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})

// module.exports.userSchema=Joi.object({
//     user:Joi.object({
//         username:Joi.string().required(),
//         email:Joi.string().required(),
//         password:Joi.string().required()
//     }).required()
// })