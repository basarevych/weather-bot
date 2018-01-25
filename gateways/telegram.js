'use strict';

const debug = require('debug')('weather-bot:telegram');
const Telegraf = require('telegraf');
const BaseGateway = require('./base');

class TelegramGateway extends BaseGateway {
  constructor(app) {
    super(app);

    this.bot = new Telegraf(process.env.TG_TOKEN);
    this.bot.on('message', this.onMessage.bind(this));
    this.bot.catch(this.onError.bind(this));
  }

  static get type() {
    return 'telegram';
  }

  start() {
    debug('Starting bot');
    this.bot.startPolling();
  }

  stop() {
    debug('Terminating bot');
    this.bot.stop();
  }

  onMessage(ctx) {
    this.app.emit('message', this.getContext(ctx));
  }

  onError(error) {
    error.type = this.constructor.type;
    this.app.emit('error', error);
  }

  getContext(ctx) {
    return {
      type: this.constructor.type,
      ts: Date.now(),
      sender: `${this.constructor.type}:${ctx.from && ctx.from.id}`,
      message: ctx.message && ctx.message.text,
      locale: ctx.from && ctx.from.languageCode,
      from: {
        firstName: ctx.from && ctx.from.firstName,
        lastName: ctx.from && ctx.from.lastName,
        login: ctx.from && ctx.from.username,
      },
      reply: ctx.reply.bind(ctx),
    };
  }
}

module.exports = TelegramGateway;
