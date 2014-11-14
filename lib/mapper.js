
var del = require('obj-case').del;

/**
 * Map identify.
 *
 * @param {Identify} identify
 * @param {Object} settings
 * @return {Object}
 * @api private
 */

exports.identify = function(identify){

  // Outbound v1
  // TODO REMOVE
  if (this.settings.v1) {
    return {
      user_id: identify.userId() || identify.sessionId(),
      traits: identify.traits(),
      api_key: this.settings.apiKey,
    };
  }

  // Outbound v2

  var body = {
    user_id: identify.userId(),
    attributes: identify.traits(),
    email: identify.email(),
    phone_number: identify.phone(),
    first_name: identify.firstName(),
    last_name: identify.lastName()
  };

  var attrs = body.attributes;

  del(attrs, 'firstName');
  del(attrs, 'lastName');
  del(attrs, 'userId');
  del(attrs, 'phone');
  del(attrs, 'email');
  del(attrs, 'id');

  var device = identify.device();
  if (device.token && device.type) {
    if (device.type === 'android') body.gcm = [device.token];
    if (device.type === 'ios') body.apns = [device.token];
  }

  return body;
};

/**
 * Map track.
 *
 * @param {Track} track
 * @return {Object}
 * @api private
 */

exports.track = function(track){

  // Outbound V1
  // TODO REMOVE
  if (this.settings.v1) {
    return {
      user_id: track.userId() || track.sessionId(),
      payload: track.properties(),
      api_key: this.settings.apiKey,
      event: track.event()
    };
  }

  // Outbound V2

  return {
    user_id: track.userId(),
    properties: track.properties(),
    event: track.event()
  };
};
