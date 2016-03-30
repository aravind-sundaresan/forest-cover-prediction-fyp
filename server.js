var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));

app.get('/compute', function(request,response){

	//console.log(request);
	var args = [];
	args[0] = request.query["elevation"];
	args[1] = request.query["aspect"];
	args[2] = request.query["slope"];
	args[3] = request.query["hor_water"];
	args[4] = request.query["ver_water"];
	args[5] = request.query["hor_road"];
	args[6] = request.query["hill_9"];
	args[7] = request.query["hill_12"];
	args[8] = request.query["hill_3"];
	args[9] = request.query["hor_fire"];

	var options = {
		args: args
	}
	//console.log(options);

	console.log(request.query);
	PythonShell.run('./random_forest.py', options, function (err,results) {
	  if (err) throw err;
	  console.log(results);
	  response.send(results);
	});
})


var port = 1337;

app.listen(port,function(){
	console.log("Server running on port " + port);
})