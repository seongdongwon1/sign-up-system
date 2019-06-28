var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

var conn = mysql.createConnection({
        host    :       'localhost',
        user    :       'root',
        password:       '649800',
        database:       'sdtv'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/Public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res){
                res.render('index');
});

app.post('/receive', function(req, res){
                var ID = req.body.user_Id;
                var NICK = req.body.user_nick;
                var PW1 = req.body.user_pw1;
                var PW2 = req.body.user_pw2;
                var NAME = req.body.user_name;
                var EMAIL = req.body.user_email;
                var EMAIL2 = req.body.user_email2;
                var sql = 'INSERT INTO topic(ID, NICK, PW1, PW2, NAME, EMAIL, EMAIL2) VALUES(?, ?, ?, ?, ?, ?, ?)';
                var params = [ID, NICK, PW1, PW2, NAME, EMAIL, EMAIL2];
                conn.query(sql, params, function(err, rows){
                        if(err){
                                console.log(err);
                                res.status(500).send("ERROR");
                        }
                        console.log('The file has been saved!');//데이터가 db에 잘 저장 되었다면, 콘솔에 성공이라 찍는다.
                        res.redirect('/'+rows.insertId);
                });
});

app.listen(3000, function(){
        console.log('connected 3000 port!');
});