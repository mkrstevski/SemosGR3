const express = require("express")

const app = express()

const data = {
    cars: ['Alfa Romeo', 'Ferrari', 'Audi', 'VW', 'Toyota'],
    books: ['Harry Potter', 'Dune', 'Lord of the rings'],
    cities: ['New York', 'Sydney', 'Ohrid', 'Skopje', 'Paris']
}

app.get("/", (req, res) => {
    res.send(`
    <h1>Home</h1>
    <h2>Cars</h2>
    <u1>${data.cars.map(car => `<li>${car}</li>`).join('')}</u1>
    <h2>Books</h2>
    <u1>${data.books.map(book => `<li>${book}</li>`).join('')}</u1>
    <h2>Cities</h2>
    <u1>${data.cities.map(city => `<li>${city}</li>`).join('')}</u1>
`)
})

app.use((req, res) => {
    res.status(404).send('404 - Not Found')
})

app.listen(8001, () => {
    console.log(`Server is listening on port 8001`)
})