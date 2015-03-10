
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
  return {
    user_id: track.userId(),
    properties: track.properties(),
    event: track.event()
  };
};

/**
* Map group.
*
* @param {Group} group
* @return {Object}
* @api private
*/

exports.group = function(group){

  // Outbound V2

  return {
    user_id: group.userId(),
    attributes: {
      group: group.traits()
    }
  };
};
