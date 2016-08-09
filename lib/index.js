/**
 * Module dependencies.
 */
var integration = require('segmentio-integration');
var mapper = require('./mapper');

/**
 * Expose `Outbound`
 */
var Outbound = module.exports = integration('Outbound')
  .channels(['server', 'mobile'])
  .endpoint('https://api.outbound.io')
  .ensure('settings.apiKey')
  .ensure('message.userId')
  .mapper(mapper)
  .retries(2);

/**
 * Track.
 *
 * @param {Track} payload
 * @param {Function} fn
 * @api private
 */
Outbound.prototype.track = function(payload, fn){
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
 * @param {Identify} payload
 * @param {Function} fn
 * @api private
 */
Outbound.prototype.identify = function(payload, fn){
  return this
    .post('/v2/identify')
    .set('X-Outbound-Key', this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};

/**
* Group.
*
* @param {Group} payload
* @param {Function} fn
* @api private
*/
Outbound.prototype.group = function(payload, fn){
  return this
    .post('/v2/identify')
    .set('X-Outbound-Key', this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};

/**
* Alias.
*
* @param {Alias} payload
* @param {Function} fn
* @api private
*/
Outbound.prototype.alias = function(payload, fn){
  return this
    .post('/v2/identify')
    .set('X-Outbound-Key', this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};

/**
 * Page.
 *
 * @apram {Page} payload
 * @param {Function} fn
 * @api private
 */
Outbound.prototype.page = function(payload, fn){
  return this
    .post('/v2/track')
    .set('X-Outbound-Key', this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};

/**
 * Screen.
 *
 * @apram {Screen} payload
 * @param {Function} fn
 * @api private
 */
Outbound.prototype.screen = function(payload, fn){
  return this
    .post('/v2/track')
    .set('X-Outbound-Key', this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};