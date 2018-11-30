require('dotenv').config();

require('./config/passport-stuff');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require('passport');



mongoose
  .connect('process.env.MONGODB_URI', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Bookie';

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // Passport defines "req.user" if the user is logged in
  // ("req.user" is the result of deserialize)
    res.locals.currentUser = req.user;

    // call "next()" to tell Express that we've finished
    // (otherwise your browser will hang)
    next();
});

const index = require('./routes/index');
app.use('/', index);

const userRoutes = require('./routes/user-routes')
app.use('/', userRoutes);

const tripRoutes =
require('./routes/trip-routes')
app.use('/', tripRoutes);

const groupRoutes =
require('./routes/group-routes')
app.use('/', groupRoutes);


module.exports = app;
