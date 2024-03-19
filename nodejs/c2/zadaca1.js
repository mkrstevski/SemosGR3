const fs = require("fs");

const fileName = 'task1.txt'
const text = 'Random Text'


fs.writeFile(fileName, text, (err) => {
    if (err) {
        console.log("Greska: ", err);
    }
    else {
        console.log("Uspesno!");
    }
})

