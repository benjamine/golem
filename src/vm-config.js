require('shelljs/global');
var fs = require('fs');
var path = require('path');
var locator = require('./locator');

function find(){
  var golemDir = locator.vm({ required: false }) || './.golem';
  return path.join(golemDir, 'vm-config.json');
}

function save(config) {
  var filename = find();
  try {
    fs.writeFileSync(filename, JSON.stringify(config || {}, null, 2));
  } catch (err) {
    throw new Error('error trying to save config to ' + filename + ': ' + err);
  }
}

function configInit(config){
  config.folders = config.folders || {};
  config.portForwarding = config.portForwarding || {};
  config.save = function(){
    save(config);
  };
}

function get(){
  var config = {};
  var filename = find();
  if (test('-f', filename)) {
    try {
      config = JSON.parse(fs.readFileSync(filename));
    } catch (err) {
      throw new Error('error trying to load config from ' + filename + ': ' + err);
    }
  }
  configInit(config);
  return config;
}


exports.get = get;
exports.save = save;
