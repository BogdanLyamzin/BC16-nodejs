const express = require("express");

const { authorize, validationBody, isValidId } = require("../../middlewares");

const ctrl = require("../../controllers/books");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/book");

const router = express.Router();

router.get("/", authorize, ctrlWrapper(ctrl.getAll));

router.get("/:id", authorize, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authorize, validationBody(schemas.add), ctrlWrapper(ctrl.add));

router.put("/:id", authorize, isValidId, validationBody(schemas.add), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", authorize, isValidId, validationBody(schemas.updateFavorite), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", authorize, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;