import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('./services/passport');
import mongoDb  from './helpers/mongoDB';
import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes());

// =========================Database connection=====================================
const mongoURL = mongoDb.makeConnectionString();
mongoose.connect(mongoURL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('connecting', function() {
  console.log(chalk.yellow('connecting to MongoDB...'));
});

db.on('error', function(error) {
  console.log(chalk.red('Error in MongoDb connection: ' + error));
  mongoose.disconnect();
});

db.on('connected', function() {
  console.log(chalk.green(mongoURL+' => connected'));
});

db.once('open', function() {
  console.log(chalk.green('MongoDB connection opened!'));
});

db.on('reconnected', function () {
  console.log(chalk.blue('MongoDB reconnected!'));
});

app.use(function(req, res, next) {
  req.db = db;
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
