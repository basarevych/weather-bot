'use strict';

const BaseRoute = require('./base');

class IndexRoute extends BaseRoute {
  constructor() {
    super();
    this.router.get('/', this.getIndex.bind(this));
  }

  getIndex(req, res) {
    res.render('index', { title: 'Express' });
  }
}

module.exports = IndexRoute;
