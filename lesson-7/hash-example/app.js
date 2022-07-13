const bcrypt = require("bcryptjs");

const createHashPassword = async (password) => {
    // const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    const compareResult = await bcrypt.compare(password, hashPassword);
    console.log(compareResult);
    const compareResult2 = await bcrypt.compare("123457", hashPassword);
    console.log(compareResult2);
}


createHashPassword("123456")