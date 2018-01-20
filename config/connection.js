//mysql connection

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "shopping_list_db"
});


//mysql connection to db
connection.connect(function (err) {
    if (err) throw err;
});

modeule.exports = connection;