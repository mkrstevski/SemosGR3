const studenti = require("./data.js")

const gradovi = {}

studenti.forEach(student => {
    if (!gradovi[student.grad]) {
        gradovi[student.grad] = []
    }
    gradovi[student.grad].push(student)
})

const rezultat = []

for (grad in gradovi) {
    let suma = 0
    gradovi[grad].forEach(student => {
        suma += student.prosek
    })
    const prosek = suma / gradovi[grad].length

    rezultat.push({ grad, prosek })
}
console.log(rezultat.sort((a, b) => b.prosek - a.prosek))
