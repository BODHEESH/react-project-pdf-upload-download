const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

const app = express();

const {connectdb}=require('../Server/config/connection')
connectdb()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pdfFiles',express.static(path.join(__dirname,'public/pdfFiles')))

app.use('/', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status);
//   // res.render('error');
//   console.log(err.message)
//   res.send(err)
// });
app.use((err,req,res,next)=>{
  res.send({
    message:err.message
  })
})

module.exports = app;
