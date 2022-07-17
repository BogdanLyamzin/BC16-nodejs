const jwt = require("jsonwebtoken");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const payload = {
    id: "62ceee821044ee06de59f5c2"
};

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2VlZTgyMTA0NGVlMDZkZTU5ZjVjMiIsImlhdCI6MTY1Nzg5ODQyNywiZXhwIjoxNjU3OTAyMDI3fQ.zncMbA9oBRNcMQ6119ncflAVXlqgzhDXh0LxMSMOYS9", SECRET_KEY);
    console.log(id);
} catch (error) {
    console.log(error.message);
}