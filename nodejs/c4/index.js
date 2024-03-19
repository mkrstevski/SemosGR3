const fs = require("fs");


const read = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile("data.json", "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                data = JSON.parse(data);
                return resolve(data);
            }

        });
    });

}
const write = async (data) => {
    return new Promise((resolve, reject) => {
        data = JSON.stringify(data);
        fs.writeFile("data.json", data, (err) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });

    });
}



const getAllMovies = async () => {
    return await read();
}
const getOneMovie = async (id) => {
    let movies = await read();
    return movies.find((movie) => movie.id === id);

}
const deleteMovie = async (id) => {
    let movies = await read();
    movies = movies.filter((movie) => movie.id !== id);
    await write(movies);
}

const addNewMovie = async (data) => {
    let movies = await read();
    movies.push(data);
    await write(movies);
}
const editMovie = async (id, data) => {
    let movies = await read();
    movies = movies.map(movie => {
        if (movie.id === id) {
            return {
                ...movie,
                ...data
            };
        }
        return movie;
    });
    await write(movies);
}



(async () => {
    try {
        await addNewMovie({ name: "Pulp Fiction", year: 1994, rating: 8.8, id: 8 });
        await addNewMovie({ name: "The Dark Knight", year: 2008, rating: 9.2, id: 9 });
        let movies = await getAllMovies();
        console.log(movies);
        const movie = await getOneMovie(3);
        console.log(movie);
        await deleteMovie(1);
        movies = await getAllMovies();
        console.log(movies);
        await editMovie(2, { name: "Shutter Island", year: 2010 });
        movies = await getAllMovies();
        console.log(movies);
    }
    catch (err) {

        console.log("GRESKA:", err);
    }
    finally {

        console.log("Uspesno!");
    }


})();