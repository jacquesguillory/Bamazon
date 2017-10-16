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
    // query the database for all items
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

       
       //for testing purposes
        // var itemArray = [];
        // for (var i = 0; i < results.length; i++) {
        //     itemArray.push(results[i].product_name);
        //   }
        // console.log(itemArray);

        inquirer.prompt([
            {
                name: "item",
                type: "list",
                choices: function() {

                  var choiceArray = [];
                  for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);

                  }
                  return choiceArray;

                },
                message: "Which item would you like to purchase?"
            }
        ])
        .then(function(answer) {
            // putting chosen item info into a new object
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (answer.item === results[i].product_name) {
                    chosenItem = results[i];
                }
              }
            
            console.log("=====================================================");  
            console.log("Getting more information on the selected item...");
            console.log("=====================================================");  
            console.log("Product Name: " + chosenItem.product_name);
            console.log("Department: " + chosenItem.department_name);
            console.log("Price: $" + chosenItem.price); 
            console.log("Items in Stock: " + chosenItem.stock_quantity);
            console.log("=====================================================");


            inquirer.prompt([
                {
                    name: "quantity",
                    type: "input",
                    message: "Please enter the number of " + chosenItem.product_name + "s that you wish to buy:"
                }
            ])
            .then(function(answer) {

            // Checking if I have enough in stock
                if (parseInt(answer.quantity) < parseInt(chosenItem.stock_quantity)) {

                    var newStock = chosenItem.stock_quantity - answer.quantity;

                    // updating bamazon_DB
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log("=====================================================");  
                            console.log("=====================================================");  
                            console.log("Product successfully purchased!")
                            console.log("Enjoy your new " + chosenItem.product_name + "!");
                            console.log("=====================================================");  
                            console.log("=====================================================");
                            console.log("Sending you back to our products page");  
                            console.log("=====================================================");
                            customer();
                        }
                    );

                    
                }
                else{
                    console.log("Sorry. We do not have enough of that item in our stock to fill your order.");
                    console.log("Sending you back to our products page");
                    console.log("=====================================================");
                    customer();
                }
            });   
        });
    });
}   

