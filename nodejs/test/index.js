

const express = require("express");
const {
    getForm,
    postForm,
    putForm,
    getProducts,
    getDelete,
    getEdit,
} = require("./controllers/formular")

const app = express()

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/form", getForm);
app.post("/form", postForm);
app.post("/form-edit", putForm);
app.get("/", getProducts);
app.get("/delete", getDelete);
app.get("/edit", getEdit);


app.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("Server started at port: 8000");
})