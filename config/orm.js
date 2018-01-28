//Import mysql connection
const connection = require("../config/connection.js")

//function for sql syntax
function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    //push stuff to the string
    return arr.toString();
}

//function to convert object key/value to sql syntax
function objToSql(obj) {
    let arr = [];

    //loop through keys and push the value as a string intiger array
    for (let key in obj) {
        arr.push(key + "=" + obj[key]);
    }

    //translate array of strings to a single string separated with commas
    return arr.toString();
}

//object for all sql statement functions
let orm = {
    all: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";"
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    //objColVals {item Bar Soap, gotItem: true}
    update: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    //delete item from list 
    delete: function (table, condition, cb) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};


//export orm object for model (list.js)
module.exports = orm;