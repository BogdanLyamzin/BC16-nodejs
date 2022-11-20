const mongoose = require("mongoose");

mongoose.connect(DB_HOST)
    .then(()=> console.log("Database connect"))
    .catch((error)=> console.log(error.message))