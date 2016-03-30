var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));

app.post('/compute', function(request,response){

	//console.log(request.body);
	var args = [];
	args[0] = request.body.elevation;
	args[1] = request.body.aspect;
	args[2] = request.body.slope;
	args[3] = request.body.hor_hydro;
	args[4] = request.body.ver_hydro;
	args[5] = request.body.hor_road;
	args[6] = request.body.hill9;
	args[7] = request.body.hill12;
	args[8] = request.body.hill3;
	args[9] = request.body.hor_fire;

	var options = {
		args: args
	}
	//console.log(options);

	//console.log(request.query);
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