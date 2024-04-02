const express = require("express")
const app = express()

const data = {
    cars: ['Mercedes', 'Porshe', 'Audi', 'Toyota', 'BMW'],
    books: ['Money', 'Dune', 'Alchemist'],
    cities: ['NewYork', 'Sydney', 'Ohrid', 'Skopje', 'Paris']
}

app.get("/", (req, res) => {
    res.json(data)
})

app.get('/cars', (req, res) => {
    const { query } = req.query
    if (query) {
        const car = data.cars.find(item => item.toLowerCase() === query.toLowerCase())
        if (car) {
            res.json(`Car ${car}`)
        } else {
            res.status(404).send('Car not found')
        }
    } else {
        res.status(400).send('Query not found')
    }
})


app.get('/books', (req, res) => {
    const { query } = req.query
    if (query) {
        const book = data.books.find(item => item.toLowerCase() === query.toLowerCase())
        if (book) {
            res.json(`Book ${book}`)
        } else {
            res.status(404).send('Book not found')
        }
    } else {
        res.status(400).send('Query not found')
    }
})

app.get('/cities', (req, res) => {
    const { query } = req.query
    if (query) {
        const city = data.cities.find(item => item.toLowerCase() === query.toLowerCase())
        if (city) {
            res.json(`City ${city}`)
        } else {
            res.status(404).send('City not found')
        }
    } else {
        res.status(400).send('Query parameter "query" is required')
    }
})

app.use((req, res) => {
    res.status(404).send('404 - Not Found')
})

app.listen(8002, () => {
    console.log("Server is listening on port 8002")
})