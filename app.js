var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var db = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   '649800',
    database:   'sdtv',
    port    :   '3000'
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*
app.get('/', function(req, res){
    /*res.render('index');
    res.sendFile(__dirname + '/views/index.html');
});*/


/*app.post('/receive', function(req, res){
    
    var user_Id = req.body.user_Id;
    var user_nick = req.body.user_nick;
    var user_pw1 = req.body.user_pw1;
    var user_pw2 = req.body.user_pw2;
    var user_name = req.body.user_name;
    var user_email = req.body.user_email;
    var user_email2 = req.body.user_email2;  
    res.send('ID :' + user_Id + '<br>' + 'NICK :' + user_nick + '<br>' + 'PW1 :' + user_pw1 + '<br>' + 'PW2 :' + user_pw2 + '<br>' 
    + 'NAME :' + user_name + '<br>' + 'EMAIL :' + user_email + '<br>' + 'EMAIL2 :'+ user_email2 + '<br>');
*/
/*
    var mi = {
        "ID" : "req.body.user_Id",
        "NICK" : "req.body.user_nick",
        "PW1" : "req.body.user_pw1",
        "PW2" : "req.body.user_pw2",
        "NAME" : "req.body.user_name",
        "email" : "req.body.user_email",
        "email2" : "req.body.user_email2"
    };
    res.json(mi);
});*/

  /*app.get('/', function(req, res) {
    res.render('index');
  });*/


  /*app.post('/receive', function(req, res) {
    var ID = req.body.user_Id;
    var NICK = req.body.user_nick;
    var PW1 = req.body.user_pw1;
    var PW2 = req.body.user_pw2;
    var NAME = req.body.user_name;
    var EMAIL = req.body.user_email;
    var EMAIL2 = req.body.user_email2;  */
  
   /* var sql= 'INSERT INTO topic (ID,NICK,PW1,PW2,NAME,EMAIL,EMAIL2) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ID, NICK, PW1, PW2, NAME, EMAIL, EMAIL2], function(err, rows){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server  Error');
      }
      res.redirect('/topic/'+ rows.insertId);
    });
  });*/
  
router.get('/topic', function(req, res){
    var sql = 'SELECT * FROM topic';
    db.query(sql, function(err, rows, fields){
        res.send(rows);
    });
});

app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});