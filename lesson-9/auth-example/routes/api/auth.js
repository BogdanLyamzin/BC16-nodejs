const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const User = require("../../models/user");

const { createError } = require("../../helpers");

const {authorize, upload} = require("../../middlewares");

const router = express.Router();

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const {SECRET_KEY} = process.env;

// signup
router.post("/register", async(req, res, next) => {
    try {
        const {error} = userRegisterSchema.validate(req.body);
        if(error) {
            throw createError(400);
        }
        const {email, password, name} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw createError(409, "Email already exist");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const result = await User.create({email, password: hashPassword, name, avatarURL});
        res.status(201).json({
            name: result.name,
            email: result.email,
        })
    } catch (error) {
        next(error);
    }
})

// signin
router.post("/login", async(req, res, next) => {
    try {
        const {error} = userLoginSchema.validate(req.body);
        if(error) {
            throw createError(400);
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw createError(401, "Email wrong");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            throw createError(401, "Password wrong");
        }
        // const passwordCompare = await bcrypt.compare(password, user.password);
        // if(!user || !passwordCompare){
        //     throw createError(401, "Email o password wrong");
        // }
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})
        await User.findByIdAndUpdate(user._id, {token});
        res.json({
            token
        })
    } catch (error) {
        next(error);
    }
})

router.get("/logout", authorize, async(req, res, next) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {token: ""});
        res.json({
            message: "Logout success"
        })
    } catch (error) {
        next(error)
    }
})

router.get("/current", authorize, async (req, res) => {
    const {name, email} = req.user;
    res.json({
        name,
        email,
    })
})

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch("/avatars", authorize, upload.single("avatar"), async(req, res) => {
    try {
        const {_id} = req.user;
        const {path: tempDir, originalname} = req.file;
        const [extention] = originalname.split(".").reverse();
        const newAvatar = `${_id}.${extention}`;
        const uploadDir = path.join(avatarsDir, newAvatar);
        await fs.rename(tempDir, uploadDir);
        const avatarURL = path.join("avatars", newAvatar);
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(req.file.path);
        next(error);
    }
})

module.exports = router;