const studenti = require("./data.js")

const rezultat = studenti
.filter(student => student.grad === "Skopje" && student.ime.endsWith("a") && student.prosek > 7)
.sort((a, b) => a.ime.localeCompare(b.ime))

console.log(rezultat)