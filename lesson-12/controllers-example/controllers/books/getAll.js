const { Book } = require("../../models/book");

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Book.find({ owner }, "-createdAt -updatedAt")
        .populate("owner", "name email");
    res.json(result);
}

module.exports = getAll;