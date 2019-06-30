var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var conn = mysql.createConnection({
        host    :       'localhost',
        user    :       'root',
        password:       '649800',
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

app.post('/login_user', function(req, res){
        var ID = req.body.login_id;
        var PW = req.body.login_pw;
        var sql = 'SELECT * FROM topic WHERE ID = "?"';
      
                conn.query(sql, ID, function (err, result) {
                  if (err) {
                    console.log('err :' + err);
                    
                  } else {
                    if (result.length === 0) {
                        console.log(result);
                        console.log('해당 유저가 없습니다');
                      
                    } else {
                      if (!bcrypt.compareSync(PW, result[0].PW1)) {
                        console.log('패스워드가 일치하지 않습니다');
                        
                      } else {
                        console.log('로그인 성공');
                        return(null, {
                          ID: result[0].ID,
                          PW: result[0].PW1
                        });
                      }
                    }
                  }
                })
        
        });
                
                          
app.listen(3000, function(){
        console.log('connected 3000 port!');
});