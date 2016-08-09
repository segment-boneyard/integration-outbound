
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
    last_name: identify.lastName(),
  };

  var attrs = body.attributes;

  if (identify.timezone()) {
    body.timezone = identify.timezone();
    del(attrs, 'timezone');
  }

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
    event: track.event(),
    timestamp: track.timestamp().getTime() / 1000
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

  var body = {
    user_id: group.userId(),
    group_id: group.groupId(),
    group_attributes: group.traits()
  };

  var attrs = body.group_attributes;
  del(attrs, 'id');

  return body;
};

/**
* Map alias.
*
* @param {Alias} alias
* @return {Object}
* @api private
*/

exports.alias = function(alias){
  return {
    user_id: alias.userId(),
    previous_id: alias.previousId()
  }
}

/**
 * Map page.
 *
 * @param {Page} page
 * @return {Object}
 * @api private
 */
exports.page = function(page){
  var evtName = "[Segment Page]"
  if (page.properties().name || page.properties().url) {
    evtName += " " + page.properties().name || page.properties().url;
  }
  return {
    user_id: page.userId(),
    properties: page.properties(),
    event: evtName,
    timestamp: page.timestamp().getTime() / 1000
  };
};

/**
 * Map screen.
 *
 * @param {Screen} screen
 * @return {Object}
 * @api private
 */
exports.screen = function(screen){
  var evtName = "[Segment Screen]"
  if (screen.properties().name) {
    evtName += " " + screen.properties().name;
  }
  return {
    user_id: screen.userId(),
    properties: screen.properties(),
    event: evtName,
    timestamp: screen.timestamp().getTime() / 1000
  };
};
