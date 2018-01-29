const orm = require("../config/orm.js");

var item = {
    all: function (cb) {
        orm.all("list", function (res) {

            cb(res);
        });
    },

    //the variables cols and vals are arrays 
    create: function (cols, vals, cb) {
        orm.create("list", cols, vals, function (res) {

            cb(res);
        });
    },
    update: function (id, cb) {
        var condition = "id=" + id;
        orm.update("list", {
            gotItem: true
        }, condition, cb);
    },
    delete: function (condition, cb) {
        orm.delete("list", condition, function (res) {

            cb(res);
        });
    }
};

//export the db functions for list_controller
module.exports = item;