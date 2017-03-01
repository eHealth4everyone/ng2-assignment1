/*
var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Hello World!");
  response.write("</body>");
  response.write("</html>");
  response.end();
});

server.listen(80);
console.log("Server is listening");


var sys = require("sys"),
my_http = require("http");
my_http.createServer(function(request,response){
  sys.puts("I got kicked");
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8080);
sys.puts("Server Running on 8080");

var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Hello World!");
  response.write("</body>");
  response.write("</html>");
  response.end();
});

server.listen(80);
console.log("Server is listening");

//Parse data from JSON POST and insert into MYSQL

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'angular'
  })

//Establish MySQL connection
connection.connect(function(err) {
   if (err) 
      throw err
   else {
       console.log('Connected to MySQL');
       // Start the app when connection is ready
      
 }
});

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+ '/myfile.html'));
});

app.post('/', function(req, res) {

    var jsondata = req.body;
    var values = [];

    for(var i=0; i< jsondata.length; i++)
        values.push([jsondata[i].name,jsondata[i].gender, jsondata[i].age, jsondata[i].state, jsondata[i].address]);
//Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
if(mysql_query("INSERT INTO fill(firstname, gender, age, state, address) VALUES('$firstname','$gender','$age','$state','$address')"))
  //  connection.query('INSERT INTO form (firstname, gender, age, state, address) VALUES ?', [name, gender, age, state, address], function(err,result) {
    if(err) {
        res.send('Error');
        console.log("error in db connection");
    }
    else {
        res.send('Success');
        console.log("db connection successful");
    }
    });
*/

var http = require('http');
var formidable = require("formidable");
var util = require('util');
var mysql = require('mysql');
var con = mysql.createConnection({
 host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'angular'
});
con.connect(function(err){
  if(err){
    console.log('could not connect to the Db');
    return;
  }
  console.log('Connection successful');
});

var server = http.createServer(function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, x-auth');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    
    if (req.method.toLowerCase() =='post') {
        processForm(req, res);
       
        return;
    } 

    res.end();

    });

function processForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields){
       
        res.writeHead(200, {
            'content-type': 'text/plain'
 
    });
    var data=JSON.stringify({
        fields: fields
    });
    res.end(data);
      var state = JSON.parse(data).fields.state;
var firstname = JSON.parse(data).fields.firstName;
var address = JSON.parse(data).fields.address;
var gender = JSON.parse(data).fields.gender;
var dob = JSON.parse(data).fields.dob;
var input =  {
            state    :    state,
            firstname    :    firstname,
            address        :    address,
            gender        :    gender,
            dob            :    dob
        };
        //con.query('INSERT INTO users(state,firstname,address,gender,dob) VALUES("'+state+'","'+firstname+'","'+adress+'","'+gender+'","'+dob+'",)');
        con.query('INSERT INTO fill SET ?',input,function(err,data){
           if(err)
                console.log(err);
            else
                console.log("Success");
        });
 

 
console.log('posted fields:\n');
console.log(data);


    });
}

var port = 3100;
server.listen(port);
console.log("server listening on port" + port);



