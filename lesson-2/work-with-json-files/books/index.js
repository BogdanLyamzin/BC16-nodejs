const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const booksPath = path.join(__dirname, "books.json");

const updateBooks = async (books) => {
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
}

const getAll = async ()=> {
    const result = await fs.readFile(booksPath);
    return JSON.parse(result);
}

const getById = async(id)=> {
    const books = await getAll();
    const result = await books.find(item => item.id === id);
    if(!result){
        return null;
    }
    return result;
}

const add = async(title, author)=> {
    const books = await getAll();
    const newBook = {
        title,
        author,
        id: ObjectID()
    };
    books.push(newBook);
    await updateBooks(books);
    return newBook;
}

const removeById = async(id)=> {
    const books = await getAll();
    const idx = books.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const [result] = books.splice(idx, 1);
    await updateBooks(books);
    return result;
}

module.exports = {
    getAll,
    getById,
    add,
    removeById,
}