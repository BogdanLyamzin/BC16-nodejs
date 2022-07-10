const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Bogdan:pBje6ZbFRATcsTq@cluster0.oqxqf.mongodb.net/books_reader?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
    .then(()=> console.log("Database connect"))
    .catch((error)=> console.log(error.message))