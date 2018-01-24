'use strict';

const express = require('express');

class BaseRoute {
  constructor() {
    this.router = express.Router();
  }

  install(app, route) {
    app.use(route, this.router);
  }
}

module.exports = BaseRoute;
