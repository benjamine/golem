var path = require('path');
var chalk = require('chalk');

exports.description = 'list synced folders';
exports.argument = '[list|clear]';

function clear(config) {
  var changed = false;
  var entries = Object.keys(config.folders);
  while (entries.length) {
    var entry = entries.shift();
    var guest = config.folders[entry];
    delete config.folders[entry];
    console.log(chalk.red('removed ' + entry + ' => ' + guest));
    changed = true;
  }
  return changed;
}

exports.run = function(arg) {

  cd(require('../locator').vm());

  var config = require('../vm-config').get();
  var changed = false;

  if (!arg || arg === 'list') {
    var empty = true;
    for (var host in config.folders) {
      console.log(host + ' => ' + config.folders[host]);
      empty = false;
    }
    if (empty) {
      console.log('(empty)');
    }
  } else if (arg === 'clear') {
    changed = clear(config);
  } else {
    throw new Error('expected list or clear');
  }

  if (changed) {
    config.save();
    console.log('reloading to apply changes...');
    exec('vagrant reload');
  }
};
