'use strict';

const express = require('express');

class BaseRoute {
  constructor(app) {
    this.app = app;
    this.router = express.Router();
  }
}

module.exports = BaseRoute;
