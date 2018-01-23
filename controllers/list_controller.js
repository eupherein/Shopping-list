const express = require("express");

const router = express.Router();

//import list.js model to use its db functions
const list = require("../models/list.js");

//create all routes and setup logic where required
router.get('/', function(req, res) {
    cat.all(function(data) {
        var hbsObject = {
            list: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/list", function (req, res) {
    list.create([
        "item", "got-item"
    ], [
        req.body.name, req.body.sleepy
    ], function(result) {

        //send back id of new quote
        res.json({ id: result.insertId });
    });
});

router.put("")