require('dotenv').config();
require('app-module-path').addPath(__dirname);


// requirements
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('services/swagger_output.json');

// routers
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api/v1/index');
// initialization
const app = express();


// Connect to mongo via mongoose
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {})
.then(() => {console.log('MongoDB connected via mongoose')})
.catch(() => {console.log(error)})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', indexRouter);
app.use('/api/v1', apiRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
