var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port',20514);

app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get', context);
});

app.post('/', function(req,res){ 
  console.log(req.body);
  console.log('post entered');
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataListURL = qParams;
  console.log(context.dataListURL);
  var qBody = [];
  for (var p in req.body){
    qBody.push({'name':p,'value':req.body[p]})
  }
  context.dataListBody = qBody;
  console.log(context.dataListBody);
  res.render('post', context);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
