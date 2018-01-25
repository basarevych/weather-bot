'use strict';

class ErrorEvent {
  constructor(app) {
    app.on('error', this.handleError.bind(this));
  }

  handleError(error) {
    console.error(`Error from ${error.type}: ${error.message}`);
  }
}

module.exports = ErrorEvent;
