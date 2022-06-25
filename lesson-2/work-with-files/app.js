const fs = require("fs/promises");
// const fs = require("fs").promises;

const fileOperation = async(filePath, action, data)=> {
    switch(action){
        case "read":
            const text = await fs.readFile(filePath, "utf-8");
            console.log(text);
            // const file = await fs.readFile(filePath);
            // const text = file.toString();
            // console.log(text);
            break;
        case "add":
            await fs.appendFile(filePath, data);
            break;
        case "replace":
            await fs.writeFile(filePath, data);
            break;
        default:
            console.log("Unknown action");
    }
};

// fileOperation("./files/file.txt", "read");
// fileOperation("./files/file.txt", "add", "\nИдешь к женщине - возьми с собой плеть");
fileOperation("./files/file.txt", "replace", "Винни-Пух и Пятак");