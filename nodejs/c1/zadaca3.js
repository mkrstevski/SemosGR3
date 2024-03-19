const studenti = require("./data.js")

const rezultat = studenti
.filter(student => student.ime.length === 5)
.sort((a,b) => b.prosek - a.prosek).slice(0,3)

console.log(rezultat)