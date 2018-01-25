'use strict';

class MessageEvent {
  constructor(app) {
    app.on('message', this.handleMessage.bind(this));
  }

  handleMessage(context) {
    console.log(`Message from ${context.sender}: ${context.message}`);
    context.reply(context.message);
  }
}

module.exports = MessageEvent;
