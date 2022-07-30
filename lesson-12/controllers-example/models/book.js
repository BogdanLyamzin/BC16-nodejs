const {Schema, model} = require("mongoose");
const Joi = require("joi");

const bookSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        enum: ["fantastic", "love"],
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey: false, timestamps: true})


const bookAddSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().required(),
})

const bookUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const schemas = {
    add: bookAddSchema,
    updateFavorite: bookUpdateFavoriteSchema,
}

const Book = model("book", bookSchema);
// categories => category
// mice => mouse

module.exports = {
    Book,
    schemas,
}