var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));

app.get('/compute', function(request,response){

	var options = {
	}
	
	PythonShell.run('./hello.py', function (err,results) {
	  if (err) throw err;
	  console.log(results);
	});
})


var port = 1337;

app.listen(port,function(){
	console.log("Server running on port " + port);
})