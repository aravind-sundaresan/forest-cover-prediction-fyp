var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));

app.post('/compute', function(request,response){

	console.log("Request recieved: ");
	console.log(request.body);
	var normalized_data = normalize(request.body);
	var args = [];
	args[0] = normalized_data.elevation;
	args[1] = normalized_data.aspect;
	args[2] = normalized_data.slope;
	args[3] = normalized_data.hor_hydro;
	args[4] = normalized_data.ver_hydro;
	args[5] = normalized_data.hor_road;
	args[6] = normalized_data.hill9;
	args[7] = normalized_data.hill12;
	args[8] = normalized_data.hill3;
	args[9] = normalized_data.hor_fire;

	//console.log(args);
	var options = {
		args: args
	}
	//console.log(options);
	console.log("\nRunning python script: ");
	console.log("\nFile Name: random_forest.py");
	console.log("\nArguments: \n");
	console.log(args);
	console.log("\n");
	//console.log(request.query);
	PythonShell.run('./random_forest.py', options, function (err,results) {
	  if (err) throw err;
	  console.log("Result: " + results);
	  response.send(results);
	});
})


var port = 1337;

app.listen(port,function(){
	console.log("Server running on port " + port);
})

	
var normalize = function(data){
	return_data = {};
	return_data.elevation = norm(data.elevation,3849,1863);
	return_data.aspect = norm(data.aspect,360,0);
	return_data.slope = norm(data.slope,52,0);
	return_data.hor_hydro = norm(data.hor_hydro,1343,0);
	return_data.ver_hydro = norm(data.ver_hydro,554,-146);
	return_data.hor_road = norm(data.hor_road,6890,0);
	return_data.hill9 = norm(data.hill9,254,0);
	return_data.hill12 = norm(data.hill12,254,99);
	return_data.hill3 = norm(data.hill3,248,0);
	return_data.hor_fire = norm(data.hor_fire,6993,0);

	return return_data;
}

var norm = function(data,max,min){

	if(data<min){
		return 0;
	}
	else if(data>max){
		return 1;
	}
	else{
		return ((data-min)/(max-min));
	}
}