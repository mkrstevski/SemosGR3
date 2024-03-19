const studenti = require("./data.js")

let suma = 0
let broj = 0
studenti.forEach(student => {
    if(student.ime.endsWith('a')){
        suma+=student.prosek
        broj++
    }
})

console.log("Prosek na studenti sto zavrsuvaat na a", suma/broj)


suma = 0
broj = 0
studenti.forEach(student => {
    if(!student.ime.endsWith('a')){
        suma+=student.prosek
        broj++
    }
})

console.log("Prosek na studenti sto ne zavrsuvaat na a", suma/broj)

