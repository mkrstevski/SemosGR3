const { Validator } = require("node-input-validator");

const MoviePOST = {
    title: "required|string",
    genre: "required|string",
    releaseYear: "required|string",
    director: "optional|string"
};

const MoviePUT = {
    title: "string",
    genre: "string",
    releaseYear: "string",
    director: "string"
};

const validate = async(data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if(!e){
        throw{
            code: 400,
            error: v.error,
        };
    }
};

module.exports ={
    MoviePOST,
    MoviePUT,
    validate
}