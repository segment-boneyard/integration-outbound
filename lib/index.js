
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var mapper = require('./mapper');

/**
 * Expose `Outbound`
 */

var Outbound = module.exports = integration('Outbound')
  .channels(['server', 'mobile', 'client'])
  .endpoint('https://api.outbound.io')
  .ensure('settings.apiKey')
  .ensure('message.userId')
  .mapper(mapper)
  .retries(2);

/**
 * Track.
 *
 * @apram {Track} track
 * @param {Function} fn
 * @api private
 */

Outbound.prototype.track = function(payload, fn){

  // Outbound v1
  // TODO REMOVE
  if (this.settings.v1) {
    return this
      .post('/api/v1/track')
      .type('json')
      .send(payload)
      .end(this.handle(fn));
  }

  // Outbound v2
  return this
    .post('/v2/track')
    .set('X-Outbound-Key', this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};

/**
 * Identify.
 *
 * @param {Identify} identify
 * @param {Function} fn
 * @api private
 */

Outbound.prototype.identify = function(payload, fn){

  // Outbound v1
  // TODO REMOVE
  if (this.settings.v1) {
    return this
      .post('/api/v1/identify')
      .type('json')
      .send(payload)
      .end(this.handle(fn));
  }

  // Outbound v2
  return this
    .post('/v2/identify')
    .set('X-Outbound-Key', this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};
