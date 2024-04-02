const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((request, response) => {
    const url = request.url; // req["url"] go zema url-to
    const method = request.method; // ja zema metodata od requestot;

    console.log("url", url);
    console.log("method", method);

    if(url === "/"){ //HOME
        response.write("<html>");
        response.write("<head><title>Enter text </title></head>");
        response.write(`<body> <form action="/message" method="POST">
        <input type="text" name="message"> </input> 
        <button type="submit">Submit</button>
        </form>
        </body>`)
        response.write("</html");
    } 

    if(url === "/students"){
        response.write("Kako vi se cini dosega studenti ?");
    }

    if(url === "/test" &&  method === "GET"){
        console.log("test");
        response.write("<html>");
        response.write("<head><title>TEST</title></head>");
        response.write("<body>I OVA E TEST</body>");
        response.write("</html");
    }

    if (url === "/message" && method === "GET"){
        response.write("Dali e jasno ?");
    }

    if (url === "/message" && method === "POST"){
        
        const body = [];
        //gi preveduvame podatocite od masinski zapis vo za nas razbirliv zapis
        request.on("data", (chunk) => {
            body.push(chunk);
            console.log(body);
        });

        request.on("end", () => {

            const parsedBody = Buffer.concat(body).toString(); //ja koristime ovaa Buffer.concat(body).toString() za da go prevedeme od bytes vo string
            const message = parsedBody.split("=")[1];

            fs.writeFileSync("data2.txt", message);

            console.log(parsedBody);
        })
    }

    // response.statusCode = 302;
    // response.setHeader("Location", "/");

    return response.end();
});

// server.listen(8000);

//Task
// Create a server, on which:
// Write your name, surname and year of birth in the response,
// each of them should be on a different route.
// Display in the server
// Optional: set headers for each of them

//Calculator
// localhost:xxxx/sobiranje/2/2

const handlerCalculator = (req, res) => {
    const url = req.url;

    // if(url === "/"){
    //     res.write("test");
    // }
    // res.end("OK");

    const [_, operacija, num1, num2] = req.url.split("/");

    const stringNumber = "1";
    Number(stringNumber); // converts string to number

    const numberNumber = 1;
    numberNumber.toString(); //converts number to string

    let result;
//2 + 2 = ok
//"2" + "2" = not ok
    switch(operacija){
        case "sobiranje":
            result = Number(num1) + Number(num2);
            //res.write
            //res.end
            res.end(`${result}`);
            break;
        case "odzemanje":
            result = Number(num1) - Number(num2);
            res.end(`${result}`);
            break;
        case "mnozenje":
            result = Number(num1) * Number(num2);
            res.end(`${result}`);
            break;
        case "delenje":
            result = Number(num1) / Number(num2);
            res.end(`${result}`);
            break;
        default:
            res.end("Nepoznata operacija");
    }

}

const newServer = http.createServer(handlerCalculator);

newServer.listen(8080);

// Homework
// 1. kreirajte server
// 2. na ruta /home/imePrezimePol -> res.end(<imetoPrezimetoPolot>), first letter of each should be capital
// 3. na ruta /home/title -> dodadete title na rutata
// 4. na ruta /home/header -> dodadete header so vrednost "Ova e Header-ot!"
// Optional na handler funkcijata za kalkulator od ovoj cas dodadete modul(%), kvadrat(n^2) i kub (n^3)



//----------------------------------------------------------------------------------------------------------

// Middleware - set of functions or code snippets that are executed in a sequantial manner during the
// processing of an HTTP request or response

//Design patters - general repeatable solution to a commonly occurring problem in software design

// MVC is a commonly used design patter in software engineering

// MVC (Model View Controller) - it used to separate different functionalities and responsebilities
// within an aplication

// 1. Model -> the model represents the data (students, cars, movies, crypto currencies, etc...) and the
// bussiness logic of the application (in our case simple CRUD functionalities) 

// 2. Controller -> the controller acts as an intemediary(bridge) between the model and the view

// 3. View -> the view is responsible for presenting the data to the user (html)

// Express module -> wrapper around http core module (that means that express IS NOT a core module)
// npm install express

const express = require("express");

const app = express();
// Methods: GET, POST, PUT, PATCH, DELETE

//Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false})); //POST, PUT
// in the above example, express.urlencode({extended: false}) is added as a middleware app.use().
// The extended option determines whether to use the querying library (false) or use the qs library
// for parsing the URL-encoded data.
// Once this middleware is added, we can access the parsed form in the req.body object within your route
// handler (controller)
// The req.body object will contain key-value pairs corresponding to the form fields.

//THIS IS FOR EXPRESS VERSIONS THAT IS LOWER OR EQUAL TO 4.16!
// If your express version is higher than 4.16, instead of using express.urlencoded middleware,
// you can install and use the body-parser middleware to achieve the same functionality

app.get("/", (req, res) => {
    res.send("My first server with express");
});

app.get("/form", (req, res) =>{
    // Access the form data from req.body
    console.log(req.body);
    res.send("Form submitted succesfully");
});

//app.post("/form", (req, res))

app.listen(3000, (err) =>{
    if(err) console.log("Greska", err);
    console.log("Server listening on port 3000!");
});


