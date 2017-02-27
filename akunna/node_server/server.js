var http = require('http');
var formidable = require("formidable");
var util = require('util');
var mysql = require('mysql');

var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'dorcas'
    } ); 
    connection.connect(function(err){ 
   if (err){
       console.log("Could not connect to database");
       return;
   }
      console.log("Connection Successful"); 
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

    var data = JSON.stringify({
        fields: fields 
    });  

    res.end(data);
var state = JSON.parse(data).fields.state;
var firstname = JSON.parse(data).fields.firstName;
var lastname = JSON.parse(data).fields.lastName;
var address = JSON.parse(data).fields.address;
var gender = JSON.parse(data).fields.gender;
var student= JSON.parse(data).fields.student;
    /*mysql*/ 
    var input = {
  state: state,
  firstname: firstname,
  lastname: lastname,
  address: address,
  student: student,
  gender: gender
};
connection.query('INSERT INTO akunna SET ?', input, function(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.error(result);
});
 
    console.log("posted fields:"); 
    console.log(data);  
    });
  }  

var port = 3100;
server.listen(port);
console.log("server listening on port" + port);
