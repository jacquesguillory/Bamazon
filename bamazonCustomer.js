// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "new",
    database: "bamazon_DB"
  });
  
// connect to the mysql server and sql database
connection.connect(function(err) {
if (err) throw err;
// run the start function after the connection is made to prompt the user
console.log("SUCCESSFULLY CONNECTED");
customer();
});

function customer() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        var itemArray = [];
        for (var i = 0; i < results.length; i++) {
            itemArray.push(results[i].product_name);
          }

        inquirer.prompt([
            {
                name: "item",
                type: "list",
                choices: function() {

                  var choiceArray = [];
                  for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name + ": $" + results[i].price);
                    itemArray.push(results[i].product_name);

                  }
                  return choiceArray;

                },
                message: "Which item would you like to purchase?"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the number of items that you wish to buy:"
            }
        ])
        .then(function(answer) {
            console.log(answer.item);
            console.log(answer.quantity);
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (answer.item === results[i].product_name) {
                  chosenItem = results[i].product_name;
                }
              }
            console.log(chosenItem);
            if (parseInt(answer.quantity) < parseInt(results.stock_quantity)) {
                console.log("Enjoy your new " + answer.item);
            }
            else{
                console.log("Error");
            }
        });
    });
}   

