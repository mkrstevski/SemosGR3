const moment = require("moment");
const { list, add, remove, getOne, update } = require("../models/product");

const getForm = (req, res) => {
    res.render("formular");
}

const postForm = async (req, res) => {
    let productData = {
        Name: req.body.Name,
        Manufacturer: req.body.Manufacturer,
        Quantity: req.body.Quantity,
        DaysLeftToUse: req.body.DaysLeftToUse,
        PlaceWhereAvalible: req.body.PlaceWhereAvalible
    };
    await add(productData);
    res.redirect("/");
}

const getProducts = async (req, res) => {
    let data = await list();
    res.render("products", { data });
};

const getDelete = async (req, res) => {
    console.log("req query", req.query);
    await remove(req.query.productIndex);
    res.redirect("/");
}

const getEdit = async (req, res) => {
    console.log("req query", req.query);
    let data = await getOne(req.query.productIndex);
    res.render("formular-edit", { data });
}

const putForm = async (req, res) => {
    
    let productData = {
        Name: req.body.Name,
        Manufacturer: req.body.Manufacturer,
        Quantity: req.body.Quantity,
        DaysLeftToUse: req.body.DaysLeftToUse,
        PlaceWhereAvalible: req.body.PlaceWhereAvalible
    };
    await update(req.query.productIndex, productData);
    res.redirect("/");
}

module.exports = {
    getForm,
    postForm,
    getProducts,
    getDelete,
    getEdit,
    putForm,
}