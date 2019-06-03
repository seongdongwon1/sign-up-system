var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/Public'));

app.get('/', function(req, res){
    /*res.render('index');*/
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/data/receive.txt', function(req, res){
    var user_Id = req.body.user_Id;
    var user_nick = req.body.user_nick;
    var user_pw1 = req.body.user_pw1;
    var user_pw2 = req.body.user_pw2;
    var user_name = req.body.user_name;
    var user_email = req.body.user_email;
    var user_email2 = req.body.user_email2;
    res.send(user_Id +','+ user_nick +','+ user_pw1 +','+ user_pw2 +','+ user_name +','+ user_email +','+ user_email2);
});

app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});