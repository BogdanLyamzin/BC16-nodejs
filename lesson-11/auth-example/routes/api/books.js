const express = require("express");
const Joi = require("joi");

const Book = require("../../models/book");

const { createError } = require("../../helpers");

const {authorize} = require("../../middlewares");

const router = express.Router();

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().required(),
})

const bookFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

router.get("/", authorize, async (req, res, next) => {
    try {
        const {_id: owner} = req.user;
        const result = await Book.find({owner}, "-createdAt -updatedAt")
            .populate("owner", "name email");
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.get("/:id", authorize, async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Book.findById(id);
        if (!result) {
            throw createError(404, "Not found")
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.post("/", authorize, async (req, res, next) => {
    try {
        const {_id: owner} = req.user;
        const { error } = bookSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message);
        }
        const result = await Book.create({...req.body, owner});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const { error } = bookSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message);
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if (!result) {
            throw createError(404, "Not found")
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.patch("/:id/favorite", async(req, res, next) => {
    try {
        const { error } = bookFavoriteSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message);
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if (!result) {
            throw createError(404, "Not found")
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndRemove(id);
        if(!result){
            throw createError(404, "Not found")
        }
        res.json({
            message: "Book deleted"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;