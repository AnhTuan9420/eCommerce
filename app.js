var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var session = require("express-session");
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

var accountRouter = require('./routes/account');
var adminRouter = require('./routes/admin');

var app = express();

// connect to Database
const url =
    "mongodb://localhost:27017/eCommerce";
mongoose.Promise = global.Promise;
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    })
    .then(() => console.log("Connection to DB sucess."))
    .catch((err) => console.log(`Connect to Db failed. Error: ${err}`));

// using Session to verify User Login.
app.use(
    session({
        secret: "mySecretSession",
        resave: true,
        saveUninitialized: false,
    })
);

app.engine(
    'hbs',
      exphbs.engine({
        defaultLayout: 'layout',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        extname: '.hbs',
        helpers: require('handlebars-helpers')(),
    }),
  );

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    methodOverride((req, res) => {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            // look in urlencoded POST bodies and delete it
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);

// app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;