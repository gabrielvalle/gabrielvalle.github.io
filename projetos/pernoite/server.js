var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var hbs = require('express-handlebars');
var app = express();
var session = require('express-session');


app.use(session({
    secret: '61e8dc7ad6fc5fed7d9d760341b3c71b2612d1df6fdda5e62ee158752a2fc5e122c4397c205061b'
  , cookie: {expires: new Date(Date.parse('2038-01-01'))}
  , resave: true
  , saveUninitialized: true
}));

app.use(function(request, response, next){
  var session = request.session;

  if (!session.user_id) {
    session.user_id = uuid.v4();
  }

  next();
});

app.engine('html', hbs({extname:'html'}));
app.set('view engine', 'html');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/public', function(request, response){
  response.render('index', {session: request.session});
});


console.log('Listening on localhost:9292, CTRL+C to stop');
app.listen(9292, 'localhost');
