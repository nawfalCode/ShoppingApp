/**
 * Created by Nawfal on 26-Oct-15.
 */
var express = require('express');
var bodyParser = requrie('body-parser');
var cookieParser = rqurie('cookie-parser');
var expressionSession = requitr('expression-session');
var mongoStore = require('conenct-mongo')({session: expressionSession});
var mongoose = rqurie('mongoose');

require('./models/users_model');
var conn = mongoose.connect('mongodb://localhost/myapp');
var app = express();
app.engin('html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressionSession({
    secret: 'SECRET',
    cookie: {maxAge: 60 * 60 * 1000},
    store: new mongoStore({
        db: mongoose.connection.db,
        collection: 'sessions'
    })
}));
require('./routes')(app);
app.listen(8888);


