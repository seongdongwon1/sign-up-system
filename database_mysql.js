var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var conn = mysql.createConnection({
        host    :       'localhost',
        user    :       'root',
        password:       'feel',
        database:       'sdtv'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res){
                res.render('index');
});

app.post('/', function(req, res){
                var ID = req.body.user_Id;
                var NICK = req.body.user_nick;
                var PW1 = req.body.user_pw1;
                var PW2 = req.body.user_pw2;
                var NAME = req.body.user_name;
                var EMAIL = req.body.user_email;
                var EMAIL2 = req.body.user_email2;

                if(PW1 === PW2){
                        bcrypt.hash(PW1, null, null, function(err, hash){
                                var sql = 'INSERT INTO topic(ID, NICK, PW1, NAME, EMAIL, EMAIL2) VALUES(?, ?, ?, ?, ?, ?)';
                                var params = [ID, NICK, hash, NAME, EMAIL, EMAIL2];
                                conn.query(sql, params, function(err, rows){
                                        if(err){
                                                console.log(err);
                                                res.status(500).send("ERROR");
                                        }
                                        console.log('success sign-up!');
                                        console.log(hash);
                                        res.redirect('/join');
                                });
                        })
                }
                
                
});

app.get('/join', function(req, res){
        res.render('join');
});

app.get('/login', function(req, res){
        res.render('login');
});

app.get('/login__user', function(req, res){
        res.render('login__user');
});

//로그인 구현 해결x
app.post('/login_user', function(req, res){
 var loginID = req.body.login_id;
 var loginPW = req.body.login_pw;
 var loginsql = 'SELECT * FROM topic WHERE ID = ';
      
 conn.query(loginsql, loginID, function (err, rows, fields) {
        if (err) {
                 console.log('err :' + err);
        } else {
                console.log(rows);
                if (rows[0]!=undefined) {
                        if (!bcrypt.compareSync(loginPW, rows[0].PW1)) {
                                console.log('패스워드가 일치하지 않습니다');
                        } else {
                                console.log('로그인 성공');
                                res.redirect('/login__user');
                        }
                } else {
                        console.log(rows[0]);
                        console.log('해당 유저가 없습니다');
                }
        }
        })
});
        /*app.post('/login_user', function (req, res, next) {
                var userId = req.body['login_id'];
                var userPw = req.body['login_pw'];
                conn.query('select * from topic where ID="?"' , userId, function (err, rows, fields) {
                    if (!err) {
                        if (rows[0]!=undefined) {
                            res.send('ID : ' + rows[0]['ID']);
                            console.log('1');
                        } else {
                            
                                
                      if (!bcrypt.compareSync(userPw, rows[0].PW1)) {
                        console.log('패스워드가 일치하지 않습니다');
                        
                      } else {
                        console.log('로그인 성공');
                        res.redirect('/login__user');
                        };
                    }
                }
                });
        
            });*/
                
                          
app.listen(3000, function(){
        console.log('connected 3000 port!');
});