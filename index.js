var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var json_data = require("./data.json");




json_data = json_data.carshop;

// Summation of total_sales
var total_sales = JSON.parse(JSON.stringify(json_data.employees)); // avoid pointing to the same object
json_data.sales.forEach(function(e1) {
  json_data.carmodels.forEach(function(e2) {
    if (e2.id == e1.carmodel_id) {
      if (total_sales[e1.employee_id-1].sales == undefined) {
        total_sales[e1.employee_id-1].sales = e2.price;
      } else {
      total_sales[e1.employee_id-1].sales += e2.price;
    }}
  })
})

app.listen(3000, function(req, res){
  console.log("App is now running at port 3000.");
})

app.get('/employees', function(req, res){
  res.send(json_data.employees);
})

app.get('/carmodels', function(req, res){
  res.send(json_data.carmodels);
})

app.post('/carmodels', function(req, res) {
    //var id = req.query.id; // if id should be selected
    var cm = json_data.carmodels;
    var id = cm.length + 1;
    var brand = req.body.brand;
    var model = req.body.model;
    var price = req.body.price;

    cm[cm.length] = {"id":id, "brand":brand, "model":model, "price":price};
    console.log('New carmodel added:\n' + JSON.stringify(cm[cm.length-1]));

    res.send(cm[cm.length-1]);
})

app.get('/total_sales', function(req, res) {
  res.send(total_sales);
})
