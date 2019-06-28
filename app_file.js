var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('html', require('ejs').renderFile);
app.set('views', './views_file');
app.set('view engine', 'html');


app.get('/topic/new', function(req, res){
    res.render('new');
});
app.get('/topic', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics: files});
    });
});

app.post('/topic', function(req, res){
    var id = req.body.id;
    var email = req.body.email;

    fs.writeFile('data/'+id,email, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.send('success');
    } );
});

app.listen(3000, function(){
    console.log('Connected, 3000 port!');
});