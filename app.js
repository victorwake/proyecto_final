var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');


require('dotenv').config();

// const session = require('express-session'); falta este pero falla

var indexRouter = require('./routes/index');//index.js levanta
//var usersRouter = require('./routes/users');
var bandasRouter = require('./routes/bandas'); //bandas.js levanta
var contactoRouter = require('./routes/contacto');
var galeriaRouter = require('./routes/galeria');
var musicaRouter = require('./routes/musica');
var novedadesRouter = require('./routes/novedades');
var videosRouter = require('./routes/videos');
// var loginRouter = require('./routes/admin/login');
// var novedades1Router = require('./routes/admin/novedades');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: '1234',
//   resave: false,
//   saveUninitialized: true,
// }))

// secured = async (req, res, next) => {
//   try {
//     console.log(req.session.id_usuario);
//     if (req.session.id_usuario) {
//       next();
//     } else {
//       res.redirect('/admin/login');
//     }
//   }catch (error) {
//     console.log(error);
//   }
// }

// app.get('/', function (req, res) {
//   var conocido = boolean(req.session.nombre);

//   res.render('/admin/extras.hbs', {
//     title: 'Login',
//     conocido: conocido,
//     nombre: req.session.nombre
//   });
// }); 



app.use('/', indexRouter);
app.use('/bandas',bandasRouter);
app.use('/contacto',contactoRouter);
app.use('/galeria',galeriaRouter);
app.use('/musica',musicaRouter);
app.use('/novedades',novedadesRouter);
app.use('/videos',videosRouter);
// app.use('/admin/login',loginRouter);
// app.use('/admin/novedades1',secured, novedades1Router);

//app.use('/users', usersRouter);

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
