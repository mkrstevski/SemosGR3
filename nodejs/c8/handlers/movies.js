const movie = require("../pkg/movies");

const {
    MoviePOST,
    MoviePUT,
    validate
} = require("../pkg/movies/validate");

const getAll = async(req, res) => {
    try{
        const data = await movie.getAll(req.auth.id);
        return res.status(200).send(data);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const getOne = async(req, res) => {
    try{
        const data = await movie.getOne(req.auth.id, req.params.id);
        if(!data){
            return res.status(404).send("Movie not found");
        }
        return res.status(200).send(data);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const create = async(req, res) => {
    try{
        await validate(req.body, MoviePOST);
        if(!req.auth.id){
            return res.status(400).send("Unathorized action!");
        }
        const data = {
            ...req.body,
            account_id: req.auth.id
        };
        const newMovie = await movie.create(data);
        return res.status(200).send(newMovie);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const update = async(req, res) => {
    try{
        await validate(req.body, MoviePUT);
        if(!req.auth.id){
            return res.status(400).send("Unathorized action!");
        }
        const data = {
            ...req.body,
            account_id: req.auth.id
        };
        //localhost:10000/api/v1/blog/:{blodId}
        await movie.update(req.params.id, data);
        return res.status(200).send("Update succesfull!");
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const remove = async(req, res) => {
    try{
        await movie.remove(req.params.id);
        return res.status(200).send("Delete Succesfull!");
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}