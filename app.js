'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const EventEmitter = require('events');

const IndexRoute = require('./routes/index');
const Telegram = require('./gateways/telegram');
const MessageEvent = require('./events/message');
const ErrorEvent = require('./events/error');

class App extends EventEmitter {
  constructor(port) {
    super();

    this.message = new MessageEvent(this);
    this.error = new ErrorEvent(this);

    this.tg = new Telegram(this);
    this.tg.start();

    this.index = new IndexRoute(this);

    this.express = express();
    this.express.set('port', port);

    // view engine setup
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'ejs');

    this.express.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
    this.express.use(logger('dev'));
    this.express.use(express.static(path.join(__dirname, 'public')));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieParser());

    this.express.use('/', this.index.router);

    // catch 404 and forward to error handler
    this.express.use((req, res, next) => {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    this.express.use((err, req, res, unusedNext) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}

module.exports = App;
