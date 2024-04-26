const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
    //_id vi e auto generirano pri kreiranje nov zapis
    title: String,
    genre: String,
    releaseYear: String,
    director: String,
    account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "accounts"
    },
})

const Movie = mongoose.model("movies", moviesSchema, "MOVIES");

//Task:
// Make the 5 crud functions for this model

const getAll = async(account_id) => {
    return await Movie.find({ account_id });
};

const getOne = async(account_id, id) => {
    return await Movie.findOne( { account_id: account_id, _id: id});
};

const create = async(data) => {
    const movie = new Movie(data);
    return await movie.save();
};

const update = async(id, data) => {
    return await Movie.updateOne( {_id: id}, data );
};

const remove = async(id) => {
    return await Movie.deleteOne({ _id: id });
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}