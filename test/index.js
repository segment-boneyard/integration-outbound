
var Test = require('segmentio-integration-tester');
var helpers = require('./helpers');
var facade = require('segmentio-facade');
var mapper = require('../lib/mapper');
var should = require('should');
var assert = require('assert');
var Outbound = require('..');

describe('Outbound', function(){
  var outbound;
  var settings;
  var test;

  beforeEach(function(){
    settings = { apiKey: '950a9fc29b1d65815f4aec077944600a' };
    outbound = new Outbound(settings);
    test = Test(outbound, __dirname);
  });

  it('should have correct settings', function(){
    test
      .name('Outbound')
      .channels(['server', 'mobile', 'client'])
      .endpoint('https://api.outbound.io')
      .ensure('settings.apiKey')
      .ensure('message.userId')
      .retries(2);
  });

  describe('.validate()', function(){
    var msg;

    beforeEach(function(){
      msg = { userId: 'user-id' };
    });

    it('should be invalid when .apiKey is missing', function(){
      delete settings.apiKey;
      test.invalid(msg, settings);
    });

    it('should be invalid when .userId is missing', function(){
      delete msg.userId;
      test.invalid(msg, settings);
    });

    it('should be valid when settings are complete and .userId is given', function(){
      test.valid(msg, settings);
    });
  });


  describe('mapper', function(){

    describe('track', function(){
      it('should map basic track', function(){
        test.maps('track-basic');
      });
    });

    describe('identify', function(){
      it('should map basic identify and remove `phone`, `email` from traits', function(){
        test.maps('identify-basic');
      });

      it('should map test for android token ', function(){
        test.maps('identify-android');
      });

      it('should map test for ios token ', function(){
        test.maps('identify-ios');
      });

      it('should map test for ios token ', function(){
        test.maps('identify-production');
      });
    });

    describe('group', function(){
      it('should map basic group', function(){
        test.maps('group-basic');
      });
    });


  });

  describe('.track()', function(){
    it('should track successfully', function(done){
      var json = test.fixture('track-basic');
      test
        .track(json.input)
        .sends(json.output)
        .expects(200, done);
    });

    it('should error on invalid request', function(done){
      test
        .set({ apiKey: 'x' })
        .track({ event: 'event' })
        .error('cannot POST /v2/track (401)', done);
    });
  });

  describe('.identify()', function(){
    it('should identify successfully', function(done){
      var json = test.fixture('identify-basic');
      test
        .identify(json.input)
        .sends(json.output)
        .expects(200, done);
    });

    it('should identify with an android device token', function(done){
      var json = test.fixture('identify-android');
      test
        .identify(json.input)
        .sends(json.output)
        .expects(200, done);
    });

    it('should identify with an ios device token', function(done){
      var json = test.fixture('identify-ios');
      test
        .identify(json.input)
        .sends(json.output)
        .expects(200, done);
    });

    it('should error on invalid request', function(done){
      test
        .set({ apiKey: 'x' })
        .track({ event: 'event' })
        .identify({})
        .error('cannot POST /v2/identify (401)', done);
    });
  });

  describe('.group()', function(){

    it('should group successfully', function(done){
      var json = test.fixture('group-basic');
      test
      .group(json.input)
      .sends(json.output)
      .expects(200, done);
    });

    it('should error on invalid request', function(done){
      test
      .set({ apiKey: 'x' })
      .track({ event: 'event' })
      .group({})
      .error('cannot POST /v2/identify (401)', done);
    });
  });
});


// Outbound v1
// TODO REMOVE

describe('Outbound-V1', function(){
  var outbound;
  var settings;
  var test;

  beforeEach(function(){
    settings = { apiKey: 'f4f15f2f004fa0bd2140b4db93cbb538', v1: true };
    outbound = new Outbound(settings);
    test = Test(outbound, __dirname);
  });

  it('should have correct settings', function(){
    test
      .name('Outbound')
      .endpoint('https://api.outbound.io')
      .channels(['server', 'mobile', 'client'])
      .endpoint('https://api.outbound.io')
      .ensure('settings.apiKey')
      .ensure('message.userId')
      .retries(2);
  });

  describe('.validate()', function(){
    var msg;

    beforeEach(function(){
      msg = { userId: 'user-id' };
    });

    it('should be invalid when .apiKey is missing', function(){
      delete settings.apiKey;
      test.invalid(msg, settings);
    });

    it('should be invalid when .userId is missing', function(){
      delete msg.userId;
      test.invalid(msg, settings);
    });

    it('should be valid when settings are complete and .userId is given', function(){
      test.valid(msg, settings);
    });
  });

  describe('.track()', function(){
    it('should track successfully', function(done){
      var track = helpers.track();
      test
        .track(track)
        .sends({
          user_id: track.userId(),
          event: track.event(),
          payload: track.properties(),
          api_key: settings.apiKey
        })
        .expects(200)
        .end(done);
    });
  });

  describe('.identify()', function(){
    it('should identify successfully', function(done){
      var identify = helpers.identify();
      test
        .identify(identify)
        .sends({
          user_id: identify.userId(),
          traits: identify.traits(),
          api_key: settings.apiKey
        })
        .expects(200)
        .end(done);
    });
  });
});
