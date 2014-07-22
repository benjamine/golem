var path = require('path');
var chalk = require('chalk');

exports.description = 'expose http ports from golem vm';
exports.argument = '<guest:host,...|clear|list>';

function expose(config, guest, host) {
  var changed = false;
  var entries = Object.keys(config.portForwarding);
  while (entries.length) {
    var entry = entries.shift();
    if (config.portForwarding[entry] == host && entry != guest) {
      delete config.portForwarding[entry];
      console.log(chalk.red('removed ' + entry + ' => ' + host));
      changed = true;
    }
  }
  if (config.portForwarding[guest]) {
    if ((host && config.portForwarding[guest] != host) ||
         (!host && config.portForwarding[guest])) {
      changed = true;
      console.log(chalk.red('removed ' + guest + ' => ' + config.portForwarding[guest]));
      delete config.portForwarding[guest];
    }
  }
  if (host && config.portForwarding[guest] != host) {
    changed = true;
    console.log('exposing ' + guest + ' => ' + host);
    config.portForwarding[guest] = host;
  }

  return changed;
}

function clear(config) {
  var changed = false;
  var entries = Object.keys(config.portForwarding);
  while (entries.length) {
    var entry = entries.shift();
    var host = config.portForwarding[entry];
    delete config.portForwarding[entry];
    console.log(chalk.red('removed ' + entry + ' => ' + host));
    changed = true;
  }
  return changed;
}

exports.run = function(arg) {

  cd(require('../locator').vm());

  var config = require('../vm-config').get();
  var changed = false;

  if (arg === 'list') {
    var empty = true;
    for (var guest in config.portForwarding) {
      console.log(guest + ' => ' + config.portForwarding[guest]);
      empty = false;
    }
    if (empty) {
      console.log('(empty)');
    }
  } else if (arg === 'clear') {
    changed = clear(config);
  } else {
    var portRegex = /(\d+)\s*:\s*(\d+)/g;
    var match;
    while ((match = portRegex.exec(arg)) !== null)
    {
      changed = expose(config,
        parseInt(match[1], 10),
        parseInt(match[2], 10)) || changed;
    }
  }

  if (changed) {
    config.save();
    console.log('reloading to apply changes...');
    exec('vagrant reload');
  }
};
