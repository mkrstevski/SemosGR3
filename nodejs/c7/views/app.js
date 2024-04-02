const express = require("express")
const app = express()
const port = 8001
const handler = require("./controller/handler")




app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + "/public"))

app.get("/analiza", handler.getAnalysis)

app.post("/analiza", handler.postAnalysis)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})