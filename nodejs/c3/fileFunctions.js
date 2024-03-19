const fs = require("fs").promises

const writeFile = async (filename, data) => {
    try{
        await fs.writeFile(filename, data)
        console.log("Succesfull created",filename) 
    }catch (err){
        console.log("An error occured", err)
    }
}

const appendFile = async (filename, newData) => {
    try {
        await fs.appendFile(filename, newData);
        console.log("Data appended to file successfully.")
    } catch (err) {
        console.error(err)
    }
}

const readFile = async (filename) => {
    try{
        const data = await fs.readFile(filename, "utf-8")
        console.log(data) 
    }catch (err){
        console.log(err)
    }
}

module.exports = {
    writeFile,
    appendFile,
    readFile,
}