const express = require("express");

const router = express.Router();

//import list.js model to use its db functions
const list = require("../models/list.js");

//create all routes and setup logic where required
router.get('/', function (req, res) {
    list.all(function (data) {
        var hbsObject = {
            list: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/list", function (req, res) {
    console.log("creating item");
    list.create(["item"], [req.body.item], function (result) {
        console.log("sending json for create item");
        //send back id of new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/list/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    list.update({
        gotItem: req.body.sleepy
    }, condition, function (result) {
        if (result.changedRows == 0) {
            //if no changes to rows are found, ID does not exist; throw 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/list/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    list.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            //if no changes to rows are found, ID does not exist; throw 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//export routes to use in server.js
module.exports = router;