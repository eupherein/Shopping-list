var express = require('express');
var parser = require('body-parser');

var app = express();

var port = 3000;

//pase app/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false}))
app.use(parser.json()); 


//pull in handlebars to acess .handlebars files
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"shopping_list_db"
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });
  
  // Use Handlebars to render the main index.html page with the items in it.
  app.get("/", function(req, res) {
    connection.query("SELECT * FROM list;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { list: data });
    });
  });
  
  // Create a new todo
  app.post("/items", function(req, res) {
    connection.query("INSERT INTO list (gotItem) VALUES (?)", [req.body.gotItem], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
  
      // Send back the ID of the new todo
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });
  
  // Retrieve all items
  app.get("/items", function(req, res) {
    connection.query("SELECT * FROM list;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.json(data);
    });
  });
  
  // Update an item
  app.put("/items/:id", function(req, res) {
    connection.query("UPDATE list SET gotItem = ? WHERE id = ?", [req.body.gotItem, req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server faliure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });
  
  // Delete an item
  app.delete("/items/:id", function(req, res) {
    connection.query("DELETE FROM list WHERE id = ?", [req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server faliure
        return res.status(500).end();
      }
      else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });
  
  app.listen(port, function() {
    console.log("listening on port", port);
  });
  