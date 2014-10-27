'use strict';

var apollo = require('apollo');
var promise = require('p-promise');
var moment = require('moment');
var MobileDetect = require('mobile-detect');

/**
 * The Express/Connect/HttpServer object
 * @type {*}
 */
var app = apollo.app;
var Type = apollo.Type;
var mongo = apollo.mongo;
var config = apollo.config;

app.get('/', function(req, res) {
  var md = new MobileDetect(req.headers['user-agent']);

  app.apolloRender(req, res, config.name + '.apollo', {
    config: config,
    mobile: md.phone(),
    android: md.is('AndroidOS'),
    ios: md.is('iOS'),
    bb: md.is('BlackBerryOS')
  });
});

apollo.init();