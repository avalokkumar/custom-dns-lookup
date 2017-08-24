var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    routes = require('./routes'),
    session = require('express-session'),
    //cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    index = require('./routes/index'),
    api = require('./routes/api'),
    http = require('http'),
    cookieParser = require('cookie-parser'),
    path = require('path');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3030);

//setting view engine
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
/*app.use(cookieParser());*/
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


app.use(express.static(path.join(__dirname, 'public')));
var env = process.env.NODE_ENV || 'development';

// JSON API
app.get('/api/name', api.name);
// serve index and view partials
app.get('/', index);
app.get('/reversedns', api.reverseDNSLookup);
app.post('/resolvehostname', api.resolveByHostname);


// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});