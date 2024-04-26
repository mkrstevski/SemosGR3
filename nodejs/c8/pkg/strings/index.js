// user_(myidinMongo1234)/66662222.jpg

//makeId(10)

// 3.6 => Math.floor => 3
// 3.6 => Math.ceil => 4

const makeId = (length) => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";//52 karakteri
    let charLenght = characters.length;

    for(let i = 0; i <length; i++){
        result += characters.charAt(Math.floor(Math.random() * charLenght));
    }

    return result;

}

module.exports = makeId;