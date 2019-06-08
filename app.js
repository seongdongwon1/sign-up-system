var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/Public'));

app.get('/', function(req, res){
    /*res.render('index');*/
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/receive', function(req, res){
    var accountStr = '{"ID" : req.body.user_Id,"NICK":req.body.user_nick,"PW1":req.body.user_pw1,"PW2":req.body.user_pw2,"NAME":req.body.user_name,"EMAIL":req.body.user_email,"EMAIL2":req.body.user_email2}';
    var accountObj = JSON.parse(accountStr);
    res.send(accountObj);
    /*var _accountStr = ' ';
    for(var i = 0; i < accountObj; i++){
        _accountStr +='<li>'+accountObj[i]+'</li>';
    }
    _accountStr = '<ul>'+_accountStr+'<ul>';*/


});

app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});