const studenti = require("./data.js")

const rezultat = studenti
.filter(student => student.prosek > 9 && student.grad !== 'Skopje')
.sort((a,b) => b.prosek - a.prosek)

console.log(rezultat)