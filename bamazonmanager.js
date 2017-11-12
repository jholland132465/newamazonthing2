var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({

	host : "localhost",
	port : 3306,
	user : "root",
	password : "penguin1!",
	database : "bamazon"
})

var makeTable = function(){
	connection.query("SELECT * FROM products", function(err,res){
	if(err) throw err;
	console.log("ITEM_ID\tPRODUCT_NAME\tPRODUCT_DEPT\tPRICE\tSTOCK");
	console.log("-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-")
	for (var i=0;i<res.length;i++){
		console.log(res[i].itemid+"\t"+res[i].productname+"\t"+res[i].departmentname+"\t"+res[i].price+"\t"+res[i].stockquantity);
	}
	console.log("-----------------------------------------------------");
	promptManager(res);
	})
	

}

var promptManager = function(res) {
	inquirer.prompt([{
		type:"rawlist",
		name:"choice",
		message:"What would you like to do?",
		choices:["Add new Item","Add quantity to an existing item"]
	}]).then(function(val){
		if(val.choices=="Add new item"){
			addItem();
		}
		if(val.choices=="Add quantity to an existing item"){
			addQuanity(res);
		}
	})
}

makeTable();
