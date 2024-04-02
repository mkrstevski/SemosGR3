const fs = require('fs');

const DATA_SOURCE = `${__dirname}/../products.json`;


const readFile = async() => {
    return new Promise((success, fail) => {
        fs.readFile(DATA_SOURCE, 'utf-8', (err, data) => {
            if(err){
                return fail(err);
            }else{
                return success(data);
            }
        })
    });
}

const writeFile = async (data) => {
    return new Promise((success, fail) => {
        fs.writeFile(DATA_SOURCE, data, (err) => {
            if(err){
                return fail(err);
            }else{
                return success();
            }
        });
    });
};



const list = async() => {
    let file = await readFile();
    let fileData = JSON.parse(file);
    return fileData;
};

const add = async (data) => {
    let file = await readFile();
    let fileData = JSON.parse(file); //JSON to string
    fileData.push(data);
    await writeFile(JSON.stringify(fileData)); //string to JSON
};

const remove = async(index) => {
    index = Number(index);
    let file = await readFile();
    let fileData = JSON.parse(file);
    let newFileData = fileData.filter((_, i) => index !==i);
    await writeFile(JSON.stringify(newFileData));
}

const getOne = async(index) => {
    index = Number(index);
    let file = await readFile();
    let fileData = JSON.parse(file);
    let item = fileData.find((_, i) => index ===i);
    return item
}

const update = async(index, newData) => {
    
    index = Number(index);
    let file = await readFile();
    let fileData = JSON.parse(file);
    fileData[index] = { ...fileData[index], ...newData };
    await writeFile(JSON.stringify(fileData));
}

module.exports = {
    list,
    add,
    remove,
    getOne,
    update,
}