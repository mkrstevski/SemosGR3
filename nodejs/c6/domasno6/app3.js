const express = require('express')
const axios = require('axios')

const app = express()


app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const users = response.data
        const userNames = users.map(user => user.name)
        res.json(userNames)
    } catch (error) {
        console.error('Error fetching data:', error)
        res.status(500).json({ error: 'Failed to fetch data' })
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css')
})



app.listen(8003, () => {
    console.log(`Server is running on port 8003`)
})